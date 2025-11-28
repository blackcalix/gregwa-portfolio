export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  tools: string[];
  images: string[];
  thumbnail: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'brand-identity',
    title: 'Brand Identity',
    category: 'Branding',
    year: '2024',
    client: 'Studio Créatif',
    description:
      "Création d'une identité visuelle complète pour un studio de design. Le projet inclut le logo, la charte graphique, les supports print et digitaux.",
    challenge:
      "Le client souhaitait une identité moderne et minimaliste qui reflète son approche innovante tout en restant accessible et mémorable.",
    solution:
      "J'ai développé un système visuel basé sur des formes géométriques simples et une palette de couleurs audacieuse. Le logo peut s'adapter à tous les supports tout en conservant son impact.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Affinity Designer'],
    images: [
      '/projects/project-1.jpg',
      '/projects/project-1-detail-1.jpg',
      '/projects/project-1-detail-2.jpg',
    ],
    thumbnail: '/projects/project-1.jpg',
  },
  {
    id: 2,
    slug: 'affiche-concert',
    title: 'Affiche Concert',
    category: 'Poster',
    year: '2024',
    client: 'Festival Électro',
    description:
      "Design d'une série d'affiches pour un festival de musique électronique. Approche visuelle énergique et immersive.",
    challenge:
      "Capturer l'énergie et l'atmosphère unique du festival tout en créant une cohérence visuelle sur l'ensemble des supports.",
    solution:
      "Utilisation de typographies bold, de couleurs néon et d'effets de glitch pour créer une esthétique futuriste et dynamique.",
    tools: ['Adobe Photoshop', 'Adobe Illustrator'],
    images: [
      '/projects/project-2.jpg',
      '/projects/project-2-detail-1.jpg',
      '/projects/project-2-detail-2.jpg',
    ],
    thumbnail: '/projects/project-2.jpg',
  },
  {
    id: 3,
    slug: 'logo-design',
    title: 'Logo Design',
    category: 'Identity',
    year: '2023',
    client: 'Startup Tech',
    description:
      "Conception d'un logo moderne et scalable pour une startup technologique en pleine croissance.",
    challenge:
      "Créer un logo qui fonctionne aussi bien en favicon qu'en grand format, tout en communiquant innovation et fiabilité.",
    solution:
      "Un design épuré basé sur une lettre stylisée, déclinable en plusieurs versions pour différents contextes d'utilisation.",
    tools: ['Adobe Illustrator', 'Affinity Designer'],
    images: [
      '/projects/project-3.jpg',
      '/projects/project-3-detail-1.jpg',
      '/projects/project-3-detail-2.jpg',
    ],
    thumbnail: '/projects/project-3.jpg',
  },
  {
    id: 4,
    slug: 'packaging',
    title: 'Packaging',
    category: 'Product',
    year: '2023',
    client: 'Marque Bio',
    description:
      "Design de packaging pour une gamme de produits cosmétiques bio. Focus sur l'éco-responsabilité et l'élégance.",
    challenge:
      "Allier esthétique premium et valeurs écologiques dans un design qui se démarque en rayon.",
    solution:
      "Utilisation de matériaux recyclés, couleurs naturelles et illustrations botaniques délicates pour un rendu authentique et raffiné.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Affinity'],
    images: [
      '/projects/project-4.jpg',
      '/projects/project-4-detail-1.jpg',
      '/projects/project-4-detail-2.jpg',
    ],
    thumbnail: '/projects/project-4.jpg',
  },
  {
    id: 5,
    slug: 'editorial',
    title: 'Editorial',
    category: 'Print',
    year: '2023',
    client: 'Magazine Art',
    description:
      "Direction artistique et mise en page d'un magazine trimestriel dédié à l'art contemporain.",
    challenge:
      "Créer une mise en page qui sublime les œuvres présentées tout en offrant une expérience de lecture fluide.",
    solution:
      "Grilles modulaires flexibles, typographie élégante et espaces blancs généreux pour laisser respirer les visuels.",
    tools: ['Adobe InDesign', 'Adobe Photoshop'],
    images: [
      '/projects/project-5.jpg',
      '/projects/project-5-detail-1.jpg',
      '/projects/project-5-detail-2.jpg',
    ],
    thumbnail: '/projects/project-5.jpg',
  },
  {
    id: 6,
    slug: 'campagne-pub',
    title: 'Campagne Pub',
    category: 'Advertising',
    year: '2024',
    client: 'Agence Mode',
    description:
      "Conception d'une campagne publicitaire multi-supports pour une marque de mode premium.",
    challenge:
      "Créer une campagne cohérente et impactante sur print, digital et affichage urbain.",
    solution:
      "Direction artistique audacieuse avec shooting photo stylisé, retouches créatives et déclinaisons adaptées à chaque format.",
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Affinity Photo'],
    images: [
      '/projects/project-6.jpg',
      '/projects/project-6-detail-1.jpg',
      '/projects/project-6-detail-2.jpg',
    ],
    thumbnail: '/projects/project-6.jpg',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

export const getNextProject = (currentSlug: string): Project | undefined => {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return undefined;
  return projects[(currentIndex + 1) % projects.length];
};

export const getPreviousProject = (currentSlug: string): Project | undefined => {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return undefined;
  return projects[(currentIndex - 1 + projects.length) % projects.length];
};