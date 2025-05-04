## Backend Portfolio - Node.js, Express, MongoDB

## Description
Ce projet constitue la partie Backend de mon portfolio de développeur.
Il fournit une API REST permettant de gérer :

-Des projets (méthodes CRUD implémentées)

-Le formulaire de contact

La base de données utilisée est MongoDB Atlas. Le serveur est construit avec Express.js.

## Fonctionnalités principales
-Ajouter, consulter les détails, modifier et supprimer des projets

-Récupérer un projet spécifique par son ID

-Envoyer un message via le formulaire de contact

-Validation des schémas de données avec Mongoose

-Insertion automatique de quelques  projets au premier démarrage

## Installation
## Cloner le projet

bash
git clone https://github.com/StevineA/2025_fullstack_AYEMELE.git
cd backend

## Installer les dépendances

bash
npm install

## Configurer les variables d'environnement

Créer un fichier .env à la racine du projet avec ce contenu :

env
ATLAS_URI=mongodb+srv://chanelleayemele:mWy34c3KH8KQbQRp@cluster0.epl61.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000

## Lancer le serveur en mode développement

bash
npm run dev
Le serveur sera accessible sur : http://localhost:3000

Structure du projet
backend/
│
├── model/
│   └── routes/
│       └── route.mjs           // Définition des routes pour projets et contacts
│
├── database.mjs                // Connexion à MongoDB + schémas de données
├── server.mjs                  // Configuration du serveur Express
│
├── .env                        // Variables d'environnement
├── .eslint.config.mjs              // Configuration ESLint
├── package.json                // Dépendances et scripts npm
└── README.md                   // Documentation du projet

## Technologies utilisées
Node.js

Express.js

MongoDB Atlas

Mongoose

dotenv

nodemon

ESLint


## API Endpoints
Projets

## Méthode	URL et 	action
GET	/projects	Récupérer tous les projets
GET	/projects/:id	Récupérer un projet spécifique
POST	/projects	Ajouter un nouveau projet
PUT	/projects/:id	Modifier un projet existant
DELETE	/projects/:id	Supprimer un projet
Contact  Envoyer un message

POST	/projects/contact	Envoyer un message de contact

## Linting et qualité du code
Le projet utilise ESLint pour garantir la qualité et la cohérence du code.
Pour analyser et vérifier le code.


## Auteur
Stevine Ayemele



