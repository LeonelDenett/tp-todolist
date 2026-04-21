<template>
  <li class="todo-item" :class="{ 'todo-item--completed': todo.completed }">
    <div class="todo-item__main">
      <input
        type="checkbox"
        class="form-check-input todo-item__checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        :aria-label="todo.completed ? 'Marquer comme non terminee' : 'Marquer comme terminee'"
      />

      <div class="todo-item__content">
        <div class="todo-item__header">
          <h3 class="todo-item__title">
            {{ todo.title }}
          </h3>
          <span class="priority-badge" :class="priorityClass">
            {{ priorityLabel }}
          </span>
        </div>

        <p v-if="todo.description" class="todo-item__description">
          {{ todo.description }}
        </p>

        <p v-if="todo.dueDate" class="todo-item__date">
          Date limite : {{ formatDate(todo.dueDate) }}
        </p>
      </div>
    </div>

    <div class="todo-item__actions">
      <button class="btn btn-sm btn-outline-secondary" type="button" @click="$emit('edit', todo)">
        Modifier
      </button>
      <button class="btn btn-sm btn-outline-danger" type="button" @click="$emit('delete', todo.id)">
        Supprimer
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: { type: Object, required: true }
  },
  computed: {
    priorityLabel() {
      switch (this.todo.priority) {
        case 'high':
          return 'Haute';
        case 'medium':
          return 'Moyenne';
        case 'low':
          return 'Basse';
        default:
          return 'Moyenne';
      }
    },
    priorityClass() {
      switch (this.todo.priority) {
        case 'high':
          return 'priority-badge--high';
        case 'medium':
          return 'priority-badge--medium';
        case 'low':
          return 'priority-badge--low';
        default:
          return 'priority-badge--medium';
      }
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('fr-FR');
    }
  }
};
</script>

<style scoped>
.todo-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0;
  border-top: 1px solid var(--border-color);
}

.todo-item:first-child {
  border-top: none;
  padding-top: 0;
}

.todo-item:last-child {
  padding-bottom: 0;
}

.todo-item--completed .todo-item__title {
  color: var(--text-muted);
  text-decoration: line-through;
}

.todo-item__main {
  display: flex;
  gap: 12px;
  flex: 1 1 420px;
}

.todo-item__checkbox {
  margin-top: 0.35rem;
}

.todo-item__content {
  display: grid;
  gap: 8px;
  flex: 1 1 auto;
}

.todo-item__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.todo-item__title {
  font-size: 1rem;
  font-weight: 600;
}

.todo-item__description,
.todo-item__date {
  color: var(--text-muted);
  line-height: 1.5;
}

.todo-item__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
}

@media (max-width: 767px) {
  .todo-item {
    flex-direction: column;
  }

  .todo-item__actions {
    width: 100%;
  }
}
</style>
