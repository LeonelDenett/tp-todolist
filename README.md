# Todo List - TP2

Ce depot correspond a la version de travail TP2 de l'application Todo List.

Objectif TP2 : rendre le projet compréhensible, configurable et lancable sur un autre poste, sans conteneurisation ni CI.

## Vue d'ensemble

- Frontend : Vue.js
- Backend : Express + Sequelize
- Base de donnees : MariaDB/MySQL

Documentation associee :

- Schema d'architecture : `docs/architecture-execution.md`
- Fiche de preparation au deploiement : `docs/fiche-preparation-deploiement.md`

## Prerequis

- Node.js >= 18
- npm >= 9
- MariaDB/MySQL accessible en local

## 1. Preparation base de donnees

Creer une base `todo_db` puis verifier qu'un utilisateur SQL a les droits d'acces.

Exemple SQL :

```sql
CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 2. Lancer le backend

```bash
cd backend
npm install
```

Copier l'exemple de configuration :

- PowerShell :

```powershell
Copy-Item .env.example .env
```

- Bash :

```bash
cp .env.example .env
```

Puis demarrer :

```bash
npm run start
```

API disponible sur :

- `http://localhost:3009/`
- `http://localhost:3009/api/todos`

## 3. Lancer le frontend

```bash
cd frontend
npm install
```

Copier l'exemple de configuration :

- PowerShell :

```powershell
Copy-Item .env.example .env
```

- Bash :

```bash
cp .env.example .env
```

Puis demarrer :

```bash
npm run serve
```

Frontend disponible sur :

- `http://localhost:8080`

## Variables d'environnement

### Backend (`backend/.env`)

```dotenv
DB_HOST=localhost
DB_PORT=3307
DB_NAME=todo_db
DB_USER=todo_user
DB_PASSWORD=todo_pass
PORT=3009
```

### Frontend (`frontend/.env`)

```dotenv
VUE_APP_API_URL=http://localhost:3009/api/todos
```

## Elements sensibles / non versionnables

- `.env` backend et frontend
- `node_modules/`
- logs locaux

Ces elements sont ignores via `.gitignore`.
