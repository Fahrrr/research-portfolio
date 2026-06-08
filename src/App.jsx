import { useState, useEffect, useRef } from "react";
import { DATA } from "./data";
import { CursorProvider, useCursor } from "./context/CursorContext";
import { CursorSpotlight, InteractiveIconField, TiltCard } from "./components/CursorEffects";

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#metrics", label: "Metrics" },
    { href: "#research", label: "Research" },
    { href: "#ai", label: "AI Transparency" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8ab4f8] to-[#c58af9] flex items-center justify-center text-xs font-bold text-[#050508]">
            SK
          </span>
          <span className="font-display text-sm text-zinc-300 group-hover:text-white transition-colors hidden sm:block">
            {DATA.meta.name}
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href={DATA.meta.cvUrl} target="_blank" rel="noreferrer" className="btn-primary text-sm">
          Download CV
        </a>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { x, y } = useCursor();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center section-pad pt-28 overflow-hidden">
      <InteractiveIconField />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="font-mono-ag text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6">
          {DATA.meta.degree}
        </p>
        <h1
          className="hero-title-interactive font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-6"
          style={{ "--mx": x, "--my": y }}
        >
          <span className="text-white">{DATA.hero.headline}</span>
          <br />
          <span className="gradient-text">{DATA.hero.headlineAccent}</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
          {DATA.hero.subline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn-primary inline-flex items-center gap-2">
            <span className="text-lg leading-none">▶</span>
            Explore projects
          </a>
          <a href="#metrics" className="btn-ghost">
            View metrics
          </a>
        </div>
        <p className="mt-12 text-sm text-zinc-500">{DATA.meta.affiliation}</p>
      </div>
    </section>
  );
}

// ─── Experience tabs (Antigravity “An Agent-First Experience”) ────────────────
function ExperienceSection() {
  const [active, setActive] = useState(0);
  const exp = DATA.experiences[active];

  return (
    <section id="experience" className="section-pad border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono-ag text-xs uppercase tracking-widest text-zinc-500 text-center mb-4">
          An research-first experience
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {DATA.experiences.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                active === i
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
        <TiltCard className="ag-card p-8 md:p-12 max-w-3xl mx-auto experience-panel" key={active}>
          <h3 className="font-display text-2xl md:text-3xl text-white mb-4">{exp.title}</h3>
          <p className="text-zinc-400 leading-relaxed">{exp.description}</p>
        </TiltCard>
      </div>
    </section>
  );
}

// ─── Trust block ─────────────────────────────────────────────────────────────
function TrustSection() {
  return (
    <section className="section-pad bg-[var(--ag-surface)]/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
          <span className="text-white">{DATA.trust.headline}</span>
          <br />
          <span className="text-zinc-500">{DATA.trust.headlineAccent}</span>
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">{DATA.trust.body}</p>
        <p className="mt-8 text-sm text-zinc-600 max-w-xl mx-auto">{DATA.about}</p>
      </div>
    </section>
  );
}

// ─── Project carousel ────────────────────────────────────────────────────────
function ProjectCarousel() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const slides = DATA.carousel;

  const go = (dir) => {
    setIdx((i) => (i + dir + slides.length) % slides.length);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.children[idx];
    if (slide) slide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [idx]);

  return (
    <section id="projects" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <h2 className="font-display text-2xl md:text-3xl text-white">Research & projects</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="carousel-track flex gap-5 overflow-x-auto pb-4 -mx-2 px-2"
        >
          {slides.map((s, i) => (
            <TiltCard
              key={s.title}
              className={`carousel-slide flex-shrink-0 w-[min(100%,520px)] ag-card p-8 ${
                i === idx ? "ring-1 ring-[#8ab4f8]/30" : ""
              }`}
            >
              <div className="aspect-video rounded-xl bg-black/40 border border-white/5 mb-6 flex items-center justify-center">
                <span className="text-4xl opacity-30">▶</span>
              </div>
              <h3 className="font-display text-xl text-white mb-3">{s.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono-ag px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-8 bg-[#8ab4f8]" : "w-1.5 bg-zinc-600"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Metrics ─────────────────────────────────────────────────────────────────
function MetricsSection() {
  return (
    <section id="metrics" className="section-pad border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-white text-center mb-12">
          Performance evolution
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA.stats.map((s) => (
            <TiltCard key={s.label} className="ag-card p-6 text-center">
              <p className="font-mono-ag text-[10px] uppercase tracking-wider text-zinc-500 mb-3">
                {s.label}
              </p>
              <p className="font-display text-3xl text-white">
                {s.value}
                <span className="text-lg text-zinc-500">{s.suffix}</span>
              </p>
              <p className="text-xs text-zinc-600 mt-2">{s.note}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Latest research (blog-style) ────────────────────────────────────────────
function ResearchSection() {
  return (
    <section id="research" className="section-pad bg-[var(--ag-surface)]/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-white mb-10">Latest research</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {DATA.research.map((r) => (
            <TiltCard key={r.title} className="ag-card p-6 block group">
            <a href="#projects" className="block h-full">
              <div className="flex items-center gap-3 text-xs font-mono-ag text-zinc-500 mb-3">
                <span className="px-2 py-0.5 rounded border border-white/10 text-zinc-400">
                  {r.status}
                </span>
                <span>{r.date}</span>
              </div>
              <h3 className="font-display text-lg text-white group-hover:text-[#8ab4f8] transition-colors mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-zinc-500 line-clamp-2">{r.synopsis}</p>
              <span className="inline-block mt-4 text-sm text-[#8ab4f8]">Read more →</span>
            </a>
            </TiltCard>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          {DATA.certifications.map((cert) => (
            <div key={cert.title} className="ag-card p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <p className="text-xs font-mono-ag uppercase text-zinc-500 mb-1">Certification</p>
                <p className="font-display text-lg text-white">{cert.title}</p>
                <p className="text-sm text-zinc-500">{cert.issuer}</p>
                {cert.note && <p className="text-xs text-zinc-600 mt-1">{cert.note}</p>}
              </div>
              <span className="sm:ml-auto text-xs font-mono-ag px-3 py-1.5 rounded-full border border-emerald-500/30 text-emerald-200/90 bg-emerald-500/10 whitespace-nowrap">
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────
function SkillsSection() {
  return (
    <section className="section-pad border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-2xl text-white text-center mb-10">Skills & stack</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(DATA.skills).map(([cat, items]) => (
            <div key={cat} className="ag-card p-5">
              <p className="font-mono-ag text-[10px] uppercase tracking-wider text-zinc-500 mb-3">
                {cat}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-zinc-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI Transparency ─────────────────────────────────────────────────────────
function AISection() {
  return (
    <section id="ai" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-white mb-4">AI transparency</h2>
        <p className="text-zinc-400 max-w-2xl mb-10 leading-relaxed">{DATA.aiTransparency.intro}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {DATA.aiTransparency.sections.map((s) => (
            <div key={s.title} className="ag-card p-5">
              <p className="font-medium text-white text-sm mb-2">{s.title}</p>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">{s.detail}</p>
              <div className="flex justify-between text-[10px] font-mono-ag text-zinc-600 mb-1">
                <span>Human {s.human}%</span>
                <span>AI {s.ai}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden flex bg-zinc-800">
                <div className="h-full bg-zinc-400" style={{ width: `${s.human}%` }} />
                <div className="h-full bg-[#8ab4f8]" style={{ width: `${s.ai}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTAs (Antigravity “Achieve new heights”) ────────────────────────────────
function CTASection() {
  return (
    <section className="section-pad border-t border-white/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {DATA.ctas.map((c) => (
          <TiltCard key={c.title} className="ag-card p-8 md:p-10 flex flex-col">
            <p className="font-mono-ag text-xs uppercase tracking-wider text-zinc-500 mb-2">
              {c.eyebrow}
            </p>
            <h3 className="font-display text-2xl text-white mb-1">{c.title}</h3>
            <p className="text-zinc-500 mb-8">{c.subtitle}</p>
            <a href={c.href} className="btn-primary self-start mt-auto">
              {c.action}
            </a>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const d = DATA.meta;
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-white">{d.name}</p>
          <p className="text-sm text-zinc-500 mt-1">{d.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href={`mailto:${d.email}`} className="text-zinc-400 hover:text-white transition-colors">
            Email
          </a>
          <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="text-zinc-400 hover:text-white transition-colors">
            {d.phone}
          </a>
          <a
            href={`https://${d.github}`}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={`https://${d.website}`}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Portfolio
          </a>
        </div>
        <p className="text-xs text-zinc-600">{d.location}</p>
        <p className="text-xs text-zinc-600 font-mono-ag">
          © {new Date().getFullYear()} · React + Vite · Inspired by{" "}
          <a
            href="https://antigravity.google/?app=antigravity"
            className="text-zinc-500 hover:text-zinc-300 underline"
            target="_blank"
            rel="noreferrer"
          >
            Google Antigravity
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=Roboto+Mono:wght@400;500&display=swap"
      />
      <CursorSpotlight />
      <div className="min-h-screen bg-[var(--ag-bg)] relative z-[2]">
        <Nav />
        <main>
          <Hero />
          <ExperienceSection />
          <TrustSection />
          <ProjectCarousel />
          <MetricsSection />
          <ResearchSection />
          <SkillsSection />
          <AISection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </CursorProvider>
  );
}
