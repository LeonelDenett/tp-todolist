<template>
  <div class="app-shell">
    <main class="app-frame">
      <header class="page-header">
        <h1>Todo List</h1>
        <p>Exemple simple d'application de gestion de taches avec Vue.js.</p>
      </header>

      <TodoList />
    </main>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: { TodoList }
};
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  padding: 32px 16px 48px;
}

.app-frame {
  width: min(960px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 24px;
}

.page-header {
  display: grid;
  gap: 8px;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.page-header p {
  color: var(--text-muted);
}

@media (max-width: 991px) {
  .app-shell {
    padding-top: 24px;
  }
}

@media (max-width: 575px) {
  .app-shell {
    padding-inline: 12px;
    padding-bottom: 32px;
  }

  .page-header h1 {
    font-size: 1.75rem;
  }
}
</style>
