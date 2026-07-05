# Site web — Garage Yanexpro

Site web du [Garage Yanexpro](https://yanexpro.com), mécanique auto à Varennes, QC.
Construit avec [Astro](https://astro.build) : pages statiques ultra-rapides, excellent
référencement (SEO), et prêt à accueillir des fonctionnalités interactives
(prise de rendez-vous, robot conversationnel) plus tard.

## Commandes

| Commande          | Action                                            |
| :---------------- | :------------------------------------------------ |
| `npm install`     | Installer les dépendances                         |
| `npm run dev`     | Serveur de développement sur `localhost:4321`     |
| `npm run build`   | Générer le site de production dans `./dist/`      |
| `npm run preview` | Prévisualiser le site généré                      |

## Modifier le contenu

- **Coordonnées, heures, bandeau « saison des pneus », avis** :
  [`src/config/site.ts`](src/config/site.ts) — un seul fichier met à jour tout le site.
  - Hors saison des pneus : mettre `showTireBanner: false`.
  - Vrais avis Google : remplacer le contenu de `reviews` puis mettre
    `reviewsArePlaceholders: false` (retire la note « exemples »).
- **Liste des services** : [`src/data/services.ts`](src/data/services.ts).
- **Textes des pages** : `src/pages/*.astro` (accueil = `index.astro`).

## Ajouter les vraies photos

Les blocs hachurés (`PhotoPlaceholder`) marquent l'emplacement des photos à venir :

1. Déposer les photos dans `src/assets/` (créez le dossier).
2. Remplacer chaque `<PhotoPlaceholder … />` par le composant
   [`<Image>`](https://docs.astro.build/en/guides/images/) d'Astro, qui optimise
   automatiquement le poids des images.

Photos prévues par la maquette : atelier / véhicule sur pont (accueil), façade du
garage (accueil), Yannick McGinnis et son équipe (notre garage), intérieur de
l'atelier (notre garage).

## Référencement (SEO / IA)

Déjà en place :

- Balises meta uniques par page + Open Graph, URL canoniques
- Données structurées [schema.org `AutoRepair`](https://schema.org/AutoRepair)
  (adresse, téléphone, heures) sur chaque page — alimente la fiche Google
- `sitemap-index.xml` généré automatiquement, `robots.txt`
- `llms.txt` — résumé de l'entreprise destiné aux assistants IA
- HTML sémantique, polices auto-hébergées, zéro JavaScript superflu

À faire après la mise en ligne : soumettre le site à la
[Google Search Console](https://search.google.com/search-console) et relier la
fiche [Google Business Profile](https://business.google.com).

## Évolutions prévues

- **Prise de rendez-vous** : ajouter une page `rendez-vous.astro` avec un
  formulaire (ou un widget de réservation) — Astro accepte les îlots React et
  les points d'API si besoin d'un backend.
- **Robot conversationnel** : s'intègre comme îlot interactif dans
  `BaseLayout.astro` sans toucher au reste du site.
