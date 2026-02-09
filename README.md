# 🔍 JobFinder - Application de Recherche d'Emploi

## 📋 Description du Projet

**JobFinder** est une Single Page Application (SPA) développée avec **Angular 18** qui permet aux chercheurs d'emploi de rechercher des offres d'emploi provenant d'APIs publiques internationales. L'application offre des fonctionnalités complètes de gestion de favoris, de suivi de candidatures et de gestion de profil utilisateur.

## ✨ Fonctionnalités Principales

### 🔐 Authentification & Gestion de Compte
- ✅ Inscription avec validation complète des données
- ✅ Connexion sécurisée
- ✅ Gestion du profil utilisateur (modification des informations)
- ✅ Suppression du compte
- ✅ Protection des routes avec AuthGuard
- ✅ Stockage sécurisé dans localStorage

### 🔍 Recherche d'Emplois
- ✅ Recherche par mots-clés (titre du poste uniquement)
- ✅ Recherche par localisation
- ✅ Tri automatique par date de publication (plus récent en premier)
- ✅ Pagination côté client (10 résultats par page)
- ✅ Chargement progressif depuis l'API
- ✅ Indicateur de chargement pendant la recherche
- ✅ Affichage des détails : titre, entreprise, localisation, date, description, tags
- ✅ Accessible même pour les utilisateurs non authentifiés

### ❤️ Gestion des Favoris (NgRX)
- ✅ Ajout d'offres aux favoris
- ✅ Consultation de la liste des favoris
- ✅ Suppression de favoris
- ✅ Indicateur visuel sur les offres déjà en favoris
- ✅ Prévention des doublons
- ✅ **Gestion complète avec NgRX Store + Effects**

### 📋 Suivi des Candidatures
- ✅ Ajout de candidatures au suivi
- ✅ Gestion des statuts : En attente, Accepté, Refusé
- ✅ Ajout de notes personnelles
- ✅ Filtrage par statut
- ✅ Modification des statuts et notes
- ✅ Suppression de candidatures

## 🛠️ Technologies Utilisées

### Frontend
- **Angular 18.2.0** (Standalone Components)
- **TypeScript 5.5.2**
- **RxJS 7.8.0** (Observables, Operators)
- **Bootstrap 5.3.8** (Responsive Design)

### Gestion d'État
- **@ngrx/store 18.1.1** (State Management)
- **@ngrx/effects 18.1.1** (Side Effects)
- **@ngrx/store-devtools 18.1.1** (Redux DevTools)

### Backend Simulé
- **JSON Server 0.17.4** (API REST simulée)

### API Externe
- **Arbeitnow Job Board API** (Source des offres d'emploi)

## 📦 Structure du Projet

```
job-finder/
├── src/
│   ├── app/
│   │   ├── components/          # Composants partagés (Navbar, Footer)
│   │   ├── guards/              # AuthGuard pour protéger les routes
│   │   ├── interceptors/        # HTTP Error Interceptor
│   │   ├── models/              # Interfaces TypeScript
│   │   ├── pages/               # Pages de l'application
│   │   │   ├── home/           # Page d'accueil + Hero
│   │   │   ├── auth/           # Login + Register
│   │   │   ├── search/         # Recherche + JobCard + SearchBar
│   │   │   ├── favorites/      # Favoris + FavoriteCard
│   │   │   ├── applications/   # Candidatures + ApplicationCard
│   │   │   └── profile/        # Profil + ProfileForm
│   │   ├── pipes/               # Pipes personnalisés (RelativeDate, Truncate)
│   │   ├── services/            # Services Angular
│   │   │   ├── auth.service.ts
│   │   │   ├── job.service.ts
│   │   │   ├── favorite.service.ts
│   │   │   └── application.service.ts
│   │   ├── store/               # NgRX Store
│   │   │   └── favorites/       # Actions, Reducer, Effects, Selectors
│   │   ├── app.config.ts        # Configuration de l'application
│   │   └── app.routes.ts        # Routage avec Lazy Loading
│   ├── styles.scss              # Styles globaux
│   └── index.html
├── db.json                      # Base de données JSON Server
├── proxy.conf.json              # Configuration du proxy pour l'API
├── package.json
└── README.md
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v18 ou supérieur)
- npm (v9 ou supérieur)

### Installation

```bash
# Cloner le repository
git clone <votre-repo-url>
cd job-finder

# Installer les dépendances
npm install
```

### Démarrage de l'application

#### Option 1 : Démarrage complet (recommandé)
```bash
npm run start:all
```
Cette commande démarre à la fois :
- JSON Server sur http://localhost:3000
- Angular sur http://localhost:4200

#### Option 2 : Démarrage séparé

**Terminal 1 - JSON Server :**
```bash
npm run start:api
```

**Terminal 2 - Angular :**
```bash
npm start
```

### Accès à l'application
- **Frontend** : http://localhost:4200
- **API JSON Server** : http://localhost:3000
- **Redux DevTools** : Utiliser l'extension Chrome/Firefox

### Compte de test
```
Email: demo@test.com
Mot de passe: Demo1234
```

## 🏗️ Architecture Technique

### Gestion d'État avec NgRX

L'application utilise **NgRX** pour gérer l'état des favoris :

#### Actions
- `loadFavorites` : Charger les favoris d'un utilisateur
- `addFavorite` : Ajouter un favori
- `removeFavorite` : Supprimer un favori

#### Reducer
Gère l'état avec les propriétés :
- `favorites: FavoriteOffer[]`
- `loading: boolean`
- `error: string | null`

#### Effects
Gère les effets secondaires (appels HTTP) :
- `loadFavorites$` : Charge les favoris depuis JSON Server
- `addFavorite$` : Ajoute un favori via l'API
- `removeFavorite$` : Supprime un favori via l'API

#### Selectors
- `selectAllFavorites` : Sélectionne tous les favoris
- `selectFavoritesLoading` : Sélectionne l'état de chargement

### Routing & Lazy Loading

```typescript
const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { 
    path: 'favorites', 
    loadComponent: () => import('./pages/favorites/favorites.component')
                          .then(m => m.FavoritesComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'applications', 
    loadComponent: () => import('./pages/applications/applications.component')
                          .then(m => m.ApplicationsComponent),
    canActivate: [authGuard] 
  }
];
```

### Authentification

L'authentification est gérée côté frontend avec localStorage :

1. **Inscription** : Création d'un compte dans JSON Server
2. **Connexion** : Vérification email/password contre JSON Server
3. **Token** : L'objet utilisateur (sans mot de passe) est stocké dans localStorage
4. **Protection** : AuthGuard vérifie la présence du token pour accéder aux routes protégées

**Pourquoi localStorage ?**
- ✅ Session persistante même après fermeture du navigateur
- ✅ Meilleure expérience utilisateur
- ✅ Pas besoin de se reconnecter à chaque visite

### Intercepteurs HTTP

**errorInterceptor** : Gère les erreurs HTTP de manière centralisée :
- Erreurs réseau (status 0)
- Erreurs 400, 401, 404, 500
- Messages d'erreur personnalisés

### Reactive Forms

Tous les formulaires utilisent **Reactive Forms** :
- Validation côté client
- Messages d'erreur personnalisés
- Gestion de l'état de soumission
- Validators personnalisés (ex: passwordMatchValidator)

### Composition de Composants

Chaque page contient minimum 2 composants (parent/child) :

**Exemples :**
- `SearchComponent` → `SearchBarComponent` + `JobCardComponent`
- `FavoritesComponent` → `FavoriteCardComponent`
- `ApplicationsComponent` → `ApplicationCardComponent`
- `ProfileComponent` → `ProfileFormComponent`
- `HomeComponent` → `HomeHeroComponent`

### Pipes Personnalisés

- **RelativeDatePipe** : Affiche les dates de manière relative ("Il y a 2 jours")
- **TruncatePipe** : Tronque le texte avec des points de suspension

## 🔍 API Externe Utilisée

### Arbeitnow Job Board API

**Base URL** : `https://www.arbeitnow.com/api/job-board-api`

**Endpoint utilisé** :
```
GET /api/job-board-api?page={page}
```

**Mapping des données** :
```typescript
{
  id: job.slug,
  title: job.title,
  company: job.company_name,
  location: job.location,
  description: stripHtml(job.description),
  url: job.url,
  datePublished: new Date(job.created_at * 1000).toISOString(),
  tags: job.tags,
  remote: job.remote,
  apiSource: 'arbeitnow'
}
```

## 💾 Base de Données (db.json)

```json
{
  "users": [
    {
      "id": 1,
      "firstName": "Demo",
      "lastName": "User",
      "email": "demo@test.com",
      "password": "Demo1234"
    }
  ],
  "favoritesOffers": [
    {
      "id": 1,
      "userId": 1,
      "offerId": "job-slug",
      "title": "Développeur Angular",
      "company": "Entreprise A",
      "location": "Casablanca",
      "url": "https://...",
      "apiSource": "arbeitnow",
      "dateAdded": "2026-02-10T10:30:00Z"
    }
  ],
  "applications": [
    {
      "id": 1,
      "userId": 1,
      "offerId": "job-slug",
      "apiSource": "arbeitnow",
      "title": "Développeur Angular",
      "company": "Entreprise A",
      "location": "Casablanca",
      "url": "https://...",
      "status": "en_attente",
      "notes": "Candidature envoyée le 10/02/2025",
      "dateAdded": "2026-02-10T10:30:00Z"
    }
  ]
}
```

## ✅ Checklist des Exigences

### Fonctionnalités
- ✅ Inscription/Connexion avec validation
- ✅ Recherche d'emplois (mots-clés + localisation)
- ✅ Filtrage par titre uniquement (pas par description)
- ✅ Tri par date (plus récent en premier)
- ✅ Pagination (10 résultats par page)
- ✅ Gestion des favoris avec NgRX
- ✅ Prévention des doublons dans les favoris
- ✅ Suivi des candidatures avec statuts
- ✅ Notes personnelles sur les candidatures
- ✅ Gestion du profil utilisateur
- ✅ Suppression du compte

### Concepts Techniques
- ✅ Angular 18 (Standalone Components)
- ✅ NgRX (Store + Effects + Selectors)
- ✅ RxJS/Observables
- ✅ Injection de dépendance
- ✅ Reactive Forms
- ✅ Bootstrap 5
- ✅ AuthGuard
- ✅ Databinding (One-way & Two-way)
- ✅ Services
- ✅ Pipes personnalisés
- ✅ Parent/Child Components
- ✅ Routing
- ✅ Lazy Loading (favorites, applications)
- ✅ Composition de composants
- ✅ localStorage pour l'authentification
- ✅ JSON Server pour la persistance
- ✅ Validation métier avec messages d'erreur
- ✅ Responsive Design
- ✅ HTTP Client
- ✅ Gestion des erreurs HTTP
- ✅ Intercepteur HTTP

## 📱 Responsive Design

L'application est entièrement responsive grâce à Bootstrap 5 :
- Grille responsive (col-md-6, col-lg-4)
- Navigation mobile avec toggle
- Cards adaptatives
- Formulaires optimisés pour mobile

## 🔒 Sécurité

- Mots de passe non stockés dans localStorage (uniquement côté JSON Server)
- Validation des entrées utilisateur
- Protection des routes avec AuthGuard
- Gestion des erreurs HTTP centralisée
- Prévention des doublons

## 🧪 Tests

```bash
# Lancer les tests unitaires
npm test
```

## 📝 Scripts Disponibles

```bash
npm start              # Démarre Angular avec proxy
npm run start:api      # Démarre JSON Server seul
npm run start:all      # Démarre JSON Server + Angular
npm run build          # Build de production
npm test               # Tests unitaires
```

## 🎯 Objectifs Pédagogiques Atteints

### Compétences Techniques
- ✅ C1N2 : Environnement configuré (Angular CLI, Node.js, JSON Server)
- ✅ C2N2 : Interfaces utilisateur développées (8 pages + composants)
- ✅ C3N2 : Composants métier développés (Services, NgRX, Guards)
- ✅ C5N2 : Besoins analysés et application structurée
- ✅ C6N2 : Architecture logicielle définie (Services, Store, Guards, Interceptors)

### Compétences Transversales
- ✅ C6N2 : Présentation structurée du travail
- ✅ C8N2 : Code documenté et maintenable

## 🎨 Captures d'Écran

### Page d'Accueil
- Hero section avec présentation
- Cartes de fonctionnalités
- Boutons d'action (Rechercher, S'inscrire)

### Page de Recherche
- Barre de recherche (mots-clés + localisation)
- Cartes d'offres avec détails
- Pagination
- Boutons Favoris & Suivre candidature (authentifiés uniquement)

### Page Favoris
- Liste des offres favorites
- Bouton de suppression
- État de chargement depuis NgRX

### Page Candidatures
- Filtrage par statut (Toutes, En attente, Accepté, Refusé)
- Cartes avec statut et notes
- Modification de statut
- Ajout/modification de notes

### Page Profil
- Formulaire d'édition des informations
- Bouton de suppression du compte (zone dangereuse)

## 🐛 Débogage avec Redux DevTools

1. Installer l'extension **Redux DevTools** dans votre navigateur
2. Ouvrir l'application
3. Ouvrir les DevTools (F12)
4. Onglet "Redux"
5. Observer les actions NgRX en temps réel :
   - `[Favorites] Load Favorites`
   - `[Favorites] Add Favorite Success`
   - `[Favorites] Remove Favorite Success`

## 📚 Documentation Complémentaire

- [Angular Documentation](https://angular.io/docs)
- [NgRX Documentation](https://ngrx.io/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3)
- [Arbeitnow API Documentation](https://www.arbeitnow.com/api/job-board-api)
- [JSON Server Documentation](https://github.com/typicode/json-server)

## 👨‍💻 Auteur

Développé dans le cadre du projet **Croisée 2** - YouCode 2025/2026

## 📄 Licence

Ce projet est développé à des fins éducatives.

---

**Note** : N'oubliez pas de démarrer JSON Server avant d'utiliser l'application !

```bash
npm run start:all
```

Bonne soutenance ! 🎉
