// ─── Types ───────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  technologies: string[];
  companyUrl?: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
  location?: string;
}

export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  ogImage?: string;
}

export interface Stats {
  yearsExperience: number;
  projects: number;
  clients: number;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    firstName: string;
    initials: string;
    tagline: string;
    bio: string;
    avatarUrl: string;
    resumeUrl: string;
    openToWork: boolean;
  };
  stats: Stats;
  social: SocialLink[];
  experience: Experience[];
  skills: SkillGroup[];
  projects: Project[];
  education: Education[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  githubUsername: string;
  commandPalette: boolean;
  theme: {
    accent: string;
    defaultMode: 'dark' | 'light';
  };
  meta: SiteMeta;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const base = import.meta.env.BASE_URL;
const asset = (path: string) => `${base}${path.replace(/^\//, '')}`;

// ─── Config ──────────────────────────────────────────────────────────────────

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'Shridhar Mugalkhod',
    firstName: 'Shridhar',
    initials: 'SM',
    tagline: 'Software Engineer & Full Stack Developer',
    bio: 'Software Development Engineer with 4 years of experience in building high-performance full-stack web applications and delivering scalable solutions through cross-functional collaboration.',
    avatarUrl: asset('/photo.png'),
    resumeUrl: 'https://drive.google.com/file/d/1ubTKCQXHEa2Aq8klP7rE6CNheLrlCY2P/view',
    openToWork: true,
  },

  stats: {
    yearsExperience: 4,
    projects: 20,
    clients: 10,
  },

  social: [
    { platform: 'GitHub', url: 'https://github.com/shridhar-mugalkhod', icon: 'FiGithub' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shridhar-mugalkhod/', icon: 'FiLinkedin' },
    { platform: 'Email', url: 'mailto:mshridhar167@gmail.com', icon: 'FiMail' },
  ],

  experience: [
    {
      company: 'CheQ',
      role: 'Software Engineer',
      duration: 'January 2024 — Present',
      description: 'Engineered fraud detection features reducing fraud by 50%. Automated chargeback processing using Google Cloud Pub/Sub, cutting manual tasks by 80%. Implemented caching for Gmail API calls, improving email processing speed by 20%. Collaborated on product roadmap planning, solution design, and system architecture.',
      technologies: ['JavaScript', 'TypeScript', 'ReactJS', 'Node.js', 'NestJS', 'MySQL', 'Redis', 'MongoDB', 'RabbitMQ', 'GCP', 'Docker'],
    },
    {
      company: 'Simnovus',
      role: 'Full Stack Developer',
      duration: 'January 2021 — June 2023',
      description: 'Developed and maintained Simnovator, a real-time web application for 5G network testing and monitoring. Enhanced data visualization for long-term 5G tests, increasing user engagement by 10%. Introduced multi-format downloads with 80% file size reduction. Adopted microservices architecture, improving system performance by 30%.',
      technologies: ['ReactJS', 'Node.js', 'Material UI', 'JavaScript', 'MongoDB', 'Swagger'],
    },
    {
      company: 'Datalore Labs Private Limited',
      role: 'Machine Learning Intern',
      duration: 'July 2019 — August 2019',
      description: 'Developed a speed detection system to identify vehicle speeds in video sequences, capturing photos of vehicles exceeding speed limits and storing them for analysis.',
      technologies: ['Python', 'Machine Learning', 'NumPy'],
    },
  ],

  skills: [
    {
      category: 'Frontend',
      icon: 'FiMonitor',
      skills: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Material UI', 'Bootstrap'],
    },
    {
      category: 'Backend',
      icon: 'FiServer',
      skills: ['Node.js', 'NestJS', 'Express.js', 'MongoDB', 'Mongoose', 'MySQL', 'Socket.IO'],
    },
    {
      category: 'Languages',
      icon: 'FiCode',
      skills: ['JavaScript', 'TypeScript', 'Java', 'Python', 'JSON'],
    },
    {
      category: 'Tools & DevOps',
      icon: 'FiTool',
      skills: ['Git', 'GitHub', 'Docker', 'Jenkins', 'Postman', 'Swagger', 'Jira', 'Confluence', 'VS Code', 'Netlify'],
    },
  ],

  projects: [
    {
      title: 'Amazon.com - Clone',
      description: 'A fully functional Amazon.com clone showcasing proficiency in front-end web development, replicating key design elements, layout, and styling for a realistic user experience.',
      image: asset('/projects/amazon-clone.png'),
      technologies: ['HTML', 'CSS'],
      liveUrl: 'https://shridhar-mugalkhod.github.io/Amazon-clone/Index.html',
      githubUrl: 'https://github.com/shridhar-mugalkhod/Amazon-clone',
      featured: false,
      category: 'Frontend',
    },
    {
      title: 'Portfolio',
      description: 'A personal portfolio website serving as an online showcase of skills, projects, and professional journey, providing in-depth insights into my work.',
      image: asset('/projects/portfolio.png'),
      technologies: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Material UI'],
      liveUrl: 'https://shridhar-mugalkhod.github.io/portfolio/',
      githubUrl: 'https://github.com/shridhar-mugalkhod/portfolio',
      featured: false,
      category: 'Frontend',
    },
    {
      title: 'Keeper',
      description: 'A real-time note-taking web application with user authentication, allowing users to seamlessly add, update, and delete notes with automatic syncing across devices.',
      image: asset('/projects/keeper.png'),
      technologies: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB'],
      featured: true,
      category: 'Full Stack',
    },
    {
      title: 'Green the Map',
      description: 'An effective garbage management system with interactive visualizations of garbage areas, user complaints, and smart bin maintenance data with real-time WebSocket updates.',
      image: asset('/projects/green-the-map.png'),
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Machine Learning', 'IoT'],
      githubUrl: 'https://github.com/shridhar-mugalkhod/green-the-map',
      featured: true,
      category: 'Full Stack',
    },

  ],

  education: [
    {
      degree: 'Bachelor of Engineering - Computer Science and Engineering',
      institution: 'SJB Institute of Technology, Bengaluru',
      year: '2016 — 2020',
      description: 'Immersed in diverse coursework covering algorithms, data structures, and software engineering. Developed a web app for real-time collaboration, honing both coding and teamwork skills.',
    },
    {
      degree: 'PUC - Science',
      institution: 'S R A Composite PU College, Bagalkot',
      year: '2014 — 2016',
      description: 'Focused on Science subjects — Physics, Chemistry, and Mathematics. Participated in science-related events and projects.',
    },
  ],

  testimonials: [
    {
      quote: 'Shridhar is one of the most talented developers I\'ve worked with. His attention to detail and ability to translate complex requirements into elegant solutions is exceptional.',
      author: 'Jane Doe',
      role: 'Engineering Manager',
      company: 'CheQ',
    },
    {
      quote: 'Working with Shridhar was a game-changer for our project. He brought both technical expertise and creative vision that elevated the entire product.',
      author: 'John Smith',
      role: 'Product Lead',
      company: 'Simnovus',
    },
    {
      quote: 'His code quality and commitment to best practices set a new standard for our team. Truly a developer who cares about craftsmanship.',
      author: 'Alex Johnson',
      role: 'CTO',
      company: 'Simnovus',
    },
  ],

  contact: {
    email: 'mshridhar167@gmail.com',
    linkedin: 'https://www.linkedin.com/in/shridhar-mugalkhod/',
    location: 'Bengaluru, India',
  },

  githubUsername: 'shridhar-mugalkhod',
  commandPalette: true,

  theme: {
    accent: '#3B9EFF',
    defaultMode: 'dark',
  },

  meta: {
    title: 'Shridhar Mugalkhod — Software Engineer',
    description: 'Portfolio of Shridhar Mugalkhod, a software engineer with 4 years of experience specializing in React, TypeScript, and modern web technologies.',
    url: 'https://shridharmugalkhod.github.io/career-portfolio',
  },
};
