import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react';

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------
const PORTFOLIO_DATA = {
  whoami: [
    { label: "NAME", value: "Ahmed Eid" },
    { label: "ROLE", value: "AI Architect & Software Engineer" },
    { label: "FOCUS", value: "Autonomous Agent Orchestration & High-Scale Systems" },
    { label: "CURRENT", value: "Building Next-Gen AI Platform @ Visa" },
    { label: "LOC", value: "Chicago, IL" }
  ],
  
  experience: [
    {
      company: "Visa Inc.",
      role: "Software Engineer — AI Platform",
      period: "2024 - PRES",
      desc: "LangGraph Multi-Agent Orchestration | Tier-0 B2B Payment APIs"
    },
    {
      company: "Visa Inc.",
      role: "SWE Intern — ML",
      period: "2023 SUMMER",
      desc: "LSTM Anomaly Detection (95% Accuracy) | React Model Analytics"
    },
    {
      company: "VIZIO Inc.",
      role: "Embedded SWE Intern",
      period: "2022 SUMMER",
      desc: "OTA Firmware Delta Patching | ARM Cortex HAL Development"
    }
  ],

  projects: [
    { title: "Agent-Redteam", tech: "Rust / RL", impact: "Neuroevolution attack engine for AI agents" },
    { title: "CubeVision", tech: "Python / C++", impact: "Computer Vision Rubik's Cube Solver (IDA*)" }
  ],

  skills: {
    "AI/ML": "LangGraph, MCP, RL, LLM Security, TensorFlow",
    "CORE": "Rust, Python, Java, TypeScript, Go, C/C++",
    "INFRA": "Kubernetes, Docker, AWS, Kafka, PostgreSQL"
  },

  contact: {
    EMAIL: "ahmed.maaz.eid@gmail.com",
    GITHUB: "github.com/AME-CS",
    LINKEDIN: "linkedin.com/in/ahmed-maaz-eid"
  }
};

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const BrailleSpinner = () => {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % frames.length);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-claude">{frames[frameIdx]}</span>;
};

const TUIBox = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div className="my-2 border border-border-tui bg-[#121213] overflow-hidden">
    {title && (
      <div className="bg-tui-header px-4 py-1 border-b border-border-tui text-[10px] font-black tracking-widest text-text-tertiary flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-claude/40" />
        {title}
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

const CommandOutput = ({ command, onCommandClick }: { command: string, onCommandClick: (cmd: string) => void }) => {
  switch (command.toLowerCase().trim()) {
    case 'whoami':
      return (
        <TUIBox title="PROFILE DATA">
          <div className="grid grid-cols-[100px_1fr] gap-y-1">
            {PORTFOLIO_DATA.whoami.map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-text-tertiary text-[10px] font-bold self-center tracking-tighter opacity-50">{item.label}</span>
                <span className="text-text-primary text-sm font-medium">{item.value}</span>
              </React.Fragment>
            ))}
          </div>
        </TUIBox>
      );
    
    case 'experience':
      return (
        <TUIBox title="PROFESSIONAL TIMELINE">
          <div className="space-y-4">
            {PORTFOLIO_DATA.experience.map((exp, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex justify-between items-baseline border-b border-white/[0.03] pb-1 mb-1">
                  <span className="text-claude font-black text-sm tracking-tight">{exp.company}</span>
                  <span className="text-[10px] font-bold text-text-tertiary opacity-40">{exp.period}</span>
                </div>
                <div className="text-text-primary text-xs font-bold mb-1 underline underline-offset-4 decoration-white/10">{exp.role}</div>
                <div className="text-text-secondary text-xs opacity-70 leading-relaxed italic">
                  {exp.desc}
                </div>
              </div>
            ))}
          </div>
        </TUIBox>
      );
      
    case 'projects':
      return (
        <TUIBox title="FEATURED BUILDS">
          <div className="space-y-4">
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <div key={i} className="flex flex-col border-l-2 border-claude/20 pl-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-text-primary font-black text-sm">{p.title}</span>
                  <span className="text-claude text-[10px] font-black">[{p.tech}]</span>
                </div>
                <p className="text-text-secondary text-xs mt-1 leading-relaxed">{p.impact}</p>
              </div>
            ))}
          </div>
        </TUIBox>
      );

    case 'skills':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-2">
          {Object.entries(PORTFOLIO_DATA.skills).map(([cat, skills]) => (
            <div key={cat} className="border border-border-tui bg-[#121213] p-3">
              <div className="text-claude text-[9px] font-black mb-2 opacity-60 tracking-widest">{cat}</div>
              <div className="text-text-primary text-xs font-medium leading-relaxed">{skills}</div>
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <TUIBox title="SECURE COMMS">
          <div className="space-y-2">
            {Object.entries(PORTFOLIO_DATA.contact).map(([platform, link]) => (
              <div key={platform} className="flex items-center gap-4 group">
                <span className="text-text-tertiary text-[10px] font-black w-20 opacity-40">{platform}</span>
                <a href={platform === 'EMAIL' ? `mailto:${link}` : `https://${link}`} target="_blank" rel="noreferrer" className="text-claude hover:text-white text-xs font-bold transition-colors">
                  {link}
                </a>
              </div>
            ))}
          </div>
        </TUIBox>
      );

    case 'help':
      return (
        <div className="my-2 bg-[#121213] border border-border-tui rounded-sm">
          <div className="bg-tui-header px-4 py-2 border-b border-border-tui text-[10px] font-black flex justify-between opacity-60 tracking-widest">
            <span>COMMAND</span>
            <span>DESCRIPTION</span>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {[
              { c: 'whoami', d: 'Display professional identity matrix' },
              { c: 'experience', d: 'Historical career session logs' },
              { c: 'projects', d: 'System builds and adversarial experiments' },
              { c: 'skills', d: 'Neural & architectural capabilities' },
              { c: 'contact', d: 'Establish secure communication uplink' },
              { c: 'clear', d: 'Purge current session buffer' }
            ].map((cmd) => (
              <div key={cmd.c} className="flex justify-between items-center px-4 py-2 hover:bg-white/[0.02] cursor-pointer group" onClick={() => onCommandClick(cmd.c)}>
                <span className="text-claude font-black text-xs group-hover:translate-x-1 transition-transform">{cmd.c}</span>
                <span className="text-[10px] text-text-tertiary font-medium">{cmd.d}</span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="my-4 text-red-400 text-xs font-black bg-red-400/5 border border-red-400/10 px-4 py-2 flex gap-3 items-center">
          <span>❌</span>
          <span>ame-os: command not found: {command}</span>
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
      setHistory([{ id: 'b1', type: 'system', content: 'Connecting to AME-OS Core...' }]);
      await new Promise(r => setTimeout(r, 400));
      setHistory(h => [...h, { id: 'b2', type: 'system', content: 'Session established. Credentials verified.' }]);
      await new Promise(r => setTimeout(r, 400));
      setHistory(h => [...h, { 
        id: 'b4', 
        type: 'output', 
        content: "AME-OS Interface v2.0.26. Ready for input. Type 'help' for matrix.",
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
      await new Promise(r => setTimeout(r, 300 + Math.random() * 400));
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
    <div className="min-h-screen tui-bg text-text-primary font-mono text-[13px] selection:bg-claude/30 flex flex-col cursor-default">
      {/* TUI Top Status Bar */}
      <header className="bg-tui-header border-b border-border-tui px-3 py-1.5 flex justify-between items-center select-none sticky top-0 z-50">
        <div className="flex items-center text-[10px] font-black tracking-widest text-text-tertiary">
          <span className="status-bar-item text-claude">AME-OS 2.0</span>
          <span className="status-bar-item">/DEV/LOCAL</span>
          <span className="status-bar-item border-none">TCP:8080</span>
        </div>
        <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest opacity-40">
          <span>{new Date().toLocaleTimeString()}</span>
          <span className="text-green-500">● UPLINK ACTIVE</span>
        </div>
      </header>

      {/* Terminal Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
        <div className="max-w-4xl mx-auto pb-40">
          {history.map((item) => (
            <div key={item.id} className="tui-fade-in">
              {item.type === 'system' && (
                <div className="text-text-tertiary text-xs flex gap-3 items-center opacity-60 font-bold my-2">
                  <span>⚙️</span>
                  <span>{item.content}</span>
                </div>
              )}

              {item.type === 'input' && (
                <div className="flex items-center gap-3 mt-6 mb-2">
                  <span className="text-claude font-black text-base leading-none">❯</span>
                  <span className="text-text-primary font-black tracking-tighter text-base leading-none underline decoration-claude/20 underline-offset-4">{item.content}</span>
                </div>
              )}

              {item.type === 'output' && (
                <div className="tui-fade-in">
                  {item.command === 'welcome' ? (
                    <div className="text-text-secondary leading-relaxed font-bold py-2 px-4 border-l-2 border-claude/40 bg-claude/5">
                      {item.content}
                    </div>
                  ) : (
                    <CommandOutput command={item.command!} onCommandClick={executeCommand} />
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Thinking State */}
          {isProcessing && (
            <div className="thinking-block tui-fade-in">
              <BrailleSpinner />
              <span className="text-[10px] font-black uppercase tracking-widest text-claude animate-pulse">Claude is thinking...</span>
            </div>
          )}

          {/* Active Input Line */}
          {!isBooting && !isProcessing && (
            <div className="flex flex-col mt-8 transition-opacity duration-200">
              <div className="flex items-center gap-3 relative">
                <span className="text-claude text-base font-black leading-none">❯</span>
                <div className="relative flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-text-primary font-black tracking-tighter text-base leading-none relative z-10"
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus
                  />
                  <div className="absolute left-0 top-0 pointer-events-none flex items-center h-full">
                    <span className="text-transparent whitespace-pre text-base">{input}</span>
                    <span className="cursor-block"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={bottomRef} className="h-4" />
        </div>
      </main>

      {/* TUI Footer Shortcuts */}
      <footer className="bg-tui-header border-t border-border-tui px-4 py-1 flex items-center gap-6 text-[10px] font-black tracking-tighter select-none">
        <div className="flex gap-2">
          <span className="text-text-tertiary">^C</span>
          <span className="text-text-secondary opacity-60">ABORT</span>
        </div>
        <div className="flex gap-2">
          <span className="text-text-tertiary">TAB</span>
          <span className="text-text-secondary opacity-60">AUTOCOMPLETE</span>
        </div>
        <div className="flex gap-2">
          <span className="text-text-tertiary">↑↓</span>
          <span className="text-text-secondary opacity-60">HISTORY</span>
        </div>
        <div className="flex-1" />
        <div className="flex gap-4 items-center">
          <span className="text-text-tertiary opacity-30">AES-256</span>
          <div className="h-3 w-[1px] bg-border-tui" />
          <span className="text-claude">Sonnet-3.7</span>
        </div>
      </footer>
    </div>
  );
}
