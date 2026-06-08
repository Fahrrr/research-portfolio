// Portfolio content — sourced from CV_Shardul Kattewar.pdf
export const DATA = {
  meta: {
    name: "Shardul Kattewar",
    title: "Backend Engineer · CSBS Student",
    affiliation: "D.Y. Patil RAIT · Nerul",
    degree: "B.Tech in Computer Science & Business Systems (CSBS)",
    email: "shardulkattewar@gmail.com",
    phone: "+91 7718841231",
    location: "Thane, India",
    github: "github.com/Fahrrr",
    cvUrl: "/CV_Shardul_Kattewar.pdf",
  },

  about:
    "Detail-oriented Backend Engineer and CSBS student specializing in high-performance Python application architectures, data pipelines, and cryptographic security. Proven track record developing autonomous financial agents and secure algorithmic trading engines with an emphasis on modular, fail-safe system design.",

  education: [
    {
      degree: "B.Tech in Computer Science & Business Systems (CSBS)",
      institution: "D.Y. Patil, RAIT — Nerul",
      year: "2023 – 2027",
      gpa: "Current CGPA: 7.32 / 10",
      note: "Consistent improvement from 4.0 in Semester 1 (83% growth). Relevant coursework: DSA, RDBMS, Applied Statistics, Information Security.",
    },
  ],

  projects: [
    {
      title: "Binance Futures Algorithmic Trading Engine",
      venue: "FinTech / Backend",
      description:
        "Engineered a modular CLI trading bot in Python to securely execute live MARKET/LIMIT orders on the Binance Testnet using signed SHA256 HMAC encryption. Designed a fail-safe input boundary validation framework and an interactive multi-step terminal UI wizard with live telemetry tracking.",
      tags: ["Python", "REST API", "HMAC-SHA256", "Binance"],
    },
    {
      title: "FinReact – Autonomous Local AI Financial Agent",
      venue: "Agentic AI",
      description:
        "Engineered a local-first autonomous financial agent using Python and an offline Llama 3 model. Implemented intent routing between SQLite and web scraping, a Text-to-SQL translation pipeline, and sliding-window memory to cap prompt payloads and maintain low processing latency.",
      tags: ["Python", "Ollama", "Llama 3", "SQLite", "ReAct"],
    },
    {
      title: "AI-Driven Precision Agriculture & Crop Recommendation",
      venue: "Applied ML",
      description:
        "Developed a predictive model to optimize agricultural output based on soil chemistry and environmental factors using Random Forest and XGBoost. Engineered a data pipeline for NPK and climate data with modular OOP structures for scalability.",
      tags: ["Python", "Scikit-learn", "XGBoost", "Random Forest"],
    },
    {
      title: "Agentic AI Portfolio & Research Hub",
      venue: "Personal Project",
      description:
        "Engineered a professional academic portfolio using an Agentic AI workflow with modular component architecture, a custom AI Transparency disclosure, and integrated research dossiers.",
      tags: ["React", "Tailwind CSS", "Claude", "Cursor"],
    },
  ],

  certifications: [
    {
      title: "Advanced Data Science & Machine Learning",
      issuer: "iHUB IIT Roorkee",
      status: "Completed",
      note: "Predictive modeling, data pipelines, and architectural frameworks.",
    },
    {
      title: "Microsoft SQL Technical Certification",
      issuer: "Microsoft",
      status: "Completed",
      note: "Advanced database management, relational indexing, and query optimization.",
    },
  ],

  skills: {
    Languages: ["Python", "C++", "C", "SQL (SQLite)", "JavaScript"],
    "Libraries & Frameworks": ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Node.js", "React"],
    "Backend & AI": [
      "REST APIs",
      "HMAC-SHA256",
      "Ollama",
      "Llama 3",
      "ReAct Architecture",
      "Prompt Engineering",
    ],
    Coursework: ["DSA", "RDBMS", "Applied Statistics", "Information Security"],
  },
};
