// Single source of truth for all portfolio content.
// Edit this file to change text, links, projects or experience.

export const profile = {
  name: 'Nadine Radwan Ali',
  first: 'Nadine',
  role: 'Computer Engineering Student · Full-Stack & AI/CV Developer',
  location: 'Cairo, EG',
  email: 'nadine2352004@gmail.com',
  github: 'https://github.com/nadineradwanaliradwan',
  linkedin: 'https://linkedin.com/in/nadine-radwan-411548283',
  cv: 'Nadine-Radwan-Ali-CV.pdf',
  affiliations: ['Ain Shams University', 'CEO @ NeuroTech ASU', 'Siemens Graduation Project'],
  bio: "Senior Computer Engineering student at Ain Shams University, graduating June 2027. I build full web applications, computer vision pipelines and machine learning systems — usually starting from the data or hardware level and working up to the finished product. I led a 12-person team through a real-time brain-computer interface build, and I'm currently working with Siemens EDA on a digital twin framework for pre-silicon sensor fusion validation.",
};

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const stack = [
  {
    title: 'Systems, AI & CV',
    items: ['Python', 'NumPy', 'SciPy', 'Computer Vision', 'Canny Edge Detection', 'AI Summarization'],
  },
  {
    title: 'Languages & Frameworks',
    items: ['C#', 'ASP.NET Core MVC', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'React', 'HTML/CSS'],
  },
  {
    title: 'Tools, Databases & Cloud',
    items: ['MongoDB', 'SQL Server', 'REST APIs', 'Git & GitHub', 'Postman', 'ERP Systems', 'Linux/Windows'],
  },
];

// `stack` entries must match chip labels above exactly — that is what powers
// the hover-a-skill → highlight-related-projects filter.
export const projects = [
  {
    id: 'canny',
    title: 'Canny Coin Vision',
    tag: 'Computer Vision',
    summary:
      'Custom Canny edge detection pipeline implemented from scratch in Python using NumPy and SciPy within a collaborative computer vision coin detection project.',
    stack: ['Python', 'NumPy', 'SciPy', 'Computer Vision', 'Canny Edge Detection', 'Git & GitHub'],
    architecture: [
      ['Pre-processing', 'Grayscale conversion and Gaussian smoothing to suppress sensor noise before gradient estimation.'],
      ['Gradient engine', 'Sobel-based gradient magnitude and direction computed with NumPy / SciPy convolutions.'],
      ['Non-max suppression', 'Edges thinned to single-pixel ridges along the gradient direction.'],
      ['Hysteresis', 'Double thresholding with connectivity tracking to keep strong edges and linked weak ones.'],
      ['Downstream', 'Edge maps feed the team’s morphological pipeline that isolates and counts coins.'],
    ],
    highlights: [
      'Owned the edge-detection engine within a team project',
      'Built Canny from scratch instead of calling a library function',
      'Compared 5 edge-detection algorithms (Canny, Sobel, LoG, Prewitt, Roberts)',
    ],
    links: [{ label: 'Repository', href: 'https://github.com/mireillemaher/coin-detection-CV' }],
    sheets: ['edges', 'code', 'chart'],
  },
  {
    id: 'reddit',
    title: 'Reddit Clone (Full-Stack)',
    tag: 'Full-Stack',
    summary:
      'Full-stack application built across separate frontend and backend repositories using React, Node.js, Express, MongoDB, Postman API collections, and AI summarization.',
    stack: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Postman', 'AI Summarization', 'Git & GitHub', 'HTML/CSS'],
    architecture: [
      ['Client', 'React front end for feeds, communities, posts and comments.'],
      ['API', 'Express REST API with JWT authentication and route-level authorization.'],
      ['Data', 'MongoDB collections for users, communities, posts, votes and comments.'],
      ['AI layer', 'AI post-summary endpoint that condenses long threads into a short digest.'],
      ['Contract', 'Postman collections documenting and exercising every endpoint.'],
    ],
    highlights: [
      'Owned the backend feed and posts modules',
      'Built the AI post-summary feature',
      'JWT-authenticated API shared across separate front/back repos',
    ],
    links: [{ label: 'Repository', href: 'https://github.com/Mohamed-Dahy/Reddit-Clone' }],
    sheets: ['ui', 'api', 'code'],
  },
  {
    id: 'courses',
    title: 'Course Management MVC',
    tag: 'ASP.NET Core',
    summary: 'Academic course management web application built with C# ASP.NET Core MVC and SQL Server.',
    stack: ['C#', 'ASP.NET Core MVC', 'SQL Server', 'HTML/CSS', 'Git & GitHub'],
    architecture: [
      ['Presentation', 'Razor views rendered by ASP.NET Core MVC controllers.'],
      ['Domain', 'C# models for courses, students, instructors and enrollments.'],
      ['Persistence', 'SQL Server relational schema accessed through Entity Framework.'],
      ['Validation', 'Model-level validation on create / edit flows.'],
    ],
    highlights: [
      'Classic MVC separation of concerns end-to-end',
      'Relational modelling for course ↔ student enrollment',
    ],
    links: [],
    sheets: ['table', 'code', 'ui'],
  },
  {
    id: 'asuums',
    title: 'ASUUMS Facilities',
    tag: 'Team · Agile',
    summary:
      'Foundational technical infrastructure and initial Facilities Module increment for ASUUMS, a university management platform built by a 5-person Agile team.',
    stack: ['React', 'JavaScript', 'REST APIs', 'Git & GitHub', 'HTML/CSS'],
    architecture: [
      ['Foundations', 'Repository structure, environments and shared conventions for a 5-person team.'],
      ['Facilities module', 'First increment of the Facilities Module on top of the core platform.'],
      ['Data model', 'Led the refactor from an EAV schema to a normalised 3NF design.'],
      ['Delivery', 'Five sprints run in Jira, rotating through PO → SM → Dev → QA roles.'],
    ],
    highlights: ['Led the EAV → 3NF schema refactor', 'Rotated through PO, Scrum Master, Dev and QA', '5 people · 5 sprints'],
    links: [
      { label: 'Frontend repo', href: 'https://github.com/tob-git/UMS-front-end' },
      { label: 'Backend repo', href: 'https://github.com/tob-git/UMS-backend' },
    ],
    sheets: ['kanban', 'table', 'api'],
  },
];

export const experience = [
  {
    id: 'gasco',
    title: 'GASCO IT Department Intern',
    org: 'Egyptian Natural Gas Company',
    date: 'Aug 2026',
    note: 'Current work',
    body: 'Hands-on exposure to REST API integration and ERP systems inside a live IT department at a national energy company — 144 training hours supporting enterprise workflows and API-driven integration between business systems.',
    tags: ['REST APIs', 'ERP Systems'],
  },
  {
    id: 'siemens',
    title: 'Siemens Graduation Project Member',
    org: 'Siemens EDA · Prof. Watheq Elkharashi',
    date: '2026 — Present',
    body: 'Building a digital twin framework for validating multi-modal sensor fusion systems before they reach silicon.',
    tags: ['Sensor Fusion', 'Simulation', 'Digital Twin'],
  },
  {
    id: 'neurotech',
    title: 'CEO @ NeuroTech ASU & Student Leadership',
    org: 'NeuroTech ASU · BR41N.IO Hackathon',
    date: 'Leadership',
    body: 'Leading NeuroTech ASU. Project Lead for a 12-person team (4 sub-teams) at the BR41N.IO brain-computer interface hackathon by g.tec, delivering a real-time EEG/SSVEP classification pipeline bridged to a live Unity simulation.',
    tags: ['Leadership', 'EEG / SSVEP', 'Unity'],
  },
  {
    id: 'asu',
    title: 'B.Sc. Computer Engineering',
    org: 'Ain Shams University',
    date: 'Graduating June 2027',
    note: 'Back to the foundations',
    body: 'Senior Computer Engineering student covering embedded and real-time systems, machine learning, computer vision and software engineering.',
    tags: ['Embedded', 'AI/ML', 'Software'],
  },
];
