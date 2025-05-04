# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## configuration de mon front

## Frontend Portfolio : React

## Description
Ce projet constitue la partie Frontend de mon portfolio. Il permet de présenter les projets et le formulaire de contact, tout en communiquant avec l'API Backend pour gérer les projets et enregistrer les messages de contact.

L'application utilise React pour le développement de l'interface utilisateur.

## Fonctionnalités principales
-Affichage des projets dynamiquement depuis le backend

-Affichage des détails d'un projet spécifique

-Envoi d'un message via le formulaire de contact

-Ajout de nouveaux projets

-Mise à jour  d'un projet

## Installation
## 1. Cloner le projet
bash
git clone https://github.com/StevineA/2025_fullstack_AYEMELE.git

cd frontend

## 2. Installer les dépendances
bash
yarn install

## 3. Configurer les variables d'environnement
Créer un fichier .env à la racine du projet avec le contenu suivant :


## 4. Lancer l'application en mode développement
bash
yarn run dev
L'application sera accessible sur : http://localhost:5173

## se connecter en tant que admin: 

## email:
admin@exemple.com
## mot de passe : 
admin123

## Structure du projet

cclient-portfolio/
│
├── public/
│   └── index.html           // Point d'entrée HTML pour l'application React
│
├── src/
│   ├── assets/              // Images, icônes, ressources statiques
│   ├── components/          // Composants React réutilisables
│   ├── pages/               // Pages principales de l'application
│   ├── services/            // Gestion des appels API
│   ├── main.jsx               // Composant principal de l'application
│   
│
├
├── package.json             // Dépendances et scripts yarn
└── README.md                // Ce fichier

 ## Technologies utilisées
React.js


React Router (navigation)

Formik (formulaire de contact)

API Endpoints
Le frontend interagit avec l'API backend via les endpoints suivants :

Projets

## Méthode	URL et action	Action
GET	/projects	Récupérer tous les projets
GET	/projects/:id	Récupérer un projet par son ID
PUT /projects/ :id  Mettre à jour un projet
POST	/projects/contact	Envoyer un message de contact
Contact
Le formulaire envoie les données via une requête POST à /projects/contact.

## Linting et qualité du code
Le projet utilise ESLint  pour garantir la qualité et la cohérence du code.

Auteur
Stevine Ayemele


