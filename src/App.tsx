import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Cpu, 
  Code2, 
  Database, 
  Globe, 
  Terminal,
  Layers,
  Zap
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A3.37 3.37 0 0 0 20.47 4.5a3.37 3.37 0 0 0-.08-2.31s-.78-.25-2.54 1a11.57 11.57 0 0 0-6 0c-1.76-1.25-2.54-1-2.54-1a3.37 3.37 0 0 0-.08 2.31A3.37 3.37 0 0 0 5.4 7c0 5.46 3.3 6.65 6.44 7a3.37 3.37 0 0 0-.94 2.58V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-card border-x-0 border-t-0 py-4 px-6 md:px-12 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-white font-bold">A</div>
      <span className="text-text-primary font-medium tracking-tight">Ahmed Eid</span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium text-text-secondary">
      <a href="#about" className="hover:text-text-primary transition-colors">About</a>
      <a href="#experience" className="hover:text-text-primary transition-colors">Experience</a>
      <a href="#projects" className="hover:text-text-primary transition-colors">Projects</a>
      <a href="#skills" className="hover:text-text-primary transition-colors">Skills</a>
    </div>
    <div className="flex items-center gap-4">
      <a href="https://github.com/AME-CS" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
        <GithubIcon size={20} />
      </a>
      <a href="https://linkedin.com/in/ahmed-maaz-eid" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
        <LinkedinIcon size={20} />
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section id="about" className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-medium text-brand-violet mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-violet opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-violet"></span>
        </span>
        Available for AI & Software Engineering roles
      </div>
      <h1 className="text-5xl md:text-7xl font-semibold text-text-primary mb-6 tracking-tight leading-tight">
        Architecting the future of <br />
        <span className="text-transparent bg-clip-text brand-gradient">AI-Powered Systems.</span>
      </h1>
      <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
        AI Architect and Software Engineer specializing in autonomous agent orchestration, adversarial ML, and high-scale distributed systems at Visa.
      </p>
      <div className="flex gap-4 justify-center">
        <a href="#projects" className="px-6 py-3 rounded-lg brand-gradient text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          View Projects <ChevronRight size={18} />
        </a>
        <a href="mailto:ahmed.maaz.eid@gmail.com" className="px-6 py-3 rounded-lg glass-card text-text-primary font-medium hover:bg-white/5 transition-colors">
          Contact Me
        </a>
      </div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mt-20 w-full max-w-5xl rounded-2xl overflow-hidden border border-border-standard shadow-2xl relative"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      <div className="aspect-video bg-[#0f1011] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #7170ff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="relative z-20 flex flex-col items-center gap-4 p-8">
           <Terminal className="text-brand-violet" size={48} />
           <div className="text-left font-mono text-sm bg-black/40 p-6 rounded-lg border border-border-subtle max-w-md">
             <div className="text-brand-violet">$ ai-agent --orchestrate</div>
             <div className="text-text-tertiary mt-2">Loading LangGraph multi-agent flow...</div>
             <div className="text-green-400">✓ MCP protocol bridge active</div>
             <div className="text-green-400">✓ Security layer: Guardrails engaged</div>
             <div className="text-text-primary mt-2">Agent sequence initiated. Processing \$500M+ volume...</div>
           </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const Section = ({ title, id, children, className }: { title: string, id: string, children: React.ReactNode, className?: string }) => (
  <section id={id} className={cn("py-24 px-6 md:px-12 max-w-7xl mx-auto", className)}>
    <div className="flex flex-col mb-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-violet mb-2">{title}</h2>
      <div className="h-px w-full bg-border-standard" />
    </div>
    {children}
  </section>
);

const ExperienceItem = ({ role, company, period, description, tags }: any) => (
  <div className="group relative pl-8 pb-12 last:pb-0 border-l border-border-standard">
    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-border-standard group-hover:bg-brand-violet transition-colors" />
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold text-text-primary">{role}</h3>
        <p className="text-brand-violet font-medium">{company}</p>
      </div>
      <span className="text-sm text-text-tertiary mt-1 md:mt-0">{period}</span>
    </div>
    <ul className="space-y-3 mb-6">
      {description.map((item: string, i: number) => (
        <li key={i} className="text-text-secondary text-sm leading-relaxed flex gap-2">
          <span className="text-brand-violet mt-1.5">•</span>
          {item}
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md border border-border-subtle bg-white/5 text-text-tertiary">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ title, description, tags, link, icon: Icon }: any) => (
  <div className="glass-card rounded-xl p-6 hover:border-brand-violet/30 transition-all group flex flex-col h-full">
    <div className="w-10 h-10 rounded-lg bg-brand-violet/10 flex items-center justify-center text-brand-violet mb-6 group-hover:scale-110 transition-transform">
      <Icon size={20} />
    </div>
    <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center justify-between">
      {title}
      {link && <ExternalLink size={16} className="text-text-tertiary group-hover:text-text-primary" />}
    </h3>
    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
      {description}
    </p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md border border-border-subtle bg-white/5 text-text-tertiary">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const SkillCategory = ({ title, icon: Icon, skills }: any) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2 text-text-primary font-medium">
      <Icon size={18} className="text-brand-violet" />
      {title}
    </div>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill: string) => (
        <div key={skill} className="px-4 py-2 rounded-lg glass-card text-sm text-text-secondary hover:text-text-primary hover:border-brand-violet/20 transition-all cursor-default">
          {skill}
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  return (
    <div className="bg-background min-h-screen text-text-primary selection:bg-brand-violet/30">
      <Navbar />
      
      <main>
        <Hero />
        
        <Section title="Experience" id="experience">
          <div className="max-w-4xl">
            <ExperienceItem 
              role="Software Engineer — AI Platform & Payments"
              company="Visa Inc."
              period="January 2024 — Present"
              description={[
                "Architected AI-powered release automation platform using LangGraph multi-agent orchestration and MCP protocol; reduced release documentation time from 8 hours to 15 minutes across 12+ production releases.",
                "Built real-time transaction monitoring dashboard in React 18 with TypeScript, leveraging React Query and Recharts; adopted by 3 operations teams to triage payment anomalies 40% faster.",
                "Engineered Tier-0 B2B payment APIs using Java 17 and Spring Boot 3.4, processing $500M+ annually with 99.99% uptime and sub-400ms P99 latency.",
                "Owned end-to-end CI/CD pipeline with SonarQube and Checkmarx SAST; deployed micro-frontends to Kubernetes via Module Federation."
              ]}
              tags={["React", "TypeScript", "Java", "Spring Boot", "LangGraph", "Kubernetes", "Redis"]}
            />
            <ExperienceItem 
              role="Software Engineering Intern"
              company="Visa Inc."
              period="May 2023 — August 2023"
              description={[
                "Developed LSTM neural network using TensorFlow/Keras achieving 95% accuracy in API anomaly detection, enabling real-time fraud alerts.",
                "Built model-evaluation UI in React with D3.js, enabling data scientists to compare ML model performance across datasets; reduced experiment review cycles by 30%.",
                "Optimized high-traffic Java API endpoints handling 500+ TPS, achieving 50% latency reduction."
              ]}
              tags={["TensorFlow", "Keras", "Python", "React", "D3.js", "Java"]}
            />
            <ExperienceItem 
              role="Software Engineering Intern — Embedded Systems"
              company="VIZIO Inc."
              period="June 2022 — August 2022"
              description={[
                "Engineered OTA firmware update system in C/C++ with delta patching and A/B partition failover, reducing update sizes by 70% and boot times by 20% across 19M+ devices.",
                "Developed HAL interfaces and device drivers for ARM Cortex-M microcontrollers implementing I2C/SPI/UART protocols.",
                "Automated firmware builds across 15+ hardware SKUs using Docker and AWS CodePipeline, cutting release preparation time by 50%."
              ]}
              tags={["C/C++", "Embedded Systems", "Docker", "AWS", "Firmware"]}
            />
          </div>
        </Section>

        <Section title="Featured Projects" id="projects">
          <div className="grid md:grid-cols-2 gap-6">
            <ProjectCard 
              title="Agent-Redteam"
              description="A high-performance autonomous adversarial AI tester built in Rust. Features a neuroevolution engine using genetic algorithms and reinforcement learning (Multi-Armed Bandits) to evolve attack patterns against AI coding agents."
              tags={["Rust", "Reinforcement Learning", "Neuroevolution", "WebSockets"]}
              icon={Zap}
            />
            <ProjectCard 
              title="CubeVision"
              description="Real-time Rubik's Cube solver using computer vision. Achieved 98% color detection accuracy with HSV segmentation and implemented Korf's IDA* algorithm to solve any cube in under 20 moves."
              tags={["Python", "OpenCV", "NumPy", "C++"]}
              icon={Layers}
            />
          </div>
        </Section>

        <Section title="Skills" id="skills">
          <div className="grid md:grid-cols-2 gap-12">
            <SkillCategory 
              title="AI & Machine Learning"
              icon={Cpu}
              skills={["Agentic Workflows (LangGraph)", "MCP Protocol", "Reinforcement Learning", "Neuroevolution", "LLM Security", "TensorFlow", "PyTorch"]}
            />
            <SkillCategory 
              title="Core Engineering"
              icon={Code2}
              skills={["Rust", "Python", "Java", "TypeScript", "Go", "C/C++"]}
            />
            <SkillCategory 
              title="Systems & Infrastructure"
              icon={Database}
              skills={["Kubernetes", "Docker", "AWS", "Kafka", "PostgreSQL", "Redis", "Terraform"]}
            />
            <SkillCategory 
              title="Web Architecture"
              icon={Globe}
              skills={["React / Next.js", "Spring Boot", "FastAPI", "Microservices", "GraphQL", "Module Federation"]}
            />
          </div>
        </Section>
        
        <Section title="Education" id="education" className="pb-32">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Bachelor of Science in Computer Science</h3>
                <p className="text-text-secondary">The University of Texas at Dallas</p>
                <p className="text-sm text-text-tertiary">GPA: 3.82/4.0 • Dean's List</p>
              </div>
              <span className="text-sm text-text-tertiary mt-1 md:mt-0">2022 — 2023</span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Associate of Science in Computer Science</h3>
                <p className="text-text-secondary">Austin Community College</p>
                <p className="text-sm text-text-tertiary">GPA: 3.95/4.0 • Honors</p>
              </div>
              <span className="text-sm text-text-tertiary mt-1 md:mt-0">2019 — 2021</span>
            </div>
          </div>
        </Section>
      </main>

      <footer className="py-12 px-6 md:px-12 border-t border-border-standard bg-background-panel">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand-violet/20 flex items-center justify-center text-brand-violet text-xs font-bold">A</div>
            <p className="text-text-tertiary text-sm">© 2025 Ahmed Eid. Built with React & Linear Design.</p>
          </div>
          <div className="flex gap-6">
            <a href="mailto:ahmed.maaz.eid@gmail.com" className="text-text-tertiary hover:text-text-primary transition-colors">
              <Mail size={18} />
            </a>
            <a href="https://github.com/AME-CS" className="text-text-tertiary hover:text-text-primary transition-colors">
              <GithubIcon size={18} />
            </a>
            <a href="https://linkedin.com/in/ahmed-maaz-eid" className="text-text-tertiary hover:text-text-primary transition-colors">
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
