# Frontend - Todo List

Frontend Vue.js de l'application Todo List.

## Prerequis

- Node.js 18 ou plus recent
- un backend disponible sur le port 3009 (par defaut)

## Installation

```bash
npm install
```

## Configuration

1. Copier `.env.example` en `.env`.
2. Adapter l'URL backend si necessaire.

Exemple :

```dotenv
VUE_APP_API_URL=http://localhost:3009/api/todos
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
