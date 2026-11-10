export interface StudentProfile {
  name: string;
  faculty: string;
  major: string;
  npm: string;
  phone: string;
  uiEmail: string;
  personalEmail: string;
  instagram: string;
  tagline: string;
  bio: string;
  heroImage: string;
  standingImage: string;
}

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
  linkedProjectId: string;
}

export interface ResumeItem {
  id: string;
  type: 'education' | 'experience';
  institutionOrRole: string;
  subtitle: string;
  period: string;
  isPresent?: boolean;
  description: string;
  highlights: string[];
  badge?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'skill' | 'competence';
  percentage: number;
  description: string;
  toolsOrContext: string;
}

export interface CostStructureItem {
  id: string;
  category: string;
  amount: number;
  percentage: number;
  detail: string;
  color: string;
}

export interface SurveyPreferenceItem {
  method: string;
  responses: number;
  totalRespondents: number;
  percentage: number;
  highlight?: boolean;
}

export interface SurveyTriggerItem {
  trigger: string;
  percentage: number;
  color: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  role: string;
  subtitle: string;
  category: 'PREVENTIVE HEALTH' | 'QUALITY CONTROL' | 'FORMULATION & BUSINESS';
  tags: string[];
  period: string;
  quote: string;
  image: string;
  secondaryImages: string[];
  problemIdentification: string;
  tacticalSolution: string;
  keyMetrics: { label: string; value: string }[];
  externalLink?: string;
  details: {
    heading: string;
    items: string[];
  }[];
}

export interface CollaborationCard {
  id: string;
  partnerName: string;
  roleOrProgram: string;
  projectTitle: string;
  quote: string;
  image: string;
  year: string;
}

export const STUDENT_PROFILE: StudentProfile = {
  name: 'Humaidah',
  faculty: 'Fakultas Farmasi',
  major: 'Farmasi',
  npm: '2506540550',
  phone: '08568034305',
  uiEmail: 'humaidah@ui.ac.id',
  personalEmail: 'umai.humaidah@gmail.com',
  instagram: 'umai.hmdh',
  tagline: 'Pharmacy Student & Formulation Researcher',
  bio: 'A pharmacy student at Universitas Indonesia with an interest in drug formulation development using molecular docking, and I would be delighted to have the opportunity to engage in community empowerment and interprofessional projects.',
  heroImage: '/assets/portfolio/humaidah_hero.png',
  standingImage: '/assets/portfolio/humaidah_standing.png',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-formulation',
    category: 'PHARMACEUTICAL R&D',
    title: 'Formulation & Molecular Docking',
    description:
      'Developing science-based drug and dermocosmetic formulations combining bioactive natural extracts (Oryza nivara L.) with ceramide skin-barrier technology and molecular docking.',
    highlights: [
      'In-silico molecular docking screening',
      'Red rice extract & ceramide hydro-boost formulation',
      'Small-scale lab prototyping & safety testing',
    ],
    linkedProjectId: 'proj-mosgru',
  },
  {
    id: 'srv-preventive',
    category: 'COMMUNITY EMPOWERMENT',
    title: 'Data-Driven Health Education',
    description:
      'Using online market research to identify parent and child preferences, translating quantitative findings into interactive pos-to-pos gamified interventions at Taman Baca Masyarakat.',
    highlights: [
      '80% parent preference for educational games',
      'Pos-to-Pos Gamifikasi: Ular Tangga, Detektif Label Gizi & Puppet',
      'Measurable KPI tracker with RIK UI facilitators',
    ],
    linkedProjectId: 'proj-nutrivita',
  },
  {
    id: 'srv-qc',
    category: 'INTERPROFESSIONAL QC',
    title: 'Medical Literature & Media QC',
    description:
      'Cross-checking clinical and pharmaceutical literature to simplify complex medical terminology into accessible, accurate public health e-booklets without altering medical essence.',
    highlights: [
      'Collaboration with Klinik Satelit Makara UI Depok',
      'Medical literature filter & accuracy verification',
      'User-friendly health literacy e-booklet architecture',
    ],
    linkedProjectId: 'proj-smilecheck',
  },
];

export const RESUME_DATA: ResumeItem[] = [
  {
    id: 'edu-ui',
    type: 'education',
    institutionOrRole: 'Universitas Indonesia',
    subtitle: 'Faculty of Pharmacy — Undergraduate (S1 Farmasi)',
    period: '2025 - PRESENT',
    isPresent: true,
    badge: 'NPM: 2506540550',
    description:
      'Focusing on pharmaceutical science, drug formulation development using molecular docking, interprofessional health education (RIK UI), and pharmaceutical business strategy.',
    highlights: [
      'NPM: 2506540550 · Fakultas Farmasi Universitas Indonesia',
      'Quality Controller in Health Science Cluster IPE-65 Project',
      'Finalist Nutrifood Research Center (NRC) Student Bootcamp 2026',
    ],
  },
  {
    id: 'edu-almatuq',
    type: 'education',
    institutionOrRole: "Al-Ma'tuq Islamic Boarding School",
    subtitle: 'Sukabumi (K13-Science)',
    period: '2022 - 2025',
    isPresent: false,
    badge: 'K13-Science Track',
    description:
      'Completed senior secondary education in the Natural Sciences (K13-Science) curriculum in Sukabumi with emphasis on chemistry, biology, scientific writing, and community leadership.',
    highlights: [
      'Natural Sciences (K13-Science) specialization',
      'Foundation in analytical chemistry, biology, and literature review',
      'Active in peer education and student communication programs',
    ],
  },
  {
    id: 'exp-nutrivita',
    type: 'experience',
    institutionOrRole: 'Education & Impact Lead',
    subtitle: 'NutriVita — Finalis NRC Student Bootcamp',
    period: '2026 - PRESENT',
    isPresent: true,
    badge: 'Ongoing Project',
    description:
      'Finalist at Nutrifood Research Center (NRC) Student Bootcamp 2026. Led online market research to identify preferences of parents and children and translated findings into gamified interventions.',
    highlights: [
      'Theme: "Data-Driven Preventive Health Intervention"',
      'Designed Pos-to-Pos Gamifikasi (Ular Tangga, Detektif Label Gizi & Puppet)',
      'Partnered with Komunitas Taman Baca Masyarakat (TBM) & Rumah Baca 4 Jagoan',
    ],
  },
  {
    id: 'exp-smilecheck',
    type: 'experience',
    institutionOrRole: 'Quality Controller',
    subtitle: 'Smile Check UI — Health Science Cluster IPE',
    period: '2026',
    isPresent: false,
    badge: 'Klinik Satelit Makara UI',
    description:
      'Interprofessional Education (IPE-05) project in collaboration with Klinik Satelit Makara UI Depok. Served as Information Filter and Quality Controller for the dental health e-booklet.',
    highlights: [
      'Medical literature cross-check when drafting health information',
      'Simplified complex medical language into user-friendly public flow',
      'Published digital booklet: bit.ly/E-BOOKSMILE-CHECKUI',
    ],
  },
  {
    id: 'exp-mosgru',
    type: 'experience',
    institutionOrRole: 'Business Model Strategist',
    subtitle: 'MOSGRU — Martha Tilaar Group Panel Project',
    period: '2025 - 2026',
    isPresent: false,
    badge: 'Intro to Pharmacy',
    description:
      'Translated a science-based cosmetic formulation concept (Red Rice Hydro-Boost Cream with Oryza nivara L. & Ceramides) into a viable business model prepared for Martha Tilaar Group panelists.',
    highlights: [
      'Structured Rp 24.000.000 R&D, formulation, testing & prototype budget',
      'Mapped local red rice farmer partnerships & sustainable skincare positioning',
      'Presented to Martha Tilaar Group panelists in Introduction to Pharmacy course',
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'sk-1',
    name: 'Health Communication',
    category: 'skill',
    percentage: 95,
    description:
      'Translating complex clinical and pharmaceutical literature into clear, engaging, and accurate educational materials for patients, parents, and children.',
    toolsOrContext: 'Smile Check UI E-Booklet & TBM Health Literacy',
  },
  {
    id: 'sk-2',
    name: 'Preventive Education',
    category: 'skill',
    percentage: 92,
    description:
      'Designing data-driven preventive health curricula and interactive gamified interventions based on real parent and child behavioral research.',
    toolsOrContext: 'NutriVita NRC Bootcamp 2026 (Pos-to-Pos Gamifikasi)',
  },
  {
    id: 'sk-3',
    name: 'Project Management',
    category: 'skill',
    percentage: 88,
    description:
      'Coordinating multidisciplinary student initiatives, KPI progress trackers, stakeholder partnerships, and R&D budgeting from ideation to execution.',
    toolsOrContext: 'Education & Impact Lead · Business Model Strategist',
  },
  {
    id: 'sk-4',
    name: 'Quality Control',
    category: 'skill',
    percentage: 94,
    description:
      'Rigorous medical literature cross-checking, information accuracy filtering, and standardization of pharmaceutical product and educational outputs.',
    toolsOrContext: 'Klinik Satelit Makara UI Depok Collaboration',
  },
  {
    id: 'sk-5',
    name: 'Interprofessional Education',
    category: 'skill',
    percentage: 90,
    description:
      'Collaborating across Universitas Indonesia Health Science Cluster (Rumpun Ilmu Kesehatan) to deliver integrated patient and community-centered solutions.',
    toolsOrContext: 'Health Science Cluster IPE-05 Universitas Indonesia',
  },
  {
    id: 'sk-6',
    name: 'Literature Research',
    category: 'skill',
    percentage: 93,
    description:
      'Conducting systematic biomedical literature reviews, phytochemical screening (Oryza nivara L.), and drug formulation research using molecular docking.',
    toolsOrContext: 'Molecular Docking & Red Rice Extract Formulation',
  },
  {
    id: 'comp-1',
    name: 'Graphic Design (Canva)',
    category: 'competence',
    percentage: 90,
    description:
      'Crafting cohesive visual identities, interactive flipbook e-booklets, scientific posters, and gamified board/card educational media.',
    toolsOrContext: 'Canva · Heyzine Flipbooks · Visual Branding',
  },
  {
    id: 'comp-2',
    name: 'Google Workspace',
    category: 'competence',
    percentage: 95,
    description:
      'Advanced proficiency in Google Sheets, Docs, Slides, and Forms for market research analytics, KPI tracking, and collaborative documentation.',
    toolsOrContext: 'Sheets · Docs · Slides · Forms Survey Analytics',
  },
  {
    id: 'comp-3',
    name: 'ImageJ Analysis',
    category: 'competence',
    percentage: 84,
    description:
      'Scientific image processing and quantitative microscopy measurement for pharmaceutical laboratory analysis and formulation evaluation.',
    toolsOrContext: 'ImageJ · Laboratory Image Quantification',
  },
  {
    id: 'comp-4',
    name: 'Video Editing',
    category: 'competence',
    percentage: 80,
    description:
      'Producing concise, high-impact educational health videos, campaign reels, and scientific project presentations.',
    toolsOrContext: 'CapCut · Multimedia Storytelling',
  },
];

export const MOSGRU_COST_STRUCTURE: CostStructureItem[] = [
  {
    id: 'cost-rnd',
    category: 'Riset & Pengembangan (R&D)',
    amount: 7000000,
    percentage: 29.17,
    detail: 'Bahan baku beras merah terstandar, ceramide, bahan pendukung antisipasi trial & error',
    color: '#29A587',
  },
  {
    id: 'cost-formulator',
    category: 'Product Developer / Formulator',
    amount: 7000000,
    percentage: 29.17,
    detail: 'Biaya tenaga ahli untuk pengembangan formula Red Rice Hydro-Boost Cream',
    color: '#1E7E66',
  },
  {
    id: 'cost-prototype',
    category: 'Produksi Skala Kecil (Prototype)',
    amount: 4000000,
    percentage: 16.67,
    detail: 'Produksi keperluan pengujian, sampling, dan evaluasi produk awal',
    color: '#F59E0B',
  },
  {
    id: 'cost-testing',
    category: 'Testing Awal Produk',
    amount: 3000000,
    percentage: 12.5,
    detail: 'Uji keamanan produk, stabilitas sediaan, dan efikasi skin barrier',
    color: '#3B82F6',
  },
  {
    id: 'cost-ops',
    category: 'Biaya Operasional Pendukung',
    amount: 2000000,
    percentage: 8.33,
    detail: 'Biaya pengadaan alat lab dan kebutuhan operasional pendukung lainnya',
    color: '#8B5CF6',
  },
  {
    id: 'cost-branding',
    category: 'Branding Awal',
    amount: 1000000,
    percentage: 4.17,
    detail: 'Pembuatan identitas produk, kemasan awal, dan materi edukasi konsumen',
    color: '#EC4899',
  },
];

export const MOSGRU_TOTAL_BUDGET = 24000000;

export const NUTRIVITA_SURVEY_PREFERENCES: SurveyPreferenceItem[] = [
  {
    method: 'Permainan Edukatif (Board/Pos Game)',
    responses: 24,
    totalRespondents: 30,
    percentage: 80.0,
    highlight: true,
  },
  {
    method: 'Kuis Interaktif',
    responses: 17,
    totalRespondents: 30,
    percentage: 56.7,
  },
  {
    method: 'Aktivitas Olahraga',
    responses: 17,
    totalRespondents: 30,
    percentage: 56.7,
  },
  {
    method: 'Dongeng / Cerita Interaktif',
    responses: 10,
    totalRespondents: 30,
    percentage: 33.3,
  },
  {
    method: 'Treasure Hunt / Detektif Gizi',
    responses: 10,
    totalRespondents: 30,
    percentage: 33.3,
  },
  {
    method: 'Praktik Membaca Label Makanan',
    responses: 8,
    totalRespondents: 30,
    percentage: 26.7,
  },
];

export const NUTRIVITA_BEHAVIOR_TRIGGERS: SurveyTriggerItem[] = [
  {
    trigger: 'Keasikan Main Game / Kurang Tidur',
    percentage: 40.0,
    color: '#2563EB',
    description: 'Kebanyakan main gadget/game atau kurang tidur pada anak usia 9–12 tahun.',
  },
  {
    trigger: 'Kurang Latihan Fisik & Olahraga',
    percentage: 23.3,
    color: '#F59E0B',
    description: 'Kurang aktivitas fisik harian sehingga rentan lelah dan sulit berkonsentrasi.',
  },
  {
    trigger: 'Tekanan Tugas Sekolah / Pergaulan',
    percentage: 23.3,
    color: '#16A34A',
    description: 'Faktor akademik dan adaptasi sosial dengan teman sebaya.',
  },
  {
    trigger: 'Jajanan Tinggi Gula (Sugar Crash)',
    percentage: 13.4,
    color: '#DC2626',
    description: 'Efek naik-turunnya gula darah akibat konsumsi minuman/jajanan manis kemasan.',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-nutrivita',
    title: 'NutriVita — Preventive Health Intervention',
    role: 'Education & Impact Lead',
    subtitle: 'Finalis Nutrifood Research Center (NRC) Student Bootcamp 2026 (Ongoing Project)',
    category: 'PREVENTIVE HEALTH',
    tags: ['NRC Bootcamp 2026', 'Market Research', 'Gamification', 'Preventive Education'],
    period: '2026 - Ongoing',
    quote: 'Data-Driven Preventive Health Intervention',
    image: '/assets/portfolio/img_47_960x540.jpg',
    secondaryImages: ['/assets/portfolio/img_51_640x480.png', '/assets/portfolio/img_56_756x736.png'],
    problemIdentification:
      'Use an online market research (n=30 parent respondents) to identify the preferences of parents and children (aged 9–12) regarding the learning process, snack restriction habits, and daily physical activity triggers.',
    tacticalSolution:
      'Translating research findings into gamified and interactive pos-to-pos interventions (Ular Tangga, Detektif Label Gizi & Puppet) deployed in accredited Taman Baca Masyarakat (TBM) ecosystems.',
    keyMetrics: [
      { label: 'Permainan Edukatif Preference', value: '80%' },
      { label: 'Keasikan Main Trigger', value: '40%' },
      { label: 'Kurang Latihan Fisik', value: '23.3%' },
    ],
    details: [
      {
        heading: 'Kurikulum Kegiatan Berdasarkan Data',
        items: [
          'Data riset menjadi dasar penyusunan game menggunakan tiga jenis konsumsi yang paling jarang dibatasi (minuman manis kemasan, permen/cokelat, keripik/snack kemasan).',
          'Materi edukasi praktis pada permainan Detektif Label Gizi.',
        ],
      },
      {
        heading: 'Intervensi Berbasis Gamifikasi & Ekosistem TBM',
        items: [
          'Solusi Pos-to-Pos Gamifikasi: Ular Tangga, Detektif Label Gizi & Puppet.',
          'Ekosistem Literasi Terakreditasi: Komunitas Taman Baca Masyarakat (TBM) / Rumah Baca 4 Jagoan.',
          'Fasilitator berbasis kompetensi akademik (Mahasiswa RIK UI) & volunteer pemuda Rumah Baca dengan pelaporan berkala berbasis KPI Tracker.',
        ],
      },
    ],
  },
  {
    id: 'proj-smilecheck',
    title: 'Smile Check UI — Health E-Booklet',
    role: 'Quality Controller',
    subtitle: 'Health Science Cluster — Interprofessional Education Project (IPE-05)',
    category: 'QUALITY CONTROL',
    tags: ['Quality Control', 'Klinik Satelit Makara UI', 'Health Communication', 'E-Booklet'],
    period: '2026',
    quote: 'Building a Clear, Consistent, and Memorable Identity in Public Dental Health Education',
    image: '/assets/portfolio/img_303_422x599.png',
    secondaryImages: ['/assets/portfolio/img_62_640x481.png', '/assets/portfolio/img_61_640x481.png'],
    problemIdentification:
      'Medical and dental health education materials often contain dense clinical terminology that is difficult for the general public to digest accurately.',
    tacticalSolution:
      'Two-stage Quality Control pipeline: (1) Information’s Filter via rigorous medical literature cross-checking when drafting information, followed by (2) User-Friendly Output simplification of complex language and information flow without altering the medical essence.',
    keyMetrics: [
      { label: 'Partner Clinic', value: 'Klinik Satelit Makara UI' },
      { label: 'Cluster Team', value: 'IPE-05 RIK UI' },
      { label: 'QC Stages', value: '2-Step Filter' },
    ],
    externalLink: 'https://bit.ly/E-BOOKSMILE-CHECKUI',
    details: [
      {
        heading: "Stage 1: Information's Filter",
        items: [
          'Medical literature cross-check when drafting information across interprofessional health science disciplines.',
          'Verification of preventive dental care guidelines in collaboration with Klinik Satelit Makara UI Depok.',
        ],
      },
      {
        heading: 'Stage 2: Output User-Friendly',
        items: [
          'Simplification of complex language and structuring of information flow to ensure the e-booklet is understandable to the general public, without altering the medical essence.',
          'Accessible interactive flipbook format at https://bit.ly/E-BOOKSMILE-CHECKUI.',
        ],
      },
    ],
  },
  {
    id: 'proj-mosgru',
    title: 'MOSGRU — Red Rice Hydro-Boost Cream',
    role: 'Business Model Strategist',
    subtitle: 'Introduction to Pharmacy Course Group Project (Martha Tilaar Group Panel)',
    category: 'FORMULATION & BUSINESS',
    tags: ['Oryza nivara L.', 'Ceramides', 'Business Model Canvas', 'Martha Tilaar Panel'],
    period: '2025 - 2026',
    quote: 'Translating a science-based product concept into a viable business model',
    image: '/assets/portfolio/img_74_1344x756.jpg',
    secondaryImages: ['/assets/portfolio/img_76_414x414.png', '/assets/portfolio/img_86_414x414.png'],
    problemIdentification:
      'Consumers aged 18–40 in high-UV Indonesian urban centers need sustainable, locally sourced anti-aging and skin-barrier repair formulations backed by credible pharmaceutical science.',
    tacticalSolution:
      'An innovative cosmetic formulation design combining the natural antioxidant power of standardized local red rice extract (Oryza nivara L.) with modern skin protection technology using ceramides, paired with a Rp 24.000.000 startup R&D and prototyping business model prepared for Martha Tilaar Group panelists.',
    keyMetrics: [
      { label: 'Total Startup Cost', value: 'Rp 24.000.000' },
      { label: 'R&D + Formulator Share', value: '58.3%' },
      { label: 'Target Demographics', value: '18–40 Years' },
    ],
    details: [
      {
        heading: 'Value Proposition & Active Formulation',
        items: [
          'Menawarkan perbaikan skin barrier dengan konsep natural-scientific skincare (Oryza nivara L. red rice extract + Ceramides).',
          'Mendorong konsep sustainable skincare dan meningkatkan kesejahteraan petani beras merah lokal.',
        ],
      },
      {
        heading: 'Business Model Canvas Architecture',
        items: [
          'Key Partners: Petani Beras Merah Lokal, Supplier Bahan Kosmetik, Formulator, Laboratorium Kampus UI, Supplier Kemasan Lokal, Desainer Grafis, Platform Online.',
          'Key Resources: Bahan baku beras merah terstandar & ceramide, SDM (Formulator, Controller, Tim Pemasaran), Jaringan Mitra, Intellectual Property (IP).',
          'Channels & Revenue: Media Sosial, E-Commerce, Penjualan Langsung, Help Center; Penjualan Produk Utama, Trial Size, Pre-Order & Reseller.',
        ],
      },
    ],
  },
];

export const COLLABORATIONS_DATA: CollaborationCard[] = [
  {
    id: 'collab-nrc',
    partnerName: 'Nutrifood Research Center',
    roleOrProgram: 'NRC Student Bootcamp 2026 & Rumah Baca 4 Jagoan',
    projectTitle: 'NutriVita — Education & Impact Lead',
    quote:
      'Translating online market research from 30 parent respondents into interactive Pos-to-Pos Gamifikasi (Ular Tangga, Detektif Label Gizi & Puppet) with 80% educational game preference in Taman Baca Masyarakat.',
    image: '/assets/portfolio/img_51_640x480.png',
    year: '2026 (Ongoing)',
  },
  {
    id: 'collab-makara',
    partnerName: 'Klinik Satelit Makara UI',
    roleOrProgram: 'Health Science Cluster IPE-05 Depok',
    projectTitle: 'Smile Check UI — Quality Controller',
    quote:
      'Rigorous medical literature cross-checking and simplification of clinical dental terminology into an accessible, public-friendly digital flipbook without altering the medical essence.',
    image: '/assets/portfolio/img_62_640x481.png',
    year: '2026',
  },
  {
    id: 'collab-martha',
    partnerName: 'Martha Tilaar Group Panel',
    roleOrProgram: 'Introduction to Pharmacy Final Project',
    projectTitle: 'MOSGRU — Business Model Strategist',
    quote:
      'Combining standardized local red rice extract (Oryza nivara L.) and ceramide skin-barrier science into a comprehensive Rp 24.000.000 R&D and prototyping business model.',
    image: '/assets/portfolio/img_74_1344x756.jpg',
    year: '2025 - 2026',
  },
];

export interface SearchResultItem {
  id: string;
  type: 'Project' | 'Skill' | 'Resume' | 'Service' | 'Financial Data';
  title: string;
  subtitle: string;
  matchSnippet: string;
  targetSectionId: string;
  projectId?: string;
}

export function searchPortfolioContent(query: string): SearchResultItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const results: SearchResultItem[] = [];

  for (const proj of PORTFOLIO_PROJECTS) {
    const searchable = [
      proj.title,
      proj.role,
      proj.subtitle,
      proj.category,
      proj.quote,
      proj.problemIdentification,
      proj.tacticalSolution,
      ...proj.tags,
      ...proj.details.flatMap((d) => [d.heading, ...d.items]),
    ].join(' ');

    if (searchable.toLowerCase().includes(trimmed)) {
      results.push({
        id: `search-proj-${proj.id}`,
        type: 'Project',
        title: proj.title,
        subtitle: `${proj.role} · ${proj.period}`,
        matchSnippet: proj.tacticalSolution,
        targetSectionId: 'portfolio-section',
        projectId: proj.id,
      });
    }
  }

  for (const skill of SKILLS_DATA) {
    const searchable = `${skill.name} ${skill.category} ${skill.description} ${skill.toolsOrContext}`;
    if (searchable.toLowerCase().includes(trimmed)) {
      results.push({
        id: `search-skill-${skill.id}`,
        type: 'Skill',
        title: `${skill.name} (${skill.percentage}%)`,
        subtitle: skill.category === 'skill' ? 'Core Professional Skill' : 'Technical Competence',
        matchSnippet: skill.description,
        targetSectionId: 'skills-section',
      });
    }
  }

  for (const res of RESUME_DATA) {
    const searchable = `${res.institutionOrRole} ${res.subtitle} ${res.period} ${res.description} ${res.highlights.join(' ')}`;
    if (searchable.toLowerCase().includes(trimmed)) {
      results.push({
        id: `search-res-${res.id}`,
        type: 'Resume',
        title: `${res.institutionOrRole} — ${res.subtitle}`,
        subtitle: `${res.type.toUpperCase()} · ${res.period}`,
        matchSnippet: res.description,
        targetSectionId: 'resume-section',
      });
    }
  }

  for (const cost of MOSGRU_COST_STRUCTURE) {
    const searchable = `${cost.category} ${cost.detail} Rp${cost.amount}`;
    if (searchable.toLowerCase().includes(trimmed)) {
      results.push({
        id: `search-cost-${cost.id}`,
        type: 'Financial Data',
        title: `${cost.category} — Rp ${cost.amount.toLocaleString('id-ID')}`,
        subtitle: `MOSGRU Cost Structure (${cost.percentage}%)`,
        matchSnippet: cost.detail,
        targetSectionId: 'analytics-section',
      });
    }
  }

  return results;
}

export function filterProjectsByCategory(
  category: string,
  searchQuery: string = ''
): PortfolioProject[] {
  const q = searchQuery.trim().toLowerCase();
  return PORTFOLIO_PROJECTS.filter((project) => {
    const matchesCategory =
      category === 'ALL' || project.category.toUpperCase() === category.toUpperCase();
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [
      project.title,
      project.role,
      project.subtitle,
      project.quote,
      project.problemIdentification,
      project.tacticalSolution,
      ...project.tags,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function calculateScaledMosgruBudget(batchMultiplier: number): {
  total: number;
  items: { id: string; category: string; scaledAmount: number; share: number }[];
} {
  const safeMultiplier = Math.max(1, Math.min(10, batchMultiplier));
  // Fixed R&D & Formulator costs stay at 1x while prototype, testing, ops & branding scale with batch size
  const items = MOSGRU_COST_STRUCTURE.map((item) => {
    const isFixedRnd = item.id === 'cost-rnd' || item.id === 'cost-formulator';
    const scaledAmount = isFixedRnd
      ? item.amount
      : Math.round(item.amount * safeMultiplier);
    return {
      id: item.id,
      category: item.category,
      scaledAmount,
      share: 0,
    };
  });
  const total = items.reduce((acc, cur) => acc + cur.scaledAmount, 0);
  return {
    total,
    items: items.map((i) => ({
      ...i,
      share: Number(((i.scaledAmount / total) * 100).toFixed(1)),
    })),
  };
}
