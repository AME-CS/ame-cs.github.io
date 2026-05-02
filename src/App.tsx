import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { ExternalLink, Zap, Terminal as TerminalIcon, Cpu, Globe, Mail, Link as LinkIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PORTFOLIO_DATA = {
  whoami: "Ahmed Eid\nAI Architect & Software Engineer\n\nPushing the boundaries of autonomous systems and adversarial ML.\nSpecializing in agent orchestration and high-scale distributed architecture.\nCurrently engineering the future of AI at Visa.",
  
  experience: [
    {
      company: "Visa Inc.",
      role: "Software Engineer — AI Platform & Payments",
      period: "Jan 2024 — Present",
      bullets: [
        "Architected AI-powered release automation platform using LangGraph multi-agent orchestration.",
        "Built real-time transaction monitoring systems in React 18 & TypeScript.",
        "Engineered Tier-0 B2B payment APIs processing $500M+ annually using Java 17."
      ]
    },
    {
      company: "Visa Inc.",
      role: "Software Engineering Intern",
      period: "May 2023 — Aug 2023",
      bullets: [
        "Developed LSTM neural networks for API anomaly detection with 95% accuracy.",
        "Built model-evaluation UI in React with D3.js."
      ]
    },
    {
      company: "VIZIO Inc.",
      role: "Software Engineering Intern — Embedded Systems",
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
      desc: "Autonomous adversarial AI tester built in Rust. Features a neuroevolution engine using genetic algorithms to evolve attack patterns.",
      tech: "Rust, RL, WebSockets",
    },
    {
      title: "CubeVision",
      desc: "Real-time Rubik's Cube solver using computer vision and IDA* search algorithm.",
      tech: "Python, OpenCV, C++",
    }
  ],

  skills: {
    "AI/ML": "Agentic Workflows, MCP, RL, LLM Security, TensorFlow",
    "Core": "Rust, Python, Java, TypeScript, Go, C/C++",
    "Infrastructure": "Kubernetes, Docker, AWS, Kafka, PostgreSQL",
    "Architecture": "Distributed Systems, Micro-frontends, API Design"
  },

  contact: {
    Email: "ahmed.maaz.eid@gmail.com",
    GitHub: "github.com/AME-CS",
    LinkedIn: "linkedin.com/in/ahmed-maaz-eid"
  }
};

const ASCII_ART = "    ___      .___  ___.  _______         ______        _______. \n   /   \\     |   \\/   | |   ____|       /  __  \\      /       | \n  /  ^  \\    |  \\  /  | |  |__         |  |  |  |    |   (----` \n /  /_\\  \\   |  |\\/|  | |   __|        |  |  |  |     \\   \\     \n/  _____  \\  |  |  |  | |  |____       |  `--'  | .----)   |    \n/__/     \\__\\ |__|  |__| |_______|       \\______/  |_______/    \n                                                                \n         >>> SYSTEM STATUS: OPTIMAL | KERNEL: V2.0.26 <<<";

const Typewriter = ({ text, delay = 8, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay, onComplete]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
};

const BrailleSpinner = () => {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % frames.length);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-brand-violet font-bold">{frames[frameIdx]}</span>;
};

const CommandOutput = ({ command, onCommandClick }: { command: string, onCommandClick: (cmd: string) => void }) => {
  switch (command.toLowerCase().trim()) {
    case 'whoami':
      return (
        <div className="command-output-container entry-animation">
          <div className="text-neon-white text-text-primary whitespace-pre-wrap leading-relaxed font-medium">
            <Typewriter text={PORTFOLIO_DATA.whoami} />
          </div>
        </div>
      );
    
    case 'experience':
      return (
        <div className="command-output-container space-y-6">
          {PORTFOLIO_DATA.experience.map((exp, i) => (
            <div key={i} className="flex flex-col entry-animation" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-brand-violet font-bold text-neon cursor-default">{exp.company}</span>
                <span className="text-text-tertiary hidden sm:inline opacity-50">/</span>
                <span className="text-text-primary font-medium tracking-tight">{exp.role}</span>
              </div>
              <div className="text-text-tertiary text-[10px] uppercase tracking-widest mb-3 opacity-70">{exp.period}</div>
              <ul className="space-y-2 text-text-secondary border-l border-white/5 ml-1">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-sm pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-[1px] before:bg-brand-violet">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
      
    case 'projects':
      return (
        <div className="command-output-container grid sm:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.projects.map((p, i) => (
            <div key={i} className="group p-4 bg-white/[0.02] border border-white/[0.05] hover:border-brand-violet/30 transition-all duration-500 entry-animation" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-brand-violet font-bold text-neon tracking-wider">{p.title}</span>
                <Zap size={14} className="text-brand-violet opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-text-secondary text-xs leading-relaxed mb-4">{p.desc}</p>
              <div className="text-[10px] font-bold text-text-tertiary opacity-50"># {p.tech}</div>
            </div>
          ))}
        </div>
      );

    case 'skills':
      return (
        <div className="command-output-container grid sm:grid-cols-2 gap-y-4 gap-x-8">
          {Object.entries(PORTFOLIO_DATA.skills).map(([cat, skills], i) => (
            <div key={cat} className="flex flex-col entry-animation" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="text-brand-violet text-[10px] font-black uppercase tracking-[0.2em] mb-1">{cat}</span>
              <span className="text-text-primary text-sm font-medium opacity-90 tracking-tight">{skills}</span>
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div className="command-output-container space-y-3">
          {Object.entries(PORTFOLIO_DATA.contact).map(([platform, link], i) => (
            <div key={platform} className="flex items-center gap-6 entry-animation" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-text-tertiary text-[10px] font-bold uppercase tracking-widest w-20">{platform}</span>
              <a href={platform === 'Email' ? `mailto:${link}` : `https://${link}`} target="_blank" rel="noreferrer" className="text-brand-violet hover:text-white hover:text-neon underline-offset-4 hover:underline flex items-center gap-2 text-sm transition-all duration-300">
                {link} <ExternalLink size={12} className="opacity-50" />
              </a>
            </div>
          ))}
        </div>
      );

    case 'help':
      return (
        <div className="command-output-container">
          <div className="text-text-tertiary text-[10px] uppercase font-black tracking-[0.3em] mb-4 opacity-50">Command Matrix</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-12">
            {[
              { c: 'whoami', d: 'Root user profile' },
              { c: 'experience', d: 'Professional timeline' },
              { c: 'projects', d: 'Deep-tech build log' },
              { c: 'skills', d: 'Neural architecture' },
              { c: 'contact', d: 'Secure comms' },
              { c: 'clear', d: 'Purge buffer' }
            ].map((cmd, i) => (
              <div key={cmd.c} className="flex items-center justify-between group cursor-pointer entry-animation" style={{ animationDelay: `${i * 0.05}s` }} onClick={() => onCommandClick(cmd.c)}>
                <span className="text-brand-violet font-bold text-neon group-hover:translate-x-1 transition-transform">{cmd.c}</span>
                <span className="text-[10px] text-text-tertiary opacity-40 group-hover:opacity-100 transition-opacity">{cmd.d}</span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-widest uppercase">
          [ERROR] Command sequence invalid: {command}
        </div>
      );
  }
};

type HistoryItem = {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string;
  command?: string;
};

export default function App() {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bootSequence = async () => {
      setHistory([{ id: 'b1', type: 'system', content: 'INITIALIZING AME-OS KERNEL...' }]);
      await new Promise(r => setTimeout(r, 600));
      setHistory(h => [...h, { id: 'b2', type: 'system', content: 'DECRYPTING RSA-4096... SUCCESS' }]);
      await new Promise(r => setTimeout(r, 400));
      setHistory(h => [...h, { id: 'b3', type: 'system', content: ASCII_ART }]);
      await new Promise(r => setTimeout(r, 800));
      setHistory(h => [...h, { 
        id: 'b4', 
        type: 'output', 
        content: "WELCOME TO THE INTERFACE. TYPE 'HELP' TO PROCEED.",
        command: 'welcome' 
      }]);
      setIsBooting(false);
    };
    bootSequence();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (!isProcessing && !isBooting) {
      inputRef.current?.focus();
    }
  }, [history, isProcessing, isBooting]);

  const executeCommand = async (cmd: string) => {
    if (isProcessing || isBooting) return;
    const trimmedCmd = cmd.trim();
    setInput('');
    setHistoryIndex(-1);
    
    if (trimmedCmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    setHistory(h => [...h, { id: Date.now().toString(), type: 'input', content: trimmedCmd }]);
    
    if (trimmedCmd) {
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 400 + Math.random() * 400));
      setHistory(h => [...h, { 
        id: (Date.now() + 1).toString(), 
        type: 'output', 
        content: '',
        command: trimmedCmd 
      }]);
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const inputHistory = history.filter(h => h.type === 'input');
      if (inputHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, inputHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(inputHistory[inputHistory.length - 1 - newIndex].content);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const inputHistory = history.filter(h => h.type === 'input');
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[inputHistory.length - 1 - newIndex].content);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = ['whoami', 'experience', 'projects', 'skills', 'contact', 'help', 'clear'];
      const match = cmds.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-mono text-[13px] selection:bg-brand-violet/40 crt-distortion ambient-bg relative overflow-hidden">
      <div className="noise" />
      <div className="scanline-move" />
      <div className="vignette" />
      
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.03] backdrop-blur-sm sticky top-0 z-[2000] select-none">
        <div className="flex items-center gap-6">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-3 text-text-tertiary text-[10px] font-black uppercase tracking-[0.4em]">
            <TerminalIcon size={12} className="text-brand-violet animate-pulse" />
            <span>AME-OS // DEEP-TECH PORTFOLIO</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8 text-[10px] text-text-tertiary font-bold tracking-widest opacity-40">
          <div className="hidden md:flex items-center gap-2">
            <Cpu size={10} />
            <span>CORES: 64</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Globe size={10} />
            <span>UPLINK: ACTIVE</span>
          </div>
          <div className="flex items-center gap-2 text-brand-violet opacity-100">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-violet shadow-[0_0_8px_#7170ff] animate-ping" />
            <span>LIVE</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-8 pb-40 custom-scrollbar h-[calc(100vh-64px)] overflow-y-auto relative z-10">
        <div className="space-y-8">
          {history.map((item) => (
            <div key={item.id} className="group">
              {item.type === 'system' && (
                <div className="text-text-tertiary font-bold text-[10px] tracking-widest opacity-60 flex gap-4">
                  <span className="text-brand-violet">SYS</span>
                  <pre className="font-mono leading-tight">{item.content}</pre>
                </div>
              )}

              {item.type === 'input' && (
                <div className="flex flex-col mt-4">
                  <div className="flex items-center gap-3 text-text-tertiary text-[10px] font-black tracking-widest mb-1 opacity-40">
                    <span className="text-brand-violet">USR</span>
                    <span>LOCAL/AHMED_EID</span>
                  </div>
                  <div className="flex gap-4 text-text-primary text-base font-bold text-neon-white">
                    <span className="text-brand-violet">❯</span>
                    <span>{item.content}</span>
                  </div>
                </div>
              )}

              {item.type === 'output' && (
                <div className="mt-2">
                  {item.command === 'welcome' ? (
                    <div className="text-brand-violet font-black tracking-[0.2em] text-xs py-4 border-y border-brand-violet/10">
                      <Typewriter text={item.content} />
                    </div>
                  ) : (
                    <CommandOutput command={item.command!} onCommandClick={executeCommand} />
                  )}
                </div>
              )}
            </div>
          ))}

          {!isBooting && (
            <div className={cn(
              "flex flex-col mt-8 transition-all duration-500",
              isProcessing ? "opacity-20 blur-sm scale-[0.98]" : "opacity-100"
            )}>
              <div className="flex items-center gap-3 text-text-tertiary text-[10px] font-black tracking-widest mb-1 opacity-40">
                <span className="text-brand-violet">USR</span>
                <span>AHMED_EID // AWAITING COMMAND</span>
              </div>
              <div className="flex items-center gap-4 relative">
                <span className="text-brand-violet text-lg font-bold">
                  {isProcessing ? <BrailleSpinner /> : '❯'}
                </span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isProcessing}
                    className="w-full bg-transparent border-none outline-none text-text-primary text-base font-bold tracking-tight text-neon-white relative z-10"
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus
                  />
                  {!isProcessing && (
                    <div className="absolute left-0 top-0 pointer-events-none flex items-center h-full">
                      <span className="text-transparent whitespace-pre">{input}</span>
                      <span className="cursor-block" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div ref={bottomRef} className="h-20" />
        </div>
      </main>

      <footer className="fixed bottom-0 w-full px-6 py-3 border-t border-white/[0.03] bg-background/80 backdrop-blur-md z-[2000] flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-text-tertiary opacity-60">
        <div className="flex gap-8">
          <span>LATENCY: 14MS</span>
          <span>STORAGE: 1.2TB / 8TB</span>
          <span className="hidden sm:inline">LOC: 34.0522 N, 118.2437 W</span>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex gap-4">
            <Mail size={10} className="hover:text-brand-violet cursor-pointer transition-colors" />
            <Globe size={10} className="hover:text-brand-violet cursor-pointer transition-colors" />
            <LinkIcon size={10} className="hover:text-brand-violet cursor-pointer transition-colors" />
          </div>
          <span>ENCRYPTION: AES-256</span>
        </div>
      </footer>
    </div>
  );
}
