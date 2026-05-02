import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Command, 
  Zap, 
  Layers,
  ExternalLink,
  Loader2,
  Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------
const PORTFOLIO_DATA = {
  whoami: `Hi, I'm Ahmed Eid. 
I'm an AI Architect and Software Engineer specializing in autonomous agent orchestration, adversarial ML, and high-scale distributed systems. Currently building at Visa.`,
  
  experience: [
    {
      role: "Software Engineer — AI Platform & Payments",
      company: "Visa Inc.",
      period: "Jan 2024 — Present",
      bullets: [
        "Architected AI-powered release automation platform using LangGraph multi-agent orchestration and MCP protocol.",
        "Built real-time transaction monitoring dashboard in React 18 & TypeScript.",
        "Engineered Tier-0 B2B payment APIs using Java 17 and Spring Boot 3.4 processing $500M+ annually."
      ]
    },
    {
      role: "Software Engineering Intern",
      company: "Visa Inc.",
      period: "May 2023 — Aug 2023",
      bullets: [
        "Developed LSTM neural network using TensorFlow/Keras for API anomaly detection (95% accuracy).",
        "Built model-evaluation UI in React with D3.js."
      ]
    },
    {
      role: "Software Engineering Intern — Embedded Systems",
      company: "VIZIO Inc.",
      period: "Jun 2022 — Aug 2022",
      bullets: [
        "Engineered OTA firmware update system in C/C++ with delta patching.",
        "Developed HAL interfaces for ARM Cortex-M microcontrollers."
      ]
    }
  ],

  projects: [
    {
      title: "Agent-Redteam",
      desc: "Autonomous adversarial AI tester built in Rust. Features a neuroevolution engine using genetic algorithms and RL to evolve attack patterns against AI coding agents.",
      tech: "Rust, RL, WebSockets",
      icon: Zap
    },
    {
      title: "CubeVision",
      desc: "Real-time Rubik's Cube solver using computer vision. Achieved 98% color detection accuracy and implemented Korf's IDA* algorithm.",
      tech: "Python, OpenCV, C++",
      icon: Layers
    }
  ],

  skills: {
    "AI & ML": "Agentic Workflows (LangGraph), MCP Protocol, RL, LLM Security, TensorFlow",
    "Core": "Rust, Python, Java, TypeScript, Go, C/C++",
    "Systems": "Kubernetes, Docker, AWS, Kafka, PostgreSQL",
    "Web": "React, Next.js, Spring Boot, FastAPI"
  },

  contact: {
    Email: "ahmed.maaz.eid@gmail.com",
    GitHub: "github.com/AME-CS",
    LinkedIn: "linkedin.com/in/ahmed-maaz-eid"
  }
};

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const Typewriter = ({ text, delay = 15, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay, onComplete]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
};

// Renders the output for a specific command
const CommandOutput = ({ command, onComplete }: { command: string, onComplete?: () => void }) => {
  const [isTyping, setIsTyping] = useState(true);

  const finishTyping = () => {
    setIsTyping(false);
    if (onComplete) onComplete();
  };

  switch (command.toLowerCase().trim()) {
    case 'whoami':
    case 'about':
      return (
        <div className="text-gray-300">
          <Typewriter text={PORTFOLIO_DATA.whoami} onComplete={finishTyping} />
        </div>
      );
    
    case 'experience':
    case 'exp':
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-gray-300">
          {PORTFOLIO_DATA.experience.map((exp, i) => (
            <div key={i} className="border-l border-brand-violet/30 pl-4 py-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <span className="font-semibold text-brand-violet">{exp.role}</span>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <div className="text-gray-400 mb-2">{exp.company}</div>
              <ul className="space-y-1">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-sm before:content-['-'] before:mr-2 before:text-gray-600">{b}</li>
                ))}
              </ul>
            </div>
          ))}
          {/* Faking a typing delay for rich components */}
          <Typewriter text="" onComplete={finishTyping} delay={100} />
        </motion.div>
      );
      
    case 'projects':
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-4 mt-2">
          {PORTFOLIO_DATA.projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="border border-white/10 bg-white/5 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className="text-brand-violet" />
                  <span className="font-bold text-white">{p.title}</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{p.desc}</p>
                <div className="text-xs text-brand-violet/70 font-mono">[{p.tech}]</div>
              </div>
            );
          })}
          <Typewriter text="" onComplete={finishTyping} delay={100} />
        </motion.div>
      );

    case 'skills':
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {Object.entries(PORTFOLIO_DATA.skills).map(([cat, skills]) => (
            <div key={cat} className="flex flex-col sm:flex-row sm:gap-4">
              <span className="text-brand-violet w-24 shrink-0 font-semibold">{cat}</span>
              <span className="text-gray-300">{skills}</span>
            </div>
          ))}
          <Typewriter text="" onComplete={finishTyping} delay={100} />
        </motion.div>
      );

    case 'contact':
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {Object.entries(PORTFOLIO_DATA.contact).map(([platform, link]) => (
            <div key={platform} className="flex items-center gap-2">
              <span className="text-gray-500 w-20">{platform}:</span>
              <a href={platform === 'Email' ? `mailto:${link}` : `https://${link}`} target="_blank" rel="noreferrer" className="text-brand-violet hover:underline flex items-center gap-1">
                {link} <ExternalLink size={12} />
              </a>
            </div>
          ))}
          <Typewriter text="" onComplete={finishTyping} delay={100} />
        </motion.div>
      );

    case 'help':
      return (
        <div className="text-gray-300 space-y-2">
          <Typewriter text="Available commands:" onComplete={finishTyping} delay={10} />
          {!isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-2 mt-2 max-w-xs font-mono text-sm">
              <div className="text-brand-violet">whoami</div><div className="text-gray-500">About me</div>
              <div className="text-brand-violet">experience</div><div className="text-gray-500">Work history</div>
              <div className="text-brand-violet">projects</div><div className="text-gray-500">Featured work</div>
              <div className="text-brand-violet">skills</div><div className="text-gray-500">Technical skills</div>
              <div className="text-brand-violet">contact</div><div className="text-gray-500">Get in touch</div>
              <div className="text-brand-violet">clear</div><div className="text-gray-500">Clear terminal</div>
            </motion.div>
          )}
        </div>
      );

    case '':
      finishTyping();
      return null;

    default:
      return (
        <div className="text-red-400">
          <Typewriter text={`Command not found: ${command}. Type 'help' for available commands.`} onComplete={finishTyping} />
        </div>
      );
  }
};

type HistoryItem = {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string;
};

export default function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', type: 'system', content: 'Initializing Claude-inspired environment...' },
    { id: '2', type: 'system', content: 'Connection established. Security protocols active.' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on load and any click on the app
  useEffect(() => {
    inputRef.current?.focus();
    
    // Initial boot sequence
    const timer = setTimeout(() => {
      setHistory(h => [
        ...h, 
        { id: Date.now().toString(), type: 'output', content: "Welcome to Ahmed's terminal. Type 'help' to see available commands." }
      ]);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isProcessing]);

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      const cmd = input.trim();
      setInput('');
      
      if (cmd.toLowerCase() === 'clear') {
        setHistory([]);
        return;
      }

      setHistory(h => [...h, { id: Date.now().toString(), type: 'input', content: cmd }]);
      
      if (cmd) {
        setIsProcessing(true);
        // Simulate network delay
        setTimeout(() => {
          setHistory(h => [...h, { id: (Date.now() + 1).toString(), type: 'output', content: cmd }]);
          setIsProcessing(false);
        }, 400 + Math.random() * 400);
      }
    }
  };

  const executeCommand = (cmd: string) => {
    if (isProcessing) return;
    setInput('');
    setHistory(h => [...h, { id: Date.now().toString(), type: 'input', content: cmd }]);
    setIsProcessing(true);
    setTimeout(() => {
      setHistory(h => [...h, { id: (Date.now() + 1).toString(), type: 'output', content: cmd }]);
      setIsProcessing(false);
    }, 400 + Math.random() * 400);
  };

  return (
    <div 
      className="min-h-screen bg-[#0d0d0d] text-[#e5e5e5] font-mono selection:bg-brand-violet/30 flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Top Bar - "Claude" Style */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-brand-violet shadow-[0_0_10px_rgba(113,112,255,0.8)] animate-pulse" />
          <span className="font-medium text-sm text-gray-300 tracking-wide flex items-center gap-2">
            <Sparkles size={14} className="text-brand-violet" />
            Ahmed_Eid_OS <span className="text-gray-600 text-xs ml-1">v2.0.26</span>
          </span>
        </div>
        <div className="flex gap-4 text-xs text-gray-500">
          <button onClick={() => executeCommand('help')} className="hover:text-white transition-colors">[help]</button>
          <a href="https://github.com/AME-CS" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            [GitHub]
          </a>
        </div>
      </header>

      {/* Main Terminal Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar pb-32">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <AnimatePresence initial={false}>
            {history.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                {item.type === 'system' && (
                  <div className="text-gray-500 text-sm flex gap-2">
                    <span className="text-gray-600">[system]</span>
                    <Typewriter text={item.content} />
                  </div>
                )}

                {item.type === 'input' && (
                  <div className="flex gap-3 text-gray-300">
                    <span className="text-brand-violet shrink-0">➜</span>
                    <span className="text-white">{item.content}</span>
                  </div>
                )}

                {item.type === 'output' && item.content === "Welcome to Ahmed's terminal. Type 'help' to see available commands." && (
                  <div className="text-gray-300 py-2">
                    <Typewriter text={item.content} />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                      className="mt-6 flex flex-wrap gap-2"
                    >
                      {['whoami', 'experience', 'projects', 'skills'].map(cmd => (
                        <button 
                          key={cmd}
                          onClick={(e) => { e.stopPropagation(); executeCommand(cmd); }}
                          className="px-3 py-1 rounded border border-white/10 bg-white/5 text-xs text-gray-400 hover:text-brand-violet hover:border-brand-violet/50 transition-colors"
                        >
                          {cmd}
                        </button>
                      ))}
                    </motion.div>
                  </div>
                )}

                {item.type === 'output' && item.content !== "Welcome to Ahmed's terminal. Type 'help' to see available commands." && (
                  <div className="mt-2 pl-6 border-l-2 border-white/5 relative">
                    <div className="absolute -left-[13px] top-0 bg-[#0d0d0d] p-1">
                      <Sparkles size={14} className="text-brand-violet" />
                    </div>
                    <CommandOutput command={item.content} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 text-brand-violet">
              <span>➜</span>
              <Loader2 size={16} className="animate-spin" />
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="fixed bottom-0 w-full bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-transparent pt-10 pb-6 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center bg-[#151515] border border-white/10 rounded-lg p-3 shadow-2xl focus-within:border-brand-violet/50 focus-within:shadow-[0_0_20px_rgba(113,112,255,0.15)] transition-all group">
            <span className="text-brand-violet font-bold mr-3 flex items-center gap-2 select-none">
              <Command size={16} /> 
              <span className="hidden sm:inline text-gray-500 font-normal">guest@portfolio ~$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              disabled={isProcessing}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-gray-600 disabled:opacity-50"
              placeholder={isProcessing ? "Processing..." : "Type a command..."}
              autoComplete="off"
              autoFocus
              spellCheck="false"
            />
            {/* Blinking Cursor block - just for aesthetics when not focused, or to overlay */}
            <div className={cn(
              "w-2 h-5 bg-brand-violet/80 ml-1 transition-opacity",
              input.length === 0 && !isProcessing ? "animate-pulse" : "opacity-0"
            )} />
            
            <div className="absolute right-3 text-[10px] text-gray-600 hidden sm:block">
              Press Enter ↵
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
