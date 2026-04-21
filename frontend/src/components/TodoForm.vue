<template>
  <section class="panel todo-form-panel">
    <div class="todo-form-panel__header">
      <h3 class="section-title">{{ todo && todo.id ? 'Modifier la tache' : 'Ajouter une tache' }}</h3>
    </div>

    <form class="todo-form" @submit.prevent="onSubmit" autocomplete="off">
      <div class="todo-form__field">
        <label class="form-label" for="todo-title">Titre *</label>
        <input
          id="todo-title"
          v-model="form.title"
          type="text"
          class="form-control"
          placeholder="Ex. Finaliser la proposition commerciale"
          required
          autofocus
        />
      </div>

      <div class="todo-form__field">
        <label class="form-label" for="todo-description">Description</label>
        <textarea
          id="todo-description"
          v-model="form.description"
          class="form-control todo-form__textarea"
          rows="3"
          placeholder="Description de la tache"
        ></textarea>
      </div>

      <div class="row g-3">
        <div class="col-sm-6">
          <label class="form-label" for="todo-priority">Priorite *</label>
          <select id="todo-priority" v-model="form.priority" class="form-select" required>
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>

        <div class="col-sm-6">
          <label class="form-label" for="todo-due-date">Date limite</label>
          <input
            id="todo-due-date"
            v-model="form.dueDate"
            type="date"
            class="form-control"
          />
        </div>
      </div>

      <div v-if="errorMessage" class="alert alert-danger mb-0" role="alert">
        {{ errorMessage }}
      </div>

      <div class="todo-form__actions">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="$emit('close')"
          :disabled="isSubmitting"
        >
          Annuler
        </button>

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Enregistrement...' : todo && todo.id ? 'Enregistrer' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import todoService from '../api/todoService';

export default {
  name: 'TodoForm',
  props: {
    todo: Object
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      },
      isSubmitting: false,
      errorMessage: ''
    };
  },
  watch: {
    todo: {
      immediate: true,
      handler(newVal) {
        this.syncForm(newVal);
      }
    }
  },
  methods: {
    syncForm(newVal) {
      this.errorMessage = '';

      if (newVal) {
        this.form = {
          title: newVal.title || '',
          description: newVal.description || '',
          priority: newVal.priority || 'medium',
          dueDate: newVal.dueDate ? newVal.dueDate.slice(0, 10) : ''
        };
        return;
      }

      this.form = {
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      };
    },
    async onSubmit() {
      const payload = {
        ...this.form,
        dueDate: this.form.dueDate || null
      };

      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        if (this.todo && this.todo.id) {
          await todoService.update(this.todo.id, payload);
        } else {
          await todoService.create(payload);
        }

        this.$emit('saved');
      } catch (error) {
        this.errorMessage = 'Impossible d enregistrer cette tache pour le moment.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.todo-form-panel {
  padding: 20px;
}

.todo-form-panel__header {
  margin-bottom: 16px;
}

.todo-form {
  display: grid;
  gap: 16px;
}

.todo-form__field {
  display: grid;
  gap: 8px;
}

.form-label {
  margin: 0;
  font-weight: 600;
}

.todo-form__textarea {
  min-height: 110px;
  resize: vertical;
}

.todo-form__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 575px) {
  .todo-form__actions {
    justify-content: flex-start;
  }

  .todo-form__actions .btn {
    width: 100%;
  }
}
</style>
