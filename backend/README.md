# Backend - Todo List

## Prérequis

- Node.js >= 18
- MySQL >= 8

## Installation

1. Copier `.env.example` en `.env` et adapter les variables.
2. Pour Installer les dépendances :

   ```
   npm install
   ```

3. Créer la base de données MySQL (exemple) :

   ```sql
   CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. Lancer le serveur :

   ```
   npm start
   ```

L’API sera disponible sur [http://localhost:3009](http://localhost:3009).

## Variables d'environnement

Exemple :

```dotenv
DB_HOST=localhost
DB_PORT=3307
DB_NAME=todo_db
DB_USER=todo_user
DB_PASSWORD=todo_pass
PORT=3009
```

## Commandes

- `npm start` : démarre le serveur
- `npm run dev` : démarre le serveur avec nodemon (dev)

## Structure

- `config/` : configuration Sequelize
- `models/` : modèles de données
- `controllers/` : logique métier
- `routes/` : routes Express
- `middlewares/` : middlewares personnalisés

---
