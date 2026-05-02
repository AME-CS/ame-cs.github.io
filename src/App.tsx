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
    { label: "LOC", value: "Austin, TX" }
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

const CLAUDE_VERBS = [
  'Clauding...',
  'Boondoggling...',
  'Flibbertigibbeting...',
  'Hullaballooing...',
  'Dilly-dallying...',
  'Discombobulating...',
  'Fiddle-faddling...',
  'Gitifying...',
  'Honking...',
  'Hyperspacing...',
  'Combobulating...',
  'Cogitating...',
  'Booping...',
  'Bloviating...'
];

const ThinkingBlock = () => {
  const [verbIdx, setVerbIdx] = useState(() => Math.floor(Math.random() * CLAUDE_VERBS.length));

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const cycleVerb = () => {
      setVerbIdx(prev => {
        let next;
        do {
          next = Math.floor(Math.random() * CLAUDE_VERBS.length);
        } while (next === prev);
        return next;
      });

      const randomDelay = Math.floor(Math.random() * 300) + 200; // 200ms to 500ms
      timeoutId = setTimeout(cycleVerb, randomDelay);
    };

    const initialDelay = Math.floor(Math.random() * 300) + 200;
    timeoutId = setTimeout(cycleVerb, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="thinking-block tui-fade-in text-zinc-400 flex items-center gap-2">
      <BrailleSpinner />
      <span className="text-sm font-medium">{CLAUDE_VERBS[verbIdx]}</span>
    </div>
  );
};



const ToolUse = ({ action }: { action: string }) => (
  <div className="flex items-center gap-2 text-zinc-500 text-[13px] my-1.5 font-medium">
    <span className="text-green-500/80">✓</span>
    <span>{action}</span>
  </div>
);

const MetricsFooter = ({ tokens }: { tokens: number }) => {
  const cost = (tokens * 0.000015).toFixed(5);
  const duration = (Math.random() * 0.8 + 0.6).toFixed(1);
  return (
    <div className="text-[11px] text-zinc-600 mt-4 flex gap-3 pt-2">
      <span>Tokens: {tokens}</span>
      <span>Cost: ${cost}</span>
      <span>Duration: {duration}s</span>
    </div>
  );
};

const CommandOutput = ({ command, onCommandClick }: { command: string, onCommandClick: (cmd: string) => void }) => {
  switch (command.toLowerCase().trim()) {
    case 'whoami':
      return (
        <div className="my-2">
          <ToolUse action="Read file whoami.json" />
          <div className="mt-3 text-zinc-300 mb-2">Here is your profile data:</div>
          <div className="grid grid-cols-[120px_1fr] gap-y-2">
            {PORTFOLIO_DATA.whoami.map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-zinc-500 font-bold self-center text-sm">{item.label}</span>
                <span className="text-zinc-200 text-sm">{item.value}</span>
              </React.Fragment>
            ))}
          </div>
          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.whoami).length / 4) + 25} />
        </div>
      );
    
    case 'experience':
      return (
        <div className="my-2">
          <ToolUse action="Read file experience.md" />
          <ToolUse action="Grep search 'timeline'" />
          <div className="mt-3 text-zinc-300 mb-4">I found the following professional timeline:</div>
          <div className="space-y-5 border-l-2 border-zinc-800 pl-4">
            {PORTFOLIO_DATA.experience.map((exp, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-zinc-200 font-bold text-sm">{exp.company}</span>
                  <span className="text-zinc-500 text-sm">· {exp.period}</span>
                </div>
                <div className="text-zinc-300 text-sm mb-1">{exp.role}</div>
                <div className="text-zinc-400 text-sm leading-relaxed">
                  {exp.desc}
                </div>
              </div>
            ))}
          </div>
          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.experience).length / 4) + 40} />
        </div>
      );
      
    case 'projects':
      return (
        <div className="my-2">
          <ToolUse action="List directory ./projects" />
          <div className="mt-3 text-zinc-300 mb-4">Here are the featured builds in your portfolio:</div>
          <div className="space-y-4">
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-zinc-200 font-bold text-sm">{p.title}</span>
                  <span className="text-zinc-500 text-xs px-1.5 py-0.5 border border-zinc-700 rounded-md bg-zinc-800/50">{p.tech}</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{p.impact}</p>
              </div>
            ))}
          </div>
          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.projects).length / 4) + 30} />
        </div>
      );

    case 'skills':
      return (
        <div className="my-2">
          <ToolUse action="Read file skills.yml" />
          <div className="mt-3 text-zinc-300 mb-2">Technical capabilities:</div>
          <div className="my-4 space-y-3 border-l-2 border-zinc-800 pl-4">
            {Object.entries(PORTFOLIO_DATA.skills).map(([cat, skills]) => (
              <div key={cat} className="grid grid-cols-[120px_1fr]">
                <div className="text-zinc-500 font-bold text-sm">{cat}</div>
                <div className="text-zinc-300 text-sm">{skills}</div>
              </div>
            ))}
          </div>
          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.skills).length / 4) + 20} />
        </div>
      );

    case 'contact':
      return (
        <div className="my-2">
          <ToolUse action="Read file contact.json" />
          <div className="mt-3 text-zinc-300 mb-2">Secure communication uplinks:</div>
          <div className="space-y-2 border-l-2 border-zinc-800 pl-4">
            {Object.entries(PORTFOLIO_DATA.contact).map(([platform, link]) => (
              <div key={platform} className="grid grid-cols-[120px_1fr]">
                <span className="text-zinc-500 font-bold text-sm">{platform}</span>
                <a href={platform === 'EMAIL' ? `mailto:${link}` : `https://${link}`} target="_blank" rel="noreferrer" className="text-claude hover:underline text-sm transition-colors">
                  {link}
                </a>
              </div>
            ))}
          </div>
          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.contact).length / 4) + 20} />
        </div>
      );

    case '/help':
    case 'help':
      return (
        <div className="my-4">
          <div className="text-zinc-300 mb-2 text-sm font-semibold">Available commands:</div>
          <div className="space-y-1">
            {[
              { c: 'whoami', d: 'View profile information' },
              { c: 'experience', d: 'View work history' },
              { c: 'projects', d: 'View featured projects' },
              { c: 'skills', d: 'View technical skills' },
              { c: 'contact', d: 'View contact links' },
              { c: '/clear', d: 'Clear the terminal output' },
              { c: '/help', d: 'Show this help message' }
            ].map((cmd) => (
              <div key={cmd.c} className="grid grid-cols-[120px_1fr] hover:bg-zinc-800/30 px-2 py-1 -mx-2 rounded cursor-pointer transition-colors" onClick={() => onCommandClick(cmd.c)}>
                <span className="text-claude font-bold text-sm">{cmd.c}</span>
                <span className="text-zinc-400 text-sm">{cmd.d}</span>
              </div>
            ))}
          </div>
          <MetricsFooter tokens={145} />
        </div>
      );

    default:
      return (
        <div className="my-2">
          <ToolUse action={`Execute command '${command}'`} />
          <div className="text-red-400 text-sm mt-3 font-semibold">
            Error: Command not found
          </div>
          <div className="text-zinc-400 text-sm mt-1">
            I don't recognize the command '{command}'. Type <span className="text-claude cursor-pointer hover:underline" onClick={() => onCommandClick('/help')}>/help</span> to see available commands.
          </div>
          <MetricsFooter tokens={28} />
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
      setHistory([{ 
        id: 'b1', 
        type: 'output', 
        content: "Welcome to AME Code! Type /help to see available commands.",
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
    
    if (trimmedCmd.toLowerCase() === 'clear' || trimmedCmd.toLowerCase() === '/clear') {
      setHistory([]);
      return;
    }

    setHistory(h => [...h, { id: Date.now().toString(), type: 'input', content: trimmedCmd }]);
    
    if (trimmedCmd) {
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 600 + Math.random() * 800)); // 0.6s to 1.4s delay
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
    <div className="min-h-screen tui-bg text-zinc-100 font-mono text-[14px] selection:bg-claude/30 flex flex-col cursor-default">

      {/* Terminal Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
        <div className="w-full pb-40">
          {history.map((item) => (
            <div key={item.id} className="tui-fade-in">
              {item.type === 'system' && (
                <div className="text-text-tertiary text-xs flex gap-3 items-center opacity-60 font-bold my-2">
                  <span>⚙️</span>
                  <span>{item.content}</span>
                </div>
              )}

              {item.type === 'input' && (
                <div className="flex items-center gap-2 mt-4 mb-2">
                  <span className="text-claude font-bold text-sm leading-none">❯</span>
                  <span className="text-zinc-100 text-sm leading-none">{item.content}</span>
                </div>
              )}

              {item.type === 'output' && (
                <div className="tui-fade-in">
                  {item.command === 'welcome' ? (
                    <div className="text-zinc-200 mt-2 mb-4 font-semibold text-sm">
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
          {isProcessing && <ThinkingBlock />}

          {/* Active Input Line */}
          {!isBooting && !isProcessing && (
            <div className="flex flex-col mt-8 transition-opacity duration-200">
              <div className="flex items-center gap-2 relative">
                <span className="text-claude text-sm font-bold leading-none">❯</span>
                <div className="relative flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-zinc-100 text-sm leading-none relative z-10"
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus
                  />
                  <div className="absolute left-0 top-0 pointer-events-none flex items-center h-full">
                    <span className="text-transparent whitespace-pre text-sm">{input}</span>
                    <span className="cursor-block"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={bottomRef} className="h-4" />
        </div>
      </main>

    </div>
  );
}
