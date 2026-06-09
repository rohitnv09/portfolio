import type { IconName } from '../components/ui/iconPaths'

export type NavItem = {
  label: string
  href: `#${string}`
  icon: IconName
  activeSections: string[]
}

export type ActionLink = {
  label: string
  href: string
  icon: IconName
}

export type ProjectLink = {
  label: string
  href: string
  icon: 'github' | 'external'
}

export type Project = {
  id: number
  title: string
  category: string
  desc: string
  liveLink: string
  githubLink: string
}

export type Article = {
  id: number
  title: string
  date: string
  link: string
}

export type Experience = {
  id: number
  company: string
  role: string
  date: string
  location: string
  bullets: string[]
}

export type SkillCategory = {
  id: string
  category: string
  tags: string[]
  icon: IconName
}

export type PortfolioContent = {
  site: {
    initials: string
    title: string
    description: string
    author: string
  }
  navigation: NavItem[]
  hero: {
    name: string
    subtitle: string
    bio: string
    actions: ActionLink[]
  }
  about: {
    paragraphs: string[]
  }
  projects: Project[]
  articles: Article[]
  experiences: Experience[]
  skills: SkillCategory[]
  contact: {
    email: string
  }
}

export const portfolio = {
  site: {
    initials: 'R.S',
    title: 'Rohit Sharma - Frontend Engineer',
    description: 'Frontend engineer building fast, reliable, product-grade web experiences. 4.5 years across React, TypeScript, Next.js, Node.',
    author: 'Rohit Sharma',
  },
  navigation: [
    { label: 'Home', href: '#home', icon: 'home', activeSections: ['home', 'about'] },
    { label: 'Projects', href: '#projects', icon: 'folder', activeSections: ['projects', 'articles'] },
    { label: 'Experience', href: '#experience', icon: 'briefcase', activeSections: ['experience'] },
    { label: 'Skills', href: '#skills-heading', icon: 'wrench', activeSections: ['skills'] },
    { label: 'Contact', href: '#contact', icon: 'mail', activeSections: ['contact'] },
  ],
  hero: {
    name: 'Rohit Sharma',
    subtitle: 'Frontend / Full-Stack Engineer',
    bio: 'Building reliable web applications for over 4.5 years professionally using TypeScript, Next.js, React, Node.js',
    actions: [
      { label: 'Resume/CV', href: 'https://bit.ly/4rgv6DC', icon: 'file-text' },
      { label: 'GitHub', href: 'https://github.com/rohitnv09', icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rs09/', icon: 'linkedin' },
    ],
  },
  about: {
    paragraphs: [
      "Behind the things on my resume is a pretty simple approach to engineering: I care deeply about the details and genuinely enjoy making things fast and reliable. I'm happiest when I can dig into production metrics to solve a tricky performance bottleneck or trace a feature all the way from concept to launch.",
      'For me, good engineering means taking end-to-end responsibility. I love looking at problems holistically and collaborating across backend and product teams to make sure what we build actually delivers real value to the user. Currently, I\'m bringing this exact focus to the AI space, exploring pathways to architect fast, real-time interfaces for intelligent applications.',
    ],
  },
  projects: [
    {
      id: 1,
      title: 'Kinetic Football',
      category: 'Full-Stack Application',
      desc: 'A dynamic football application with interactive tracking and live team stats.',
      liveLink: 'https://kinetic-football.vercel.app/',
      githubLink: 'https://github.com/rohitnv09/kinetic-football',
    },
    {
      id: 2,
      title: 'Paste as Code',
      category: 'Open-source npm package',
      desc: 'A developer utility published on npm for code-oriented paste workflows.',
      liveLink: 'https://paste-as-code.vercel.app/',
      githubLink: 'https://github.com/rohitnv09/paste-as-code',
    },
    {
      id: 3,
      title: 'White Noise',
      category: 'Open-source frontend app',
      desc: 'A focused white-noise project that demonstrates product thinking through a simple, usable interface.',
      liveLink: 'https://white-noise-sounds.vercel.app/',
      githubLink: 'https://github.com/rohitnv09/white-noise',
    },
  ],
  articles: [],
  experiences: [
    {
      id: 1,
      company: 'BIRDEYE',
      role: 'Software Frontend Engineer 2',
      date: 'Dec 2024 - Present',
      location: 'Remote',
      bullets: [
        'Engineered scalable components for a core Storybook UI library and API utility layer, driving full RTL coverage to accelerate feature delivery across a $130M+ ARR platform.',
        'Resolved critical Inbox memory leaks via JS heap profiling, eliminating browser freezes to ensure uninterrupted workflows for 140K+ global businesses.',
        'Engineered a high-traffic React chat widget for 60K+ clients via iframe sandboxing for strict isolation alongside an Express Backend and WebSocket messaging.',
        'Reduced custom form deployment time by 30% through architecting a schema-driven Next.js survey engine using TypeScript, Zustand, Zod, and React Compiler.',
        'Executed a micro-frontend migration via Webpack Module Federation, refactoring a monolith into a multi-tab UI to eliminate deployment bottlenecks.',
      ],
    },
    {
      id: 2,
      company: 'CARS24',
      role: 'Software Development Engineer 1',
      date: 'May 2023 - Dec 2024',
      location: 'Gurugram, India',
      bullets: [
        'Engineered Seller & VAS frontends via Finite State Machines, processing 70k+ daily API transactions (RTO, Challan) across 17M MAUs to power a ~$489M vehicle acquisition platform.',
        'Achieved top 5 Google rankings for SEO pages by optimizing Core Web Vitals (LCP~2.2s, CLS~0.1, INP~140ms) and cutting JS payload to 280 KB through SSR, bundle optimization, and code splitting.',
        'Re-architected PDF rendering using print-specific CSS and pagination-aware layouts, eliminating external dependencies to cut unused whitespace by 55%.',
        'Designed a config-driven hook for dynamic Redux reducer injection, enabling route-level loading to cut initial JS payload by 70% (14 KB).',
        'Architected multiple Statsig A/B experiments including Reels-style discovery across seller journeys with E2E Playwright tests, lifting user traction from 28% to 42%.',
      ],
    },
    {
      id: 3,
      company: 'KAFQA',
      role: 'Software Development Engineer 1',
      date: 'Jan 2022 - Mar 2023',
      location: 'Bangalore, India',
      bullets: [
        'Architected the live virtual classroom frontend, enabling low-latency instructor broadcasting and interactive multi-student sessions for a $1.3M-funded platform.',
        'Shipped a zero-to-one production CRM in under 2 months (React, TypeScript, Redux Toolkit, MUI), centralizing lead workflows to accelerate sales operations.',
        'Engineered real-time lead tracking and live call monitoring (WebSockets, Kaleyra) for 200+ sales reps.',
      ],
    },
  ],
  skills: [
    { id: 'frontend', category: 'Core Frontend', tags: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'DOM Manipulation'], icon: 'component' },
    { id: 'state', category: 'State Management', tags: ['Redux Toolkit', 'Zustand', 'React Query', 'Context API', 'Recoil'], icon: 'layers' },
    { id: 'styling', category: 'Styling & UI', tags: ['Tailwind CSS', 'Material UI (MUI)', 'Storybook', 'Framer Motion', 'CSS Modules'], icon: 'sparkles' },
    { id: 'typescript', category: 'TypeScript & DX', tags: ['TypeScript', 'Zod', 'ESLint', 'Prettier', 'Husky'], icon: 'monitor' },
    { id: 'backend', category: 'Backend & APIs', tags: ['Node.js', 'Express.js', 'RESTful APIs', 'WebSockets', 'GraphQL'], icon: 'server' },
    { id: 'architecture', category: 'Architecture', tags: ['Micro-frontends', 'Module Federation', 'SSR / SSG', 'Monorepo', 'Turborepo'], icon: 'workflow' },
    { id: 'performance', category: 'Web Performance', tags: ['Core Web Vitals', 'Code Splitting', 'Lazy Loading', 'Tree Shaking', 'Lighthouse'], icon: 'gauge' },
    { id: 'testing', category: 'Testing & QA', tags: ['Jest', 'React Testing Library', 'Cypress', 'Playwright', 'E2E Testing'], icon: 'test-tube' },
    { id: 'tools', category: 'Tools & DevOps', tags: ['Git', 'Webpack', 'Vite', 'GitHub Actions', 'Vercel', 'Docker'], icon: 'folder' },
    { id: 'design', category: 'Design & UX', tags: ['Figma', 'Responsive Design', 'A/B Testing', 'Accessibility (a11y)', 'Prototyping'], icon: 'target' },
  ],
  contact: {
    email: 'rohitshrm0902@gmail.com',
  },
} satisfies PortfolioContent
