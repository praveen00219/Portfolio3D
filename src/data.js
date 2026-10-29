// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Praveen",
  role: "Software Development Engineer",
  roles: ["Full Stack Developer", "Dot-Net & MongoDb Developer", "React & TypeScript Engineer",  "Node.js & Supabase Developer", "Software Development Engineer"],
  tagline:
    "I build secure and scalable web apps — from clean React UIs to APIs, databases and payments.",
  years: "2+",
  intro:
    "Full Stack Developer with ~2 years of experience. I build secure, scalable web apps with React, TypeScript, Node.js and .NET — from clean UIs to APIs, databases and payments.",
  about:
    "Creative Software Engineer with expertise in Full Stack development, specializing in responsive and scalable web applications. Skilled in unit testing and high-performance systems, committed to delivering efficient, reliable solutions aligned with organizational goals.",
  email: "praveen2192000@gmail.com",
  phone: "+91-7297952644",
  location: "Bengaluru, India",
  resume: "https://drive.google.com/file/d/1mnehh73rlcL5dkEblYnLtaL30bpNTeFO/view?usp=sharing",
  avatar: "/img/avatar.png",
};

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/praveen219/" },
  { name: "GitHub", href: "https://github.com/praveen00219" },
  { name: "LeetCode", href: "https://leetcode.com/u/Prvn21/" },
  { name: "HackerRank", href: "https://www.hackerrank.com/profile/paru2192000" },
  { name: "Instagram", href: "https://www.instagram.com/pr.vn21/" },
];

export const stats = [
  { label: "Live Projects", value: 60, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "LeetCode Solved", value: 260, suffix: "+" },
];

export const experience = [
  {
    role: "Software Development Engineer",
    company: "Capsitech IT Services",
    logo: "CI",
    project: "Audit Management Module · Acting Office (UK accounting SaaS)",
    period: "Sep 2026 — Present",
    current: true,
    place: "India",
    type: "On-site",
    metrics: [
      { value: "140+", label: "REST APIs" },
      { value: "5K", label: "Sample records" },
      { value: "10", label: "Sign-off stages" },
      { value: "45+", label: "Audited actions" },
    ],
    points: [
      "Developed a multi-tenant Audit Management module for a UK accounting SaaS platform using C#, ASP.NET Core (.NET 8) Web API, React 18, TypeScript and MongoDB, delivering 140+ REST API endpoints across the full audit lifecycle (Planning, Execution, Completion).",
      "Engineered an event-driven General Ledger CSV import pipeline using RabbitMQ (MassTransit), Azure Blob Storage and .NET Channels (producer-consumer), with batched MongoDB bulk inserts (250 records per batch), parallel workers and row-level error and warning validation.",
      "Built an audit sampling engine supporting Random, Systematic and Monetary Unit Sampling (MUS) on General Ledger data using MongoDB aggregation pipelines, distributed caching, TTL-indexed storage and streamed CSV export for samples of up to 5,000 records.",
      "Implemented risk assessment, internal control testing and materiality calculations (overall, performance, trivial, tolerance) mapped to 9 financial statement assertions, plus Trial Balance vs General Ledger variance analysis with Excel export (ClosedXML).",
      "Created a 3-tier checklist template library (Global, Practice, Engagement) with a dynamic questionnaire builder (5 answer types including tables), drag-and-drop ordering (React DnD) and template sync secured by MongoDB multi-document transactions.",
      "Secured engagement workflows with role-based access control (RBAC), OIDC/JWT authentication and a custom ASP.NET Core action filter, and added a 10-stage Preparer/Reviewer sign-off workflow with audit trail logging on 45+ critical actions.",
    ],
    stack: ["C#", ".NET 8", "ASP.NET Core", "React 18", "TypeScript", "MongoDB", "RabbitMQ", "MassTransit", "Azure Blob Storage", "Fluent UI", "Formik", "React DnD", "JWT / OIDC", "Serilog", "GitHub Actions", "Azure App Service"],
  },
  {
    role: "Software Development Engineer",
    company: "Nrolled Inc.",
    logo: "N",
    project: "Nexus · Job marketplace platform",
    period: "Sep 2025 — Jun 2026",
    place: "Ontario, Canada",
    type: "Remote",
    metrics: [
      { value: "1,000+", label: "Job transactions" },
      { value: "30+", label: "Tables with RLS" },
      { value: "20+", label: "Notification APIs" },
      { value: "45%+", label: "Less manual payments" },
    ],
    points: [
      "Implemented secure authentication, authorization, and Role-Based Access Control (RBAC) for Admin, Worker, and Customer modules across 3 user roles.",
      "Developed and optimized the complete job lifecycle — from customer job posting and approval to worker assignment and placement — supporting 1,000+ job transactions.",
      "Built Stripe payment features — bulk payments, worker payouts, refunds, and automated post-job payments — reducing manual payment work by 45%+.",
      "Managed the end-to-end Push Notification system, including 20+ APIs, dashboard features, and real-time job tracking notifications.",
      "Implemented Row-Level Security (RLS) policies across 30+ database tables for role-based data access.",
      "Delivered worker profile review and resume screening workflows with automated approvals and email reminders, reducing manual review effort by 40%+.",
      "Built job scheduling conflict validation to prevent overlapping job assignments.",
      "Contributed to UAT and Production deployments — code merging, PR reviews, support, and environment configuration.",
    ],
    stack: ["React.js", "TypeScript", ".NET", "Supabase", "Node.js", "Firebase", "Tailwind CSS", "Stripe", "Axios", "Postman", "GitHub", "Bitbucket"],
  },
  {
    role: "Software Development Engineer",
    company: "StudentsBoat Inc.",
    logo: "SB",
    project: "Student housing platform",
    period: "Nov 2024 — Sep 2025",
    place: "Oregon, United States",
    type: "Remote",
    metrics: [
      { value: "15+", label: "Search filters" },
      { value: "80%", label: "More platform trust" },
    ],
    points: [
      "Designed and built key platform features: room and property listing pages with 15+ advanced filters, property detail pages with amenities and availability tracking, student profile pages, and Stripe payments.",
      "Engineered end-to-end background verification workflows for students and hosts — university verification, government ID validation, property ownership and legal compliance checks — improving platform trust by 80%.",
    ],
    stack: ["React.js", "Redux", "Node.js", "Prisma", "PostgreSQL", "Swagger", "Stripe", "Azure", "Tailwind", "SCSS"],
  },
];

export const projects = [
  {
    name: "Medico App",
    type: "MERN",
    img: "/img/projects/medico.jpg",
    desc: "Real-time doctor consultation and booking platform with integrated video calling (ZegoCloud API) for secure virtual appointments.",
    demo: "https://medico-book.onrender.com",
    code: "https://github.com/praveen00219",
  },
  {
    name: "V Talk App",
    type: "MERN",
    img: "/img/projects/vtalk.jpg",
    desc: "Modern chat platform with fast conversations, group chats, media sharing, emoji reactions, light/dark themes and cross-device sync.",
    demo: "https://v-talk.onrender.com",
    code: "https://github.com/praveen00219/V-Talk",
  },
  {
    name: "Expense Tracker",
    type: "MERN",
    img: "/img/projects/expense.jpg",
    desc: "Full-stack expense tracker with authentication, categories, summaries and a dashboard with visualizations.",
    demo: "https://expense-tracker-mern-prvn.onrender.com/",
    code: "https://github.com/praveen00219/Expense-Tracker-MERN",
  },
  {
    name: "Full Stack Auth App",
    type: "MERN",
    img: "/img/projects/auth.png",
    desc: "Authentication system with protected routes, token management, reset password, OTP and email verification.",
    demo: "",
    code: "https://github.com/praveen00219/Advanced-Authentication-App",
  },
  {
    name: "Zomato Food App",
    type: "MERN",
    img: "",
    desc: "Food delivery app with Admin Panel — browse menu, add to cart, place orders and view order history.",
    demo: "https://zomato-clone-frontend-9g69.onrender.com/",
    code: "https://github.com/praveen00219/Zomato-Clone",
  },
  {
    name: "Slack Chat App",
    type: "React",
    img: "/img/projects/slack.jpg",
    desc: "Slack clone with React, Redux and Firebase — channels, messaging and Google login.",
    demo: "https://slack-chatbot-r6jw.onrender.com/",
    code: "https://github.com/praveen00219/Slack-Chat-App",
  },
  {
    name: "Google Drive Clone",
    type: "React",
    img: "/img/projects/gdrive.jpg",
    desc: "Manage files and folders — uploads, folder creation, delete, restore and favourites. Built with React, Redux and Firebase.",
    demo: "https://praveen-google-drive-react.netlify.app/",
    code: "https://github.com/praveen00219/google-drive-react-firebase",
  },
  {
    name: "Geek-Connect",
    type: "React",
    img: "/img/projects/geekconnect.jpg",
    desc: "Social media app with posts, likes, comments, trending hashtags and user profiles. React, Redux and Material UI.",
    demo: "https://geekconnect-prvn.netlify.app/",
    code: "https://github.com/praveen00219/Geek-Connect",
  },
  {
    name: "Funflix Movie App",
    type: "React",
    img: "/img/projects/funflix.jpg",
    desc: "Browse the latest movies, filter by category and watch trailers using the TMDB API.",
    demo: "https://funflix-km14.onrender.com/",
    code: "https://github.com/praveen00219/Funflix-The-move-app",
  },
  {
    name: "Waypoint Explorer",
    type: "React",
    img: "/img/projects/waypoint.jpg",
    desc: "Interactive map app to draw routes, measure distances between waypoints and view waypoint details.",
    demo: "https://waypoint-explorer-app.netlify.app/",
    code: "https://github.com/praveen00219/Waypoint-Explorer",
  },
];

export const skills = [
  { group: "Frontend", items: ["React.js", "TypeScript", "Next.js", "JavaScript", "Redux", "Tailwind CSS", "Material UI", "Sass", "Bootstrap", "HTML", "CSS"] },
  { group: "Backend", items: ["Node.js", "Express.js", "C#", ".NET 8", "ASP.NET Core", "REST APIs", "RabbitMQ", "Socket.IO", "Stripe", "Java"] },
  { group: "Database & Cloud", items: ["PostgreSQL", "Supabase", "MongoDB", "Firebase", "Prisma", "Cloudinary", "AWS", "Azure", "Azure Blob Storage"] },
  { group: "Tools", items: ["Git", "GitHub", "GitHub Actions", "Bitbucket", "Docker", "Postman", "Swagger", "Serilog", "VS Code"] },
];

export const education = [
  {
    title: "Full Stack Web Development",
    place: "Geekster · Gurgaon, Haryana",
    period: "Jan 2024 — Dec 2024",
    points: [
      "Completed the Full Stack Web Development certification course.",
      "Solved 500+ DSA problems on HackerRank and LeetCode.",
      "Built a gamified learning platform idea across three Geekathons (60 participants).",
      "Built Google Drive, LinkedIn, Gmail, Slack and e-commerce clones plus 50+ mini projects.",
    ],
    link: "https://drive.google.com/file/d/1AFr3Ad4WNnLIt6MOIuU5Q0hKQz9XZDov/view?usp=sharing",
  },
  { title: "MS", place: "Vardhman Mahaveer Open University, Kota", period: "Aug 2022 — Oct 2025" },
  { title: "BS", place: "Maharshi Dayanand Saraswati University, Ajmer", period: "Aug 2017 — Oct 2021" },
  { title: "Senior Secondary (12th) — 83.40%", place: "Board of Secondary Education, Rajasthan", period: "2016 — 2017" },
  { title: "Secondary (10th) — 83.33%", place: "Board of Secondary Education, Rajasthan", period: "2014 — 2015" },
];

export const certificates = [
  { title: "Full Stack Web Development", by: "Geekster", logo: "/img/logos/geekster-logo.png", date: "Dec 2024", img: "/img/certs/FullStackWebCertificateGeeksterPraveen.jpg", skills: ["React", "Node.js", "MongoDB", "Express", "Redux", "AWS"], url: "https://drive.google.com/file/d/1AFr3Ad4WNnLIt6MOIuU5Q0hKQz9XZDov/view?usp=sharing" },
  { title: "JavaScript Algorithms & DSA", by: "freeCodeCamp", logo: "/img/logos/freeCodeCamp-logo.png", date: "Jul 2024", img: "/img/certs/javaScript-freeCodeCamp.jpg", skills: ["Algorithms", "Data Structures", "ES6+", "Debugging"], url: "https://www.freecodecamp.org/certification/Praveen21/javascript-algorithms-and-data-structures" },
  { title: "JavaScript (Intermediate)", by: "HackerRank", logo: "/img/logos/Hackerrank_logo.webp", date: "Aug 2024", img: "/img/certs/javaScript-intermediate-hackerRank.jpg", skills: ["Closures", "Async JS", "Objects", "ES6+"], url: "https://www.hackerrank.com/certificates/094fd884796d" },
  { title: "Problem Solving (Intermediate)", by: "HackerRank", logo: "/img/logos/Hackerrank_logo.webp", date: "Aug 2024", img: "/img/certs/problem-solving-intermediate-hackerRank.jpg", skills: ["Algorithm Design", "Data Structures", "Time Complexity"], url: "https://www.hackerrank.com/certificates/03092ea6817f" },
  { title: "Mastering Java", by: "Scaler Topics", logo: "/img/logos/Scaler-logo.png", date: "Jul 2024", img: "/img/certs/java-scaler-topics.jpg", skills: ["OOP", "Collections", "Multithreading"], url: "https://moonshot.scaler.com/s/li/E917PSUwNz" },
  { title: "SQL Database", by: "Geekster", logo: "/img/logos/geekster-logo.png", date: "Jun 2024", img: "/img/certs/SQL-geekster.jpg", skills: ["Joins", "Subqueries", "Filtering", "Sorting"], url: "https://certifications.geekster.in/yZqp3XSxCGnEM7WHDwAF4-geekster.pdf" },
  { title: "Responsive Web Page", by: "Geekster", logo: "/img/logos/geekster-logo.png", date: "Jun 2024", img: "/img/certs/responsive-web-page.jpg", skills: ["Layouts", "Transitions", "Animations"], url: "https://certifications.geekster.in/-k01RhLXfBW_3kfujnAqP-geekster.pdf" },
  { title: "Git & GitHub", by: "Geekster", logo: "/img/logos/geekster-logo.png", date: "May 2024", img: "/img/certs/git-github.jpg", skills: ["Branching", "Merging", "GitHub"], url: "https://certifications.geekster.in/-Xx-DYDop-o0sSaJ5lJnK-geekster.pdf" },
  { title: "Mastering JavaScript", by: "Geekster", logo: "/img/logos/geekster-logo.png", date: "Apr 2024", img: "/img/certs/javaScript-geekster.jpg", skills: ["DOM", "Closures", "Hoisting", "ES6+"], url: "https://certifications.geekster.in/ALrlplNwi9x5__0VGVfBx-geekster.pdf" },
  { title: "Mastering Java", by: "Geekster", logo: "/img/logos/geekster-logo.png", date: "Mar 2024", img: "/img/certs/java.jpg", skills: ["Syntax", "Collections", "Multithreading"], url: "https://certifications.geekster.in/iVqg6LsAnP_eJqsd_nKrn-geekster.pdf" },
];
