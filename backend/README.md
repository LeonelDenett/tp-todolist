# Backend - Todo List

## Prérequis

- Node.js >= 18
- MySQL >= 8

## Installation

1. Copier `.env.example` en `.env` et adapter les variables.
2. Installer les dépendances :

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

L’API sera disponible sur [http://localhost:3000](http://localhost:3000).

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
