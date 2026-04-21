# Backend - Todo List

## Prérequis

- Node.js >= 18
- MySQL >= 8

## Installation

1. Copier `.env.example` en `.env` et adapter les variables :
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

2. Installer les dépendances :

   ```
   npm install
   ```

3. Créer la base de données MySQL (exemple) :

   ```sql
   CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
La base de données sera disponible au port spécifié dans le paramètre `DB_PORT` du fichier .env

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
