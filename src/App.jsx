import { DATA } from "./data";

function DownloadCV({ className = "" }) {
  return (
    <a
      href={DATA.meta.cvUrl}
      download="CV_Shardul_Kattewar.pdf"
      className={`btn-primary ${className}`}
    >
      Download CV
    </a>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
      {children}
    </h2>
  );
}

function Tag({ children }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
      {children}
    </span>
  );
}

function ProjectCard({ project }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="project-card card p-6 block group"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{project.venue}</p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
          {project.language}
        </span>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-sm text-slate-500 font-mono">{project.repo}</span>
        <span className="project-card-link text-sm font-medium text-slate-700">
          View on GitHub
          <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </a>
  );
}

export default function App() {
  const { meta, about, education, projects, skills, certifications } = DATA;

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-800">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="#" className="font-semibold text-slate-900 hover:text-slate-600 transition-colors">
            {meta.name}
          </a>
          <nav className="hidden sm:flex items-center gap-5 text-sm text-slate-500">
            <a href="#projects" className="hover:text-slate-900 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-slate-900 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </nav>
          <DownloadCV className="text-sm !py-2 !px-4" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        {/* Hero */}
        <section className="mb-16">
          <p className="text-sm text-slate-500 mb-3">{meta.title}</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight mb-4">
            {meta.name}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-2">{meta.degree}</p>
          <p className="text-slate-500 mb-8">{meta.affiliation}</p>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl">{about}</p>
          <div className="flex flex-wrap gap-3">
            <DownloadCV />
            <a href="#contact" className="btn-secondary">
              Get in touch
            </a>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <SectionTitle>Education</SectionTitle>
          {education.map((e) => (
            <div key={e.degree} className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className="font-semibold text-slate-900">{e.degree}</h3>
                <span className="text-sm text-slate-500 shrink-0">{e.year}</span>
              </div>
              <p className="text-slate-600 mb-1">{e.institution}</p>
              <p className="text-sm font-medium text-slate-700 mb-2">{e.gpa}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{e.note}</p>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section id="projects" className="mb-16">
          <SectionTitle>Projects</SectionTitle>
          <p className="text-sm text-slate-500 mb-5 -mt-2">
            Click any project to open its source code on{" "}
            <a
              href={`https://${meta.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 underline-offset-2 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
          <div className="space-y-4">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-3">
            {certifications.map((c) => (
              <div key={c.title} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{c.title}</p>
                  <p className="text-sm text-slate-500">{c.issuer}</p>
                  {c.note && <p className="text-xs text-slate-400 mt-1">{c.note}</p>}
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full self-start ${
                    c.status === "Ongoing"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-16">
          <SectionTitle>Skills</SectionTitle>
          <div className="space-y-4">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  {cat}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="card p-6">
          <SectionTitle>Contact</SectionTitle>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${meta.email}`} className="text-slate-700 hover:text-slate-900 underline-offset-2 hover:underline">
                {meta.email}
              </a>
            </li>
            <li className="text-slate-600">{meta.phone}</li>
            <li className="text-slate-600">{meta.location}</li>
            <li>
              <a
                href={`https://${meta.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 hover:text-slate-900 underline-offset-2 hover:underline"
              >
                {meta.github}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <DownloadCV />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {meta.name}
      </footer>
    </div>
  );
}
