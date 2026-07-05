# Site web — Garage Yanexpro

Site officiel du [Garage Yanexpro](https://yanexpro.com) — mécanique auto à
Varennes, QC. Construit avec [Astro 5](https://astro.build) : un site **100 %
statique** (rapide, sécuritaire, sans base de données), hébergé sur
[Vercel](https://vercel.com), entièrement en français.

**Principe directeur : tout le contenu d'affaires vit dans deux fichiers de
configuration.** Coordonnées, heures, avis, services — une modification à un
seul endroit se propage partout (pages, pied de page, référencement, données
structurées).

---

## Sommaire

1. [Démarrage rapide](#démarrage-rapide)
2. [Structure du projet](#structure-du-projet)
3. [Modifier le contenu](#modifier-le-contenu)
4. [Fonctionnalités](#fonctionnalités)
5. [Référencement (SEO)](#référencement-seo)
6. [Hébergement et déploiement](#hébergement-et-déploiement)
7. [Liste de vérification — lancement](#liste-de-vérification--lancement)
8. [Dépannage](#dépannage)
9. [Choix techniques](#choix-techniques)

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
├── astro.config.mjs          Configuration Astro (domaine, sitemap)
├── vercel.json               Configuration Vercel (URLs propres, en-têtes, cache)
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
        ├── rendez-vous.astro     /rendez-vous Formulaire de demande de rendez-vous
        ├── merci.astro           /merci       Confirmation d'envoi (non indexée)
        ├── contact.astro         /contact     Coordonnées, heures, carte
        └── 404.astro             Page introuvable
```

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
contrôle les 6 services mis en avant sur l'accueil, et `GENERAL_FAQ` la FAQ
générale de la page Services.

### Les textes des pages

Directement dans `src/pages/*.astro` — le HTML est lisible et les textes
faciles à repérer. L'accueil est `index.astro`.

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

### Bandeau « saison des pneus »

En mode `'auto'`, le bandeau décide **dans le navigateur du visiteur** (le
site étant statique) : visible du **15 septembre au 1ᵉʳ décembre** et du
**15 mars au 31 mai** (`tireSeasons`). Aucune intervention nécessaire d'une
année à l'autre.

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

## Référencement (SEO)

**En place sur chaque page** : titre et description uniques, URL canonique,
balises Open Graph (+ carte de partage), données structurées
[schema.org](https://schema.org) `AutoRepair` (adresse, téléphone, heures,
zones desservies, logo). En plus :

- Pages de services : schémas `Service`, `BreadcrumbList` et `FAQPage`
- Page Services : schéma `FAQPage` (FAQ générale)
- `sitemap-index.xml` généré à chaque build; `robots.txt`
- `llms.txt` : fiche d'entreprise pour les assistants IA
- `/merci` : non indexée (et exclue du sitemap)
- **Adresses `*.vercel.app` : jamais indexées** (en-tête `X-Robots-Tag`
  conditionnel dans `vercel.json`) — seul `yanexpro.com` sera indexé

**URLs héritées de l'ancien site** : `/garage`, `/services` et `/contact`
existent aux mêmes adresses — l'autorité de recherche accumulée se transfère
sans redirection. **Ne pas renommer ces pages après le lancement.**

**`vercel.json`** : URLs propres (`/services` plutôt que `/services.html`),
pas de barre oblique finale, cache immuable des ressources fingerprintées,
en-tête « noindex » pour les hôtes vercel.app.

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
