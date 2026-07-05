/**
 * Configuration centrale du site — modifiez ce fichier pour mettre à jour
 * les coordonnées, les heures d'ouverture et le bandeau saisonnier partout
 * sur le site en même temps.
 */

export const SITE = {
  name: 'Garage Yanexpro',
  shortName: 'YANEXPRO',
  tagline: 'MÉCANIQUE AUTO',
  url: 'https://yanexpro.com',
  description:
    "Garage Yanexpro — mécanique auto à Varennes. Entretien d'automobiles et de camions légers. Membre du réseau UniPro et garage certifié Bumper to Bumper.",

  phone: {
    display: '(450) 652-2121',
    href: 'tel:+14506522121',
    e164: '+1-450-652-2121',
  },

  email: 'yanexpro@hotmail.com',

  /** Adresse qui reçoit les demandes de rendez-vous du formulaire. */
  bookingEmail: 'yanexprogarage@gmail.com',

  /** Google Analytics 4 — chargé seulement après consentement (Loi 25). */
  gaMeasurementId: 'G-ERNW1YS7R9',

  /** Jeton de vérification Google Search Console (balise meta). */
  googleSiteVerification: 'I-ZliXcOElVzbWCAteGlwD-tCRrpL550mbABrIuUjr0',

  address: {
    street: '772 Bd Lionel-Boulet',
    city: 'Varennes',
    province: 'QC',
    postalCode: 'J3X 1P7',
    country: 'CA',
  },

  /** Lien Google Maps intégré (page Contact). */
  mapEmbedSrc:
    'https://maps.google.com/maps?q=772%20Lionel-Boulet%2C%20Varennes%20QC&t=m&z=14&output=embed&iwloc=near',

  hours: [
    { days: 'Lundi au jeudi', time: '8 h à 17 h' },
    { days: 'Vendredi', time: '8 h à 12 h (hors saison des pneus)' },
  ],

  /** Heures au format schema.org (référencement Google). */
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '08:00',
      closes: '12:00',
    },
  ],

  owner: 'Yannick McGinnis',

  /** Municipalités voisines mises de l'avant comme zones desservies. */
  areasServed: [
    'Varennes',
    'Boucherville',
    'Sainte-Julie',
    'Saint-Amable',
    'Verchères',
    'Contrecœur',
    'Calixa-Lavallée',
  ],

  /** ===== Bandeau saison des pneus =====
   *  'auto'     : s'affiche automatiquement pendant les saisons ci-dessous
   *  'toujours' : toujours visible
   *  'jamais'   : jamais visible */
  tireBannerMode: 'auto' as 'auto' | 'toujours' | 'jamais',
  /** Périodes d'affichage (mois-jour, inclusives) :
   *  automne = pose des pneus d'hiver (obligatoires au Québec dès le 1er déc.),
   *  printemps = retour aux pneus d'été (à partir du 15 mars). */
  tireSeasons: [
    { from: '09-15', to: '12-01' },
    { from: '03-15', to: '05-31' },
  ],
  tireBannerText: 'Saison des pneus : prenez rendez-vous dès maintenant.',

  /** ===== Avis Google =====
   *  Pour mettre à jour : remplacez les avis ci-dessous et ajustez
   *  `googleRating` (note globale et nombre d'avis). */
  showReviews: true,
  googleRating: { value: '4,9', count: 77 },
  /** Lien « Voir tous nos avis » vers la fiche Google Maps.
   *  Laisser vide pour masquer le bouton. */
  googleReviewsUrl: '',
  reviews: [
    {
      name: 'Maxime T.',
      text: "Service A1 et prise de rendez-vous rapide. J'ai toujours été bien servi et le véhicule de courtoisie me simplifie vraiment la vie pendant les réparations.",
    },
    {
      name: 'Michel C.',
      text: "Un excellent garage pour faire l'entretien ou la réparation de votre voiture. Une équipe de mécaniciens qui connait leur métier! Vous pouvez faire confiance à Logan et Yannick pour avoir un travail de qualité! Ils font l'entretien de mes voitures depuis plusieurs années.",
    },
    {
      name: 'Selia S.',
      text: "J'adore aller chez Yanexpro, c'est en tout temps agréable comme expérience et le service est de qualité exceptionnelle. Les employés sont honnêtes et les prix sont de concurrence raisonnable.",
    },
  ],
} as const;

export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Notre garage', href: '/garage' },
  { label: 'Services', href: '/services' },
  { label: 'Rendez-vous', href: '/rendez-vous' },
  { label: 'Contactez-nous', href: '/contact' },
] as const;
