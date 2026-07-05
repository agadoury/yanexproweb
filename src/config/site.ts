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

  /** ===== Bandeau saison des pneus =====
   *  Mettez `showTireBanner` à `false` hors saison. */
  showTireBanner: true,
  tireBannerText: 'Saison des pneus : prenez rendez-vous dès maintenant.',

  /** ===== Avis Google =====
   *  Mettez `reviewsArePlaceholders` à `false` une fois vos vrais avis
   *  copiés ci-dessous (ou masquez la section avec `showReviews: false`). */
  showReviews: true,
  reviewsArePlaceholders: true,
  reviews: [
    {
      name: 'Client Google',
      text: "Service rapide et honnête. On m'explique clairement les travaux avant de les faire.",
    },
    {
      name: 'Client Google',
      text: 'Équipe professionnelle et prix justes. Mon garage de confiance à Varennes.',
    },
    {
      name: 'Client Google',
      text: 'Pose de pneus efficace et rendez-vous respecté. Je recommande sans hésiter.',
    },
  ],
} as const;

export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Notre garage', href: '/notre-garage' },
  { label: 'Services', href: '/services' },
  { label: 'Contactez-nous', href: '/contact' },
] as const;
