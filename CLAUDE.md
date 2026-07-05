# Conventions du projet

Site statique Astro 5 du Garage Yanexpro (mécanique auto à Varennes, QC),
hébergé sur Vercel, contenu entièrement en français québécois. Documentation
complète dans README.md (structure, recettes de contenu, dépannage, backlog).

## Flux de travail

- **`main` est la source de vérité** : chaque push sur `main` déploie en
  production via Vercel. Les autres branches créent des prévisualisations.
- La CI GitHub (build + `scripts/smoke.mjs`) doit passer; la lancer
  localement avant de pousser : `npm run build && node scripts/smoke.mjs`.
- Audit d'accessibilité re-vérifiable : `node scripts/audit-a11y.mjs`
  (zéro violation WCAG 2.1 AA attendu).
- Déclinaisons du logo (variante claire, favicons, icônes, image de
  partage) : régénérées par `python3 scripts/logo-variants.py` si le logo
  change.

## Provenance et état

- Le design vient d'une maquette Claude Design (juillet 2026); le code du
  site est maintenant la seule référence. Le logo officiel (PNG) a été
  fourni par le propriétaire.
- Le site n'est **pas encore lancé** sur yanexpro.com : le domaine est géré
  dans le compte d'hébergement de l'ancien site (serveurs DNS
  armadaservers.com) et l'accès est en cours de récupération. La liste de
  vérification du lancement est dans README.md.
- Deux photos restent en attente sur la page /garage (composant
  PhotoPlaceholder); `googleReviewsUrl` est vide dans la config en
  attendant le lien de la fiche Google Maps.

## Règles éditoriales (texte visible par les visiteurs)

- **Jamais de tiret long (—)** dans les textes du site : titres, meta
  descriptions, alt, aria-labels, articles, réponses de FAQ. Utiliser une
  virgule, un deux-points ou des parenthèses. (Les commentaires de code et
  les sujets de courriels du formulaire ne sont pas concernés.)
- Français québécois, ton direct et concret, vouvoiement.
- Aucune promesse de service non confirmée par le propriétaire (pas de
  prix, pas de services inventés). Faits vérifiables seulement (ex. : pneus
  d'hiver obligatoires au Québec du 1er décembre au 15 mars).

## Règles techniques

- Contenu d'affaires centralisé : `src/config/site.ts` (coordonnées, heures,
  avis…) et `src/data/services.ts` (services). Ne pas dupliquer ces données
  dans les pages.
- Articles : fichiers Markdown dans `src/content/conseils/` (le nom de
  fichier devient l'URL). Section liée au pied de page seulement, pas au
  menu principal.
- Ne pas renommer les slugs d'URL existants (parité avec l'ancien site et
  référencement).
- Scripts d'analyse (GA4, Vercel) chargés en production seulement; GA4
  toujours derrière la bannière de consentement (Loi 25).
- Après toute modification : `npm run build` puis `node scripts/smoke.mjs`
  doivent passer. La CI GitHub exécute les mêmes vérifications.
- Pousser sur `main` déploie automatiquement en production (Vercel).
