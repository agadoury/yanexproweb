# Site web — Garage Yanexpro

Site officiel du [Garage Yanexpro](https://yanexpro.com) — mécanique auto à
Varennes, QC. Construit avec [Astro 5](https://astro.build) : un site **100 %
statique** (rapide, sécuritaire, sans base de données), hébergé sur
[Vercel](https://vercel.com), entièrement en français.

**Conçu pour être trouvé** : le site a été bâti pour le référencement Google
(SEO) et pour être compris et recommandé par les assistants IA comme
ChatGPT et Claude (AEO). Voir [comment c'est fait](#référencement-seo-et-moteurs-de-réponse-aeo).

**Principe directeur : tout le contenu d'affaires vit dans deux fichiers de
configuration.** Coordonnées, heures, avis, services — une modification à un
seul endroit se propage partout (pages, pied de page, référencement, données
structurées).

---

## Sommaire

1. [Démarrage rapide](#démarrage-rapide)
2. [Structure du projet](#structure-du-projet)
3. [Référencement (SEO) et moteurs de réponse (AEO)](#référencement-seo-et-moteurs-de-réponse-aeo)
4. [Modifier le contenu](#modifier-le-contenu)
5. [Fonctionnalités](#fonctionnalités)
6. [Hébergement et déploiement](#hébergement-et-déploiement)
7. [Liste de vérification — lancement](#liste-de-vérification--lancement)
8. [Visibilité IA](#visibilité-ia--être-recommandé-par-chatgpt-claude-etc)
9. [Dépannage](#dépannage)
10. [Choix techniques](#choix-techniques)

---

## Démarrage rapide

Prérequis : [Node.js](https://nodejs.org) 20 ou plus récent.

```bash
npm install       # installer les dépendances (une seule fois)
npm run dev       # serveur de développement → http://localhost:4321
npm run build     # générer le site de production dans ./dist/
npm run preview   # prévisualiser le contenu de ./dist/
```

**Publier une modification** : commit + push sur la branche `main` — Vercel
reconstruit et déploie automatiquement (environ une minute). Un push sur
toute autre branche crée un déploiement de prévisualisation avec sa propre
URL, sans toucher au site en ligne.

> Note : les scripts d'analyse (Google Analytics, Vercel Analytics, bannière
> de consentement) ne sont chargés **qu'en production**. En développement
> local, ils sont absents — c'est voulu.

---

## Structure du projet

```
├── astro.config.mjs          Configuration Astro (domaine, sitemap, préchargement)
├── vercel.json               Configuration Vercel (URLs propres, en-têtes de sécurité, cache)
├── .github/workflows/ci.yml  Intégration continue (build + vérifications à chaque push)
├── scripts/smoke.mjs         Vérifications de fumée exécutées par la CI
├── scripts/audit-a11y.mjs    Audit d'accessibilité WCAG AA (axe) sur le site construit
├── scripts/logo-variants.py  Régénère favicons, variante claire et image de partage
├── public/                   Fichiers servis tels quels
│   ├── favicon.png           Icône d'onglet (emblème du logo)
│   ├── apple-touch-icon.png  Icône d'écran d'accueil iPhone
│   ├── robots.txt            Directives pour les robots d'indexation
│   ├── llms.txt              Fiche d'entreprise pour les assistants IA
│   └── images/
│       ├── logo-yanexpro.png           Logo officiel (en-tête)
│       ├── logo-yanexpro-clair.png     Variante claire (pied de page sombre)
│       ├── bumper-to-bumper.png        Logo Bumper to Bumper (accueil)
│       ├── atelier-vehicule-sur-pont.webp  Photo du héros (accueil)
│       └── og-image.png                Carte de partage social (1200 × 630)
└── src/
    ├── config/
    │   └── site.ts           ⭐ CONFIGURATION CENTRALE (coordonnées, heures, avis…)
    ├── data/
    │   └── services.ts       ⭐ CONTENU DES SERVICES (cartes + 9 pages détaillées + FAQ)
    ├── content.config.ts     Déclaration de la collection d'articles
    ├── content/
    │   └── conseils/         ⭐ ARTICLES de la section Conseils (un fichier .md chacun)
    ├── styles/
    │   └── global.css        Jetons de design, utilitaires, micro-interactions
    ├── layouts/
    │   └── BaseLayout.astro  Gabarit commun : <head>, SEO, en-tête, pied de page
    ├── components/
    │   ├── Header.astro          En-tête collant + menu mobile + bouton Rendez-vous
    │   ├── Footer.astro          Pied de page (navigation, heures, coordonnées)
    │   ├── Logo.astro            Logo (variante claire via la prop `dark`)
    │   ├── TireBanner.astro      Bandeau « saison des pneus » (saisonnier automatique)
    │   ├── MobileCallBar.astro   Boutons flottants mobiles (appel + rendez-vous)
    │   ├── CtaBanner.astro       Bandeau rouge d'appel à l'action
    │   ├── FaqList.astro         Questions-réponses dépliables
    │   ├── PhotoPlaceholder.astro  Bloc hachuré en attente d'une vraie photo
    │   └── ConsentAnalytics.astro  Bannière de consentement + Google Analytics
    └── pages/                Une page = une URL
        ├── index.astro           /            Accueil
        ├── garage.astro          /garage      Notre garage
        ├── services.astro        /services    Liste des services + FAQ générale
        ├── services/[slug].astro /services/…  Les 9 pages de services (générées)
        ├── conseils/index.astro  /conseils    Liste des articles (lien au pied de page)
        ├── conseils/[slug].astro /conseils/…  Pages d'articles (générées des .md)
        ├── rendez-vous.astro     /rendez-vous Formulaire de demande de rendez-vous
        ├── merci.astro           /merci       Confirmation d'envoi (non indexée)
        ├── contact.astro         /contact     Coordonnées, heures, carte
        └── 404.astro             Page introuvable
```

---

## Référencement (SEO) et moteurs de réponse (AEO)

Le site a été conçu dès le départ pour deux objectifs :

- **SEO** (*search engine optimization*) : bien se classer dans Google et
  Bing, surtout dans les recherches locales (« garage Varennes », « pose de
  pneus Sainte-Julie »).
- **AEO** (*answer engine optimization*) : être compris, cité et recommandé
  par les moteurs de réponse IA (ChatGPT, Claude, Perplexity, Gemini, les
  aperçus IA de Google) quand quelqu'un pose une question au lieu de taper
  des mots-clés.

Les deux reposent sur le même socle : un site rapide, lisible par les
machines, et un contenu qui répond clairement aux vraies questions des
clients. Voici comment chaque volet a été réalisé.

### 1. Fondations techniques

- **HTML complet, généré à l'avance** : chaque page est du HTML statique
  qui contient tout son texte. Les robots (Google comme IA) lisent le
  contenu sans exécuter de JavaScript.
- **Vitesse** (les Core Web Vitals sont un facteur de classement) : quasi
  aucun JavaScript, polices auto-hébergées, dimensions explicites sur les
  images (aucun décalage de mise en page), photo du héros chargée en
  priorité, images et carte plus bas dans la page chargées en différé,
  pages préchargées au survol des liens. Mesurée en continu par Vercel
  Speed Insights.
- **Mobile d'abord** : mise en page adaptée à tous les écrans (Google
  indexe la version mobile des sites).
- **Indexation maîtrisée** : sitemap régénéré à chaque build et annoncé
  dans `robots.txt`, URL canonique sur chaque page, URLs propres (sans
  `.html` ni barre oblique finale), `/merci` non indexée et exclue du
  sitemap, adresses `*.vercel.app` en « noindex » pour éviter le contenu
  dupliqué (en-tête conditionnel dans `vercel.json`).
- **Continuité avec l'ancien site** : `/garage`, `/services` et `/contact`
  gardent leur adresse; l'autorité de recherche accumulée se transfère sans
  redirection.
- **HTML sémantique et accessible** : un seul titre H1 par page, hiérarchie
  de titres cohérente, repères de navigation, fil d'Ariane, langue `fr-CA`
  déclarée, textes alternatifs en français, noms de fichiers d'images
  descriptifs. Zéro violation WCAG 2.1 AA.
- **HTTPS forcé** (HSTS) et en-têtes de sécurité; vérification Google
  Search Console intégrée (balise meta).

### 2. Référencement local

- **Fiche d'identité structurée** : données schema.org `AutoRepair` sur les
  20 pages (nom, adresse, téléphone, heures, logo, zones desservies,
  services offerts, appartenance au réseau UniPro, propriétaire). C'est ce
  que Google et les IA lisent pour relier le site au commerce physique.
- **Coordonnées identiques partout** : nom, adresse et téléphone viennent
  tous de `src/config/site.ts`; le site ne peut pas afficher deux versions
  contradictoires.
- **Zones desservies** : section sur l'accueil et mention sur la page
  Contact (Varennes, Boucherville, Sainte-Julie, Saint-Amable, Verchères,
  Contrecœur, Longueuil), pour les recherches « garage près de [ville] ».
- **Localisation visible** : adresse dans le héros avec lien vers Google
  Maps, carte intégrée à la page Contact.
- **Avis Google affichés** (4,9 sur 5, 77 avis), volontairement **sans**
  balisage `AggregateRating` : Google n'accepte pas qu'une entreprise
  balise ses propres avis, et un balisage non conforme peut entraîner une
  pénalité manuelle.

### 3. Contenu pensé pour la recherche

- **Une page par service** (9 pages), chacune ciblant « [service] +
  Varennes », avec titre et description uniques, et des symptômes formulés
  comme les clients les décrivent (« grincement au freinage », « témoin
  moteur allumé »).
- **Maillage interne** : l'accueil mène aux 9 services, les articles
  renvoient aux pages de services, le fil d'Ariane relie les pages
  profondes, et chaque page offre un chemin vers `/rendez-vous`.
- **Section Conseils** : articles saisonniers pour les recherches
  informatives de longue traîne (« quand poser ses pneus d'hiver »), liée
  au pied de page seulement.
- **Langage simple** : le jargon a été remplacé par des mots courants
  (« couple instantané », « habitacle »), plus proches de ce que les
  clients tapent ou disent à un assistant vocal.
- **Partage social** : balises Open Graph et image de partage dédiée.

### 4. Optimisation pour les moteurs de réponse IA (AEO)

Un assistant IA ne classe pas des pages : il extrait des réponses et cite
des sources fiables. Le site est construit pour être facile à extraire et
à citer :

- **Format question-réponse** : FAQ sur la page Services et sur chaque page
  de service (10 pages balisées `FAQPage`), avec des réponses qui commencent
  par la réponse elle-même (« Oui. », « Au moins une fois par année… »).
- **Titres en forme de questions** dans les articles (« Quand faire poser
  ses pneus? », « Et sans symptôme : à quelle fréquence? »), pour qu'un
  passage puisse être cité seul.
- **Graphe d'entités** : chaque page de service (`Service`), chaque article
  (`BlogPosting`) et chaque fil d'Ariane (`BreadcrumbList`) pointe vers la
  même entité `#garage`. Les machines comprennent que tout ce contenu
  appartient au même garage.
- **`llms.txt`** : résumé en texte simple destiné aux IA (coordonnées,
  heures, services avec leurs URL, zones desservies, note Google, faits
  utiles).
- **Robots IA bienvenus** : `robots.txt` autorise tous les robots (GPTBot,
  ClaudeBot, PerplexityBot, etc.), et comme le contenu est dans le HTML,
  même les robots qui n'exécutent pas JavaScript le lisent en entier.
- **Faits précis et vérifiables** plutôt que slogans (ex. : pneus d'hiver
  obligatoires du 1er décembre au 15 mars). Les IA privilégient les sources
  qui donnent des faits citables.

### Ce qui se joue hors du site

Le site fournit la base, mais une bonne part du classement local et des
recommandations IA dépend de signaux externes : fiche Google Business
Profile, Bing Places (la recherche de ChatGPT s'appuie en partie sur Bing),
Apple Business Connect, cohérence des annuaires et avis clients. Voir
[Visibilité IA](#visibilité-ia--être-recommandé-par-chatgpt-claude-etc) et
la [liste de vérification du lancement](#liste-de-vérification--lancement).

### Règles pour préserver le référencement

Lors de toute modification :

- Ne jamais renommer un slug d'URL existant (pages de services, articles,
  `/garage`, `/services`, `/contact`).
- Garder un titre et une meta description uniques par page.
- Modifier coordonnées, heures et zones uniquement dans
  `src/config/site.ts`.
- Garder le format question-réponse des FAQ (la réponse directe d'abord).
- Ne pas cacher de contenu important derrière du JavaScript (onglets
  chargés dynamiquement, etc.).
- Ne pas bloquer de robots dans `robots.txt`.
- Ne pas ajouter de balisage `AggregateRating` avec les avis Google.
- Pour toute nouvelle image : `width`/`height`, texte alternatif descriptif
  en français, nom de fichier descriptif.

### Qualité vérifiée

- **Accessibilité** : zéro violation WCAG 2.1 AA sur tous les types de
  pages. Pour re-vérifier après un changement visuel :
  `node scripts/audit-a11y.mjs` (après `npm run build`).
- **Intégration continue** : chaque push reconstruit le site et exécute
  `scripts/smoke.mjs` (pages présentes, données structurées, sitemap
  correct). Un échec apparaît en rouge dans l'onglet Actions de GitHub :
  vérifier avant de considérer un changement publié.
- **Manifeste web** : icônes et couleur de thème pour l'ajout à l'écran
  d'accueil d'un téléphone (`public/manifest.webmanifest`).

---

## Modifier le contenu

### ⭐ Le fichier central : `src/config/site.ts`

| Clé | Effet |
| :-- | :-- |
| `phone` | Numéro de téléphone — partout (en-tête, pieds de page, boutons, schéma Google) |
| `email` | Courriel **public** affiché sur le site |
| `bookingEmail` | Adresse qui **reçoit les demandes de rendez-vous** (voir [Formulaire](#formulaire-de-rendez-vous)) |
| `address` | Adresse postale — pages, pied de page, données structurées |
| `hours` | Heures affichées (contact + pied de page) |
| `openingHoursSpecification` | Heures au format Google (à garder synchronisées avec `hours`) |
| `areasServed` | Municipalités des « zones desservies » (accueil, contact, schéma) |
| `tireBannerMode` | Bandeau pneus : `'auto'`, `'toujours'` ou `'jamais'` |
| `tireSeasons` | Périodes d'affichage automatique du bandeau (format `MM-JJ`) |
| `showReviews` | Affiche ou masque la section Avis Google de l'accueil |
| `googleRating` | Note globale et nombre d'avis (badge « 4,9 sur 5 · 77 avis ») |
| `googleReviewsUrl` | Lien de la fiche Google Maps — s'il est rempli, le bouton « Voir tous nos avis » apparaît |
| `reviews` | Les avis cités sur l'accueil (nom + texte) |
| `gaMeasurementId` | Identifiant Google Analytics 4 |
| `googleSiteVerification` | Jeton Google Search Console |

**Recettes courantes :**

- **Changer les heures** : modifier `hours` (affichage) **et**
  `openingHoursSpecification` (Google).
- **Mettre à jour les avis** : remplacer les entrées de `reviews`, ajuster
  `googleRating` (note et nombre).
- **Forcer le bandeau pneus hors saison** : `tireBannerMode: 'toujours'`
  (revenir à `'auto'` ensuite).

### ⭐ Les services : `src/data/services.ts`

Chaque service alimente à la fois sa carte sur `/services`, sa page détaillée
`/services/<slug>` et le sitemap. Champs d'un service :

| Champ | Rôle |
| :-- | :-- |
| `num` | Numéro affiché (« 01 » à « 09 ») |
| `slug` | Segment d'URL (`freins` → `/services/freins`) — **ne pas changer après le lancement** (cela casserait l'URL) |
| `title` / `desc` | Titre et description courte (cartes) |
| `metaTitle` / `metaDescription` | Balises pour Google (résultats de recherche) |
| `lead` | Paragraphe d'introduction du héros de la page |
| `signs` | Liste « Signes à surveiller » (`signsTitle` permet de renommer la liste) |
| `includes` | Liste « Ce que nous faisons » |
| `faq` | 2 questions-réponses (balisées pour Google) |

**Ajouter un service** : copier un bloc existant, choisir un `slug` unique,
remplir les champs — la page, la carte et l'entrée de sitemap se créent
automatiquement au prochain déploiement. `HOME_SERVICES` (même fichier)
contrôle la liste de l'accueil (libellés courts, actuellement les 9
services; ajouter le nouveau service à cette liste aussi), et `GENERAL_FAQ`
la FAQ générale de la page Services.

### Les textes des pages

Directement dans `src/pages/*.astro` — le HTML est lisible et les textes
faciles à repérer. L'accueil est `index.astro`.

### La section « Conseils » (articles)

Volontairement discrète : accessible par le **pied de page seulement** (pas
dans le menu principal) — elle existe pour le référencement de longue
traîne, pas pour la navigation courante. Google la découvre par le lien du
pied de page et le sitemap.

**Ajouter un article** : créer un fichier `.md` dans
`src/content/conseils/` (le nom du fichier devient l'URL) avec cet en-tête :

```markdown
---
title: "Titre de l'article"
description: "Résumé d'une ou deux phrases (affiché dans Google)."
pubDate: 2026-10-01
---

Le contenu en Markdown : ## pour les sous-titres, [texte](/services/pneus)
pour les liens internes, **gras**, listes…
```

La carte sur `/conseils`, la page de l'article, le balisage `BlogPosting`
et l'entrée de sitemap se créent automatiquement. Conseil : liez chaque
article vers 2-3 pages de services et terminez par un appel à l'action vers
`/rendez-vous`.

**Règle de style** (tout le texte visible du site) : pas de tiret long (—);
préférer la virgule, le deux-points ou les parenthèses. Voir CLAUDE.md pour
l'ensemble des conventions éditoriales.

### Images et logo

| Fichier (`public/images/`) | Utilisation | Pour le remplacer |
| :-- | :-- | :-- |
| `logo-yanexpro.png` | En-tête | Remplacer le fichier (même nom) |
| `logo-yanexpro-clair.png` | Pied de page sombre | Version aux textes clairs — à régénérer si le logo change |
| `atelier-vehicule-sur-pont.webp` | Photo du héros | Remplacer (idéalement ≥ 1000 px de large, format paysage) |
| `bumper-to-bumper.png` | Bloc garage (accueil) | — |
| `og-image.png` | Aperçu des liens partagés (Messenger, Facebook…) | Image 1200 × 630 |

**Photos encore en attente** : la page `/garage` contient deux blocs hachurés
(`PhotoPlaceholder`) — « Yannick McGinnis et son équipe » et « intérieur de
l'atelier ». Pour poser une vraie photo, remplacer le composant par une
balise `<img>` (voir la photo du héros dans `index.astro` comme modèle :
attributs `width`/`height` + `alt` descriptif en français).

---

## Fonctionnalités

### Formulaire de rendez-vous

**Parcours** : le client remplit `/rendez-vous` → la demande part en
arrière-plan via [formsubmit.co](https://formsubmit.co) (service gratuit,
aucun compte) → le client arrive sur `/merci` → **vous recevez un courriel**
à l'adresse `bookingEmail`.

- **Sujet unique par demande** : « Rendez-vous : Changement de pneus — Nom »
  — les courriels ne se regroupent pas dans Gmail et se trient d'un coup d'œil.
- **Répondre écrit au client** : si le client a laissé son courriel, il
  devient l'adresse de réponse (bouton « Répondre » de Gmail).
- **Anti-pourriel** : champ piège invisible (honeypot).
- **Sans JavaScript** : le formulaire se soumet quand même (pages FormSubmit
  en anglais dans ce cas — rarissime).

⚠️ **Activation (une fois par adresse)** : la toute première demande envoyée
vers une nouvelle adresse `bookingEmail` déclenche un courriel « Activate »
de FormSubmit (vérifier les indésirables). Cliquer le lien une fois; tout
coule ensuite. La demande ayant déclenché l'activation n'est **pas** livrée —
faire un second test.

Les catégories du menu « Service souhaité » sont dans `SERVICE_OPTIONS` en
tête de `src/pages/rendez-vous.astro`.

**Consentement aux rappels** : le formulaire comprend une case à cocher
(décochée par défaut, comme l'exige la Loi canadienne anti-pourriel)
« J'accepte de recevoir les rappels d'entretien… ». Chaque courriel de
demande indique « Rappels d'entretien : Oui/Non ». Conservez les « Oui »
avec leur courriel dans votre registre clients : c'est la base légale du
futur [système de rappels automatisés](#priorités-principales). Cocher la
case rend le champ Courriel obligatoire.

### Bandeau « saison des pneus »

En mode `'auto'`, le bandeau décide **dans le navigateur du visiteur** (le
site étant statique) : visible du **15 septembre au 1ᵉʳ décembre** et du
**15 mars au 31 mai** (`tireSeasons`). Aucune intervention nécessaire d'une
année à l'autre.

### Carrousel des services (accueil, mobile)

Sur téléphone, les services de l'accueil s'affichent en colonnes de 3 qu'on
fait glisser horizontalement (défilement magnétique, aucun mouvement
vertical). Des points de pagination sous le carrousel indiquent la page
courante et permettent d'y naviguer; leur nombre s'ajuste tout seul au
nombre de services dans `HOME_SERVICES`. Sur tablette et ordinateur, les
services restent en grille. Styles et script dans `src/pages/index.astro`.

### Boutons flottants mobiles

Sur téléphone, deux pastilles (numéro + « Rendez-vous ») apparaissent en bas
à droite **après 150 px de défilement** et disparaissent en haut de page.
Réglages dans `src/components/MobileCallBar.astro`.

### Bannière de consentement + Google Analytics

Conforme à la **Loi 25 (Québec)** : aucun témoin (cookie) avant que le
visiteur clique « Accepter ». Le choix est mémorisé; le lien « Gestion des
témoins » du pied de page permet d'en changer. Une fois GA actif, deux
événements de conversion sont envoyés :

| Événement | Déclencheur |
| :-- | :-- |
| `appel_telephone` | Clic sur un numéro de téléphone (avec la page d'origine) |
| `rendezvous_envoye` | Arrivée sur `/merci` (formulaire soumis) |

Dans GA4, marquer ces deux événements comme **événements clés** (Admin →
Événements) — indispensable pour de futures campagnes Google Ads.

### Vercel Analytics et Speed Insights

Comptage anonyme (sans témoins, donc sans consentement requis) de **tous**
les visiteurs + mesure des Core Web Vitals réels. Activation : onglets
**Analytics** et **Speed Insights** du projet Vercel → « Enable ». Astuce :
les visites de `/merci` dans Vercel Analytics = total réel des demandes de
rendez-vous, consentement ou non.

### Animations

Apparition douce des cartes au défilement, élévation au survol des cartes
cliquables, ombre d'en-tête au défilement. Tout est désactivé pour les
visiteurs ayant réglé « réduire les animations » et le site reste entièrement
fonctionnel sans JavaScript.

---

## Hébergement et déploiement

- **Hébergeur** : Vercel, projet connecté au dépôt GitHub `agadoury/yanexproweb`.
- **Déploiement** : automatique à chaque push sur `main`. Chaque autre
  branche reçoit une URL de prévisualisation isolée.
- **Domaine (au lancement)** : projet Vercel → Settings → Domains → ajouter
  `yanexpro.com` et `www.yanexpro.com`, puis créer chez le registraire les
  enregistrements DNS indiqués (un `A` pour la racine, un `CNAME` pour
  `www`). Le certificat HTTPS est émis automatiquement.
  ⚠️ Ne modifier que les enregistrements A/CNAME — ne pas toucher aux MX
  (courriel) s'il y en a.

---

## Liste de vérification — lancement

1. ☐ Obtenir l'accès au domaine (registraire/DNS — voir la section
   Hébergement; les serveurs DNS actuels sont chez `armadaservers.com`,
   probablement l'hébergeur de l'ancien site).
2. ☐ Brancher `yanexpro.com` sur le projet Vercel (ci-dessus).
3. ☐ Vérifier que les 4 URLs héritées répondent : `/`, `/garage`,
   `/services`, `/contact`.
4. ☐ Google Search Console : vérifier la propriété (la balise est déjà dans
   le site; le TXT DNS fonctionne aussi) puis soumettre
   `https://yanexpro.com/sitemap-index.xml`.
5. ☐ Google Business Profile : pointer le site web de la fiche vers
   `https://yanexpro.com` et vérifier heures/téléphone/adresse.
6. ☐ Tester le formulaire de rendez-vous en conditions réelles (activation
   FormSubmit comprise).
7. ☐ GA4 : vérifier l'arrivée des données (Temps réel), marquer
   `appel_telephone` et `rendezvous_envoye` comme événements clés.
8. ☐ Activer Analytics et Speed Insights dans Vercel si ce n'est pas fait.
9. ☐ Remplir `googleReviewsUrl` (lien de la fiche Google Maps) pour activer
   le bouton « Voir tous nos avis ».
10. ☐ Compléter la section [Visibilité IA](#visibilité-ia-être-recommandé-par-chatgpt-claude-etc)
    ci-dessous (Bing, Apple, annuaires).

---

## Visibilité IA : être recommandé par ChatGPT, Claude, etc.

Il n'existe **aucun moyen direct** (ni payant) d'être recommandé par les
assistants IA. Quand quelqu'un demande « un bon garage près de Varennes? »,
l'assistant fait une recherche web et synthétise ce qu'il trouve, ou puise
dans ce que le web public disait de l'entreprise. Les deux chemins passent
par des sources qu'on peut influencer. Méfiez-vous des agences « AEO/GEO »
qui garantissent une visibilité IA : personne ne peut la garantir.

**Déjà en place sur le site** : `llms.txt` (fiche d'entreprise lisible par
les IA), données structurées schema.org, FAQ et articles Conseils qui
répondent aux questions réelles, site rapide et bien indexable.

**À faire (comptes du propriétaire requis), par ordre d'impact :**

1. ☐ **Lancer le site sur yanexpro.com** : rien ne remplace l'indexation.
2. ☐ **Google Business Profile complet** : les recommandations locales
   (humaines et IA) s'appuient massivement sur Maps. La note 4,9/77 est le
   meilleur atout du garage.
3. ☐ **Bing Places + Bing Webmaster Tools** (~30 min, gratuit) : la
   recherche web de ChatGPT repose sur Bing, et presque aucun commerce
   local ne s'en occupe. Créer la fiche sur bingplaces.com et soumettre
   `https://yanexpro.com/sitemap-index.xml` sur bing.com/webmasters.
4. ☐ **Apple Business Connect** (gratuit, businessconnect.apple.com) :
   alimente Plans et Siri.
5. ☐ **Cohérence des annuaires (NAP)** : même nom, adresse (774!) et
   téléphone sur PagesJaunes, Yelp, Facebook, 411.ca. Des fiches
   contradictoires diluent la confiance des systèmes.
6. ☐ **Continuer à récolter des avis Google** : volume, fraîcheur et texte
   comptent. Inviter les clients satisfaits à mentionner le service et la
   ville (« pose de pneus rapide à Varennes ») est légitime et efficace.
7. ☐ **Publier un article Conseils par saison** : c'est ce contenu que les
   assistants citent quand on leur pose une question d'entretien auto.

**Test mensuel après le lancement** : demander à ChatGPT et à Claude
« meilleur garage à Varennes » ou « garage pour pneus d'hiver près de
Sainte-Julie » et noter les sources citées. Là où ils regardent et où le
garage est absent : c'est la prochaine fiche à créer.

---

## Dépannage

| Symptôme | Cause probable / solution |
| :-- | :-- |
| Les demandes de rendez-vous n'arrivent pas | Vérifier les indésirables de `bookingEmail`; l'adresse doit avoir été **activée** (courriel « Activate » de FormSubmit). Rappel : la demande qui déclenche l'activation n'est pas livrée. |
| Le bandeau pneus ne s'affiche pas | Normal hors saison (`tireSeasons`). Pour vérifier : `tireBannerMode: 'toujours'` temporairement. |
| Pas de données dans GA4 | Le script ne charge qu'en **production** et après un clic sur « Accepter ». Tester sur le site déployé, pas en local. |
| La bannière de consentement ne réapparaît pas | Choix mémorisé. Utiliser « Gestion des témoins » (pied de page) ou vider le stockage local du navigateur. |
| Le site local n'a ni analytics ni bannière | Voulu — ces scripts sont réservés à la production. |
| `npm run build` échoue après une modification | Le message d'erreur d'Astro indique le fichier et la ligne; le plus souvent une balise mal fermée ou une virgule manquante dans `site.ts` / `services.ts`. |

---

## Backlog — évolutions envisagées

### Priorités principales

Trois chantiers à fort impact d'affaires. À noter : les logiciels de gestion
de garage (étape 3 du plan « système de billets » ci-dessous) couvrent
souvent les trois à la fois — avant de bâtir chaque morceau séparément,
évaluer si l'adoption d'un tel logiciel ne règle pas tout d'un coup.

1. **Prise de rendez-vous en ligne (calendrier)** : remplacer « nous vous
   rappellerons » par un vrai choix de plage horaire, confirmé sur-le-champ
   (p. ex. Cal.com, intégrable au site, offre gratuite, en français).
   Prérequis opérationnel : quelqu'un au garage doit tenir les
   disponibilités à jour, sinon l'outil nuit plus qu'il n'aide.

2. **Système de rappels clients** : aujourd'hui, un employé téléphone à
   chaque client dû pour un entretien ou un changement de pneus — des
   heures de travail à chaque saison. Objectif : automatiser le premier
   contact (courriel et/ou SMS déclenché par la date du dernier service et
   les saisons de pneus), l'employé ne rappelant que ceux qui ne répondent
   pas.
   - **Voie légère** : registre clients (Airtable ou tableur) + envois
     automatisés par un service de courriel/SMS (p. ex. Brevo, Twilio);
     rapide à monter, coût minime.
   - **Voie intégrée** : les logiciels de gestion de garage incluent les
     rappels automatiques liés à l'historique d'entretien — c'est souvent
     LA raison principale de les adopter.
   - **Point légal** : l'envoi automatisé exige le consentement du client
     (Loi canadienne anti-pourriel et Loi 25). Le recueillir au comptoir et
     ajouter une case à cocher au formulaire de rendez-vous du site.

3. **Programme de fidélité** : récompenser les clients réguliers (p. ex.
   rabais après X visites, avantage sur la pose de pneus). Définir la
   mécanique d'affaires d'abord (carte physique? points? rabais simple?),
   puis le volet site web : page dédiée, inscription par formulaire, et à
   terme intégration au logiciel de gestion.

### Suivi des demandes de rendez-vous (système de billets)

Objectif : transformer les courriels du formulaire en un tableau de suivi
pour prioriser le travail. Plan en trois étapes — **ne pas sauter l'étape 1**,
c'est elle qui révèle le vrai flux de travail avant de dépenser :

1. **Trello alimenté par courriel** (gratuit, aucun code, ~15 min).
   Chaque tableau Trello possède une adresse courriel privée; un filtre
   Gmail retransfère automatiquement les courriels dont le sujet contient
   « Rendez-vous : » et chaque demande devient une carte (le sujet structuré
   « Rendez-vous : service — nom » fait un titre de carte parfait).
   Colonnes suggérées : Nouvelles demandes → À rappeler → Confirmé →
   En atelier → Terminé. Les courriels continuent d'arriver dans Gmail :
   réversible sans perte.
2. **Pipeline sur mesure** (une demi-journée de développement, quasi
   gratuit). Le formulaire soumet vers une fonction Vercel qui écrit chaque
   demande dans Airtable : vrai kanban avec statuts, horodatage, filtres par
   type de service, rapports simples — la notification courriel est
   conservée. Pertinent quand le volume justifie du reporting.
3. **Logiciel de gestion de garage** (Shopmonkey, Tekmetric ou équivalent,
   ~150 $ US+/mois). La destination finale : rendez-vous → bon de travail →
   soumission → facture → rappels clients. À considérer quand le volume de
   demandes le justifie; le formulaire du site pourra alors y verser
   directement.

### Autres idées en attente

- **Auto-réponse au client** après l'envoi du formulaire (option
  `_autoresponse` de FormSubmit — texte à approuver).
- **Robot conversationnel** (IA) : répond aux questions sur les services et
  les heures, dirige vers l'appel ou le formulaire. Nécessite une clé API et
  une petite fonction serveur; à envisager après le lancement, quand les
  statistiques montreront où les visiteurs hésitent.
- **Version anglaise** (`/en/`) avec balises hreflang, si la clientèle
  anglophone le justifie.
- **Courriel de domaine** (`info@yanexpro.com`) redirigé vers Gmail — plus
  professionnel que l'adresse Hotmail/Gmail sur le site et l'impression.
- **Compteur sans témoins des clics téléphone** (GoatCounter ou Plausible)
  si l'écart de consentement GA4 devient gênant en pratique.

## Choix techniques

- **Astro (site statique)** : pages HTML pures, quasi aucun JavaScript →
  meilleures notes Core Web Vitals (facteur de classement Google), aucune
  maintenance serveur, hébergement gratuit. Des îlots interactifs (prise de
  rendez-vous avancée, robot conversationnel) pourront s'y greffer sans
  refonte.
- **FormSubmit plutôt qu'un backend** : zéro infrastructure à entretenir
  pour un volume de PME. Si le besoin grandit (envois personnalisés, sujets
  dynamiques côté serveur), migrer vers une fonction Vercel + Resend.
- **GA4 avec consentement + Vercel Analytics sans témoins** : le premier
  fournit le détail et le lien vers Google Ads (échantillon consentant), le
  second le vrai total anonyme. Ensemble ils donnent l'image complète en
  respectant la Loi 25.
- **Polices auto-hébergées** (Archivo variable via npm) : aucune requête vers
  Google Fonts — vie privée et rapidité.
