// All site content. Every fact here comes from the previous portfolio or from
// Nadine directly — edit freely, but keep it to things you can defend in an interview.

export const profile = {
  name: 'Nadine Radwan',
  fullName: 'Nadine Radwan Ali',
  short: 'Nadine.',
  headline: ['SOFTWARE', 'ENGINEER'], // ['COMPUTER', 'ENGINEER'] to switch back
  sub: 'Computer Engineering Student & Full-Stack Developer.',
  tagline: 'Computer Engineering & Full-Stack',
  meta: 'AI, CV & FULL-STACK DEVELOPMENT',
  currently: ['Ain Shams University', 'CEO @ NeuroTech ASU', 'Cairo, Egypt'],
  bio: 'I build computer vision pipelines, full-stack web apps, and scalable software systems.',
  email: 'nadine2352004@gmail.com',
  github: 'https://github.com/nadineradwanaliradwan',
  linkedin: 'https://linkedin.com/in/nadine-radwan-411548283',
  cv: 'Nadine-Radwan-Ali-CV.pdf',
};

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

// `key: true` renders the tag inverted (solid white).
export const stack = [
  {
    title: 'AI & Computer Vision',
    subtitle: 'Perception pipelines, built from first principles.',
    tags: [
      { name: 'Python', key: true },
      { name: 'NumPy' },
      { name: 'SciPy' },
      { name: 'Canny Edge Detection', key: true },
      { name: 'Computer Vision' },
      { name: 'AI Summarization' },
    ],
  },
  {
    title: 'Languages & Frameworks',
    subtitle: 'What the products are written in.',
    tags: [
      { name: 'C#', key: true },
      { name: 'ASP.NET Core' },
      { name: 'JavaScript' },
      { name: 'React', key: true },
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'Tools, Databases & Cloud',
    subtitle: 'Where data lives and how it ships.',
    tags: [
      { name: 'MongoDB', key: true },
      { name: 'SQL Server' },
      { name: 'REST APIs' },
      { name: 'Git & GitHub', key: true },
      { name: 'Postman', key: true },
      { name: 'ERP Systems' },
      { name: 'Linux' },
    ],
  },
];

export const projects = [
  {
    id: 'canny',
    title: 'Canny Coin Vision',
    category: 'Computer Vision',
    icon: 'scan',
    summary:
      'Custom Canny edge detection pipeline implemented from scratch in Python using NumPy and SciPy, inside a collaborative coin detection and counting project.',
    role: 'Edge-detection engine (team project)',
    stages: [
      ['Gaussian smoothing', 'Suppress noise before estimating gradients.'],
      ['Gradient magnitude & direction', 'Computed with NumPy / SciPy convolutions.'],
      ['Non-maximum suppression', 'Thin edges to single-pixel ridges.'],
      ['Double threshold + hysteresis', 'Keep strong edges and the weak edges connected to them.'],
    ],
    highlights: ['Canny implemented from scratch, not a library call', '5 edge-detection algorithms compared', 'Edge maps feed the team’s morphological counting pipeline'],
    stack: ['Python', 'NumPy', 'SciPy', 'Computer Vision'],
    links: [{ label: 'Repository', href: 'https://github.com/mireillemaher/coin-detection-CV' }],
  },
  {
    id: 'reddit',
    title: 'Reddit Clone',
    category: 'Full-Stack',
    icon: 'layers',
    summary:
      'JWT-authenticated Reddit clone across a React front end and an Express / MongoDB backend, with an AI post-summary feature.',
    role: 'Backend — feed & posts, AI summary (team project)',
    highlights: ['Owned the backend feed and posts modules', 'Built the AI post-summary feature', 'API documented and exercised with Postman collections'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Postman'],
    links: [{ label: 'Repository', href: 'https://github.com/Mohamed-Dahy/Reddit-Clone' }],
  },
  {
    id: 'courses',
    title: 'Course Manager',
    category: 'ASP.NET Core',
    icon: 'book',
    summary: 'Academic course management web application built with C# ASP.NET Core MVC and SQL Server.',
    stack: ['C#', 'ASP.NET Core', 'SQL Server'],
    links: [],
  },
  {
    id: 'asuums',
    title: 'ASUUMS',
    category: 'Team · Agile',
    icon: 'building',
    summary:
      'University management platform built by a 5-person Agile team — role-based dashboards, enrollment, grading and staff coordination, including the initial Facilities Module increment.',
    role: 'PO → Scrum Master → Dev → QA across 5 sprints',
    highlights: ['Led the EAV → 3NF schema refactor', 'Rotated through every Scrum role', '5 people · 5 sprints · Jira'],
    stack: ['Laravel', 'React', 'MySQL', 'Jira'],
    links: [
      { label: 'Frontend repo', href: 'https://github.com/tob-git/UMS-front-end' },
      { label: 'Backend repo', href: 'https://github.com/tob-git/UMS-backend' },
    ],
  },
];

export const experience = [
  {
    date: 'Aug 2026',
    role: 'IT Department Intern',
    org: 'GASCO',
    summary: 'REST API integration and ERP systems inside a live IT department at a national energy company — 144 training hours.',
  },
  {
    date: '2026',
    role: 'Siemens Graduation Project',
    org: 'Ain Shams University',
    summary: 'Digital twin framework for validating multi-modal sensor fusion systems before silicon, with Siemens EDA and Prof. Watheq Elkharashi.',
  },
  {
    date: 'Leadership',
    role: 'CEO & Student Leader',
    org: 'NeuroTech ASU / Enactus',
    summary: 'Led a 12-person team across 4 sub-teams at the BR41N.IO brain-computer interface hackathon by g.tec — real-time EEG/SSVEP classification into a live Unity simulation.',
  },
  {
    date: 'June 2027',
    role: 'B.Sc. Computer Engineering',
    org: 'Ain Shams University',
    summary: 'Graduating June 2027. Embedded and real-time systems, machine learning, computer vision and software engineering.',
  },
];
