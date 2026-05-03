import { PORTFOLIO_DATA } from './vfs';

export const GuiView = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="min-h-[100dvh] bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight">Ahmed Eid.</div>
        <button 
          onClick={onClose}
          className="text-sm font-mono text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-claude animate-pulse"></span>
          Return to Terminal
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-24 space-y-32">
        {/* Hero */}
        <section className="space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            AI Architect & <br className="hidden sm:block"/>Software Engineer.
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
            Currently building next-generation AI platforms and multi-agent orchestration engines at Visa. Based in Austin, TX.
          </p>
          <div className="flex gap-4 pt-4">
            {Object.entries(PORTFOLIO_DATA.contact).map(([platform, link]) => (
              <a 
                key={platform} 
                href={platform === 'EMAIL' ? `mailto:${link}` : `https://${link}`} 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 bg-zinc-900 text-zinc-50 rounded-full font-medium text-sm hover:bg-zinc-800 transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-12">
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
          <div className="space-y-12">
            {PORTFOLIO_DATA.experience.map((job, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-0 sm:grid sm:grid-cols-[1fr_3fr] gap-8">
                <div className="hidden sm:block text-zinc-500 text-sm mt-1">{job.period}</div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <h3 className="text-lg font-bold text-zinc-900">{job.company}</h3>
                    <span className="text-zinc-500 text-sm sm:hidden">{job.period}</span>
                  </div>
                  <div className="text-zinc-600 font-medium">{job.role}</div>
                  <p className="text-zinc-600 leading-relaxed pt-2">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-12">
          <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.projects.map((proj, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-colors shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{proj.title}</h3>
                <div className="inline-block px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded mb-4 font-mono">
                  {proj.tech}
                </div>
                <p className="text-zinc-600 leading-relaxed text-sm">{proj.impact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-12">
          <h2 className="text-2xl font-bold tracking-tight">Technical Arsenal</h2>
          <div className="space-y-6">
            {Object.entries(PORTFOLIO_DATA.skills).map(([cat, skills]) => (
              <div key={cat} className="sm:grid sm:grid-cols-[1fr_3fr] gap-8 items-baseline">
                <div className="text-sm font-bold text-zinc-900 mb-2 sm:mb-0 uppercase tracking-wider">{cat}</div>
                <div className="text-zinc-600 leading-relaxed">{skills}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white text-center py-12 text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Ahmed Eid. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};
