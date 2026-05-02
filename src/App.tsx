import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { Command, ExternalLink } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------
const PORTFOLIO_DATA = {
  whoami: `Ahmed Eid
AI Architect & Software Engineer
Specializing in autonomous agent orchestration, adversarial ML, and high-scale distributed systems.
Currently building at Visa.`,
  
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
    },
    {
      title: "CubeVision",
      desc: "Real-time Rubik's Cube solver using computer vision. Achieved 98% color detection accuracy and implemented Korf's IDA* algorithm.",
      tech: "Python, OpenCV, C++",
    }
  ],

  skills: {
    "AI/ML": "Agentic Workflows (LangGraph), MCP Protocol, RL, LLM Security, TensorFlow",
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

const Typewriter = ({ text, delay = 10, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
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

  return <span>{displayedText}</span>;
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

  return <span className="text-brand-violet">{frames[frameIdx]}</span>;
};

const HelpCommand = ({ onCommandClick }: { onCommandClick: (cmd: string) => void }) => {
  const commands = [
    { cmd: 'whoami', desc: 'Display user information' },
    { cmd: 'experience', desc: 'List work experience' },
    { cmd: 'projects', desc: 'Show featured projects' },
    { cmd: 'skills', desc: 'Print technical skills' },
    { cmd: 'contact', desc: 'Show contact links' },
    { cmd: 'clear', desc: 'Clear the terminal output' }
  ];

  return (
    <div className="mt-1">
      <div className="text-text-secondary mb-2">Claude Code OS (v2.0.26) - Help</div>
      <div className="space-y-1">
        {commands.map(({ cmd, desc }) => (
          <div key={cmd} className="flex flex-col sm:flex-row sm:items-center">
            <span 
              className="text-brand-violet w-32 cursor-pointer hover:underline hover:text-brand-hover transition-colors"
              onClick={() => onCommandClick(cmd)}
            >
              {cmd}
            </span>
            <span className="text-text-tertiary text-sm">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Renders the output for a specific command
const CommandOutput = ({ command, onCommandClick }: { command: string, onCommandClick: (cmd: string) => void }) => {
  switch (command.toLowerCase().trim()) {
    case 'whoami':
    case 'about':
      return (
        <div className="mt-1 text-text-primary whitespace-pre-wrap leading-relaxed">
          {PORTFOLIO_DATA.whoami}
        </div>
      );
    
    case 'experience':
    case 'exp':
      return (
        <div className="mt-1 space-y-5">
          {PORTFOLIO_DATA.experience.map((exp, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-brand-violet font-medium">{exp.company}</span>
                <span className="text-text-secondary hidden sm:inline">•</span>
                <span className="text-text-primary">{exp.role}</span>
              </div>
              <div className="text-text-tertiary text-sm mb-2">{exp.period}</div>
              <ul className="space-y-1 text-text-secondary">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-sm pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-brand-violet">
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
        <div className="mt-1 space-y-5">
          {PORTFOLIO_DATA.projects.map((p, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-baseline gap-3">
                <span className="text-brand-violet font-medium">{p.title}</span>
                <span className="text-text-tertiary text-xs">[{p.tech}]</span>
              </div>
              <p className="text-text-secondary text-sm mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      );

    case 'skills':
      return (
        <div className="mt-1 space-y-2">
          {Object.entries(PORTFOLIO_DATA.skills).map(([cat, skills]) => (
            <div key={cat} className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="text-brand-violet w-24 shrink-0 font-medium">{cat}</span>
              <span className="text-text-secondary text-sm">{skills}</span>
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div className="mt-1 space-y-1">
          {Object.entries(PORTFOLIO_DATA.contact).map(([platform, link]) => (
            <div key={platform} className="flex items-center gap-4">
              <span className="text-text-tertiary w-20">{platform}</span>
              <a href={platform === 'Email' ? `mailto:${link}` : `https://${link}`} target="_blank" rel="noreferrer" className="text-brand-violet hover:underline hover:text-brand-hover flex items-center gap-1 text-sm">
                {link} <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      );

    case 'help':
      return <HelpCommand onCommandClick={onCommandClick} />;

    case '':
      return null;

    default:
      return (
        <div className="mt-1 text-red-400 text-sm">
          claude: command not found: {command}
        </div>
      );
  }
};

type HistoryItem = {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string;
  command?: string;
  isTyping?: boolean;
};

export default function App() {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const commands = ['whoami', 'experience', 'projects', 'skills', 'contact', 'help', 'clear'];
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'boot-1', type: 'system', content: 'Starting Claude Environment v2.0.26...' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [currentDir] = useState('~/portfolio-site');
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    
    const bootSequence = async () => {
      await new Promise(r => setTimeout(r, 600));
      setHistory(h => [...h, { id: 'boot-2', type: 'system', content: 'Loaded system context and memory.' }]);
      await new Promise(r => setTimeout(r, 400));
      setHistory(h => [...h, { 
        id: 'boot-3', 
        type: 'output', 
        content: "Welcome to Claude Terminal. Type 'help' to see available commands.",
        command: 'welcome' 
      }]);
      setIsBooting(false);
    };

    bootSequence();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isProcessing]);

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
      // Simulate think/network time
      await new Promise(r => setTimeout(r, 300 + Math.random() * 500));
      
      setHistory(h => [...h, { 
        id: (Date.now() + 1).toString(), 
        type: 'output', 
        content: '', // Actual output rendered by component
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
        const newIndex = historyIndex < inputHistory.length - 1 ? historyIndex + 1 : historyIndex;
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
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input) {
        const match = commands.find(cmd => cmd.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  return (
    <div 
      className="min-h-screen bg-background text-text-primary font-mono text-[14px] leading-relaxed selection:bg-brand-violet/30 flex flex-col cursor-text relative overflow-hidden ambient-bg crt-glow"
      onClick={() => {
        // Only focus if user is not selecting text
        if (window.getSelection()?.toString().length === 0) {
          inputRef.current?.focus();
        }
      }}
    >
      {/* Mac-like Terminal Header */}
      <header className="flex-none flex items-center px-4 py-2 bg-background border-b border-border-primary select-none sticky top-0 z-10">
        <div className="flex space-x-2 w-20">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20"></div>
        </div>
        <div className="flex-1 flex justify-center items-center text-xs text-text-tertiary gap-2">
          <Command size={12} className="opacity-70" />
          <span>ahmedeid — claude-term — 80×24</span>
        </div>
        <div className="w-20 flex justify-end">
          <div className="w-2 h-2 rounded-full bg-brand-violet opacity-80 blur-[2px] animate-pulse"></div>
        </div>
      </header>

      {/* Main Terminal Area */}
      <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 custom-scrollbar flex flex-col">
        <div className="max-w-4xl w-full space-y-4 pb-20">
          {history.map((item) => (
            <div key={item.id} className="group">
              {item.type === 'system' && (
                <div className="text-text-tertiary text-sm flex gap-2 items-start">
                  <span className="select-none">⚙</span>
                  <Typewriter text={item.content} />
                </div>
              )}

              {item.type === 'input' && (
                <div className="flex flex-col mt-2">
                  <div className="flex items-center gap-2 text-text-tertiary select-none text-sm mb-1">
                    <span className="text-brand-violet">╭─</span>
                    <span>{currentDir}</span>
                  </div>
                  <div className="flex gap-2 text-text-primary">
                    <span className="text-brand-violet select-none">╰─❯</span>
                    <span>{item.content}</span>
                  </div>
                </div>
              )}

              {item.type === 'output' && item.command === 'welcome' && (
                <div className="mt-4 text-text-secondary">
                  <Typewriter text={item.content} />
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {['whoami', 'experience', 'projects', 'skills', 'contact'].map((cmd, i) => (
                      <span 
                        key={cmd} 
                        className="text-brand-violet hover:text-brand-hover hover:underline cursor-pointer transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          executeCommand(cmd);
                        }}
                        style={{ animation: `fadeIn 0.5s ease forwards ${i * 0.1 + 1}s`, opacity: 0 }}
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.type === 'output' && item.command !== 'welcome' && (
                <CommandOutput command={item.command!} onCommandClick={executeCommand} />
              )}
            </div>
          ))}

          {/* Active Input Line */}
          {!isBooting && (
            <div className={cn(
              "flex flex-col mt-2 transition-opacity duration-200", 
              isProcessing ? "opacity-50" : "opacity-100"
            )}>
              <div className="flex items-center gap-2 text-text-tertiary select-none text-sm mb-1">
                <span className="text-brand-violet">╭─</span>
                <span>{currentDir}</span>
              </div>
              <div className="flex items-center gap-2 relative">
                <span className="text-brand-violet select-none">
                  {isProcessing ? <BrailleSpinner /> : '╰─❯'}
                </span>
                <div className="relative flex-1 flex items-center">
                  <span className="invisible whitespace-pre font-mono text-[14px]">{input}</span>
                  {!isProcessing && <span className="absolute left-0 top-0 text-transparent pointer-events-none whitespace-pre font-mono text-[14px]">{input}<span className="cursor-block"></span></span>}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isProcessing}
                    className="absolute left-0 top-0 w-full bg-transparent border-none outline-none text-text-primary font-mono text-[14px] placeholder:text-text-tertiary/50 terminal-input"
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}
          
          <div ref={bottomRef} className="h-4" />
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
