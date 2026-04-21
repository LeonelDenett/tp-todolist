# Frontend - Todo List

Frontend Vue.js de l'application Todo List.

## Prerequis

- Node.js 18 ou plus recent
- un backend disponible sur `http://localhost:3000`

## Installation

```bash
npm install
```

## Lancement en developpement

```bash
npm run serve
```

Le frontend est accessible sur `http://localhost:8080`.

## Build de production

```bash
npm run build
```

## Structure

- `src/App.vue` : composant racine
- `src/components/TodoList.vue` : gestion de la liste et des filtres
- `src/components/TodoItem.vue` : affichage d'une tache
- `src/components/TodoForm.vue` : formulaire d'ajout et de modification
- `src/api/todoService.js` : appels vers l'API backend
