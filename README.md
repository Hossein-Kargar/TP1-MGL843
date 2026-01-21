# TP1-MGL843

# Application CLI de gestion de notes (Node.js + TypeScript)

## Description

Projet académique en TypeScript (Node.js) réalisé avec une approche de programmation intuitive assistée par IA (vibe coding). L’ensemble du code et des tests Jest a été généré par IA, sans conception préalable ni refactorisation manuelle. Application simple de gestion de notes avec persistance locale.

Cette application est une CLI (interface en ligne de commande) pour la gestion de notes. Les notes peuvent être créées, listées, recherchées, sauvegardées et exportées au format JSON.

## Fonctionnalités

- Créer une note (titre, contenu, tags)
- Lister les notes
- Rechercher des notes par mot-clé ou tag
- Sauvegarder les notes dans un fichier local
- Exporter les notes dans un fichier JSON

## Prérequis

- Node.js >= 18
- npm

## Installation

```
npm install
```

## Compilation

```
npm run build
```

## Utilisation

### En mode compilé :

```
npm start -- <commande> [arguments]
```

### En mode développement (TypeScript direct) :

```
npm run dev -- <commande> [arguments]
```

### Commandes disponibles

- Créer une note :
  - `npm start -- create "Titre" "Contenu" "tag1,tag2"`
- Lister les notes :
  - `npm start -- list`
- Rechercher une note :
  - `npm start -- search "mot-clé"`
- Exporter les notes :
  - `npm start -- export notes_export.json`
- Afficher l'aide :
  - `npm start -- help`

## Tests

Pour exécuter les tests (Jest) :

```
npm test
```

Les tests couvrent la création, la recherche, l’exportation et la liste des notes. Un rapport de couverture est généré dans le dossier `coverage`.


Les notes sont stockées dans le fichier `notes.json` à la racine du projet.
