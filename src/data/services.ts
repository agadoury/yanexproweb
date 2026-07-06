/** Contenu des services — alimente la page /services et les 9 pages détaillées. */

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  num: string;
  slug: string;
  title: string;
  /** Description courte (cartes de la page Services). */
  desc: string;
  /** Balise <title> de la page détaillée. */
  metaTitle: string;
  /** Meta description de la page détaillée. */
  metaDescription: string;
  /** Paragraphe d'introduction (héros de la page détaillée). */
  lead: string;
  /** Titre de la première liste (par défaut « Signes à surveiller »). */
  signsTitle?: string;
  signs: string[];
  includes: string[];
  faq: ServiceFaq[];
}

export const SERVICES: Service[] = [
  {
    num: '01',
    slug: 'freins',
    title: 'Système de freinage',
    desc: 'Inspection et réparation des freins, incluant les freins antiblocage (ABS).',
    metaTitle: 'Freins et ABS à Varennes | Garage Yanexpro',
    metaDescription:
      "Inspection, réparation et remplacement des freins à Varennes : plaquettes, disques, étriers, liquide de frein et système ABS. Garage Yanexpro : (450) 652-2121.",
    lead: "Vos freins sont votre premier équipement de sécurité. Nous inspectons et réparons l'ensemble du système de freinage, incluant les freins antiblocage (ABS), selon les normes des manufacturiers.",
    signs: [
      'Grincement, sifflement ou frottement au freinage',
      'Pédale molle, spongieuse ou qui vibre',
      'Distance de freinage plus longue qu’à l’habitude',
      'Témoin de frein ou témoin ABS allumé au tableau de bord',
      'Véhicule qui tire d’un côté lors du freinage',
    ],
    includes: [
      'Inspection complète des plaquettes, disques et étriers',
      'Remplacement des pièces usées',
      'Vérification et remplacement du liquide de frein',
      'Diagnostic et réparation du système ABS',
      'Vérification du frein de stationnement',
    ],
    faq: [
      {
        q: 'À quelle fréquence faire inspecter mes freins?',
        a: "Au moins une fois par année, ou dès qu'un symptôme apparaît. Un bon réflexe : faites-les vérifier au moment de la pose de vos pneus saisonniers.",
      },
      {
        q: 'Puis-je rouler avec le témoin de frein allumé?',
        a: "Ce n'est pas recommandé : un témoin allumé peut signaler un manque de liquide ou une défaillance du système. Appelez-nous au (450) 652-2121 avant de reprendre la route.",
      },
    ],
  },
  {
    num: '02',
    slug: 'vehicules-electriques',
    title: 'Véhicules électriques',
    desc: 'Réparation et entretien de véhicules électriques.',
    metaTitle: 'Entretien de véhicules électriques à Varennes | Garage Yanexpro',
    metaDescription:
      "Réparation et entretien de véhicules électriques à Varennes : freins, suspension, pneus, climatisation. Une équipe à la fine pointe. Garage Yanexpro : (450) 652-2121.",
    lead: "Les véhicules électriques n'ont pas besoin de vidange d'huile, mais ils ont bel et bien besoin d'entretien. Notre équipe se tient à la fine pointe pour entretenir votre VÉ selon les recommandations du fabricant.",
    signsTitle: 'Bon à savoir',
    signs: [
      'Les accélérations très vives et le poids d’un VÉ usent les pneus plus rapidement',
      'Les freins, moins sollicités par la conduite régénérative, doivent être inspectés contre la corrosion',
      'La suspension travaille davantage en raison du poids de la batterie',
      'Le filtre à air intérieur et la climatisation demandent un entretien régulier',
    ],
    includes: [
      'Entretien selon le calendrier recommandé par le fabricant',
      'Inspection et entretien des freins',
      'Pneus : conseils, pose, permutation et alignement',
      'Suspension et direction',
      'Climatisation et confort intérieur',
    ],
    faq: [
      {
        q: 'Un véhicule électrique a-t-il vraiment besoin d’entretien?',
        a: "Oui. Pneus, freins, suspension, filtre à air intérieur et climatisation demandent un suivi régulier, d'autant plus que le poids et la puissance d'un VÉ sollicitent davantage certaines pièces.",
      },
      {
        q: 'Pourquoi les pneus d’un VÉ s’usent-ils plus vite?',
        a: "Un VÉ démarre avec toute sa puissance dès le premier tour de roue et pèse plus lourd à cause de sa batterie : les pneus travaillent donc plus fort. Une permutation régulière et un alignement précis prolongent leur vie.",
      },
    ],
  },
  {
    num: '03',
    slug: 'silencieux-echappement',
    title: 'Silencieux et échappement',
    desc: "Réparation et remplacement du silencieux et du système d'échappement.",
    metaTitle: "Silencieux et échappement à Varennes | Garage Yanexpro",
    metaDescription:
      "Réparation et remplacement du silencieux et du système d'échappement à Varennes. Diagnostic de bruit et inspection complète. Garage Yanexpro : (450) 652-2121.",
    lead: "Un système d'échappement en bon état protège votre santé, votre portefeuille et la tranquillité de votre quartier. Nous réparons et remplaçons silencieux et composantes d'échappement.",
    signs: [
      'Bruit de moteur soudainement plus fort ou plus grave',
      'Cliquetis ou vibration sous le véhicule',
      'Odeur de gaz d’échappement dans le véhicule',
      'Perte de puissance ou hausse de consommation',
      'Témoin moteur allumé',
    ],
    includes: [
      'Inspection complète du système d’échappement',
      'Réparation ou remplacement du silencieux',
      'Remplacement des tuyaux, joints et supports',
      'Vérification des fuites et de la corrosion',
    ],
    faq: [
      {
        q: 'Est-ce dangereux de rouler avec un échappement percé?',
        a: "Oui, ça peut l'être : des gaz d'échappement peuvent s'infiltrer à l'intérieur du véhicule. Faites inspecter le système rapidement dès qu'un bruit anormal apparaît.",
      },
      {
        q: "Pourquoi mon véhicule est-il soudainement plus bruyant?",
        a: "C'est souvent le signe d'une fuite ou d'une composante percée par la corrosion, fréquent au Québec à cause du sel de déglaçage. Une inspection permet de cibler la pièce à réparer.",
      },
    ],
  },
  {
    num: '04',
    slug: 'direction-suspension',
    title: 'Direction et suspension',
    desc: 'Diagnostic et réparation de la direction et de la suspension.',
    metaTitle: 'Direction et suspension à Varennes | Garage Yanexpro',
    metaDescription:
      'Diagnostic et réparation de la direction et de la suspension à Varennes : amortisseurs, rotules, biellettes, crémaillère. Garage Yanexpro : (450) 652-2121.',
    lead: "La direction et la suspension assurent votre confort, mais surtout votre contrôle du véhicule. Nous diagnostiquons et réparons l'ensemble de ces systèmes.",
    signs: [
      'Cognement ou claquement sur les bosses et nids-de-poule',
      'Volant qui vibre ou qui tire d’un côté',
      'Usure inégale ou prématurée des pneus',
      'Tenue de route flottante ou imprécise',
      'Véhicule qui penche ou rebondit excessivement',
    ],
    includes: [
      'Diagnostic complet de la direction et de la suspension',
      'Remplacement des amortisseurs et jambes de force',
      'Rotules, bras de suspension et biellettes',
      'Composantes de la crémaillère de direction',
      'Vérification avant alignement',
    ],
    faq: [
      {
        q: 'Les nids-de-poule peuvent-ils endommager ma suspension?',
        a: "Oui : c'est l'une des premières causes de bris de suspension et de perte d'alignement au Québec. Après un impact important, une inspection est recommandée.",
      },
      {
        q: 'Quels sont les signes d’amortisseurs usés?',
        a: 'Un véhicule qui rebondit après une bosse, qui penche en virage ou dont les pneus s’usent inégalement. Des amortisseurs en bon état raccourcissent aussi la distance de freinage.',
      },
    ],
  },
  {
    num: '05',
    slug: 'injection-electricite',
    title: 'Injection et électricité',
    desc: "Systèmes d'injection et circuits électriques du véhicule.",
    metaTitle: 'Injection et électricité automobile à Varennes | Garage Yanexpro',
    metaDescription:
      "Diagnostic et réparation des systèmes d'injection et des circuits électriques à Varennes : batterie, alternateur, démarreur, câblage. Garage Yanexpro : (450) 652-2121.",
    lead: "Un moteur qui hésite ou un circuit électrique capricieux se diagnostique avec méthode. Nous entretenons les systèmes d'injection et l'ensemble du circuit électrique de votre véhicule.",
    signs: [
      'Démarrage difficile ou impossible',
      'Ralenti irrégulier ou hésitation à l’accélération',
      'Hausse de la consommation d’essence',
      'Témoin moteur ou témoin de batterie allumé',
      'Accessoires électriques qui fonctionnent par intermittence',
    ],
    includes: [
      "Diagnostic du système d'injection",
      'Nettoyage et entretien des injecteurs',
      'Test et remplacement de la batterie',
      'Alternateur et démarreur',
      'Réparation de câblage et de circuits',
    ],
    faq: [
      {
        q: 'Ma batterie est-elle en fin de vie?',
        a: "Un démarrage lent, des phares qui faiblissent au ralenti ou un témoin de batterie allumé sont des signes classiques. Un test de charge rapide permet de le confirmer avant la panne.",
      },
      {
        q: 'Pourquoi ma consommation d’essence a-t-elle augmenté?',
        a: "Des injecteurs encrassés, un capteur défectueux ou une mise au point due sont des causes fréquentes. Un diagnostic électronique cible la source exacte.",
      },
    ],
  },
  {
    num: '06',
    slug: 'refroidissement-air-climatise',
    title: 'Refroidissement et air climatisé',
    desc: "Entretien du système de refroidissement et de l'air climatisé.",
    metaTitle: 'Refroidissement et air climatisé auto à Varennes | Garage Yanexpro',
    metaDescription:
      "Entretien du système de refroidissement et de l'air climatisé à Varennes : radiateur, thermostat, antigel, climatisation. Garage Yanexpro : (450) 652-2121.",
    lead: "Le système de refroidissement protège votre moteur contre la surchauffe, hiver comme été. Nous l'entretenons au complet, incluant votre air climatisé.",
    signs: [
      'Jauge de température qui grimpe ou surchauffe',
      'Liquide de refroidissement sous le véhicule',
      'Chauffage faible en hiver',
      'Air climatisé qui ne refroidit plus',
      'Odeur sucrée provenant du moteur',
    ],
    includes: [
      'Inspection du radiateur et des conduites',
      'Remplacement du thermostat et de la pompe à eau',
      "Vidange et remplacement de l'antigel",
      "Entretien du système d'air climatisé",
      'Détection de fuites',
    ],
    faq: [
      {
        q: "Pourquoi vérifier l'antigel avant l'hiver?",
        a: "Un antigel fatigué protège moins bien contre le gel et la corrosion. Une vérification saisonnière évite les mauvaises surprises par grand froid, et protège votre moteur à l'année.",
      },
      {
        q: 'Mon air climatisé souffle de l’air tiède, que faire?',
        a: "C'est souvent un manque de réfrigérant ou une fuite dans le circuit. Un entretien du système permet de retrouver un air froid et d'éviter d'endommager le compresseur.",
      },
    ],
  },
  {
    num: '07',
    slug: 'alignement',
    title: 'Alignement',
    desc: 'Alignement précis pour une conduite sécuritaire et une usure uniforme des pneus.',
    metaTitle: 'Alignement de roues à Varennes | Garage Yanexpro',
    metaDescription:
      "Alignement de roues précis à Varennes pour une conduite sécuritaire et des pneus qui durent plus longtemps. Garage Yanexpro : (450) 652-2121.",
    lead: "Un alignement précis, c'est une conduite plus sûre, des pneus qui durent plus longtemps et une consommation d'essence réduite.",
    signs: [
      'Volant décentré quand vous roulez en ligne droite',
      'Véhicule qui tire vers la gauche ou la droite',
      'Usure inégale ou en biseau des pneus',
      'Volant qui vibre à certaines vitesses',
    ],
    includes: [
      'Mesure et réglage de la géométrie des roues',
      'Inspection préalable de la direction et de la suspension',
      'Vérification de l’usure des pneus',
      'Essai routier de validation',
    ],
    faq: [
      {
        q: 'Quand faire un alignement?',
        a: "À la pose de pneus neufs, après un impact important (nid-de-poule, trottoir), si le véhicule tire d'un côté, ou environ une fois par année en prévention.",
      },
      {
        q: 'Un mauvais alignement use-t-il vraiment les pneus?',
        a: "Oui, et rapidement : quelques millimètres de déréglage suffisent pour ruiner un pneu en quelques milliers de kilomètres. L'alignement se rentabilise en durée de vie de pneus.",
      },
    ],
  },
  {
    num: '08',
    slug: 'electronique-mise-au-point',
    title: 'Électronique et mise au point',
    desc: 'Diagnostic électronique et mise au point du moteur.',
    metaTitle: 'Diagnostic électronique et mise au point à Varennes | Garage Yanexpro',
    metaDescription:
      'Diagnostic électronique, lecture du témoin moteur et mise au point du moteur à Varennes. Garage Yanexpro : (450) 652-2121.',
    lead: "Témoin moteur allumé? Nos outils de diagnostic électronique lisent ce que votre véhicule essaie de vous dire, et notre équipe fait la mise au point selon les recommandations du fabricant.",
    signs: [
      'Témoin moteur (check engine) allumé ou clignotant',
      'Perte de puissance ou ratés d’allumage',
      'Démarrage difficile',
      'Consommation d’essence en hausse',
    ],
    includes: [
      'Lecture et interprétation des codes de diagnostic',
      'Diagnostic électronique complet',
      'Remplacement des bougies et composantes d’allumage',
      'Mise au point selon le calendrier du fabricant',
    ],
    faq: [
      {
        q: 'Mon témoin moteur est allumé, est-ce grave?',
        a: "Pas toujours, mais seul un diagnostic le confirme. S'il clignote, arrêtez-vous rapidement : cela peut signaler des ratés qui endommagent le convertisseur catalytique.",
      },
      {
        q: "Qu'est-ce qu'une mise au point moderne?",
        a: 'Bougies, filtres, inspection des systèmes d’allumage et d’alimentation, selon le calendrier du fabricant. Un moteur bien réglé consomme moins et dure plus longtemps.',
      },
    ],
  },
  {
    num: '09',
    slug: 'pneus',
    title: 'Vente et pose de pneus',
    desc: 'Conseils, vente et installation de pneus pour toutes les saisons.',
    metaTitle: 'Vente et pose de pneus à Varennes | Garage Yanexpro',
    metaDescription:
      "Vente, pose et équilibrage de pneus à Varennes pour toutes les saisons. Conseils d'experts et prise de rendez-vous rapide : (450) 652-2121.",
    lead: "Les bons pneus, bien posés, changent tout : adhérence, freinage, consommation. Nous vous conseillons, vendons et installons des pneus pour toutes les saisons.",
    signs: [
      'Semelle usée près des témoins d’usure',
      'Usure inégale entre les pneus ou sur un même pneu',
      'Vibrations au volant à haute vitesse',
      'Perte de pression récurrente',
      'Pneus de plus de 6 à 10 ans, même peu usés',
    ],
    includes: [
      'Conseils selon votre véhicule, votre conduite et votre budget',
      'Vente de pneus toutes saisons, été et hiver',
      'Pose et équilibrage',
      'Permutation saisonnière',
      'Inspection de l’usure et de la pression',
    ],
    faq: [
      {
        q: 'Quand les pneus d’hiver sont-ils obligatoires au Québec?',
        a: "Du 1er décembre au 15 mars, tout véhicule de promenade immatriculé au Québec doit être chaussé de pneus d'hiver. Prenez rendez-vous tôt à l'automne : la saison des pneus se remplit vite : (450) 652-2121.",
      },
      {
        q: 'Pourquoi équilibrer les pneus à la pose?',
        a: "Un pneu mal équilibré vibre, use la suspension et s'use prématurément. L'équilibrage fait partie de toute pose bien faite.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Les 9 services affichés sur la page d'accueil (libellés courts). */
export const HOME_SERVICES = [
  { label: 'Freins et freins antiblocage (ABS)', slug: 'freins' },
  { label: 'Véhicules électriques', slug: 'vehicules-electriques' },
  { label: 'Direction et suspension', slug: 'direction-suspension' },
  { label: 'Alignement', slug: 'alignement' },
  { label: 'Air climatisé et refroidissement', slug: 'refroidissement-air-climatise' },
  { label: 'Vente et pose de pneus', slug: 'pneus' },
  { label: 'Silencieux et échappement', slug: 'silencieux-echappement' },
  { label: 'Injection et électricité', slug: 'injection-electricite' },
  { label: 'Électronique et mise au point', slug: 'electronique-mise-au-point' },
] as const;

/** Questions générales (page Services) — balisage FAQPage. */
export const GENERAL_FAQ: ServiceFaq[] = [
  {
    q: 'Dois-je prendre rendez-vous?',
    a: "Oui, c'est la meilleure façon d'être servi rapidement. Appelez-nous au (450) 652-2121, du lundi au jeudi de 8 h à 17 h, le vendredi de 8 h à 12 h (hors saison des pneus).",
  },
  {
    q: 'Entretenez-vous les camions légers?',
    a: "Oui. Yanexpro est spécialisé dans l'entretien d'automobiles et de camions légers.",
  },
  {
    q: "L'entretien chez Yanexpro préserve-t-il ma garantie du fabricant?",
    a: "Nous respectons les normes des manufacturiers et proposons les entretiens recommandés par les fabricants. Conservez vos factures : un entretien conforme au calendrier du fabricant maintient votre garantie.",
  },
  {
    q: 'Réparez-vous les véhicules électriques?',
    a: 'Oui, nous offrons la réparation et l’entretien de véhicules électriques.',
  },
  {
    q: "Quand faire poser mes pneus d'hiver?",
    a: "Au Québec, les pneus d'hiver sont obligatoires du 1er décembre au 15 mars. Prenez rendez-vous dès le début de l'automne pour éviter la cohue de la saison des pneus.",
  },
  {
    q: 'Où êtes-vous situés?',
    a: 'Au 774 Bd Lionel-Boulet à Varennes, dans le parc industriel, à proximité de la route 132.',
  },
];
