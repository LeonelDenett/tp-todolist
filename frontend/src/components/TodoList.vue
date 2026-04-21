<template>
  <section class="todo-page">
    <div class="panel todo-panel">
      <div class="todo-toolbar">
        <div class="todo-toolbar__content">
          <h2 class="section-title">Liste des taches</h2>
          <p class="section-text">{{ summaryText }}</p>
        </div>

        <div class="todo-toolbar__actions">
          <div class="btn-group" role="group" aria-label="Filtres">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              type="button"
              class="btn"
              :class="filter === option.value ? 'btn-secondary' : 'btn-outline-secondary'"
              @click="filter = option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <button class="btn btn-primary" type="button" @click="createTodo">
            Ajouter une tache
          </button>
        </div>
      </div>

      <div v-if="errorMessage" class="alert alert-danger mb-3" role="alert">
        {{ errorMessage }}
      </div>

      <TodoForm
        v-if="showForm"
        :todo="selectedTodo"
        @close="closeForm"
        @saved="handleSaved"
      />

      <div v-if="loading" class="todo-state">
        Chargement des taches...
      </div>

      <div v-else-if="filteredTodos.length === 0" class="todo-state">
        <p>{{ emptyStateText }}</p>
        <button class="btn btn-outline-primary" type="button" @click="createTodo">
          Ajouter une tache
        </button>
      </div>

      <ul v-else class="todo-list">
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @edit="editTodo"
          @delete="deleteTodo"
          @toggle="toggleCompleted"
        />
      </ul>
    </div>
  </section>
</template>

<script>
import TodoForm from './TodoForm.vue';
import TodoItem from './TodoItem.vue';
import todoService from '../api/todoService';

export default {
  name: 'TodoList',
  components: { TodoForm, TodoItem },
  data() {
    return {
      todos: [],
      filter: 'all',
      showForm: false,
      selectedTodo: null,
      loading: false,
      errorMessage: ''
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'completed') {
        return this.todos.filter(t => t.completed);
      }
      if (this.filter === 'active') {
        return this.todos.filter(t => !t.completed);
      }
      return this.todos;
    },
    filterOptions() {
      return [
        { value: 'all', label: 'Toutes' },
        { value: 'active', label: 'Non terminees' },
        { value: 'completed', label: 'Terminees' }
      ];
    },
    summaryText() {
      const total = this.todos.length;
      const completed = this.todos.filter(todo => todo.completed).length;
      const active = total - completed;

      if (total === 0) {
        return 'Aucune tache enregistree.';
      }

      return `${total} tache${total > 1 ? 's' : ''} au total, ${active} en cours et ${completed} terminee${completed > 1 ? 's' : ''}.`;
    },
    emptyStateText() {
      if (this.filter === 'completed') {
        return 'Aucune tache terminee a afficher.';
      }

      if (this.filter === 'active') {
        return 'Aucune tache non terminee a afficher.';
      }

      return 'Aucune tache a afficher.';
    }
  },
  methods: {
    async fetchTodos() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const res = await todoService.getAll();
        this.todos = res.data;
      } catch (error) {
        this.errorMessage = 'Impossible de charger les taches pour le moment.';
      } finally {
        this.loading = false;
      }
    },
    async handleSaved() {
      this.showForm = false;
      this.selectedTodo = null;
      await this.fetchTodos();
    },
    closeForm() {
      this.showForm = false;
      this.selectedTodo = null;
    },
    createTodo() {
      this.selectedTodo = null;
      this.showForm = true;
    },
    editTodo(todo) {
      this.selectedTodo = { ...todo };
      this.showForm = true;
    },
    async deleteTodo(id) {
      if (!window.confirm('Supprimer cette tache ?')) {
        return;
      }

      try {
        await todoService.delete(id);
        await this.fetchTodos();
      } catch (error) {
        this.errorMessage = 'La suppression a echoue. Reessayez dans un instant.';
      }
    },
    async toggleCompleted(id) {
      try {
        await todoService.toggleCompleted(id);
        await this.fetchTodos();
      } catch (error) {
        this.errorMessage = 'La mise a jour du statut a echoue.';
      }
    }
  },
  mounted() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
.todo-panel {
  padding: 24px;
}

.todo-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.todo-toolbar__content {
  display: grid;
  gap: 8px;
}

.todo-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.todo-panel :deep(.todo-form-panel) {
  margin-bottom: 24px;
}

@media (max-width: 767px) {
  .todo-panel {
    padding: 20px;
  }

  .todo-toolbar__actions,
  .todo-toolbar__actions .btn-group {
    width: 100%;
  }

  .todo-toolbar__actions .btn,
  .todo-toolbar__actions .btn-group .btn {
    flex: 1 1 auto;
  }
}
</style>
