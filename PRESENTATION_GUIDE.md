# 🎤 Guide de Présentation - Soutenance JobFinder

## ⏱️ Timeline (45 minutes)

### 1️⃣ Présentation + Démonstration (5 minutes)

**Script de Présentation (2 min)**

"Bonjour, je vais vous présenter **JobFinder**, une application de recherche d'emploi développée avec **Angular 18**.

**Contexte :** JobFinder permet aux chercheurs d'emploi de consulter des offres d'emploi provenant d'APIs publiques internationales, de sauvegarder leurs favoris et de suivre leurs candidatures.

**Technologies principales :**
- Frontend : Angular 18 (Standalone Components)
- Gestion d'état : NgRX Store avec Effects
- UI : Bootstrap 5
- Backend simulé : JSON Server
- API externe : Arbeitnow Job Board API

**Fonctionnalités :**
1. Authentification sécurisée avec localStorage
2. Recherche d'emplois avec filtres (mots-clés + localisation)
3. Gestion des favoris avec NgRX Store
4. Suivi des candidatures avec statuts
5. Gestion du profil utilisateur"

**Démonstration Live (3 min)**

*Ouvrir http://localhost:4200*

1. **Page d'accueil** (15 sec)
   - "Voici la page d'accueil avec les fonctionnalités principales"
   - Montrer la navbar responsive

2. **Recherche d'emplois** (45 sec)
   - Cliquer sur "Commencer la recherche"
   - Entrer "Developer" dans les mots-clés
   - Entrer "Berlin" dans la localisation
   - Cliquer sur "Rechercher"
   - "Vous voyez les résultats triés par date, avec pagination"
   - "Les boutons Favoris et Suivre sont visibles car je suis authentifié"

3. **Favoris avec NgRX** (60 sec)
   - Ajouter une offre aux favoris
   - **IMPORTANT : Ouvrir Redux DevTools**
   - "Regardez dans Redux DevTools l'action [Favorites] Add Favorite Success"
   - Montrer l'état dans l'onglet State
   - Aller dans "Favoris"
   - "Voici mes offres favorites chargées depuis le store NgRX"
   - Supprimer une offre

4. **Candidatures** (30 sec)
   - Retour à la recherche
   - Cliquer sur "Suivre cette candidature"
   - Aller dans "Candidatures"
   - Montrer le filtrage par statut
   - Changer le statut d'une candidature
   - Ajouter une note

5. **Profil** (30 sec)
   - Aller dans "Mon Profil"
   - Montrer le formulaire de modification
   - Montrer la zone de suppression du compte

### 2️⃣ Explication du Code (5 minutes)

**Organisation du Projet**

*Ouvrir VS Code*

"Le projet suit une architecture claire avec :
- **components/** : Composants partagés (Navbar, Footer)
- **pages/** : Pages de l'application avec composition de composants
- **services/** : Couche métier (Auth, Job, Favorite, Application)
- **store/** : NgRX store pour les favoris
- **guards/** : AuthGuard pour protéger les routes
- **interceptors/** : Gestion centralisée des erreurs HTTP
- **models/** : Interfaces TypeScript
- **pipes/** : Pipes personnalisés"

**NgRX Store (Favoris)**

*Ouvrir store/favorites/*

"Pour les favoris, j'ai implémenté NgRX avec :
- **Actions** : loadFavorites, addFavorite, removeFavorite
- **Reducer** : Gère l'état avec favorites[], loading, error
- **Effects** : Gère les appels HTTP asynchrones
- **Selectors** : selectAllFavorites, selectFavoritesLoading

Le cycle est : Component → Action → Effect → HTTP → Action Success → Reducer → Selector → Component"

**Services & HTTP**

*Ouvrir services/favorite.service.ts*

"Les services gèrent la communication avec JSON Server :
- GET avec paramètres de requête
- POST pour créer
- PUT pour mettre à jour
- DELETE pour supprimer
- Tous retournent des Observables RxJS"

**Routing & Lazy Loading**

*Ouvrir app.routes.ts*

"Le routing utilise :
- Routes protégées avec authGuard
- Lazy loading pour /favorites et /applications avec loadComponent
- Redirection pour les routes invalides"

**Reactive Forms**

*Ouvrir pages/auth/register/register.component.ts*

"Tous les formulaires utilisent Reactive Forms avec :
- FormBuilder pour construire les formulaires
- Validators natifs (required, email, minLength)
- Validators personnalisés (passwordMatchValidator)
- Gestion complète des erreurs avec messages personnalisés"

### 3️⃣ Évaluation des Savoirs (Q/A) - 20 minutes

**Questions Probables & Réponses**

#### Sur NgRX

**Q: Expliquez le flux d'une action NgRX dans votre application.**

R: "Prenons l'exemple d'ajout d'un favori :
1. Le composant dispatch l'action `addFavorite` avec le payload (l'offre)
2. Le Reducer reçoit l'action mais ne fait rien car c'est l'Effect qui gère
3. L'Effect intercepte `addFavorite`, fait l'appel HTTP POST vers JSON Server
4. Si succès, l'Effect dispatch `addFavoriteSuccess` avec la réponse
5. Le Reducer reçoit `addFavoriteSuccess` et ajoute le favori au tableau `favorites`
6. Le Selector `selectAllFavorites` retourne le nouveau tableau
7. Le composant reçoit la mise à jour via l'Observable et réaffiche la liste"

**Q: Pourquoi avez-vous utilisé NgRX uniquement pour les favoris ?**

R: "NgRX est pertinent pour les favoris car :
- État partagé entre plusieurs composants (search, favorites)
- Besoin de synchronisation en temps réel
- Historique des actions avec DevTools
Pour les candidatures, un service suffit car l'état est local à la page."

#### Sur l'Authentification

**Q: Comment fonctionne l'authentification dans votre application ?**

R: "C'est une authentification simulée côté frontend :
1. Inscription : POST vers JSON Server pour créer un user
2. Connexion : GET avec paramètres email/password
3. Si valide : stockage de l'objet user (SANS mot de passe) dans localStorage
4. AuthGuard vérifie la présence du user dans localStorage
5. Si absent : redirection vers /login
6. Déconnexion : suppression du localStorage"

**Q: Pourquoi localStorage et pas sessionStorage ?**

R: "J'ai choisi localStorage pour :
- Persistance même après fermeture du navigateur
- Meilleure UX : pas besoin de se reconnecter à chaque visite
- sessionStorage serait approprié pour une application très sensible (banque)
Ici, c'est un job board, la commodité prime."

#### Sur l'Architecture

**Q: Expliquez la structure de vos composants.**

R: "Chaque page utilise la composition de composants :
- **SearchComponent** contient SearchBarComponent et JobCardComponent
- Avantages : réutilisabilité, maintenabilité, tests unitaires plus faciles
- Communication parent/child avec @Input et @Output
- Exemple : JobCard émet un événement toggleFavorite que SearchComponent écoute"

**Q: Qu'est-ce qu'un Intercepteur HTTP et comment l'avez-vous utilisé ?**

R: "L'intercepteur HTTP intercepte toutes les requêtes et réponses HTTP.
J'ai créé `errorInterceptor` qui :
- Intercepte les erreurs HTTP avec catchError
- Transforme les codes d'erreur en messages utilisateur
- Ex: status 0 → 'Impossible de se connecter au serveur'
- status 401 → 'Non autorisé'
C'est configuré dans app.config.ts avec withInterceptors([errorInterceptor])"

#### Sur RxJS

**Q: Quels opérateurs RxJS avez-vous utilisés ?**

R: "Principalement :
- **map** : pour transformer les données (ex: mapper l'API Arbeitnow vers JobOffer)
- **mergeMap** : dans les Effects pour chaîner les Observables
- **catchError** : pour gérer les erreurs et retourner une action d'erreur
- **of** : pour créer un Observable à partir d'une valeur
Dans les composants, j'utilise l'async pipe pour souscrire automatiquement."

**Q: Quelle est la différence entre map et mergeMap ?**

R: "
- **map** : transforme la valeur émise (ex: data → modifiedData)
- **mergeMap** : transforme en un autre Observable et le flatten (ex: action → http.get() → result)
mergeMap est utilisé dans les Effects pour faire des appels HTTP asynchrones."

#### Sur les Formulaires

**Q: Expliquez la validation de votre formulaire d'inscription.**

R: "J'utilise Reactive Forms avec plusieurs niveaux de validation :
1. **Validators natifs** : required, email, minLength(6)
2. **Validator personnalisé** : passwordMatchValidator vérifie que password === confirmPassword
3. **Validation asynchrone** : checkEmailExists() vérifie en base si l'email existe déjà
4. **Affichage des erreurs** : avec submitted && f['field'].errors?.['type']
5. **Désactivation du bouton** : [disabled]='loading' pendant la soumission"

#### Sur le Lazy Loading

**Q: Comment fonctionne le Lazy Loading dans Angular ?**

R: "Le Lazy Loading charge les composants uniquement quand nécessaire.
Dans app.routes.ts, j'ai :
```typescript
{
  path: 'favorites',
  loadComponent: () => import('./pages/favorites/favorites.component')
                       .then(m => m.FavoritesComponent)
}
```
Au lieu de charger FavoritesComponent au démarrage, Angular le charge uniquement quand l'utilisateur navigue vers /favorites.
Avantages : bundle initial plus petit, chargement plus rapide."

#### Sur l'API

**Q: Comment gérez-vous les données de l'API externe ?**

R: "J'utilise l'API Arbeitnow :
1. **Appel HTTP GET** dans JobService
2. **Mapping** : je transforme les données API vers mon interface JobOffer
3. **Filtrage côté client** : je filtre par mots-clés dans le TITRE uniquement (pas la description) selon le brief
4. **Tri** : je trie par date décroissante
5. **Pagination** : côté client, 10 résultats par page
6. **Gestion d'erreur** : avec l'intercepteur et dans le service"

### 4️⃣ Mise en Situation - 15 minutes

**Scénarios Probables**

#### Scénario 1 : Ajouter un filtre de recherche

"Ajoutez un filtre 'Remote uniquement' dans la recherche"

**Solution :**

1. Ouvrir `search-bar.component.ts`
2. Ajouter un champ checkbox dans le formulaire :
```typescript
this.searchForm = this.fb.group({
  keyword: [''],
  location: [''],
  remoteOnly: [false]  // NOUVEAU
});
```

3. Ajouter le checkbox dans le template :
```html
<div class="col-md-2">
  <div class="form-check mt-4">
    <input type="checkbox" class="form-check-input" formControlName="remoteOnly">
    <label class="form-check-label">Remote uniquement</label>
  </div>
</div>
```

4. Modifier l'émission :
```typescript
onSearch(): void {
  this.search.emit(this.searchForm.value);  // inclut remoteOnly
}
```

5. Ouvrir `search.component.ts`, modifier `onSearch` :
```typescript
onSearch(criteria: { keyword: string; location: string; remoteOnly: boolean }): void {
  this.lastKeyword = criteria.keyword;
  this.lastLocation = criteria.location;
  this.remoteOnly = criteria.remoteOnly;  // NOUVEAU
  this.jobs = [];
  this.apiPage = 1;
  this.currentPage = 1;
  this.hasMoreApiPages = true;
  this.loadJobs();
}
```

6. Modifier `loadJobs` pour filtrer :
```typescript
loadJobs(): void {
  this.loading = true;
  this.searched = true;
  this.errorMsg = '';

  this.jobService.searchJobs(this.lastKeyword, this.lastLocation, this.apiPage).subscribe({
    next: (result) => {
      let jobs = result.jobs;
      
      // Filtrer par remote si nécessaire
      if (this.remoteOnly) {
        jobs = jobs.filter(j => j.remote === true);
      }
      
      this.jobs = [...this.jobs, ...jobs];
      this.hasMoreApiPages = result.hasMore;
      this.loading = false;
    },
    error: (err) => {
      this.loading = false;
      this.errorMsg = err.message || 'Erreur lors de la recherche';
    }
  });
}
```

#### Scénario 2 : Ajouter une action NgRX

"Ajoutez une action pour vider tous les favoris"

**Solution :**

1. Ouvrir `store/favorites/favorites.actions.ts`
2. Ajouter les actions :
```typescript
export const clearAllFavorites = createAction(
  '[Favorites] Clear All Favorites',
  props<{ userId: number }>()
);

export const clearAllFavoritesSuccess = createAction(
  '[Favorites] Clear All Favorites Success'
);

export const clearAllFavoritesFailure = createAction(
  '[Favorites] Clear All Favorites Failure',
  props<{ error: string }>()
);
```

3. Ouvrir `store/favorites/favorites.reducer.ts`
4. Ajouter le reducer :
```typescript
on(FavoritesActions.clearAllFavoritesSuccess, (state) => ({
  ...state,
  favorites: []
})),
```

5. Ouvrir `store/favorites/favorites.effects.ts`
6. Ajouter l'effect :
```typescript
clearAllFavorites$ = createEffect(() =>
  this.actions$.pipe(
    ofType(FavoritesActions.clearAllFavorites),
    mergeMap(action =>
      // Récupérer tous les favoris et les supprimer
      this.favoriteService.getFavorites(action.userId).pipe(
        mergeMap(favorites => {
          // Supprimer chaque favori
          const deletes = favorites.map(f => 
            this.favoriteService.removeFavorite(f.id!)
          );
          return forkJoin(deletes);
        }),
        map(() => FavoritesActions.clearAllFavoritesSuccess()),
        catchError(error => 
          of(FavoritesActions.clearAllFavoritesFailure({ error: error.message }))
        )
      )
    )
  )
);
```

7. Importer forkJoin :
```typescript
import { forkJoin } from 'rxjs';
```

8. Dans `favorites.component.ts`, ajouter un bouton :
```typescript
onClearAll(): void {
  if (confirm('Supprimer TOUS les favoris ?')) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.store.dispatch(FavoritesActions.clearAllFavorites({ userId }));
    }
  }
}
```

#### Scénario 3 : Ajouter une validation personnalisée

"Ajoutez une validation pour que l'email se termine par @gmail.com"

**Solution :**

1. Ouvrir `pages/auth/register/register.component.ts`
2. Créer le validator :
```typescript
gmailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (email && !email.endsWith('@gmail.com')) {
    return { notGmail: true };
  }
  return null;
}
```

3. Ajouter le validator au FormControl :
```typescript
this.registerForm = this.fb.group({
  lastName: ['', [Validators.required, Validators.minLength(2)]],
  firstName: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email, this.gmailValidator]],  // AJOUT
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', Validators.required]
}, { validators: this.passwordMatchValidator });
```

4. Ajouter le message d'erreur dans le template :
```html
<div class="form-error" *ngIf="submitted && f['email'].errors?.['notGmail']">
  L'email doit être un compte Gmail
</div>
```

## 📝 Notes Importantes

### Pendant la Soutenance

✅ **À FAIRE :**
- Parler clairement et avec confiance
- Montrer Redux DevTools en action
- Expliquer le "pourquoi" pas seulement le "comment"
- Faire des parallèles avec les concepts vus en cours
- Accepter de ne pas tout savoir ("Je ne suis pas sûr mais je pense que...")

❌ **À ÉVITER :**
- Utiliser l'auto-complétion IA pendant la mise en situation
- Lire le code sans expliquer
- Dire "je ne sais pas" sans essayer
- Paniquer si un bug apparaît
- Critiquer son propre code

### Gestion d'un Bug en Direct

Si un bug apparaît :
1. **Rester calme** : "Intéressant, je vais déboguer ça"
2. **Ouvrir la console** : F12 pour voir les erreurs
3. **Expliquer** : "Je vois une erreur de type X, cela vient probablement de Y"
4. **Proposer** : "Pour corriger, je ferais Z"
5. **Si bloqué** : "Je regarderais la documentation Angular/NgRX pour ce cas précis"

### Points de Fierté

Insistez sur :
- "J'ai implémenté NgRX **complètement** avec Store, Effects et Selectors"
- "J'utilise le Lazy Loading pour optimiser les performances"
- "Mon code est **typé** partout avec TypeScript"
- "J'ai une gestion d'erreur **centralisée** avec un intercepteur"
- "Tous mes composants sont **standalone** (Angular moderne)"
- "J'utilise des **Observables RxJS** partout, pas de Promises"

## 🎯 Objectif Final

**Montrer que vous maîtrisez :**
1. Angular 18 en profondeur
2. NgRX Store complet
3. Architecture logicielle claire
4. Bonnes pratiques (TypeScript, RxJS, Reactive Forms)
5. Capacité à expliquer ET à coder

## 🚀 Confiance !

Vous avez un projet **COMPLET** et **PROFESSIONNEL**.
Vous répondez à **TOUTES** les exigences du brief.
Vous êtes prêt ! 💪

Bonne soutenance ! 🎉
