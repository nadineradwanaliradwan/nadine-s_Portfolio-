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
  currently: ['Ain Shams University', 'Siemens EDA Graduation Project', 'Cairo, Egypt'],
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

// Reverse-chronological (most recent first), ordered by end date.
// `cert` is a file in public/certs; `link` is any other proof.
export const experience = [
  {
    date: '2026 — Present',
    role: 'Siemens Graduation Project — Digital Twin Verification',
    org: 'Siemens EDA · Ain Shams University',
    summary: 'Digital twin verification team: integrating and validating a UCIe chiplet design (AXI over a die-to-die link) in Siemens’ Innexis chiplet verification environment, with automotive-scenario and EGO-vehicle co-simulation. Supervised by Prof. Watheq Elkharashi and Dr. Mohamed AbdElSalam (Siemens EDA).',
  },
  {
    date: '3 – 26 Aug 2026',
    role: 'IT Department Intern',
    org: 'GASCO — Egyptian Natural Gas Company',
    summary: '144 training hours. REST API integration and ERP systems inside a live IT department. Certificate ID 12351l1x1a4y4w, verifiable with GASCO.',
  },
  {
    date: '15 Jul – 24 Aug 2026',
    role: 'Web Development using .NET',
    org: 'ITI — Information Technology Institute',
    summary: '144 hours: SQL Server, C#, Entity Framework, ASP.NET MVC, plus generative AI, AI agents & workflow automation.',
    cert: 'iti-certificate.jpeg',
  },
  {
    date: '2 – 13 Aug 2026',
    role: 'Desktop Application Development',
    org: 'ECG — Engineering Consultants Group',
    summary: '85 hours, scored 95%. C#, Entity Framework, WPF and SQL — built the Store Management System end to end.',
    cert: 'ecg-letter.jpeg',
  },
  {
    date: 'Jul 2026',
    role: 'Summer Intern, Technology & IT',
    org: 'CIB — Commercial International Bank',
    summary: 'One-month technology-track internship at Egypt’s largest private-sector bank — enterprise IT systems and technical operations.',
    cert: 'cib-certificate.png',
  },
  {
    date: 'Spring 2026',
    role: 'Project Lead — BR41N.IO Hackathon',
    org: 'g.tec · BCI & Neurotechnology Spring School',
    summary: 'Led 12 people in 4 sub-teams: real-time EEG/SSVEP classification bridged from Python to a live Unity simulation.',
    cert: 'br41nio-certificate.png',
  },
  {
    date: 'Jan 2026',
    role: 'BI & Data Analytics Intern',
    org: 'Codveda',
    summary: '18 Power BI dashboards across 3 reporting levels; ETL and data-cleaning scripts in Python (pandas).',
    link: { label: 'GitHub', href: 'https://github.com/nadineradwanaliradwan/Codveda-Data-Analytics-Internship' },
  },
  {
    date: 'Jan — Feb 2025',
    role: 'Cloud Computing (70 hrs)',
    org: 'NTI / Huawei Egyptian Talent Academy',
    summary: 'Cloud computing, virtualization and Huawei Cloud fundamentals — final exam scored 90%.',
    cert: 'hcia-certificate.png',
  },
  {
    date: 'Class of 2027',
    role: 'B.Sc. Computer Engineering',
    org: 'Ain Shams University',
    summary: 'Graduating June 2027. Embedded and real-time systems, machine learning, computer vision and software engineering.',
  },
];

// Everything beyond the four featured folders, grouped like the previous site.
export const moreProjects = [
  {
    area: 'Software & Full-Stack',
    items: [
      {
        id: 'store', title: 'Store Management System', category: 'Desktop · C#',
        summary: 'WPF desktop application for inventory and sales management with full CRUD workflows, built during ECG training.',
        highlights: ['C#, Entity Framework, WPF', 'Built end to end for ECG training (scored 95%)'],
        stack: ['C#', 'Entity Framework', 'WPF', 'SQL'],
        links: [{ label: 'Repository', href: 'https://github.com/nadineradwanaliradwan/StoreManagementSystem' }],
      },
      {
        id: 'hr', title: 'HR Management System', category: 'Desktop · Testing',
        summary: 'Java / JavaFX HR desktop app, built as a hands-on software-testing exercise.',
        highlights: ['White-box and black-box testing', 'JUnit 5 Suite API runner'],
        stack: ['Java', 'JavaFX', 'Maven', 'JUnit 5'],
        links: [{ label: 'Repository', href: 'https://github.com/nadineradwanaliradwan/HR-Management-System-' }],
      },
      {
        id: 'automata', title: 'Automata Simulator', category: 'Algorithms',
        summary: 'CFG-to-PDA, DFA and PDA simulators built in Java Swing.',
        highlights: ['Validated against 30+ test cases'],
        stack: ['Java', 'Swing', 'Algorithms'],
        links: [{ label: 'Repository', href: 'https://github.com/nadineradwanaliradwan/AutomataProject2026' }],
      },
    ],
  },
  {
    area: 'Embedded & Real-Time Systems',
    items: [
      {
        id: 'twin', title: 'Chiplet Digital Twin Verification (UCIe)', category: 'Graduation project · Siemens EDA',
        summary: 'Siemens EDA × Ain Shams graduation project: a UCIe-compliant chiplet hardware IP for digital twin integration. I’m on the digital twin verification team.',
        role: 'Digital twin verification team — integrating and validating the chiplet DUT in Siemens Innexis with automotive co-simulation. Supervised by Prof. Watheq Elkharashi (Ain Shams) and Dr. Mohamed AbdElSalam (Siemens EDA).',
        status: 'In progress · 2026–2027',
        highlights: [
          'My team: integration & validation of the chiplet DUT in Siemens Innexis Developer Pro Hybrid and Innexis Virtual System Interconnect (VSI)',
          'Automotive-scenario simulation with mechatronics EGO-vehicle co-simulation',
          'Partner team designs the RTL: a UCIe protocol adapter (AXI → UCIe packets) and a die-to-die adapter for framing and flow control',
          'Targets bandwidth utilisation, latency and protocol overhead across dies',
        ],
        stack: ['Verification', 'Digital Twin', 'UCIe', 'AXI', 'Siemens Innexis', 'Co-simulation'],
        links: [],
      },
      {
        id: 'freertos', title: 'FreeRTOS Real-Time Systems', category: 'Embedded · C',
        summary: 'Two FreeRTOS projects on the TM4C123 exploring counting semaphores under real concurrency pressure.',
        highlights: ['Board: TM4C123', 'Resource pool + ISR queue projects'],
        stack: ['FreeRTOS', 'C', 'TM4C123'],
        links: [{ label: 'Repository', href: 'https://github.com/nadineradwanaliradwan/FreeRTOS-CountingSemaphores' }],
      },
      {
        id: 'parking', title: 'Smart Parking Garage Gate System', category: 'Embedded · C++',
        summary: 'Interrupt-driven, debounced access-control gate system on physical hardware.',
        role: 'Testing & validation, plus general codebase (team project)',
        stack: ['C++', 'Embedded'],
        links: [{ label: 'Repository', href: 'https://github.com/Philodoescode/Smart-Parking-Garage-Gate-System-cleanest-repo-lol' }],
      },
    ],
  },
  {
    area: 'AI & Machine Learning',
    items: [
      {
        id: 'bci', title: 'BR41N.IO BCI Hackathon', category: 'EEG · Real-time ML',
        summary: 'Real-time EEG/SSVEP classification pipeline bridging a Python signal-processing backend to a live Unity simulation.',
        role: 'Project Lead — 12 people across 4 sub-teams',
        highlights: ['g.tec BETA dataset', 'Python backend → live Unity simulation'],
        stack: ['Python', 'BrainFlow', 'MNE-Python', 'Unity'],
        links: [
          { label: 'Colab notebook', href: 'https://colab.research.google.com/drive/1Gz5Pda3Dcg_L5kVpD5MdFTSbS7V6nqYs?usp=sharing' },
          { label: 'Certificate', href: 'certs/br41nio-certificate.png' },
        ],
      },
      {
        id: 'rating', title: 'App-Rating Predictor', category: 'Regression',
        summary: 'Regression pipeline predicting mobile app ratings from 12 listing features.',
        highlights: ['RidgeCV + LightGBM', '5-fold cross-validation', '0.8 / 0.2 weighted ensemble'],
        stack: ['Python', 'scikit-learn', 'LightGBM'],
        links: [{ label: 'Repository', href: 'https://github.com/nadineradwanaliradwan/-App-Rating-Predictor' }],
      },
      {
        id: 'mushroom', title: 'Mushroom Edibility Classifier', category: 'Classification',
        summary: 'Supervised classification of edible vs. poisonous mushrooms, engineered to avoid a trivial task.',
        role: 'Full pipeline lead (team project)',
        highlights: ['8,124 instances', '3+ model families compared'],
        stack: ['Python', 'scikit-learn'],
        links: [{ label: 'Repository', href: 'https://github.com/nadineradwanaliradwan/ML_Project_S26' }],
      },
      {
        id: 'inference', title: 'Simulated AI Inference System', category: 'AI Inference',
        summary: 'A simulated AI inference system, built as a team project with Michael Maged.',
        stack: ['AI Inference'],
        links: [{ label: 'Repository', href: 'https://github.com/Michael-Maged/-simulated-AI-inference-system' }],
      },
    ],
  },
];

// In-progress work not covered above.
const inProgress = [
  {
    id: 'quiz', title: 'Quiz Arena', category: 'Mobile · Flutter',
    status: 'In progress · started Nov 2026',
    summary: 'Competitive Flutter trivia game for CSE 431 / CSE 442 Mobile Programming (Fall 2026) — timed multiple-choice questions from the Open Trivia Database.',
    role: 'Course major task (Option 2) — project just started; features below are the planned scope.',
    highlights: [
      'Planned: category & difficulty picker, points for speed and accuracy, answer streaks',
      'Planned: pass-and-play, remote challenges with a shared question set, global & weekly leaderboards',
      'Planned: user-made question packs, offline play with cached questions and deferred score upload',
    ],
    stack: ['Flutter', 'Dart', 'REST API', 'Open Trivia DB'],
    links: [{ label: 'Repository', href: 'https://github.com/nadineradwanaliradwan/QUIZ-ARENA' }],
  },
];

// Folders on the Projects section = categories. Order inside each list = order shown (strongest first).
const byId = Object.fromEntries(
  [...projects, ...moreProjects.flatMap((g) => g.items), ...inProgress].map((p) => [p.id, p])
);
const pick = (ids) => ids.map((id) => {
  if (!byId[id]) throw new Error(`Unknown project id: ${id}`);
  return byId[id];
});

export const categories = [
  {
    id: 'web', title: 'Web, Mobile & Full-Stack', icon: 'layers',
    blurb: 'Full-stack and mobile applications across React, Node / Express, Laravel, ASP.NET Core and Flutter.',
    projects: pick(['reddit', 'asuums', 'courses', 'quiz']),
  },
  {
    id: 'ai', title: 'AI, ML & Computer Vision', icon: 'brain',
    blurb: 'From real-time EEG classification to edge detection built from scratch.',
    projects: pick(['bci', 'canny', 'rating', 'mushroom', 'inference']),
  },
  {
    id: 'hardware', title: 'Embedded & Hardware', icon: 'cpu',
    blurb: 'Chiplet hardware IP, real-time firmware and interrupt-driven systems.',
    projects: pick(['twin', 'freertos', 'parking']),
  },
  {
    id: 'desktop', title: 'Desktop & Software Engineering', icon: 'window',
    blurb: 'Desktop apps, software testing and algorithms in C# and Java.',
    projects: pick(['store', 'hr', 'automata']),
  },
];
