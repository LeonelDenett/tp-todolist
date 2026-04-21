# Fiche de preparation au deploiement

## 1. Composants du projet

- Frontend : application Vue.js dans `frontend/`.
- Backend : API Express + Sequelize dans `backend/`.
- Base de donnees : MariaDB/MySQL.

## 2. Prerequis techniques

- Node.js >= 18
- npm >= 9
- MariaDB/MySQL >= 8 (ou instance compatible)
- Un compte utilisateur SQL avec droits sur la base `todo_db`

## 3. Variables d'environnement

### Backend (`backend/.env`)

- `DB_HOST` : hote SQL
- `DB_PORT` : port SQL
- `DB_NAME` : nom de la base
- `DB_USER` : utilisateur SQL
- `DB_PASSWORD` : mot de passe SQL
- `PORT` : port d'ecoute de l'API (3009 par defaut)

### Frontend (`frontend/.env`)

- `VUE_APP_API_URL` : URL de base de l'API Todo

## 4. Ports utilises

- Frontend (dev) : `8080`
- Backend API : `3009`
- Base SQL : `3307` (selon configuration locale actuelle)

## 5. Commandes de lancement

### Backend

```bash
cd backend
npm install
npm run start
```

Copie de configuration :

- PowerShell : `Copy-Item .env.example .env`
- Bash : `cp .env.example .env`

### Frontend

```bash
cd frontend
npm install
npm run serve
```

Copie de configuration :

- PowerShell : `Copy-Item .env.example .env`
- Bash : `cp .env.example .env`

## 6. Points de vigilance

- Ne jamais versionner les fichiers `.env`.
- Verifier la coherence des ports entre frontend, backend et base de donnees.
- Verifier que la base `todo_db` existe avant le premier lancement.
- Si le port 3009 est occupe, changer `PORT` dans `backend/.env` et adapter `VUE_APP_API_URL`.
- Si le port SQL est different, adapter `DB_PORT`.

## 7. Distinction code / configuration / donnees

- Code : `backend/` (hors `.env`), `frontend/src/`.
- Configuration : `backend/.env`, `backend/.env.example`, `frontend/.env`, `frontend/.env.example`, `package.json`.
- Donnees : contenu de la base SQL (`todo_db`).
