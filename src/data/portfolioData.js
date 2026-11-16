export const personalData = {
  name: "Rafi Diandra Ardi Agusta",
  shortName: "Rafi",
  roles: [
    "Junior Developer",
    "Tech Enthusiast",
    "Frontend Explorer",
    "Creative Problem Solver"
  ],
  bio: "Informatics Management student at Politeknik Negeri Lampung and an aspiring junior web developer passionate about exploring modern web technologies. Blending futuristic design aesthetics with clean, performant, and scalable code — eager to tackle new challenges and build impactful digital experiences.",
  status: "Available for Internship & Full-time Roles",
  email: "rafidiandra57@gmail.com",
  location: "Lampung, Indonesia",
  resumeUrl: "#",
  avatarUrl: "/profile.jpg",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/rafidiandra57-cmd",
      icon: "Github",
      color: "#f1f5f9",
      username: "@rafidiandra57-cmd"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/rafidiandra",
      icon: "Linkedin",
      color: "#0a66c2",
      username: "in/rafidiandra"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/rafi.diandraa",
      icon: "Instagram",
      color: "#e1306c",
      username: "@rafi.diandraa"
    }
  ]
};

export const educationData = [
  {
    period: "2024 - Sekarang",
    institution: "Politeknik Negeri Lampung (POLINELA)",
    degree: "D3 Manajemen Informatika",
    location: "Bandar Lampung, Indonesia",
    gpa: "Mahasiswa Aktif",
    description: "Fokus pada pengembangan perangkat lunak, sistem informasi, basis data, arsitektur web modern, dan kecerdasan buatan (AI).",
    achievements: [
      "Aktif dalam eksplorasi pengembangan web modern (React, Tailwind CSS, TypeScript)",
      "Penyelesaian sertifikasi resmi IBM SkillsBuild (Granite Code Optimization & Data Analysis)"
    ]
  },
  {
    period: "2021 - 2024",
    institution: "SMA Muhammadiyah Gisting",
    degree: "Sekolah Menengah Atas (IPS)",
    location: "Gisting, Tanggamus, Lampung",
    gpa: "Lulusan 2024",
    description: "Menyelesaikan pendidikan menengah atas jurusan IPS dengan ketertarikan mendalam pada teknologi informasi, ekonomi digital, dan komputasi modern.",
    achievements: [
      "Aktif dalam kegiatan akademik dan kepengurusan organisasi sekolah"
    ]
  }
];

export const experienceData = [
  {
    role: "Junior Frontend Developer (Intern)",
    company: "Orbit Tech Solutions",
    period: "Jul 2024 - Sekarang",
    type: "Internship • Remote",
    description: "Mengembangkan antarmuka aplikasi web manajemen data analitik menggunakan React, Tailwind CSS, dan RESTful API.",
    contributions: [
      "Mengurangi waktu muat dashboard hingga 35% dengan lazy loading dan optimasi state management.",
      "Mengimplementasikan 15+ komponen reusable berbasis Figma Design System.",
      "Berkolaborasi aktif dengan tim backend dan QA dalam sprint 2 mingguan (Agile/Scrum)."
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Jest"]
  },
  {
    role: "Web Developer Freelance",
    company: "Self-Employed",
    period: "Jan 2023 - Jun 2024",
    type: "Freelance • Project-Based",
    description: "Mendesain dan mendeploy landing page, website profil UMKM, dan platform portal e-commerce kustom.",
    contributions: [
      "Menyelesaikan 12+ website klien dengan kepuasan rating 4.9/5.0.",
      "Mengintegrasikan payment gateway Midtrans dan webhook notifikasi WhatsApp.",
      "Menerapkan teknik SEO on-page yang meningkatkan traffic organik klien sebesar 60%."
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase", "Framer Motion"]
  },
  {
    role: "Core Member & Lab Assistant",
    company: "Informatics Lab BINUS",
    period: "Sep 2023 - Jan 2024",
    type: "Part-time • Campus",
    description: "Membimbing 100+ mahasiswa junior dalam praktikum Pemrograman Web dan Algoritma Dasar.",
    contributions: [
      "Menyusun modul praktikum interaktif berbasis Git dan JavaScript modern.",
      "Menyelenggarakan workshop pengenalan React & Tailwind CSS untuk pemula."
    ],
    tech: ["JavaScript", "HTML5/CSS3", "Git", "GitHub Classroom"]
  }
];

export const statsData = [
  {
    value: "2",
    label: "Project Completed",
    description: "AI Vault & Portal Akademik SIAKAD Cakrawala",
    icon: "FolderCheck"
  },
  {
    value: "1.8K+",
    label: "Git Commits",
    description: "Aktivitas kode konsisten di repository publik & privat",
    icon: "GitCommit"
  },
  {
    value: "4",
    label: "Certificates Earned",
    description: "Sertifikasi resmi IBM SkillsBuild & Credly terverifikasi",
    icon: "Award"
  },
  {
    value: "99.8%",
    label: "Uptime & Satisfaction",
    description: "Fokus pada reliabilitas dan kode yang bersih",
    icon: "ShieldCheck"
  }
];

export const projectsData = [
  {
    id: "ai-vault",
    title: "AI Vault",
    category: "AI & Tools",
    badge: "Featured • AI",
    description: "Platform brankas digital cerdas untuk mengarsipkan, mengorganisir, dan mengelola aset kecerdasan buatan, prompt engineering, basis pengetahuan terenkripsi, serta model AI secara aman dengan efisiensi tinggi.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Vector DB", "Framer Motion"],
    demoUrl: "https://github.com/rafidiandra57-cmd/ai-vault",
    githubUrl: "https://github.com/rafidiandra57-cmd/ai-vault",
    highlights: [
      "Sistem brankas terenkripsi untuk manajemen prompt library dan repositori model AI",
      "Pencarian semantik cerdas berbasis Vector Embeddings untuk temu kembali data instan",
      "Antarmuka sci-fi dark-mode modern dengan performa tinggi dan integrasi API responsif"
    ]
  },
  {
    id: "siakad-cakrawala",
    title: "SIAKAD Cakrawala",
    category: "Web Apps",
    badge: "Live Demo • Web App",
    description: "Portal Akademik Terpadu (Universitas Cakrawala Nusantara) dengan simulasi alur kerja 3 peran (Mahasiswa, Dosen, Administrator), KHS & transkrip nilai real-time, pengumpulan tugas, forum diskusi, dan manajemen akun CRUD.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["HTML5", "Vanilla CSS", "JavaScript ES6+", "Glassmorphism", "LocalStorage", "Role-Based UI"],
    demoUrl: "/projects/siakad/index.html",
    highlights: [
      "Alur kerja 3 peran terintegrasi (Mahasiswa, Dosen Pengampu, Administrator) dengan fitur Ganti Peran instan",
      "Modul KHS & transkrip nilai otomatis (Tugas 30%, UTS 30%, UAS 40%) tersinkronisasi dari penilaian dosen",
      "Manajemen akun CRUD lengkap, ekspor JSON, forum diskusi kampus, serta tema Light/Dark berbasis Glassmorphism"
    ]
  }
];

export const certificatesData = [
  {
    id: "cert-ibm-granite",
    title: "Code Generation and Optimization Using IBM Granite",
    issuer: "IBM SkillsBuild",
    issueDate: "21 Agustus 2025",
    expiryDate: "Tidak Ada Masa Kedaluwarsa",
    credentialId: "76cbfecd-e96a-47ee-8e36-225462dd4ea4",
    verifyUrl: "https://www.credly.com/badges/76cbfecd-e96a-47ee-8e36-225462dd4ea4",
    skills: [
      "Generative AI",
      "IBM Granite Models",
      "Code Generation",
      "Code Optimization",
      "Prompt Engineering",
      "AI for Developers"
    ],
    icon: "Code",
    badgeColor: "#38bdf8"
  },
  {
    id: "cert-ibm-data",
    title: "Getting Started with Data",
    issuer: "IBM SkillsBuild",
    issueDate: "27 September 2026",
    expiryDate: "Tidak Ada Masa Kedaluwarsa",
    credentialId: "752de522-c326-4e0c-b747-efae56cf7e4f",
    courseCode: "PLAN-14F2691E3A32",
    verifyUrl: "https://www.credly.com/badges/752de522-c326-4e0c-b747-efae56cf7e4f",
    pdfUrl: "/certificates/IBM-Getting-Started-with-Data.pdf",
    skills: [
      "Data Fundamentals",
      "Data Literacy",
      "Data Analysis Basics",
      "Big Data Concepts",
      "IBM SkillsBuild"
    ],
    icon: "Award",
    badgeColor: "#2c67ed"
  },
  {
    id: "cert-ibm-ai-agents",
    title: "Unleashing the Power of AI Agents",
    issuer: "IBM SkillsBuild",
    issueDate: "27 September 2026",
    expiryDate: "Tidak Ada Masa Kedaluwarsa",
    credentialId: "ALM-COURSE_3825456",
    learningHours: "1 hr 30 mins",
    recordSystem: "Adobe Learning Manager",
    pdfUrl: "/certificates/IBM-Unleashing-the-Power-of-AI-Agents.pdf",
    skills: [
      "AI Agents",
      "Agentic Workflows",
      "Autonomous Systems",
      "Generative AI",
      "IBM SkillsBuild"
    ],
    icon: "Cpu",
    badgeColor: "#0ea5e9"
  },
  {
    id: "cert-ibm-granite-classify",
    title: "Classifying Data Using IBM Granite",
    issuer: "IBM SkillsBuild",
    issueDate: "27 September 2026",
    expiryDate: "Tidak Ada Masa Kedaluwarsa",
    credentialId: "ALM-COURSE_4058910",
    learningHours: "1 hr 30 mins",
    recordSystem: "Adobe Learning Manager",
    pdfUrl: "/certificates/IBM-Classifying-Data-Using-IBM-Granite.pdf",
    skills: [
      "Data Classification",
      "IBM Granite Models",
      "Machine Learning",
      "Generative AI",
      "IBM SkillsBuild"
    ],
    icon: "Database",
    badgeColor: "#0284c7"
  }
];

export const techStackData = {
  frontend: [
    { name: "React.js", level: 90, status: "Proficient", icon: "Atom", experience: "2+ Tahun" },
    { name: "JavaScript (ES6+)", level: 92, status: "Advanced", icon: "FileCode", experience: "2.5 Tahun" },
    { name: "TypeScript", level: 78, status: "Intermediate", icon: "Code2", experience: "1 Tahun" },
    { name: "Next.js", level: 75, status: "Intermediate", icon: "Boxes", experience: "1 Tahun" },
    { name: "HTML5 & Modern CSS", level: 95, status: "Master", icon: "FileText", experience: "3 Tahun" },
    { name: "Vue.js", level: 65, status: "Familiar", icon: "Layers", experience: "6 Bulan" }
  ],
  stylingAnimation: [
    { name: "Tailwind CSS", level: 95, status: "Master", icon: "Palette", experience: "2+ Tahun" },
    { name: "Framer Motion", level: 88, status: "Proficient", icon: "Layers", experience: "1.5 Tahun" },
    { name: "CSS Modules & Sass", level: 82, status: "Proficient", icon: "Paintbrush", experience: "2 Tahun" },
    { name: "Three.js / WebGL Basics", level: 60, status: "Learning", icon: "Globe", experience: "6 Bulan" },
    { name: "Responsive & Glassmorphism", level: 92, status: "Advanced", icon: "Maximize", experience: "2+ Tahun" }
  ],
  backendDatabase: [
    { name: "Node.js & Express", level: 78, status: "Intermediate", icon: "Server", experience: "1.5 Tahun" },
    { name: "RESTful APIs & GraphQL", level: 82, status: "Proficient", icon: "Network", experience: "2 Tahun" },
    { name: "PostgreSQL", level: 72, status: "Intermediate", icon: "Database", experience: "1 Tahun" },
    { name: "MongoDB", level: 75, status: "Intermediate", icon: "HardDrive", experience: "1 Tahun" },
    { name: "Supabase & Firebase", level: 80, status: "Proficient", icon: "Flame", experience: "1.5 Tahun" }
  ],
  toolsDevOps: [
    { name: "Git & GitHub", level: 90, status: "Proficient", icon: "GitBranch", experience: "2.5 Tahun" },
    { name: "Vite & Webpack", level: 85, status: "Proficient", icon: "Zap", experience: "2 Tahun" },
    { name: "Docker Basics", level: 65, status: "Intermediate", icon: "Container", experience: "8 Bulan" },
    { name: "Postman API Testing", level: 88, status: "Proficient", icon: "Send", experience: "2 Tahun" },
    { name: "Figma to Code", level: 86, status: "Proficient", icon: "Figma", experience: "2 Tahun" },
    { name: "Vercel / Netlify Deploy", level: 92, status: "Advanced", icon: "UploadCloud", experience: "2 Tahun" }
  ]
};

