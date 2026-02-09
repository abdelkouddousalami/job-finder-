# 🚀 Guide de Démarrage Rapide - JobFinder

## ⚡ Démarrage en 3 Commandes

```bash
# 1. Installer les dépendances (si pas déjà fait)
npm install

# 2. Démarrer JSON Server (Terminal 1)
npx json-server --watch db.json --port 3000

# 3. Démarrer Angular (Terminal 2)
npm start
```

## 🌐 Accès à l'Application

- **Application Web** : http://localhost:4200
- **API JSON Server** : http://localhost:3000
- **Redux DevTools** : Ouvrir DevTools (F12) → Onglet "Redux"

## 👤 Compte de Test

```
Email: demo@test.com
Mot de passe: Demo1234
```

## ✅ Vérification Rapide (2 min)

1. Ouvrir http://localhost:4200 → Page d'accueil visible ✓
2. Cliquer sur "Rechercher" → Page de recherche ✓
3. Entrer "Developer" → Cliquer "Rechercher" → Résultats affichés ✓
4. Se connecter avec compte de test ✓
5. Ajouter une offre aux favoris → Message de succès ✓
6. Ouvrir Redux DevTools → Voir l'action [Favorites] Add Favorite Success ✓

## 🐛 Problèmes Courants

### JSON Server ne démarre pas
```bash
# Utiliser npx au lieu de la commande directe
npx json-server --watch db.json --port 3000
```

### Port 4200 déjà utilisé
```bash
# Démarrer sur un autre port
ng serve --port 4300
```

### Erreur CORS
Le proxy est configuré dans `proxy.conf.json`, démarrer avec :
```bash
npm start
# (qui utilise --proxy-config proxy.conf.json)
```

## 📁 Fichiers Importants

| Fichier | Description |
|---------|-------------|
| [README.md](README.md) | Documentation complète du projet |
| [SUMMARY.md](SUMMARY.md) | Vue d'ensemble rapide |
| [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) | Checklist détaillée |
| [PRESENTATION_GUIDE.md](PRESENTATION_GUIDE.md) | Guide de soutenance |
| [db.json](db.json) | Base de données JSON Server |

## 🎯 Prochaines Étapes

1. ✅ Tester toutes les fonctionnalités
2. ✅ Lire [PRESENTATION_GUIDE.md](PRESENTATION_GUIDE.md)
3. ✅ Vérifier [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)
4. ✅ Préparer 3-5 slides
5. ✅ Installer Redux DevTools extension

## 💡 Commandes Utiles

```bash
# Démarrer tout en une commande (nécessite concurrently)
npm run start:all

# Build de production
npm run build

# Lancer les tests
npm test

# Vérifier le code
ng lint
```

## 🎓 Structure Rapide

```
job-finder/
├── src/app/
│   ├── components/     → Navbar, Footer
│   ├── pages/          → 7 pages (Home, Auth, Search, etc.)
│   ├── services/       → Auth, Job, Favorite, Application
│   ├── store/          → NgRX (Favoris)
│   ├── guards/         → AuthGuard
│   ├── interceptors/   → ErrorInterceptor
│   ├── models/         → Interfaces TypeScript
│   └── pipes/          → RelativeDate, Truncate
└── db.json             → JSON Server database
```

## 📊 État du Projet

✅ **100% Fonctionnel**
✅ **100% Conforme au Brief**
✅ **Prêt pour la Soutenance**

## 🚀 C'est Parti !

Vous avez tout ce qu'il faut pour réussir votre soutenance ! 💪

---

**Besoin d'aide ?**
- Lire le [README complet](README.md)
- Consulter la [checklist](VERIFICATION_CHECKLIST.md)
- Suivre le [guide de présentation](PRESENTATION_GUIDE.md)
