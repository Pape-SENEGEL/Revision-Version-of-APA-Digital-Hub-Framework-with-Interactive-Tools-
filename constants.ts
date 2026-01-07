
import { LanguageCode, Tour, Resource, UserType, Solution, TourDifficulty, ToolCategory, UserProfile, ApplicationStatus } from './types';

export const LANGUAGES = [
  { code: LanguageCode.EN, nameKey: 'languages.en', short: 'EN' },
  { code: LanguageCode.FR, nameKey: 'languages.fr', short: 'FR' },
];

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  TOURS: '/tours',
  TOUR_DETAIL: '/tours/:tourId', 
  RESOURCES: '/resources',
  RESOURCE_DETAIL: '/resources/:resourceId',
  SOLUTIONS: '/solutions',
  SOLUTION_DETAIL: '/solutions/:solutionId',
  PROFILE: '/profile',
  AI_ASSISTANT: '/ai-assistant',
  APPLY_TOUR: '/apply/:tourId', 
  FEEDBACK_TOUR: '/feedback/:tourId',
  FRAMEWORK: '/framework',
  FRAMEWORK_TOOLKIT: '/framework/toolkit',
  FRAMEWORK_GLOSSARY: '/framework/glossary',
  FRAMEWORK_INTERACTIVE_TOOLS: '/framework/interactive-tools',
  SIGN_IN: '/signin', 
  SIGN_UP: '/signup', 
  FORGOT_PASSWORD: '/forgot-password',
  MY_APPLICATIONS: '/my-applications',
  MY_BOOKMARKS: '/my-bookmarks',
  GENERATE_IMAGE: '/generate-image',
};

export const MOCK_USER_TYPE = UserType.PROSPECTIVE;

export const GEMINI_API_KEY = process.env.API_KEY;
// Using latest preview models for enhanced performance and reasoning
export const GEMINI_MODEL_TEXT = 'gemini-3-flash-preview'; 
export const GEMINI_MODEL_PRO = 'gemini-3-pro-preview';


// Mock user storage (in a real app, this would be an API)
export const MOCK_USERS_DB: UserProfile[] = [
    { 
      id: 'admin-001', 
      name: 'Admin User', 
      email: 'admin@apa.com', 
      userType: UserType.APAER_ADMINISTRATOR, 
      phone: '+123456789', 
      newsletter: true, 
      eventUpdates: true, 
      history: [] ,
      applications: [],
      bookmarkedResourceIds: ['res1'],
    },
    { 
      id: 'prospective-001', 
      name: 'Prospective User', 
      email: 'prospective@apa.com', 
      userType: UserType.PROSPECTIVE, 
      history: [],
      applications: [
        { applicationId: 'app-01', tourId: '1', dateSubmitted: '2024-05-20', status: ApplicationStatus.UNDER_REVIEW },
        { applicationId: 'app-02', tourId: '2', dateSubmitted: '2024-04-15', status: ApplicationStatus.ACCEPTED },
        { applicationId: 'app-04', tourId: '3', dateSubmitted: '2024-05-22', status: ApplicationStatus.SUBMITTED },
        { applicationId: 'app-06', tourId: '1', dateSubmitted: '2024-05-23', status: ApplicationStatus.SUBMITTED },
      ],
      bookmarkedResourceIds: ['res1', 'res3'],
    },
    { 
        id: 'alumni-001', 
        name: 'Alumni User', 
        email: 'alumni@apa.com', 
        userType: UserType.ALUMNI, 
        history: [{ id: 'hist-1', activity: 'Completed Ethical Leadership Safari', date: '2023-10-15' }],
        applications: [
            { applicationId: 'app-03', tourId: '1', dateSubmitted: '2023-08-01', status: ApplicationStatus.ACCEPTED },
            { applicationId: 'app-05', tourId: '2', dateSubmitted: '2024-05-21', status: ApplicationStatus.REJECTED },
            { applicationId: 'app-07', tourId: '3', dateSubmitted: '2024-06-01', status: ApplicationStatus.SUBMITTED },
        ],
        bookmarkedResourceIds: ['res2']
    },
    { 
        id: 'corporate-001', 
        name: 'Corporate User', 
        email: 'corporate@apa.com', 
        userType: UserType.PARTNER_BUSINESS, 
        history: [], 
        applications: [
            { applicationId: 'app-08', tourId: '2', dateSubmitted: '2024-06-05', status: ApplicationStatus.UNDER_REVIEW },
        ],
        bookmarkedResourceIds: ['res2', 'res4'] 
    },
    {
      id: 'apaer-001',
      name: 'Project Manager User',
      email: 'pm@apa.com',
      userType: UserType.APAER_PROJECT_MANAGER,
      history: [],
      applications: [], // A PM doesn't have personal applications
      bookmarkedResourceIds: ['res1', 'res2', 'res3', 'res4'],
    },
    { id: 'bd-001', name: 'Biz Dev Manager', email: 'bd@apa.com', userType: UserType.APAER_BUSINESS_DEVELOPMENT_MANAGER },
    { id: 'da-001', name: 'Data Analyst', email: 'da@apa.com', userType: UserType.APAER_DATA_ANALYST },
    { id: 'ec-001', name: 'Expert Consultant', email: 'ec@apa.com', userType: UserType.APAER_EXPERT_CONSULTANT },
    { id: 'tr-001', name: 'Trainer User', email: 'trainer@apa.com', userType: UserType.APAER_TRAINER },
    { id: 'lpl-001', name: 'Local Partner Lead', email: 'lead@apa.com', userType: UserType.APAER_LOCAL_PARTNER_LEAD },
    { id: 'au-001', name: 'Auditor User', email: 'auditor@apa.com', userType: UserType.APAER_AUDITOR },
];


export const MOCK_TOURS: Tour[] = [
  {
    id: '1',
    title: {
      en: 'Ethical Leadership Safari in Kenya',
      fr: 'Safari du Leadership Éthique au Kenya',
    },
    description: {
      en: 'An immersive journey into sustainable business practices and community engagement in Nairobi and the Maasai Mara.',
      fr: 'Un voyage immersif dans les pratiques commerciales durables et l\'engagement communautaire à Nairobi et dans le Maasai Mara.',
    },
    destination: { en: 'Kenya', fr: 'Kenya' },
    industry: { en: 'Leadership', fr: 'Leadership' },
    image: 'https://source.unsplash.com/0K720_aPq4U',
    price: { en: '$3,500 USD', fr: '3 500 $US' },
    targetAudience: { en: 'Social Entrepreneurs, Business Leaders', fr: 'Entrepreneurs Sociaux, Chefs d\'Entreprise' },
    objectives: [
        'Understand APA Framework principles in action.',
        'Network with local innovators.',
        'Develop strategies for ethical market entry.'
    ],
    duration: { en: '10 Days', fr: '10 Jours'},
    difficulty: TourDifficulty.PIONEER,
    detailedDescription: {
      en: 'Dive deeper into the heart of Kenya with our Ethical Leadership Safari. This tour is meticulously designed for individuals passionate about making a difference. Beyond the breathtaking landscapes of the Maasai Mara and the vibrant city life of Nairobi, you will engage directly with local communities, learn from successful social entrepreneurs, and participate in workshops focused on the APA Framework. Explore sustainable tourism models, understand the challenges and triumphs of ethical businesses in Africa, and build lasting connections with peers and local leaders. This is more than a tour; it\'s a transformative experience aimed at fostering a new generation of accountable leaders.',
      fr: 'Plongez au cœur du Kenya avec notre Safari du Leadership Éthique. Ce voyage est méticuleusement conçu pour les personnes passionnées par le désir de faire une différence. Au-delà des paysages époustouflants du Maasai Mara et de la vie urbaine animée de Nairobi, vous interagirez directement avec les communautés locales, apprendrez des entrepreneurs sociaux prospères et participerez à des ateliers axés sur le Cadre APA. Explorez des modèles de tourisme durable, comprenez les défis et les triomphes des entreprises éthiques en Afrique, et tissez des liens durables avec des pairs et des dirigeants locaux. C\'est plus qu\'un voyage ; c\'est une expérience transformatrice visant à encourager une nouvelle génération de leaders responsables.',
    },
    itinerary: [
      { day: { en: 'Day 1', fr: 'Jour 1' }, title: { en: 'Arrival in Nairobi & Welcome Dinner', fr: 'Arrivée à Nairobi et Dîner de Bienvenue' }, description: { en: 'Transfer to hotel, orientation, and a group dinner with an introduction to the APA Framework.', fr: 'Transfert à l\'hôtel, orientation et dîner de groupe avec une introduction au Cadre APA.'} },
      { day: { en: 'Day 2', fr: 'Jour 2' }, title: { en: 'Social Enterprise Hubs in Nairobi', fr: 'Centres d\'Entreprises Sociales à Nairobi' }, description: { en: 'Visit local incubators and social businesses making an impact.', fr: 'Visite d\'incubateurs locaux et d\'entreprises sociales ayant un impact.'} },
      { day: { en: 'Days 3-5', fr: 'Jours 3-5' }, title: { en: 'Maasai Mara Immersion', fr: 'Immersion dans le Maasai Mara' }, description: { en: 'Travel to Maasai Mara, engage with community projects, wildlife safari focused on conservation.', fr: 'Voyage vers le Maasai Mara, participation à des projets communautaires, safari axé sur la conservation.'} },
      { day: { en: 'Day 6', fr: 'Jour 6' }, title: { en: 'Workshop: Ethical Business Strategies', fr: 'Atelier : Stratégies Commerciales Éthiques' }, description: { en: 'Interactive workshop on applying APA principles in diverse contexts.', fr: 'Atelier interactif sur l\'application des principes APA dans divers contextes.'} },
      { day: { en: 'Days 7-9', fr: 'Jours 7-9' }, title: { en: 'Field Visits & Co-creation Sessions', fr: 'Visites sur le Terrain et Séances de Co-création' }, description: { en: 'Visits to APA partner projects, co-creation workshops with local stakeholders.', fr: 'Visites de projets partenaires de l\'APA, ateliers de co-création avec les acteurs locaux.'} },
      { day: { en: 'Day 10', fr: 'Jour 10' }, title: { en: 'Departure', fr: 'Départ' }, description: { en: 'Final reflections and departure from Nairobi.', fr: 'Réflexions finales et départ de Nairobi.'} },
    ],
    gallery: [
      { type: 'image', url: 'https://source.unsplash.com/Lrd2A-q49v0' },
      { type: 'video', url: 'https://www.youtube.com/embed/LXb3EKWsInQ' },
      { type: 'image', url: 'https://source.unsplash.com/Y62tS6pL52I' },
      { type: 'image', url: 'https://source.unsplash.com/v2a-n-TaZqA' },
      { type: 'image', url: 'https://source.unsplash.com/9_gS0v2m2vU' },
    ],
    facilitators: [
      { name: { en: 'Dr. Evelyn Wanjiru', fr: 'Dr. Evelyn Wanjiru' }, bio: { en: 'Lead expert on sustainable development and APA Framework architect.', fr: 'Experte principale en développement durable et architecte du Cadre APA.' }, image: 'https://source.unsplash.com/mEZ3PoFGs_k' },
      { name: { en: 'Mr. David Kobia', fr: 'M. David Kobia' }, bio: { en: 'Renowned social entrepreneur with 15+ years of experience in East Africa.', fr: 'Entrepreneur social renommé avec plus de 15 ans d\'expérience en Afrique de l\'Est.' }, image: 'https://source.unsplash.com/pAtA_Lq_tvo' },
    ],
    testimonials: [
      { quote: { en: 'This tour was life-changing! The insights and connections I made are invaluable.', fr: 'Ce voyage a changé ma vie ! Les connaissances et les liens que j\'ai créés sont inestimables.' }, author: { en: 'Jane D., USA', fr: 'Jane D., États-Unis' }, rating: 5 },
      { quote: { en: 'A perfect blend of learning, cultural immersion, and real-world impact.', fr: 'Un mélange parfait d\'apprentissage, d\'immersion culturelle et d\'impact concret.' }, author: { en: 'Pierre L., France', fr: 'Pierre L., France' }, rating: 4 },
    ],
    faq: [
      { question: { en: 'What does the tour price include?', fr: 'Que comprend le prix du voyage ?' }, answer: { en: 'Includes accommodation, most meals, ground transportation, park fees, and all scheduled activities/workshops. Flights to/from Kenya are not included.', fr: 'Comprend l\'hébergement, la plupart des repas, le transport terrestre, les frais de parc et toutes les activités/ateliers prévus. Les vols vers/depuis le Kenya ne sont pas inclus.' } },
      { question: { en: 'Is travel insurance required?', fr: 'L\'assurance voyage est-elle obligatoire ?' }, answer: { en: 'Yes, comprehensive travel insurance is mandatory for all participants.', fr: 'Oui, une assurance voyage complète est obligatoire pour tous les participants.' } },
    ],
  },
  {
    id: '2',
    title: {
      en: 'Tech Innovation Tour in Rwanda',
      fr: 'Tour de l\'Innovation Technologique au Rwanda',
    },
    description: {
      en: 'Explore Kigali\'s booming tech scene and learn about digital transformation in East Africa.',
      fr: 'Explorez la scène technologique en plein essor de Kigali et découvrez la transformation numérique en Afrique de l\'Est.',
    },
    destination: { en: 'Rwanda', fr: 'Rwanda' },
    industry: { en: 'Technology', fr: 'Technologie' },
    image: 'https://source.unsplash.com/_y8_I0V2_M4',
    price: { en: '$3,200 USD', fr: '3 200 $US' },
    targetAudience: { en: 'Tech Professionals, Investors', fr: 'Professionnels de la Tech, Investisseurs' },
    objectives: [
        'Connect with Rwandan tech startups and incubators.',
        'Learn about government initiatives supporting innovation.',
        'Identify investment and partnership opportunities.'
    ],
    duration: { en: '7 Days', fr: '7 Jours'},
    difficulty: TourDifficulty.EXPLORER,
  },
  {
    id: '3',
    title: {
      en: 'Sustainable Agriculture Immersion in Ghana',
      fr: 'Immersion en Agriculture Durable au Ghana',
    },
    description: {
      en: 'Discover innovative farming techniques and value chain development in Ghana\'s agricultural sector.',
      fr: 'Découvrez des techniques agricoles innovantes et le développement de chaînes de valeur dans le secteur agricole du Ghana.',
    },
    destination: { en: 'Ghana', fr: 'Ghana' },
    industry: { en: 'Agriculture', fr: 'Agriculture' },
    image: 'https://source.unsplash.com/r9k91QzGf64',
    price: { en: '$3,000 USD', fr: '3 000 $US' },
    targetAudience: { en: 'Agribusiness Professionals, Impact Investors', fr: 'Professionnels de l\'Agroalimentaire, Investisseurs d\'Impact' },
    objectives: [
        'Visit sustainable farms and cooperatives.',
        'Understand challenges and opportunities in African agriculture.',
        'Explore fair trade practices.'
    ],
    duration: { en: '8 Days', fr: '8 Jours'},
    difficulty: TourDifficulty.ADVENTURER,
  },
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'res1',
    title: { en: 'The APA Framework for Ethical Business', fr: 'Le Cadre APA pour une Entreprise Éthique' },
    type: { en: 'Article', fr: 'Article' },
    industry: { en: 'Framework', fr: 'Cadre' },
    date: '2024-07-15',
    summary: {
      en: 'An in-depth look at the core principles of the APA Framework and its application in African markets.',
      fr: 'Un regard approfondi sur les principes fondamentaux du Cadre APA et son application sur les marchés africains.',
    },
    imageUrl: 'https://source.unsplash.com/3_s2z2-c3z0',
    isInternal: true,
    content: {
      en: `## Understanding the APA Framework \n\nThe Accountable Partners for Africa (APA) Framework is a comprehensive guide designed to foster ethical business practices, sustainable development, and trusted partnerships within the African continent. It emphasizes co-creation, shared value, and a deep understanding of local contexts. \n\n### Core Principles:\n\n*   **Accountability:** Ensuring transparency and responsibility in all operations.\n*   **Partnership:** Building equitable relationships with local communities and stakeholders.\n*   **Advancement:** Committing to positive social, economic, and environmental impact. \n\nThis article explores each principle in detail, providing case studies and practical steps for organizations looking to engage meaningfully with African markets. The framework is not just a set of guidelines but a transformative approach to business that prioritizes long-term value and mutual benefit. \n\n### Application in African Markets \n\nNavigating the diverse markets of Africa requires more than just capital; it demands cultural intelligence, ethical commitment, and a willingness to co-create solutions. The APA Framework provides tools and methodologies to: \n\n1.  Assess market readiness and identify key local partners.\n2.  Develop inclusive value chains that benefit local SMEs and communities.\n3.  Measure and report on social and environmental impact effectively. \n\nBy adopting the APA Framework, organizations can build resilience, enhance their reputation, and unlock the immense potential of African markets in a way that is both profitable and principled.`,
      fr: `## Comprendre le Cadre APA \n\nLe Cadre des Partenaires Responsables pour l'Afrique (APA) est un guide complet conçu pour promouvoir des pratiques commerciales éthiques, un développement durable et des partenariats de confiance sur le continent africain. Il met l'accent sur la co-création, la valeur partagée et une compréhension approfondie des contextes locaux. \n\n### Principes Fondamentaux :\n\n*   **Responsabilité :** Assurer la transparence et la responsabilité dans toutes les opérations.\n*   **Partenariat :** Bâtir des relations équitables avec les communautés locales et les parties prenantes.\n*   **Avancement :** S'engager en faveur d'un impact social, économique et environnemental positif. \n\nCet article explore chaque principe en détail, fournissant des études de cas et des étapes pratiques pour les organisations cherchant à s'engager de manière significative sur les marchés africains. Le cadre n'est pas seulement un ensemble de lignes directrices, mais une approche transformatrice des affaires qui priorise la valeur à long terme et le bénéfice mutuel. \n\n### Application sur les Marchés Africains \n\nNaviguer sur les marchés diversifiés de l'Afrique exige plus que du capital ; cela demande une intelligence culturelle, un engagement éthique et une volonté de co-créer des solutions. Le Cadre APA fournit des outils et des méthodologies pour : \n\n1.  Évaluer la préparation du marché et identifier les partenaires locaux clés.\n2.  Développer des chaînes de valeur inclusives qui bénéficient aux PME et communautés locales.\n3.  Mesurer et rendre compte efficacement de l'impact social et environnemental. \n\nEn adoptant le Cadre APA, les organisations peuvent renforcer leur résilience, améliorer leur réputation et libérer l'immense potentiel des marchés africains d'une manière à la fois rentable et fondée sur des principes.`,
    }
  },
  {
    id: 'res2',
    title: { en: 'Case Study: Social Impact in Action', fr: 'Étude de Cas : L\'Impact Social en Action' },
    type: { en: 'Case Study', fr: 'Étude de Cas' },
    industry: { en: 'Social Enterprise', fr: 'Entreprise Sociale' },
    date: '2024-06-28',
    summary: {
      en: 'How a local enterprise leveraged APA principles to achieve sustainable growth and community development.',
      fr: 'Comment une entreprise locale a exploité les principes de l\'APA pour atteindre une croissance durable et un développement communautaire.',
    },
    imageUrl: 'https://source.unsplash.com/8LtrMQfeDkQ',
    link: 'https://example.com/case-study-apa', // External link
    isInternal: false,
  },
  {
    id: 'res3',
    title: { en: 'Video: Voices of APA Alumni', fr: 'Vidéo : Paroles d\'Anciens de l\'APA' },
    type: { en: 'Video', fr: 'Vidéo' },
    industry: { en: 'Leadership', fr: 'Leadership' },
    date: '2024-05-10',
    summary: {
      en: 'Hear directly from past tour participants about their transformative experiences with APA.',
      fr: 'Écoutez directement les anciens participants aux voyages parler de leurs expériences transformatrices avec l\'APA.',
    },
    imageUrl: 'https://source.unsplash.com/nF8ss_3z_cI',
    link: 'https://youtube.com/watch?v=exampleAPA', // External link
    isInternal: false,
  },
   {
    id: 'res4',
    title: { en: 'Guide to Co-Creation Workshops', fr: 'Guide des Ateliers de Co-création' },
    type: { en: 'Guide', fr: 'Guide' },
    industry: { en: 'Methodology', fr: 'Méthodologie' },
    date: '2024-07-01',
    summary: {
      en: 'A practical guide for facilitators on planning and executing effective co-creation workshops with diverse stakeholders.',
      fr: 'Un guide pratique pour les facilitateurs sur la planification et l\'exécution d\'ateliers de co-création efficaces avec diverses parties prenantes.',
    },
    imageUrl: 'https://source.unsplash.com/gMsnXqILjp4',
    isInternal: true,
    content: {
      en: `## Facilitating Co-Creation \n\nThis guide provides step-by-step instructions... (content for the guide)...`,
      fr: `## Faciliter la Co-création \n\nCe guide fournit des instructions étape par étape... (contenu du guide)...`,
    }
  },
];

export const MOCK_SOLUTIONS: Solution[] = [
  {
    id: 'apa-assessment-platform',
    title: {
      en: 'APA Framework Assessment & Certification Platform',
      fr: 'Plateforme d\'Évaluation et de Certification du Cadre APA'
    },
    summary: {
      en: 'A dynamic SaaS tool to operationalize the APA Framework, track ethical performance, and achieve official APA certification.',
      fr: 'Un outil SaaS dynamique pour opérationnaliser le Cadre APA, suivre la performance éthique et obtenir une certification officielle APA.'
    },
    icon: 'CheckBadgeIcon',
    details: {
      painPoint: {
        en: 'International organizations often struggle with the complexity of implementing and demonstrating their commitment to ethical and effective partnership in Africa. The APA Framework, while comprehensive, is presented as a detailed questionnaire that can be daunting to operationalize manually, making it difficult to track progress, identify specific gaps, and report on performance to stakeholders.',
        fr: 'Les organisations internationales peinent souvent à mettre en œuvre et à démontrer leur engagement envers un partenariat éthique et efficace en Afrique. Le Cadre APA, bien que complet, se présente comme un questionnaire détaillé qui peut être intimidant à utiliser manuellement, rendant difficile le suivi des progrès, l\'identification des lacunes et le reporting des performances.'
      },
      competitiveAdvantage: {
        en: 'Transforms the static APA questionnaire into a dynamic, user-friendly digital tool. Offering an official "APA Certification" creates a powerful, tangible asset that organizations can use to build trust and bolster their brand reputation. This certification serves as a clear market differentiator, signaling a verified commitment to accountability.',
        fr: 'Transforme le questionnaire statique APA en un outil numérique dynamique et convivial. L\'offre d\'une "Certification APA" officielle crée un atout tangible et puissant que les organisations peuvent utiliser pour renforcer la confiance et leur réputation. Cette certification constitue un différenciateur clair sur le marché, signant un engagement vérifié envers la responsabilité.'
      },
      revenueGeneration: {
        en: 'A tiered Software-as-a-Service (SaaS) model is ideal. Tier 1 (Basic) for self-assessment. Tier 2 (Professional) for advanced analytics, progress tracking, and benchmarking. Tier 3 (Certification) includes a verified audit process leading to an official "APA Certified Partner" designation.',
        fr: 'Un modèle SaaS (Software-as-a-Service) à plusieurs niveaux est idéal. Niveau 1 (Basique) pour l\'auto-évaluation. Niveau 2 (Professionnel) pour des analyses avancées, le suivi des progrès et le benchmarking. Niveau 3 (Certification) inclut un processus d\'audit vérifié menant à une désignation officielle de "Partenaire Certifié APA".'
      },
      aiLeverage: {
        en: 'AI algorithms analyze assessment data to provide instant, actionable recommendations. An AI-powered dashboard visualizes strengths and weaknesses, while machine learning models can identify patterns and predict potential risk areas, transforming the tool into a strategic planning utility.',
        fr: 'Les algorithmes d\'IA analysent les données d\'évaluation pour fournir des recommandations instantanées et exploitables. Un tableau de bord alimenté par l\'IA visualise les forces et les faiblesses, tandis que des modèles de machine learning peuvent identifier des schémas et prédire des zones de risque potentielles, transformant l\'outil en un utilitaire de planification stratégique.'
      }
    }
  },
  {
    id: 'mae-toolkit',
    title: {
      en: '"Made in Africa Evaluation (MAE)" Toolkit',
      fr: 'Boîte à Outils "Évaluation Faite en Afrique (EFA)"'
    },
    summary: {
      en: 'A first-mover M&E toolkit based on decolonial principles, centering African contexts, cultures, and philosophies like Ubuntu.',
      fr: 'Une boîte à outils de S&E pionnière, basée sur des principes décoloniaux, et centrée sur les contextes, cultures et philosophies africaines comme l\'Ubuntu.'
    },
    icon: 'ClipboardDocumentCheckIcon',
    details: {
      painPoint: {
        en: 'Traditional, top-down M&E frameworks are often "extractive" and based on "Global North development theory," failing to capture the nuanced realities and priorities of African communities. Organizations lack the specific tools to adopt more authentic, participatory approaches.',
        fr: 'Les cadres de S&E traditionnels et descendants sont souvent "extractifs" et basés sur la "théorie du développement du Nord", ne parvenant pas à saisir les réalités nuancées et les priorités des communautés africaines. Les organisations manquent d\'outils spécifiques pour adopter des approches plus authentiques et participatives.'
      },
      competitiveAdvantage: {
        en: 'Explicitly founded on decolonial principles, centering African contexts, cultures, and philosophies. It provides practical tools like templates for participatory data collection and frameworks for incorporating local knowledge, moving MAE from theory to achievable practice.',
        fr: 'Explicitement fondé sur des principes décoloniaux, centrant les contextes, cultures et philosophies africaines. Il fournit des outils pratiques tels que des modèles pour la collecte de données participative et des cadres pour intégrer les savoirs locaux, faisant passer l\'EFA de la théorie à la pratique réalisable.'
      },
      revenueGeneration: {
        en: 'A SaaS model targeting NGOs, foundations, and corporate social investment (CSI) departments. Licenses can be priced per project or per organization, supplemented with high-margin training workshops on MAE methodology.',
        fr: 'Un modèle SaaS ciblant les ONG, les fondations et les départements d\'investissement social des entreprises (CSI). Les licences peuvent être tarifées par projet ou par organisation, complétées par des ateliers de formation à forte marge sur la méthodologie EFA.'
      },
      aiLeverage: {
        en: 'Le traitement du langage naturel (NLP) analyse les données qualitatives issues de groupes de discussion, de séances de narration et d\'enquêtes communautaires en langues locales pour identifier les thèmes et sentiments clés. Cela automate un processus laborieux, rendant l\'évaluation approfondie et culturellement adaptée plus évolutive.',
        fr: 'Le traitement du langage naturel (NLP) analyse les données qualitatives issues de groupes de discussion, de séances de narration et d\'enquêtes communautaires en langues locales pour identifier les thèmes et sentiments clés. Cela automatise un processus laborieux, rendant l\'évaluation approfondie et culturellement adaptée plus évolutive.'
      }
    }
  },
  {
    id: 'grm-service',
    title: {
      en: 'Grievance Redress Mechanism (GRM) Co-design Service',
      fr: 'Service de Co-conception de Mécanisme de Réparation des Griefs (MRG)'
    },
    summary: {
      en: 'A hybrid consulting and SaaS offering to build and manage effective, trusted, and community-centric grievance mechanisms.',
      fr: 'Une offre hybride de conseil et de SaaS pour construire et gérer des mécanismes de réparation des griefs efficaces, fiables et centrés sur la communauté.'
    },
    icon: 'ChatBubbleLeftRightIcon',
    details: {
      painPoint: {
        en: 'Many organizations lack the in-house expertise to create a Grievance Redress Mechanism (GRM) that is truly effective, accessible, and trusted by local communities, posing a significant operational and reputational risk.',
        fr: 'De nombreuses organisations manquent de l\'expertise interne pour créer un Mécanisme de Réparation des Griefs (MRG) qui soit vraiment efficace, accessible et digne de confiance pour les communautés locales, ce qui représente un risque opérationnel et réputationnel important.'
      },
      competitiveAdvantage: {
        en: 'Focus on co-design, facilitating a participatory process where the GRM is built with the community, incorporating traditional dispute resolution methods. This approach builds the local ownership and trust critical for the mechanism\'s legitimacy and success.',
        fr: 'L\'accent est mis sur la co-conception, facilitant un processus participatif où le MRG est construit avec la communauté, en intégrant les méthodes traditionnelles de résolution des conflits. Cette approche renforce l\'appropriation locale et la confiance, essentielles à la légitimité et au succès du mécanisme.'
      },
      revenueGeneration: {
        en: 'A hybrid model with diverse revenue streams: high-value, project-based consulting fees for co-design and implementation, and recurring revenue from a SaaS platform to manage, track, and analyze grievances.',
        fr: 'Un modèle hybride avec diverses sources de revenus : des honoraires de conseil à haute valeur ajoutée basés sur des projets pour la co-conception et la mise en œuvre, et des revenus récurrents d\'une plateforme SaaS pour gérer, suivre et analyser les griefs.'
      },
      aiLeverage: {
        en: 'An AI-powered chatbot serves as an initial point of contact in multiple local languages for grievance submission. AI can then automatically categorize, triage, and route complaints, and analyze aggregate data to identify systemic issues and trends.',
        fr: 'Un chatbot alimenté par l\'IA sert de premier point de contact en plusieurs langues locales pour la soumission des griefs. L\'IA peut ensuite automatiquement catégoriser, trier et acheminer les plaintes, et analyser les données agrégées pour identifier les problèmes et tendances systémiques.'
      }
    }
  },
  {
    id: 'leadership-program',
    title: {
      en: 'Africanized Leadership Development Program',
      fr: 'Programme de Développement du Leadership Africanisé'
    },
    summary: {
      en: 'A culturally resonant leadership program built on APA principles to develop authentic African leaders and combat tokenism.',
      fr: 'Un programme de leadership culturellement pertinent, fondé sur les principes de l\'APA, pour former d\'authentiques leaders africains et lutter contre le symbolisme.'
    },
    icon: 'AcademicCapIcon',
    details: {
      painPoint: {
        en: 'International organizations recognize the need to "Africanize" their leadership but often fall into the trap of tokenism. Standard Western leadership programs fail to address the specific systemic biases and cultural contexts necessary to develop authentic African leaders.',
        fr: 'Les organisations internationales reconnaissent la nécessité d\'"africaniser" leur leadership mais tombent souvent dans le piège du symbolisme. Les programmes de leadership occidentaux standards ne parviennent pas à aborder les biais systémiques et les contextes culturels spécifiques nécessaires au développement de leaders africains authentiques.'
      },
      competitiveAdvantage: {
        en: 'The curriculum is uniquely built on the APA\'s principles for equitable career advancement, integrating African leadership philosophies (e.g., Ubuntu) and management traditions. It offers a culturally resonant alternative to generic MBA-style training.',
        fr: 'Le curriculum est spécialement conçu sur la base des principes de l\'APA pour une progression de carrière équitable, intégrant des philosophies de leadership africaines (par ex., Ubuntu) et des traditions de gestion. Il offre une alternative culturellement pertinente à la formation générique de style MBA.'
      },
      revenueGeneration: {
        en: 'A service-based model with low initial capital needs. Sold as a high-value corporate training package, offered through formats like in-person bootcamps, year-long cohort programs, or a scalable online version with live coaching.',
        fr: 'Un modèle basé sur les services avec de faibles besoins en capital initial. Vendu comme un package de formation d\'entreprise à haute valeur, proposé sous des formats tels que des bootcamps en présentiel, des programmes de cohorte d\'un an, ou une version en ligne évolutive avec coaching en direct.'
      },
      aiLeverage: {
        en: 'AI creates highly personalized development journeys, adapting content based on pre-assessments. AI-driven simulations provide a safe environment to practice navigating complex, culturally specific leadership challenges and facilitates mentorship matching.',
        fr: 'L\'IA crée des parcours de développement hautement personnalisés, adaptant le contenu en fonction des pré-évaluations. Les simulations basées sur l\'IA offrent un environnement sûr pour s\'entraîner à gérer des défis de leadership complexes et culturellement spécifiques, et facilite la mise en relation de mentorat.'
      }
    }
  },
  {
    id: 'ai-governance-toolset',
    title: {
      en: 'AI Governance & Data Colonialism Prevention Toolset',
      fr: 'Ensemble d\'Outils de Gouvernance de l\'IA et de Prévention du Colonialisme des Données'
    },
    summary: {
      en: 'A specialized toolset to audit AI systems for bias and ethical risks, aligning them with emerging African-centric principles.',
      fr: 'Un ensemble d\'outils spécialisés pour auditer les systèmes d\'IA en matière de biais et de risques éthiques, en les alignant sur les principes émergents centrés sur l\'Afrique.'
    },
    icon: 'CpuChipIcon',
    details: {
        painPoint: {
            en: 'The rapid deployment of AI in Africa carries the risk of perpetuating biases and creating new forms of "data colonialism." Organizations lack frameworks to ensure their AI systems are ethical, fair, and aligned with African values.',
            fr: 'Le déploiement rapide de l\'IA en Afrique comporte le risque de perpétuer les biais et de créer de nouvelles formes de "colonialisme des données". Les organisations manquent de cadres pour garantir que leurs systèmes d\'IA sont éthiques, équitables et alignés sur les valeurs africaines.'
        },
        competitiveAdvantage: {
            en: 'This toolset provides a clear, actionable audit framework specifically designed for the African context. It moves beyond generic AI ethics to address issues like data sovereignty and algorithmic fairness for diverse African populations, establishing a new standard for responsible AI.',
            fr: 'Cet ensemble d\'outils fournit un cadre d\'audit clair et exploitable, spécialement conçu pour le contexte africain. Il va au-delà de l\'éthique générique de l\'IA pour aborder des questions telles que la souveraineté des données et l\'équité algorithmique pour les diverses populations africaines, établissant une nouvelle norme pour une IA responsable.'
        },
        revenueGeneration: {
            en: 'A combination of SaaS for the audit tool and high-value consulting for implementation, bias mitigation, and policy development. Targets tech companies, governments, and large NGOs deploying AI solutions.',
            fr: 'Une combinaison de SaaS pour l\'outil d\'audit et de conseil à haute valeur ajoutée pour la mise en œuvre, l\'atténuation des biais et l\'élaboration de politiques. Cible les entreprises technologiques, les gouvernements et les grandes ONG qui déploient des solutions d\'IA.'
        },
        aiLeverage: {
            en: 'AI is used to power the audit tool itself, automatically scanning models and datasets for potential biases or ethical red flags. It can simulate outcomes across different demographic groups to proactively identify areas of concern.',
            fr: 'L\'IA est utilisée pour alimenter l\'outil d\'audit lui-même, en scannant automatiquement les modèles et les ensembles de données à la recherche de biais potentiels ou de signaux d\'alarme éthiques. Elle peut simuler des résultats pour différents groupes démographiques afin d\'identifier de manière proactive les domaines de préoccupation.'
        }
    }
  },
  {
    id: 'shared-value-incubator',
    title: {
      en: 'Shared Value Business Model Incubator',
      fr: 'Incubateur de Modèles Économiques à Valeur Partagée'
    },
    summary: {
      en: "An Africa-focused accelerator to help corporations design and launch business models that integrate social impact with profitability.",
      fr: "Un accélérateur axé sur l'Afrique pour aider les entreprises à concevoir et lancer des modèles économiques qui intègrent l'impact social à la rentabilité."
    },
    icon: 'RocketLaunchIcon',
    details: {
      painPoint: {
        en: 'Companies want to create social impact but struggle to move beyond CSR to core business models that are also profitable.',
        fr: 'Les entreprises veulent créer un impact social mais peinent à dépasser la RSE pour adopter des modèles économiques rentables.'
      },
      competitiveAdvantage: {
        en: 'A structured program with African market experts, co-creation methodologies, and access to a network of impact investors.',
        fr: 'Un programme structuré avec des experts du marché africain, des méthodologies de co-création et un accès à un réseau d\'investisseurs d\'impact.'
      },
      revenueGeneration: {
        en: 'A fee-based accelerator program, with potential for equity in successful ventures.',
        fr: 'Un programme d\'accélération payant, avec un potentiel de participation au capital des entreprises retenues.'
      },
      aiLeverage: {
        en: 'AI-powered market analysis to identify shared value opportunities and financial modeling tools to project dual returns (social and financial).',
        fr: 'Analyse de marché par IA pour identifier les opportunités de valeur partagée et outils de modélisation financière pour projeter les doubles rendements (sociaux et financiers).'
      }
    }
  },
  {
    id: 'local-partnership-marketplace',
    title: {
      en: 'African Local Expertise & Partnership Marketplace',
      fr: 'Marché de l\'Expertise Locale et des Partenariats Africains'
    },
    summary: {
      en: "A curated marketplace connecting international organizations with vetted, credible local partners (NGOs, consultants, SMEs).",
      fr: "Un marché organisé connectant les organisations internationales avec des partenaires locaux crédibles et vérifiés (ONG, consultants, PME)."
    },
    icon: 'UserGroupIcon',
    details: {
      painPoint: {
        en: 'International organizations waste time and resources finding reliable local partners, often relying on limited networks, which increases project risk.',
        fr: 'Les organisations internationales perdent du temps et des ressources à trouver des partenaires locaux fiables, augmentant le risque des projets.'
      },
      competitiveAdvantage: {
        en: 'A highly vetted platform featuring partners certified through the APA Framework, ensuring quality and accountability. Includes a trust-based rating system.',
        fr: 'Une plateforme de partenaires hautement qualifiés et certifiés par le Cadre APA, garantissant qualité et responsabilité, avec un système de notation basé sur la confiance.'
      },
      revenueGeneration: {
        en: 'Subscription fees for international organizations to access the database, and a commission on successfully brokered partnerships.',
        fr: 'Frais d\'abonnement pour les organisations internationales et commission sur les partenariats conclus avec succès.'
      },
      aiLeverage: {
        en: 'AI-driven matchmaking algorithm that suggests the best partners based on project requirements, sector, geographic focus, and organizational values.',
        fr: 'Algorithme de matchmaking par IA qui suggère les meilleurs partenaires en fonction des besoins du projet, du secteur, de la zone géographique et des valeurs.'
      }
    }
  },
  {
    id: 'business-model-sprint',
    title: {
      en: '"Contextually Relevant Business Models" Design Sprint Service',
      fr: 'Service de Sprint de Conception de "Modèles Économiques Contextuellement Pertinents"'
    },
    summary: {
      en: "A high-value, 5-day consulting service to rapidly prototype and validate business models adapted for Africa's diverse markets.",
      fr: "Un service de conseil à haute valeur ajoutée de 5 jours pour prototyper et valider rapidement des modèles économiques adaptés aux divers marchés africains."
    },
    icon: 'BeakerIcon',
    details: {
      painPoint: {
        en: 'Companies often try to "copy-paste" Western business models into African markets, leading to failure due to a lack of understanding of local context.',
        fr: 'Les entreprises échouent souvent en essayant de copier-coller des modèles économiques occidentaux en Afrique, par manque de compréhension du contexte local.'
      },
      competitiveAdvantage: {
        en: 'An intensive, facilitated process that integrates APA\'s deep contextual knowledge to produce a validated prototype in one week, saving months of development time.',
        fr: 'Un processus intensif et facilité qui intègre les connaissances contextuelles de l\'APA pour produire un prototype validé en une semaine, économisant des mois de développement.'
      },
      revenueGeneration: {
        en: 'Fixed-fee service for the 5-day sprint.',
        fr: 'Service à tarif fixe pour le sprint de 5 jours.'
      },
      aiLeverage: {
        en: 'AI tools for rapid market simulation and consumer behavior analysis to test assumptions during the sprint.',
        fr: 'Outils d\'IA pour la simulation rapide du marché et l\'analyse du comportement des consommateurs afin de tester les hypothèses pendant le sprint.'
      }
    }
  },
  {
    id: 'trust-audit-service',
    title: {
      en: 'Trust Audit & Deep Stakeholder Mapping Service',
      fr: 'Service d\'Audit de Confiance et de Cartographie Approfondie des Parties Prenantes'
    },
    summary: {
      en: "Go beyond surface-level analysis to uncover true community sentiment, identify marginalized voices, and assess internal readiness for authentic partnership.",
      fr: "Allez au-delà de l'analyse superficielle pour découvrir le véritable sentiment de la communauté, identifier les voix marginalisées et évaluer la préparation interne à un partenariat authentique."
    },
    icon: 'ClipboardDocumentCheckIcon',
    details: {
      painPoint: {
        en: 'Organizations often misjudge community sentiment and power dynamics, leading to failed projects and damaged reputations. Standard stakeholder analysis misses crucial nuances.',
        fr: 'Les organisations jugent souvent mal le sentiment de la communauté et les dynamiques de pouvoir, ce qui mène à des échecs de projets et nuit à leur réputation.'
      },
      competitiveAdvantage: {
        en: 'Utilizes ethnographic methods and Political Economy Analysis (PEA) to provide a nuanced understanding of trust levels, informal power structures, and historical grievances.',
        fr: 'Utilise des méthodes ethnographiques et l\'Analyse de l\'Économie Politique (AEP) pour une compréhension nuancée des niveaux de confiance et des structures de pouvoir informelles.'
      },
      revenueGeneration: {
        en: 'Project-based consulting fees.',
        fr: 'Honoraires de conseil basés sur les projets.'
      },
      aiLeverage: {
        en: 'AI-powered sentiment analysis of local language media and social media to complement on-the-ground research and identify trends.',
        fr: 'Analyse des sentiments par IA des médias en langues locales pour compléter la recherche sur le terrain et identifier les tendances.'
      }
    }
  },
  {
    id: 'partnership-readiness-program',
    title: {
      en: 'Investor & Corporate Partnership Readiness Program',
      fr: 'Programme de Préparation au Partenariat pour Investisseurs et Entreprises'
    },
    summary: {
      en: "Shift your organization's mindset from preparing communities for investment to preparing your team for equitable partnership.",
      fr: "Changez la mentalité de votre organisation : ne préparez plus les communautés à l'investissement, mais préparez votre équipe à un partenariat équitable."
    },
    icon: 'AcademicCapIcon',
    details: {
      painPoint: {
        en: 'Corporate and investor teams often lack the cultural competency and understanding of equitable partnership models required to succeed in Africa.',
        fr: 'Les équipes d\'entreprises et d\'investisseurs manquent souvent de la compétence culturelle nécessaire pour réussir en Afrique.'
      },
      competitiveAdvantage: {
        en: 'A unique curriculum focused on decolonizing investment approaches, building cultural intelligence, and operationalizing the APA Framework within corporate structures.',
        fr: 'Un programme unique axé sur la décolonisation des approches d\'investissement et le renforcement de l\'intelligence culturelle via le Cadre APA.'
      },
      revenueGeneration: {
        en: 'Corporate training packages, executive coaching, and online certification programs.',
        fr: 'Packages de formation d\'entreprise, coaching exécutif et programmes de certification en ligne.'
      },
      aiLeverage: {
        en: 'AI-driven simulation exercises that allow teams to practice navigating complex, culturally specific partnership scenarios in a risk-free environment.',
        fr: 'Exercices de simulation par IA pour s\'entraîner à gérer des scénarios de partenariat complexes et culturellement spécifiques sans risque.'
      }
    }
  },
  {
    id: 'public-sector-advisory',
    title: {
      en: 'Public Sector APA Policy Advisory',
      fr: 'Conseil en Politiques Publiques APA pour le Secteur Public'
    },
    summary: {
      en: "Helping governments and public-private partnerships (PPPs) embed APA principles into national policy to attract high-quality, sustainable investment.",
      fr: "Aider les gouvernements et les partenariats public-privé (PPP) à intégrer les principes de l'APA dans les politiques nationales pour attirer des investissements durables et de haute qualité."
    },
    icon: 'BuildingStorefrontIcon',
    details: {
      painPoint: {
        en: 'Governments want to attract foreign investment but often struggle to create policies that ensure benefits flow to local communities and that projects are sustainable.',
        fr: 'Les gouvernements peinent à créer des politiques qui garantissent que l\'investissement étranger profite aux communautés locales de manière durable.'
      },
      competitiveAdvantage: {
        en: 'APA\'s unique position as a neutral intermediary trusted by communities, companies, and governments allows it to provide credible policy advice.',
        fr: 'La position neutre et crédible de l\'APA lui permet de fournir des conseils politiques fiables à toutes les parties prenantes.'
      },
      revenueGeneration: {
        en: 'Retainer-based advisory contracts with government agencies, development banks, and PPP units.',
        fr: 'Contrats de conseil basés sur des honoraires avec des agences gouvernementales, des banques de développement et des unités PPP.'
      },
      aiLeverage: {
        en: 'AI-powered policy analysis tools to compare legal frameworks across countries and model the potential economic and social impacts of proposed policy changes.',
        fr: 'Outils d\'analyse politique par IA pour comparer les cadres juridiques et modéliser les impacts potentiels des changements de politique.'
      }
    }
  },
  {
    id: 'impact-funder-service',
    title: {
      en: 'Impact Funder & Foundation Strategy Service',
      fr: 'Service de Stratégie pour les Bailleurs de Fonds d\'Impact et Fondations'
    },
    summary: {
      en: "Advisory services for foundations and donors to shift from rigid, short-term grants to flexible, long-term funding models that build the architecture of accountability.",
      fr: "Services de conseil pour les fondations et les donateurs afin de passer de subventions rigides à court terme à des modèles de financement flexibles et à long terme qui construisent l'architecture de la responsabilité."
    },
    icon: 'BanknotesIcon',
    details: {
      painPoint: {
        en: 'Foundations often see their impact evaporate after a project ends because their funding models don\'t support long-term sustainability.',
        fr: 'L\'impact des fondations s\'évapore souvent car leurs modèles de financement ne soutiennent pas la durabilité à long terme.'
      },
      competitiveAdvantage: {
        en: 'Deep expertise in designing and implementing alternative funding mechanisms (e.g., core funding, patient capital) that align with APA principles for lasting impact.',
        fr: 'Expertise approfondie dans la conception de mécanismes de financement alternatifs (par exemple, financement de base, capital patient) alignés sur les principes de l\'APA.'
      },
      revenueGeneration: {
        en: 'Consulting fees for strategic planning, portfolio review, and theory of change development.',
        fr: 'Honoraires de conseil pour la planification stratégique, l\'examen de portefeuille et le développement de la théorie du changement.'
      },
      aiLeverage: {
        en: 'AI tools to analyze grantee portfolios and identify opportunities to shift towards more effective, trust-based funding models, predicting long-term impact.',
        fr: 'Outils d\'IA pour analyser les portefeuilles de subventions et identifier les opportunités de passer à des modèles de financement plus efficaces basés sur la confiance.'
      }
    }
  },
  {
    id: 'apa-implementation-toolkit',
    path: '/framework/toolkit',
    title: {
      en: 'APA Framework Implementation Toolkit',
      fr: 'Boîte à Outils d\'Implémentation du Cadre APA'
    },
    summary: {
      en: "A comprehensive digital toolkit with a glossary, step-by-step guides, and templates to help your organization adopt and operationalize the APA Framework.",
      fr: "Une boîte à outils numérique complète avec un glossaire, des guides étape par étape et des modèles pour aider votre organisation à adopter et à opérationnaliser le Cadre APA."
    },
    icon: 'BookOpenIcon',
    details: {
      painPoint: {
        en: 'Organizations are inspired by the APA Framework but need practical, step-by-step resources to guide its implementation across different departments.',
        fr: 'Les organisations ont besoin de ressources pratiques pour guider la mise en œuvre du Cadre APA dans leurs différents départements.'
      },
      competitiveAdvantage: {
        en: 'The official, comprehensive toolkit created by the architects of the APA Framework, ensuring authenticity and best practices. It\'s a living resource, continuously updated.',
        fr: 'La boîte à outils officielle et complète, créée par les architectes du Cadre APA, garantissant l\'authenticité et les meilleures pratiques.'
      },
      revenueGeneration: {
        en: 'Freemium model. Basic access is free, while a premium subscription unlocks advanced templates, case studies, and diagnostic tools.',
        fr: 'Modèle Freemium. L\'accès de base est gratuit, tandis qu\'un abonnement premium débloque des modèles avancés et des outils de diagnostic.'
      },
      aiLeverage: {
        en: 'An AI-powered assistant within the toolkit that provides contextual guidance, answers questions about the framework, and helps users customize templates.',
        fr: 'Un assistant alimenté par l\'IA dans la boîte à outils qui fournit des conseils contextuels et aide les utilisateurs à personnaliser les modèles.'
      }
    }
  }
];

export const FRAMEWORK_TOOLS: ToolCategory[] = [
  {
    titleKey: 'glossaryPage.categories.corePrinciples.title',
    icon: 'ShieldCheckIcon',
    tools: [
      { termKey: 'glossaryPage.terms.apaFramework.term', definitionKey: 'glossaryPage.terms.apaFramework.definition' },
      { termKey: 'glossaryPage.terms.deiLitmusTest.term', definitionKey: 'glossaryPage.terms.deiLitmusTest.definition' },
      { termKey: 'glossaryPage.terms.businessAsEngine.term', definitionKey: 'glossaryPage.terms.businessAsEngine.definition' },
      { termKey: 'glossaryPage.terms.buildingTrust.term', definitionKey: 'glossaryPage.terms.buildingTrust.definition' },
      { termKey: 'glossaryPage.terms.accountabilityArchitecture.term', definitionKey: 'glossaryPage.terms.accountabilityArchitecture.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.keyConcepts.title',
    icon: 'LightBulbIcon',
    tools: [
      { termKey: 'glossaryPage.terms.authenticityPremium.term', definitionKey: 'glossaryPage.terms.authenticityPremium.definition' },
      { termKey: 'glossaryPage.terms.sharedValue.term', definitionKey: 'glossaryPage.terms.sharedValue.definition' },
      { termKey: 'glossaryPage.terms.socialLicense.term', definitionKey: 'glossaryPage.terms.socialLicense.definition' },
      { termKey: 'glossaryPage.terms.businessIntegration.term', definitionKey: 'glossaryPage.terms.businessIntegration.definition' },
      { termKey: 'glossaryPage.terms.communityPower.term', definitionKey: 'glossaryPage.terms.communityPower.definition' },
      { termKey: 'glossaryPage.terms.riskToResilience.term', definitionKey: 'glossaryPage.terms.riskToResilience.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.roadmapStages.title',
    icon: 'RocketLaunchIcon',
    tools: [
      { termKey: 'glossaryPage.terms.diagnosticPhase.term', definitionKey: 'glossaryPage.terms.diagnosticPhase.definition' },
      { termKey: 'glossaryPage.terms.pilotSelection.term', definitionKey: 'glossaryPage.terms.pilotSelection.definition' },
      { termKey: 'glossaryPage.terms.coCreationDesign.term', definitionKey: 'glossaryPage.terms.coCreationDesign.definition' },
      { termKey: 'glossaryPage.terms.implementationME.term', definitionKey: 'glossaryPage.terms.implementationME.definition' },
      { termKey: 'glossaryPage.terms.scaleIntegrate.term', definitionKey: 'glossaryPage.terms.scaleIntegrate.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.diagnosticTools.title',
    icon: 'BeakerIcon',
    tools: [
      { termKey: 'glossaryPage.terms.trustAudit.term', definitionKey: 'glossaryPage.terms.trustAudit.definition' },
      { termKey: 'glossaryPage.terms.stakeholderMapping.term', definitionKey: 'glossaryPage.terms.stakeholderMapping.definition' },
      { termKey: 'glossaryPage.terms.pea.term', definitionKey: 'glossaryPage.terms.pea.definition' },
      { termKey: 'glossaryPage.terms.stakeholderScore.term', definitionKey: 'glossaryPage.terms.stakeholderScore.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.accountabilityMechanisms.title',
    icon: 'CheckBadgeIcon',
    tools: [
      { termKey: 'glossaryPage.terms.mutualAccountability.term', definitionKey: 'glossaryPage.terms.mutualAccountability.definition' },
      { termKey: 'glossaryPage.terms.grm.term', definitionKey: 'glossaryPage.terms.grm.definition' },
      { termKey: 'glossaryPage.terms.participatoryME.term', definitionKey: 'glossaryPage.terms.participatoryME.definition' },
      { termKey: 'glossaryPage.terms.independentVerification.term', definitionKey: 'glossaryPage.terms.independentVerification.definition' },
      { termKey: 'glossaryPage.terms.coCreatedPlans.term', definitionKey: 'glossaryPage.terms.coCreatedPlans.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.funderSolutions.title',
    icon: 'BanknotesIcon',
    tools: [
      { termKey: 'glossaryPage.terms.shiftFundingModels.term', definitionKey: 'glossaryPage.terms.shiftFundingModels.definition' },
      { termKey: 'glossaryPage.terms.fundTheArchitecture.term', definitionKey: 'glossaryPage.terms.fundTheArchitecture.definition' },
      { termKey: 'glossaryPage.terms.conveneCatalyze.term', definitionKey: 'glossaryPage.terms.conveneCatalyze.definition' },
      { termKey: 'glossaryPage.terms.coreFunding.term', definitionKey: 'glossaryPage.terms.coreFunding.definition' },
      { termKey: 'glossaryPage.terms.patientCapital.term', definitionKey: 'glossaryPage.terms.patientCapital.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.governmentSolutions.title',
    icon: 'BuildingStorefrontIcon',
    tools: [
      { termKey: 'glossaryPage.terms.policyIntegration.term', definitionKey: 'glossaryPage.terms.policyIntegration.definition' },
      { termKey: 'glossaryPage.terms.incentivizeAuthenticity.term', definitionKey: 'glossaryPage.terms.incentivizeAuthenticity.definition' },
      { termKey: 'glossaryPage.terms.partnershipCapacityBuilding.term', definitionKey: 'glossaryPage.terms.partnershipCapacityBuilding.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.commonChallenges.title',
    icon: 'ExclamationCircleIcon',
    tools: [
      { termKey: 'glossaryPage.terms.investmentReadiness.term', definitionKey: 'glossaryPage.terms.investmentReadiness.definition' },
      { termKey: 'glossaryPage.terms.trustDeficits.term', definitionKey: 'glossaryPage.terms.trustDeficits.definition' },
      { termKey: 'glossaryPage.terms.corporateInertia.term', definitionKey: 'glossaryPage.terms.corporateInertia.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.comparativeModels.title',
    icon: 'CubeTransparentIcon',
    tools: [
      { termKey: 'glossaryPage.terms.traditionalCSR.term', definitionKey: 'glossaryPage.terms.traditionalCSR.definition' },
      { termKey: 'glossaryPage.terms.standardESG.term', definitionKey: 'glossaryPage.terms.standardESG.definition' },
      { termKey: 'glossaryPage.terms.apaFrameworkModel.term', definitionKey: 'glossaryPage.terms.apaFrameworkModel.definition' },
    ]
  },
  {
    titleKey: 'glossaryPage.categories.outcomesBenefits.title',
    icon: 'TrophyIcon',
    tools: [
      { termKey: 'glossaryPage.terms.reducedRisk.term', definitionKey: 'glossaryPage.terms.reducedRisk.definition' },
      { termKey: 'glossaryPage.terms.brandLoyalty.term', definitionKey: 'glossaryPage.terms.brandLoyalty.definition' },
      { termKey: 'glossaryPage.terms.partnershipLongevity.term', definitionKey: 'glossaryPage.terms.partnershipLongevity.definition' },
    ]
  }
];
