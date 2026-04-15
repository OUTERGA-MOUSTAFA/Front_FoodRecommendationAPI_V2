# 🍽️ Restaurant App – React Frontend

Application web développée avec React permettant d’afficher, filtrer et consulter des plats, avec authentification et connexion à une API Laravel.

---

## 🎯 Objectif du projet

Ce projet a pour but de maîtriser les bases de React à travers :
- Les composants et props
- La gestion de l’état (useState)
- Le routing (React Router)
- La communication avec une API
- L’authentification avec Context API

---

## 🚀 Fonctionnalités

### 🥗 Affichage des plats
- Affichage des cartes de plats (nom, prix, disponibilité)
- Badge “Disponible”
- Liste de plusieurs plats

---

### 🔍 Recherche & Filtrage
- Champ de recherche dynamique
- Filtrage en temps réel
- Ignore la casse
- Message “Aucun plat trouvé” si vide

---

### 🧭 Navigation (React Router)
Routes disponibles :
- `/` → Home
- `/plates` → Liste des plats
- `/plates/:id` → Détail d’un plat
- `/login` → Connexion
- `/register` → Inscription
- `/profile` → Profil (protégé)

---

### 📄 Détail d’un plat
- Affichage dynamique selon l’ID
- Données récupérées depuis l’API

---

### 📡 Connexion API
- GET `/api/plates`
- GET `/api/plates/{id}`
- GET `/api/categories`
- Gestion :
  - Loading
  - Error

---

### 🔐 Authentification (Context API)
- Login via `/api/login`
- Stockage du token (localStorage)
- Persistance de session
- Logout via `/api/logout`

---

### 👤 Profil utilisateur
- Page protégée
- Redirection si non connecté

---

## 🧱 Technologies utilisées

- ⚛️ React.js
- React Router DOM
- Context API
- Axios (API calls)
- CSS / Tailwind (optionnel)

---

## 📁 Structure du projet
src/
│
├── components/
│ ├── PlateCard.jsx
│ ├── Navbar.jsx
│
├── pages/
│ ├── Home.jsx
│ ├── Plates.jsx
│ ├── PlateDetail.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Profile.jsx
│
├── context/
│ └── AuthContext.jsx
│
├── services/
│ └── api.js
│
└── App.jsx
## Apré clone 
npm install
npm run dev
