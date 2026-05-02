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

const ASCII_BANNER = `
 █████╗ ███╗   ███╗███████╗
██╔══██╗████╗ ████║██╔════╝
███████║██╔████╔██║█████╗  
██╔══██║██║╚██╔╝██║██╔══╝  
██║  ██║██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝

 ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██║  ██║█████╗  
██║     ██║   ██║██║  ██║██╔══╝  
╚██████╗╚██████╔╝██████╔╝███████╗
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
`.trimStart();

const StartupBanner = () => {
  return (
    <div className="mb-6 select-none">
      <pre className="text-claude text-[10px] sm:text-xs leading-[1.1] font-bold whitespace-pre" aria-label="AME Code ASCII Banner">
        {ASCII_BANNER}
      </pre>
      <div className="mt-3 space-y-1 text-[12px] sm:text-[13px]">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">v2.0.26</span>
          <span className="text-zinc-700">│</span>
          <span className="text-zinc-500">model:</span>
          <span className="text-zinc-300">claude-sonnet-4-20250514</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">cwd:</span>
          <span className="text-zinc-400">~/portfolio</span>
          <span className="text-zinc-700">│</span>
          <span className="text-zinc-600 italic">Type</span>
          <span className="text-claude font-semibold">/help</span>
          <span className="text-zinc-600 italic">to see available commands</span>
        </div>
      </div>
      <div className="mt-3 border-t border-zinc-800" />
    </div>
  );
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

      const randomDelay = Math.floor(Math.random() * 200) + 150; // 150ms to 350ms
      timeoutId = setTimeout(cycleVerb, randomDelay);
    };

    const initialDelay = Math.floor(Math.random() * 200) + 150;
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

const VALID_COMMANDS = ['whoami', 'experience', 'projects', 'skills', 'contact', 'help', 'clear'];

const getLevenshteinDistance = (a: string, b: string) => {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[a.length][b.length];
};

const getDidYouMean = (cmd: string) => {
  let closest = '';
  let minDistance = Infinity;
  for (const valid of VALID_COMMANDS) {
    const dist = getLevenshteinDistance(cmd.toLowerCase().trim(), valid);
    if (dist < minDistance) {
      minDistance = dist;
      closest = valid;
    }
  }
  return minDistance <= 3 ? closest : null;
};


const ScrollContext = React.createContext<(() => void) | null>(null);

const TypewriterText = ({ text, delay = 18, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayed, setDisplayed] = React.useState('');
  const scrollTo = React.useContext(ScrollContext);
  const completedRef = React.useRef(false);

  React.useEffect(() => {
    let charIndex = 0;
    let rafId: number;
    let startTime: number | null = null;
    completedRef.current = false;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const targetChars = Math.min(Math.floor(elapsed / delay) + 1, text.length);

      if (targetChars > charIndex) {
        charIndex = targetChars;
        setDisplayed(text.substring(0, charIndex));
        scrollTo?.();
      }

      if (charIndex < text.length) {
        rafId = requestAnimationFrame(animate);
      } else if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [text, delay, onComplete, scrollTo]);

  return <span>{displayed}</span>;
};

// Renders items one at a time. Each item streams fully before the next appears.
type StreamItem = {
  render: (streaming: boolean, onDone: () => void) => React.ReactNode;
};

// Hook to create shared step state for coordinating multiple StreamSequence instances
const useStreamStep = () => {
  const [step, setStep] = React.useState(0);
  return React.useMemo(() => ({ step, setStep }), [step]);
};

type StepState = { step: number; setStep: React.Dispatch<React.SetStateAction<number>> };

const StreamSequence = ({ items, stepState, offset = 0 }: { items: StreamItem[], stepState?: StepState, offset?: number }) => {
  const [localStep, setLocalStep] = React.useState(0);
  const step = stepState ? stepState.step : localStep;
  const setStep = stepState ? stepState.setStep : setLocalStep;
  const advance = React.useCallback(() => setStep(s => s + 1), [setStep]);

  return (
    <>
      {items.map((item, i) => {
        const globalIdx = offset + i;
        if (step < globalIdx) return null;
        return <React.Fragment key={i}>{item.render(step === globalIdx, advance)}</React.Fragment>;
      })}
    </>
  );
};

const TaskRunner = ({ tools, children }: { tools: string[], children: React.ReactNode }) => {
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    if (activeIdx < tools.length) {
      const timer = setTimeout(() => {
        setActiveIdx(prev => prev + 1);
      }, 300 + Math.random() * 300);
      return () => clearTimeout(timer);
    }
  }, [activeIdx, tools.length]);

  return (
    <>
      <div className="space-y-1 mb-2">
        {tools.slice(0, activeIdx).map((t, i) => <ToolUse key={i} action={t} />)}
        {activeIdx < tools.length && (
           <div className="flex items-center gap-2 text-zinc-500 text-[13px] my-1.5 font-medium">
              <BrailleSpinner />
              <span className="text-zinc-400">{tools[activeIdx]}</span>
           </div>
        )}
      </div>
      {activeIdx >= tools.length && (
        <div className="tui-fade-in">
          {children}
        </div>
      )}
    </>
  );
};

const CommandOutput = React.memo(({ command, onCommandClick }: { command: string, onCommandClick: (cmd: string) => void }) => {
  const normalizedCmd = command.toLowerCase().trim();
  const args = normalizedCmd.split(' ').filter(Boolean);
  const baseCmd = args[0] || '';
  const isVerbose = args.includes('--verbose') || args.includes('--thought');
  const sharedStep = useStreamStep();

  const VerboseLogs = () => (
    <div className="text-xs text-zinc-500 font-mono mb-4 space-y-1 opacity-70">
      <div>[SYS] Connecting to identity matrix...</div>
      <div>[SYS] Bypassing neural firewalls... [OK]</div>
      <div>[SYS] Extracting unstructured payload...</div>
      <div>[SYS] Formatting to human-readable presentation...</div>
    </div>
  );

  if (baseCmd === 'sudo') {
    return (
      <div className="my-2 break-words">
        <ToolUse action={`Attempting elevated privileges`} />
        {isVerbose && <VerboseLogs />}
        <div className="text-red-400 text-sm mt-3 font-semibold">Ahmed is not in the sudoers file. This incident will be reported.</div>
        <MetricsFooter tokens={15} />
      </div>
    );
  }

  if (baseCmd === 'rm') {
    return (
      <div className="my-2 break-words">
        <ToolUse action={`Execute command '${command}'`} />
        {isVerbose && <VerboseLogs />}
        <div className="text-red-400 text-sm mt-3 font-semibold">Access Denied: Nice try. I'm an AI, but I'm not that naive.</div>
        <MetricsFooter tokens={12} />
      </div>
    );
  }

  if (baseCmd === 'ls') {
    return (
      <div className="my-2 break-words">
        <ToolUse action="List current directory" />
        {isVerbose && <VerboseLogs />}
        <div className="mt-3 text-zinc-300 text-sm font-medium flex gap-4">
          <span className="text-claude">projects/</span>
          <span>whoami.json</span>
          <span>experience.md</span>
          <span>skills.yml</span>
          <span>contact.json</span>
        </div>
        <MetricsFooter tokens={30} />
      </div>
    );
  }

  if (baseCmd === 'cat') {
    const file = args[1];
    if (file === 'whoami.json') {
      return (
        <div className="my-2 break-words">
          <ToolUse action="Read file whoami.json" />
          {isVerbose && <VerboseLogs />}
          <pre className="mt-3 text-zinc-400 text-xs overflow-x-auto p-2 bg-zinc-900 rounded">
            {JSON.stringify(PORTFOLIO_DATA.whoami, null, 2)}
          </pre>
          <MetricsFooter tokens={100} />
        </div>
      );
    } else if (file === 'contact.json') {
      return (
        <div className="my-2 break-words">
          <ToolUse action="Read file contact.json" />
          {isVerbose && <VerboseLogs />}
          <pre className="mt-3 text-zinc-400 text-xs overflow-x-auto p-2 bg-zinc-900 rounded">
            {JSON.stringify(PORTFOLIO_DATA.contact, null, 2)}
          </pre>
          <MetricsFooter tokens={50} />
        </div>
      );
    } else {
      return (
        <div className="my-2 break-words">
          <ToolUse action={`Read file ${file}`} />
          {isVerbose && <VerboseLogs />}
          <div className="text-red-400 text-sm mt-3">cat: {file}: No such file or directory</div>
          <MetricsFooter tokens={10} />
        </div>
      );
    }
  }

  switch (baseCmd) {
    case 'whoami': {
      const items: StreamItem[] = [
        { render: (s, d) => <div className="mt-3 text-zinc-300 mb-2">{s ? <TypewriterText text="Here is your profile data:" onComplete={d} /> : "Here is your profile data:"}</div> },
        ...PORTFOLIO_DATA.whoami.flatMap((item) => [
          { render: (s: boolean, d: () => void) => <span className="text-zinc-500 font-bold self-center text-sm">{s ? <TypewriterText text={item.label} onComplete={d} /> : item.label}</span> },
          { render: (s: boolean, d: () => void) => <span className="text-zinc-200 text-sm">{s ? <TypewriterText text={item.value} onComplete={d} /> : item.value}</span> },
        ])
      ];
      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["List directory ./", "Read file whoami.json"]}>
            {isVerbose && <VerboseLogs />}
            <StreamSequence items={[items[0]]} stepState={sharedStep} offset={0} />
            <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr] gap-y-2">
              <StreamSequence items={items.slice(1)} stepState={sharedStep} offset={1} />
            </div>
            <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.whoami).length / 4) + 25} />
          </TaskRunner>
        </div>
      );
    }
    
    case 'experience': {
      const items: StreamItem[] = [
        { render: (s, d) => <div className="mt-3 text-zinc-300 mb-4">{s ? <TypewriterText text="I found the following professional timeline:" onComplete={d} /> : "I found the following professional timeline:"}</div> },
        ...PORTFOLIO_DATA.experience.flatMap((exp) => [
          { render: (s: boolean, d: () => void) => <div className="flex items-center gap-2 mb-1"><span className="text-zinc-200 font-bold text-sm">{s ? <TypewriterText text={exp.company} onComplete={d} /> : exp.company}</span></div> },
          { render: (s: boolean, d: () => void) => <div className="text-zinc-500 text-sm mb-1">{s ? <TypewriterText text={`· ${exp.period}`} onComplete={d} /> : `· ${exp.period}`}</div> },
          { render: (s: boolean, d: () => void) => <div className="text-zinc-300 text-sm mb-1">{s ? <TypewriterText text={exp.role} onComplete={d} /> : exp.role}</div> },
          { render: (s: boolean, d: () => void) => <div className="text-zinc-400 text-sm leading-relaxed mb-4">{s ? <TypewriterText text={exp.desc} onComplete={d} /> : exp.desc}</div> },
        ])
      ];
      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["Read file experience.md", "Grep search 'timeline'", "Formatting timeline markdown..."]}>
            {isVerbose && <VerboseLogs />}
            <StreamSequence items={[items[0]]} stepState={sharedStep} offset={0} />
            <div className="border-l-2 border-zinc-800 pl-4">
              <StreamSequence items={items.slice(1)} stepState={sharedStep} offset={1} />
            </div>
            <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.experience).length / 4) + 40} />
          </TaskRunner>
        </div>
      );
    }
      
    case 'projects': {
      const items: StreamItem[] = [
        { render: (s, d) => <div className="mt-3 text-zinc-300 mb-4">{s ? <TypewriterText text="Here are the featured builds in your portfolio:" onComplete={d} /> : "Here are the featured builds in your portfolio:"}</div> },
        ...PORTFOLIO_DATA.projects.flatMap((p) => [
          { render: (s: boolean, d: () => void) => <div className="flex items-center gap-2 mb-1"><span className="text-zinc-200 font-bold text-sm">{s ? <TypewriterText text={p.title} onComplete={d} /> : p.title}</span></div> },
          { render: (s: boolean, d: () => void) => <div className="text-zinc-500 text-xs mb-1">{s ? <TypewriterText text={p.tech} onComplete={d} /> : <span className="px-1.5 py-0.5 border border-zinc-700 rounded-md bg-zinc-800/50">{p.tech}</span>}</div> },
          { render: (s: boolean, d: () => void) => <p className="text-zinc-400 text-sm leading-relaxed mb-4">{s ? <TypewriterText text={p.impact} onComplete={d} /> : p.impact}</p> },
        ])
      ];
      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["List directory ./projects", "Read file projects/metadata.json", "Search github repositories...", "Formatting output..."]}>
            {isVerbose && <VerboseLogs />}
            <StreamSequence items={items} stepState={sharedStep} offset={0} />
            <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.projects).length / 4) + 30} />
          </TaskRunner>
        </div>
      );
    }

    case 'skills': {
      const skillEntries = Object.entries(PORTFOLIO_DATA.skills);
      const items: StreamItem[] = [
        { render: (s, d) => <div className="mt-3 text-zinc-300 mb-2">{s ? <TypewriterText text="Technical capabilities:" onComplete={d} /> : "Technical capabilities:"}</div> },
        ...skillEntries.flatMap(([cat, skills]) => [
          { render: (s: boolean, d: () => void) => <span className="text-zinc-500 font-bold text-sm">{s ? <TypewriterText text={cat} onComplete={d} /> : cat}</span> },
          { render: (s: boolean, d: () => void) => <span className="text-zinc-300 text-sm">{s ? <TypewriterText text={skills} onComplete={d} /> : skills}</span> },
        ])
      ];
      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["Read file skills.yml"]}>
            {isVerbose && <VerboseLogs />}
            <StreamSequence items={[items[0]]} stepState={sharedStep} offset={0} />
            <div className="my-4 space-y-3 border-l-2 border-zinc-800 pl-4">
              <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr] gap-x-2 gap-y-3">
                <StreamSequence items={items.slice(1)} stepState={sharedStep} offset={1} />
              </div>
            </div>
            <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.skills).length / 4) + 20} />
          </TaskRunner>
        </div>
      );
    }

    case 'contact': {
      const items: StreamItem[] = [
        { render: (s, d) => <div className="mt-3 text-zinc-300 mb-2">{s ? <TypewriterText text="Secure communication uplinks:" onComplete={d} /> : "Secure communication uplinks:"}</div> },
        ...Object.entries(PORTFOLIO_DATA.contact).flatMap(([platform, link]) => [
          { render: (s: boolean, d: () => void) => <span className="text-zinc-500 font-bold text-sm">{s ? <TypewriterText text={platform} onComplete={d} /> : platform}</span> },
          { render: (s: boolean, d: () => void) => <a href={platform === 'EMAIL' ? `mailto:${link}` : `https://${link}`} target="_blank" rel="noreferrer" className="text-claude hover:underline text-sm transition-colors">{s ? <TypewriterText text={link} onComplete={d} /> : link}</a> },
        ])
      ];
      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["Read file contact.json", "Verify external uplinks..."]}>
            {isVerbose && <VerboseLogs />}
            <StreamSequence items={[items[0]]} stepState={sharedStep} offset={0} />
            <div className="space-y-2 border-l-2 border-zinc-800 pl-4">
              <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr] gap-x-2 gap-y-2">
                <StreamSequence items={items.slice(1)} stepState={sharedStep} offset={1} />
              </div>
            </div>
            <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.contact).length / 4) + 20} />
          </TaskRunner>
        </div>
      );
    }

    case '/help':
    case 'help': {
      const helpCmds = [
        { c: 'whoami', d: 'View profile information' },
        { c: 'experience', d: 'View work history' },
        { c: 'projects', d: 'View featured projects' },
        { c: 'skills', d: 'View technical skills' },
        { c: 'contact', d: 'View contact links' },
        { c: '/clear', d: 'Clear the terminal output' },
        { c: '/help', d: 'Show this help message' }
      ];
      const items: StreamItem[] = [
        { render: (s, d) => <div className="text-zinc-300 mb-2 text-sm font-semibold">{s ? <TypewriterText text="Available commands:" onComplete={d} /> : "Available commands:"}</div> },
        ...helpCmds.flatMap((cmd) => [
          { render: (s: boolean, d: () => void) => <span className="text-claude font-bold text-sm">{s ? <TypewriterText text={cmd.c} onComplete={d} /> : cmd.c}</span> },
          { render: (s: boolean, d: () => void) => <span className="text-zinc-400 text-sm">{s ? <TypewriterText text={cmd.d} onComplete={d} /> : cmd.d}</span> },
        ])
      ];
      return (
        <div className="my-4">
          <StreamSequence items={[items[0]]} stepState={sharedStep} offset={0} />
          <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr] gap-x-2 gap-y-1 px-2 -mx-2">
            <StreamSequence items={items.slice(1)} stepState={sharedStep} offset={1} />
          </div>
          <MetricsFooter tokens={145} />
        </div>
      );
    }

    default:
      const suggestion = getDidYouMean(baseCmd);
      return (
        <div className="my-2 break-words">
          <ToolUse action={`Execute command '${command}'`} />
          <div className="text-red-400 text-sm mt-3 font-semibold">
            Error: Command not found
          </div>
          <div className="text-zinc-400 text-sm mt-1">
            I don't recognize the command '{command}'.
            {suggestion ? (
              <>
                {' '}Did you mean <span className="text-claude cursor-pointer hover:underline" onClick={() => onCommandClick(suggestion)}>{suggestion}</span>?
              </>
            ) : (
              <>
                {' '}Type <span className="text-claude cursor-pointer hover:underline" onClick={() => onCommandClick('/help')}>/help</span> to see available commands.
              </>
            )}
          </div>
          <MetricsFooter tokens={45} />
        </div>
      );
  }
});

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
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [sessionTokens, setSessionTokens] = useState(0);
  const [isTerminated, setIsTerminated] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const scrollToBottom = React.useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    const bootSequence = async () => {
      setHistory([{ 
        id: 'b1', 
        type: 'output', 
        content: '',
        command: 'welcome' 
      }]);
      setIsBooting(false);
    };
    bootSequence();
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'l')) {
        e.preventDefault();
        setHistory([]);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    scrollToBottom();
    if (!isProcessing && !isBooting) {
      inputRef.current?.focus();
    }
  }, [history, isProcessing, isBooting, scrollToBottom]);

  const executeCommand = async (cmd: string) => {
    if (isProcessing || isBooting || isTerminated) return;
    const trimmedCmd = cmd.trim();
    setInput('');
    setHistoryIndex(-1);
    
    if (['exit', 'quit', '/exit', '/quit'].includes(trimmedCmd.toLowerCase())) {
      setIsTerminated(true);
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistory(h => [
        ...h, 
        { id: Date.now().toString(), type: 'input', content: trimmedCmd },
        { id: (Date.now()+1).toString(), type: 'system', content: `Session terminated. Final cost: ${(sessionTokens * 0.000015).toFixed(4)}. Have a great day!` }
      ]);
      return;
    }
    
    if (trimmedCmd.toLowerCase() === 'clear' || trimmedCmd.toLowerCase() === '/clear') {
      setHistory([]);
      return;
    }
    if (trimmedCmd) {
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistory(h => [...h, { id: Date.now().toString(), type: 'input', content: trimmedCmd }]);
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 300 + Math.random() * 400)); // 0.3s to 0.7s delay
      const tokenMap: Record<string, number> = {
        whoami: 125, experience: 240, projects: 130, skills: 120, contact: 70, help: 145, '/help': 145
      };
      const addedTokens = tokenMap[trimmedCmd.toLowerCase().split(' ')[0]] || 45;
      setSessionTokens(prev => prev + addedTokens);

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
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
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
    <ScrollContext.Provider value={scrollToBottom}>
    <div className="h-[100dvh] tui-bg text-zinc-100 font-mono text-[14px] selection:bg-claude/30 flex flex-col cursor-default">

      {/* Terminal Main Content */}
      <main ref={mainRef} className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
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
                    <StartupBanner />
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

      {/* Sticky Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-2 px-4 text-[11px] text-zinc-500 flex justify-between z-50">
        <div>AME Code v2.0.26</div>
        <div className="flex gap-4">
          <span>Context: {sessionTokens} tokens</span>
          <span>Session Cost: ${(sessionTokens * 0.000015).toFixed(5)}</span>
        </div>
      </div>
    </div>
    </ScrollContext.Provider>
  );
}
