import React, { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { PORTFOLIO_DATA, resolvePath } from './vfs';

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------

const FORTUNE_QUOTES = [
  '"The best way to predict the future is to invent it." — Alan Kay',
  '"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Simplicity is prerequisite for reliability." — Edsger Dijkstra',
  '"The most dangerous phrase is: We\'ve always done it this way." — Grace Hopper',
  '"Programs must be written for people to read." — Hal Abelson',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"The only way to learn a new programming language is by writing programs in it." — Dennis Ritchie',
  '"Intelligence is the ability to avoid doing work, yet getting the work done." — Linus Torvalds',
  '"In theory, there is no difference between theory and practice. In practice, there is." — Yogi Berra',
  '"The computer was born to solve problems that did not exist before." — Bill Gates',
  '"Debugging is twice as hard as writing the code in the first place." — Brian Kernighan',
  '"Before software can be reusable it first has to be usable." — Ralph Johnson',
  '"Optimism is an occupational hazard of programming: feedback is the treatment." — Kent Beck',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Code is like humor. When you have to explain it, it’s bad." — Cory House',
  '"Fix the cause, not the symptom." — Steve Maguire',
  '"A language that doesn\'t affect the way you think about programming is not worth knowing." — Alan Perlis',
  '"Measuring programming progress by lines of code is like measuring airplane building progress by weight." — Bill Gates',
  '"Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday\'s code." — Dan Salomon',
  '"The question of whether machines can think is about as relevant as the question of whether submarines can swim." — Edsger Esk Dijkstra'
];

const ASK_DATA = [
  { keywords: ["language", "tech", "stack", "favorite"], response: "Ahmed's favorite stack right now is Rust for systems and TypeScript for the frontend. He's also deep into Python for AI/ML orchestration." },
  { keywords: ["relocation", "move", "location"], response: "Ahmed is currently based in Austin, TX, but open to relocation for exceptional opportunities." },
  { keywords: ["salary", "compensation", "money"], response: "Ahmed is looking for competitive compensation that reflects his expertise in AI Platform engineering and multi-agent orchestration." },
  { keywords: ["hire", "available", "job"], response: "Yes! Ahmed is open to new challenges, specifically roles involving Agentic AI and high-scale infrastructure." },
  { keywords: ["background", "education", "degree"], response: "Ahmed is a Software Engineer at Visa with a focus on AI Platforms. He has a track record of building tier-0 B2B systems and ML models." },
  { keywords: ["agent", "ai", "mcp", "langgraph"], response: "Ahmed is an expert in multi-agent orchestration, using tools like LangGraph and MCP (Model Context Protocol) to build autonomous systems." },
  { keywords: ["github", "code"], response: "You can check out his work at github.com/AME-CS. He's particularly proud of his Agent-Redteam engine." }
];

const NEOFETCH_LOGO = `
    ╔══╗
   ╔╝  ╚╗
  ╔╝ ▲  ╚╗
 ╔╝ ╱ ╲  ╚╗
╔╝ ╱AME╲  ╚╗
╚═╧═════╧══╝`.trimStart();

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

const StartupBanner = ({ cwd }: { cwd: string }) => {
  return (
    <div className="mb-6 select-none">
      <div className="overflow-x-auto -mx-2 px-2">
        <pre className="text-claude text-[9px] sm:text-[10px] md:text-xs leading-[1.1] font-bold whitespace-pre" aria-label="AME Code ASCII Banner">
          {ASCII_BANNER}
        </pre>
      </div>
      <div className="mt-3 space-y-1 text-[11px] sm:text-[12px] md:text-[13px]">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">v2.0.26</span>
          <span className="text-zinc-700">│</span>
          <span className="text-zinc-500">model:</span>
          <span className="text-zinc-300">ame-cortex-1.0</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-zinc-500">cwd:</span>
          <span className="text-zinc-400">{cwd}</span>
          <span className="text-zinc-700 hidden sm:inline">│</span>
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

const VALID_COMMANDS = ['whoami', 'experience', 'projects', 'skills', 'contact', 'neofetch', 'resume', 'history', 'fortune', 'help', 'clear', 'exit', 'quit', 'ask', 'email', 'ls', 'cd', 'pwd', 'cat', 'sudo', 'rm', 'gui', 'vim', 'matrix', 'hack'];

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

const TypewriterText = ({ text, delay = 8, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
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

const CommandOutput = React.memo(({ command, onCommandClick, commandHistory = [], cwd }: { command: string, onCommandClick: (cmd: string) => void, commandHistory?: string[], cwd: string }) => {
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
    const msg = "Ahmed is not in the sudoers file. This incident will be reported.";
    const items: StreamItem[] = [{ render: (s, d) => <div className="text-red-400 text-sm mt-3 font-semibold">{s ? <TypewriterText text={msg} onComplete={d} /> : msg}</div> }];
    return (
      <div className="my-2 break-words">
        <ToolUse action={`Attempting elevated privileges`} />
        {isVerbose && <VerboseLogs />}
        <StreamSequence items={items} stepState={sharedStep} offset={0} />
        <MetricsFooter tokens={15} />
      </div>
    );
  }

  if (baseCmd === 'rm') {
    const msg = "Access Denied: Nice try. I'm an AI, but I'm not that naive.";
    const items: StreamItem[] = [{ render: (s, d) => <div className="text-red-400 text-sm mt-3 font-semibold">{s ? <TypewriterText text={msg} onComplete={d} /> : msg}</div> }];
    return (
      <div className="my-2 break-words">
        <ToolUse action={`Execute command '${command}'`} />
        {isVerbose && <VerboseLogs />}
        <StreamSequence items={items} stepState={sharedStep} offset={0} />
        <MetricsFooter tokens={12} />
      </div>
    );
  }

  if (baseCmd === 'ask') {
    const query = args.slice(1).join(' ').toLowerCase();
    let response = "I'm not sure about that. Try asking about my tech stack, relocation, or GitHub.";
    
    if (!query) {
      response = "Ask me anything! E.g., 'ask what is your favorite language?'";
    } else {
      const match = ASK_DATA.find(d => d.keywords.some(k => query.includes(k)));
      if (match) response = match.response;
    }

    const items: StreamItem[] = [{ render: (s, d) => <div className="text-zinc-300 text-sm mt-3 leading-relaxed">{s ? <TypewriterText text={response} onComplete={d} /> : response}</div> }];
    return (
      <div className="my-2 break-words">
        <TaskRunner tools={["Analyzing query intent...", "Querying personal knowledge graph...", "Synthesizing response..."]}>
          {isVerbose && <VerboseLogs />}
          <StreamSequence items={items} stepState={sharedStep} offset={0} />
          <MetricsFooter tokens={response.length / 4 + 40} />
        </TaskRunner>
      </div>
    );
  }

  if (baseCmd === 'gui') {
    const items: StreamItem[] = [{ render: (s, d) => <div className="text-claude text-sm mt-3 font-bold">{s ? <TypewriterText text="Booting GUI Mode... Redirecting to legacy interface..." onComplete={d} /> : "Booting GUI Mode... Redirecting to legacy interface..."}</div> }];
    return (
      <div className="my-2 break-words">
        <TaskRunner tools={["Stopping terminal engine...", "Initializing WebGL context...", "Loading stylesheet assets..."]}>
          <StreamSequence items={items} stepState={sharedStep} offset={0} />
        </TaskRunner>
      </div>
    );
  }

  if (baseCmd === 'vim') {
    const items: StreamItem[] = [{ render: (s, d) => <div className="text-zinc-300 text-sm mt-3 font-mono">{s ? <TypewriterText text="[VIM] Entering editor mode... Type ':q' to exit (good luck)." onComplete={d} /> : "[VIM] Entering editor mode... Type ':q' to exit (good luck)."}</div> }];
    return (
      <div className="my-2 break-words">
        <TaskRunner tools={["Spawning VIM process...", "Capturing TTY..."]}>
          <StreamSequence items={items} stepState={sharedStep} offset={0} />
        </TaskRunner>
      </div>
    );
  }

  if (baseCmd === 'matrix') {
    const items: StreamItem[] = [{ render: (s, d) => <div className="text-green-500 font-mono text-xs mt-3 h-40 overflow-hidden leading-tight">{s ? <TypewriterText text={"01010101\n10101010\n01101101\n10010010\n01010101\n11110000\n00001111\n10101010".repeat(10)} delay={1} onComplete={d} /> : "Wake up, Neo..."}</div> }];
    return (
      <div className="my-2 break-words">
        <TaskRunner tools={["Jacking into the Gibson...", "Overriding display buffer...", "Initializing digital rain..."]}>
          <StreamSequence items={items} stepState={sharedStep} offset={0} />
        </TaskRunner>
      </div>
    );
  }

  if (baseCmd === 'hack') {
    const items: StreamItem[] = [{ render: (s, d) => <div className="text-red-500 font-mono text-sm mt-3">{s ? <TypewriterText text="[CRITICAL] BRUTE FORCE ATTACK IN PROGRESS...\n[INFO] TARGET: MAINFRAME_CENTRAL\n[WARN] FIREWALL DETECTED: 80%\n[INFO] INJECTING EXPLOIT...\n[OK] ACCESS GRANTED TO AHMED'S SECRET PROJECTS." delay={20} onComplete={d} /> : "Hacking..."}</div> }];
    return (
      <div className="my-2 break-words">
        <TaskRunner tools={["Enumerating vulnerabilities...", "Executing kernel exploit...", "Bypassing biometric auth..."]}>
          <StreamSequence items={items} stepState={sharedStep} offset={0} />
        </TaskRunner>
      </div>
    );
  }

  if (baseCmd === 'ls') {
    const isAll = args.includes('-la') || args.includes('-a') || args.includes('-l');
    const target = args.find(a => !a.startsWith('-') && a !== 'ls') || '.';
    const resolution = resolvePath(cwd, target);

    if (resolution.error || resolution.node?.type !== 'dir') {
      return (
        <div className="my-2 break-words">
          <ToolUse action={`ls ${target}`} />
          <div className="text-red-400 text-sm mt-3">ls: {target}: {resolution.error || 'Not a directory'}</div>
          <MetricsFooter tokens={5} />
        </div>
      );
    }

    let files = Object.keys(resolution.node.children);
    if (isAll) files = [".", "..", ...files];

    if (files.length === 0) {
      return (
        <div className="my-2 break-words">
          <ToolUse action="List current directory" />
          {isVerbose && <VerboseLogs />}
          <MetricsFooter tokens={5} />
        </div>
      );
    }

    const lsItems: StreamItem[] = files.map(file => {
      const isDir = file === '.' || file === '..' || (resolution.node?.type === 'dir' && resolution.node.children[file]?.type === 'dir');
      const displayFile = file + (isDir && file !== '.' && file !== '..' ? '/' : '');
      return {
        render: (s, d) => <span className={"mr-4 " + (isDir ? 'text-claude' : '')}>{s ? <TypewriterText text={displayFile} onComplete={d} /> : displayFile}</span>
      };
    });
    return (
      <div className="my-2 break-words">
        <ToolUse action="List current directory" />
        {isVerbose && <VerboseLogs />}
        <div className="mt-3 text-zinc-300 text-sm font-medium flex flex-wrap">
          <StreamSequence items={lsItems} stepState={sharedStep} offset={0} />
        </div>
        <MetricsFooter tokens={30} />
      </div>
    );
  }
  if (baseCmd === 'pwd') {
    const fullPath = cwd.replace('~', '/Users/ahmed');
    const items: StreamItem[] = [{ render: (s, d) => <div className="text-zinc-300 text-sm mt-3">{s ? <TypewriterText text={fullPath} onComplete={d} /> : fullPath}</div> }];
    return (
      <div className="my-2 break-words">
        <StreamSequence items={items} stepState={sharedStep} offset={0} />
        <MetricsFooter tokens={5} />
      </div>
    );
  }

  if (baseCmd === 'cat') {
    let file = args[1];
    if (file && file.length > 1 && file.endsWith('/')) file = file.slice(0, -1);
    const resolution = resolvePath(cwd, file || '');
    
    let content = '';
    let action = `Read file ${file || ''}`;
    let isError = false;
    let tokens = 10;

    if (resolution.error) {
      content = `cat: ${file || ''}: ${resolution.error}`;
      isError = true;
    } else if (resolution.node?.type === 'dir') {
      content = `cat: ${file}: Is a directory`;
      isError = true;
    } else if (resolution.node?.type === 'file') {
      content = resolution.node.content;
      tokens = resolution.node.tokens || 10;
    }

    const items: StreamItem[] = [
      { render: (s, d) => isError ? (
        <div className="text-red-400 text-sm mt-3">{s ? <TypewriterText text={content} onComplete={d} /> : content}</div>
      ) : (
        <pre className="mt-3 text-zinc-400 text-xs overflow-x-auto p-2 bg-zinc-900 rounded whitespace-pre-wrap">{s ? <TypewriterText text={content} delay={1} onComplete={d} /> : content}</pre>
      )}
    ];

    return (
      <div className="my-2 break-words">
        <ToolUse action={action} />
        {isVerbose && <VerboseLogs />}
        <StreamSequence items={items} stepState={sharedStep} offset={0} />
        <MetricsFooter tokens={tokens} />
      </div>
    );
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
          <TaskRunner tools={["Accessing identity matrix...", "Decrypting profile shards...", "Formatting biographical metadata..."]}>
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
      const items: StreamItem[] = PORTFOLIO_DATA.experience.flatMap((job) => [
        { render: (s: boolean, d: () => void) => <div className="text-claude font-bold mt-3">{s ? <TypewriterText text={job.company} onComplete={d} /> : job.company}</div> },
        { render: (s: boolean, d: () => void) => <div className="text-zinc-300 font-semibold text-sm">{s ? <TypewriterText text={job.role} onComplete={d} /> : job.role}</div> },
        { render: (s: boolean, d: () => void) => <div className="text-zinc-500 text-xs mb-1">{s ? <TypewriterText text={job.period} onComplete={d} /> : job.period}</div> },
        { render: (s: boolean, d: () => void) => <div className="text-zinc-400 text-sm border-l-2 border-zinc-700 pl-3 ml-1">{s ? <TypewriterText text={job.desc} onComplete={d} /> : job.desc}</div> },
      ]);
      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["Scanning professional history...", "Verifying employment records...", "Extracting technical impact..."]}>
            {isVerbose && <VerboseLogs />}
            <StreamSequence items={items} stepState={sharedStep} offset={0} />
            <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.experience).length / 4) + 20} />
          </TaskRunner>
        </div>
      );
    }
      
    case 'projects': {
      const items: StreamItem[] = PORTFOLIO_DATA.projects.flatMap((proj) => [
        { render: (s: boolean, d: () => void) => <div className="mt-3"><span className="text-claude font-bold mr-2">{s ? <TypewriterText text={proj.title} onComplete={d} /> : proj.title}</span><span className="text-zinc-500 text-xs border border-zinc-700 px-1 rounded">{s ? <TypewriterText text={proj.tech} onComplete={d} /> : proj.tech}</span></div> },
        { render: (s: boolean, d: () => void) => <div className="text-zinc-400 text-sm mt-1 mb-4">{s ? <TypewriterText text={proj.impact} onComplete={d} /> : proj.impact}</div> },
      ]);
      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["Searching vector search across project repositories...", "Analyzing GitHub commit history...", "Synthesizing architectural summaries..."]}>
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
          <TaskRunner tools={["Loading skills.yml...", "Parsing capability matrix...", "Evaluating expertise levels..."]}>
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
          <TaskRunner tools={["Reading contact.json", "Establishing secure handshakes...", "Verifying external uplinks..."]}>
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

    case 'neofetch': {
      const startYear = 2022;
      const now = new Date();
      const uptimeYears = now.getFullYear() - startYear;
      const uptimeMonths = now.getMonth();
      const sysInfo = [
        { label: 'OS', value: 'AME-OS v2.0.26' },
        { label: 'Host', value: 'Austin, TX' },
        { label: 'Kernel', value: 'ame-cortex-1.0' },
        { label: 'Uptime', value: `${uptimeYears} years, ${uptimeMonths} months` },
        { label: 'Shell', value: 'ame-code 2.0.26' },
        { label: 'Languages', value: 'Rust, Python, Java, TS, Go, C++' },
        { label: 'Stack', value: 'LangGraph, K8s, AWS, Kafka' },
        { label: 'Editor', value: 'Neovim / VS Code' },
        { label: 'Theme', value: 'AME Dark [#d97757]' },
      ];

      const items: StreamItem[] = [
        { render: (s, d) => <div className="text-zinc-200 font-bold">{s ? <TypewriterText text="ahmed@portfolio" onComplete={d} /> : "ahmed@portfolio"}</div> },
        { render: (s, d) => <div className="text-zinc-700">{s ? <TypewriterText text={'─'.repeat(20)} onComplete={d} /> : '─'.repeat(20)}</div> },
        ...sysInfo.map((info) => ({
          render: (s: boolean, d: () => void) => (
            <div className="flex gap-2">
              <span className="text-claude font-bold shrink-0">{info.label}</span>
              <span className="text-zinc-400 break-all">{s ? <TypewriterText text={info.value} onComplete={d} /> : info.value}</span>
            </div>
          )
        })),
        { render: (s, d) => {
            if (s) { setTimeout(d, 50); return null; }
            return (
              <div className="flex gap-1 mt-2 tui-fade-in">
                {['#d97757','#18181b','#27272a','#a1a1aa','#f4f4f5','#22c55e','#ef4444','#3b82f6'].map((c,i) => (
                  <span key={i} className="w-4 h-4 rounded-sm inline-block" style={{ backgroundColor: c }} />
                ))}
              </div>
            );
          }
        }
      ];

      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["Gathering system information...", "Reading hardware specs..."]}>
            <div className="flex flex-col sm:flex-row gap-4 mt-3">
              <pre className="text-claude text-[10px] sm:text-xs leading-[1.2] font-bold whitespace-pre shrink-0 tui-fade-in">{NEOFETCH_LOGO}</pre>
              <div className="space-y-0.5 text-sm min-w-0">
                <StreamSequence items={items} stepState={sharedStep} offset={0} />
              </div>
            </div>
            <MetricsFooter tokens={180} />
          </TaskRunner>
        </div>
      );
    }

    case 'resume': {
      const items: StreamItem[] = [
        { render: (s, d) => <div className="mb-2">{s ? <TypewriterText text="Resume compiled successfully." onComplete={d} /> : "Resume compiled successfully."}</div> },
        { render: (s, d) => (
          <a
            href="/resume.pdf"
            download="Ahmed_Eid_Resume.pdf"
            className="inline-flex items-center gap-2 text-claude hover:underline font-semibold transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <span>📄</span>
            <span>{s ? <TypewriterText text="Download Ahmed_Eid_Resume.pdf" onComplete={d} /> : "Download Ahmed_Eid_Resume.pdf"}</span>
          </a>
        )},
        { render: (s, d) => <div className="text-zinc-600 text-xs mt-2">{s ? <TypewriterText text="1 page · LaTeX compiled · PDF" onComplete={d} /> : "1 page · LaTeX compiled · PDF"}</div> }
      ];
      return (
        <div className="my-2 break-words">
          <TaskRunner tools={["Locating resume source...", "Compiling LaTeX...", "Generating PDF..."]}>
            <div className="mt-3 text-zinc-300 text-sm flex flex-col items-start">
              <StreamSequence items={items} stepState={sharedStep} offset={0} />
            </div>
            <MetricsFooter tokens={60} />
          </TaskRunner>
        </div>
      );
    }

    case 'fortune': {
      const quote = FORTUNE_QUOTES[Math.floor(Math.random() * FORTUNE_QUOTES.length)];
      const items: StreamItem[] = [
        { render: (s, d) => <div className="mt-3 text-zinc-300 text-sm italic leading-relaxed">{s ? <TypewriterText text={quote} onComplete={d} /> : quote}</div> },
      ];
      return (
        <div className="my-2 break-words">
          <ToolUse action="Read file /usr/share/fortune/quotes" />
          <StreamSequence items={items} stepState={sharedStep} offset={0} />
          <MetricsFooter tokens={35} />
        </div>
      );
    }

    case 'history': {
      const items: StreamItem[] = commandHistory.length === 0 
        ? [{ render: (s, d) => <div className="text-zinc-500 text-sm">{s ? <TypewriterText text="No commands in history." onComplete={d} /> : "No commands in history."}</div> }]
        : commandHistory.map((cmd, i) => ({
            render: (s, d) => (
              <div className="flex gap-3 text-sm">
                <span className="text-zinc-600 w-6 text-right shrink-0">{i + 1}</span>
                <span className="text-zinc-300 cursor-pointer hover:text-claude transition-colors" onClick={() => onCommandClick(cmd)}>
                  {s ? <TypewriterText text={cmd} onComplete={d} /> : cmd}
                </span>
              </div>
            )
          }));

      return (
        <div className="my-2 break-words">
          <ToolUse action="Read session history" />
          <div className="mt-3 space-y-0.5">
            <StreamSequence items={items} stepState={sharedStep} offset={0} />
          </div>
          <MetricsFooter tokens={Math.max(30, commandHistory.length * 5)} />
        </div>
      );
    }

    case '/help':
    case 'help': {
      const helpCmds = [
        { c: 'whoami', d: 'Profile & identity metadata' },
        { c: 'experience', d: 'Professional history & impact' },
        { c: 'projects', d: 'Key works & architecture' },
        { c: 'skills', d: 'Technical capability matrix' },
        { c: 'ask <query>', d: 'Interactive AI FAQ' },
        { c: 'email', d: 'Secure communication protocol' },
        { c: 'ls [-la]', d: 'List directory contents' },
        { c: 'cd <dir>', d: 'Change directory' },
        { c: 'cat <file>', d: 'Read file contents' },
        { c: 'vim <file>', d: 'Full-screen editor' },
        { c: 'gui', d: 'Boot graphical interface' },
        { c: 'matrix', d: 'Digital rain protocol' },
        { c: 'hack', d: 'Simulated mainframe breach' },
        { c: 'fortune', d: 'Random wisdom' },
        { c: 'history', d: 'Command log' },
        { c: 'clear', d: 'Reset viewport' }
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
          <TaskRunner tools={["Querying command registry...", "Formatting manual pages..."]}>
            <StreamSequence items={[items[0]]} stepState={sharedStep} offset={0} />
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-x-2 gap-y-1 mt-2">
              <StreamSequence items={items.slice(1)} stepState={sharedStep} offset={1} />
            </div>
            <MetricsFooter tokens={190} />
          </TaskRunner>
        </div>
      );
    }

    default: {
      const suggestion = getDidYouMean(baseCmd);
      const items: StreamItem[] = [
        { render: (s, d) => <div className="text-red-400 text-sm mt-3 font-semibold">{s ? <TypewriterText text="Error: Command not found" onComplete={d} /> : "Error: Command not found"}</div> },
        { render: (s, d) => <span className="text-zinc-400 text-sm">{s ? <TypewriterText text={`I don't recognize the command '${command}'.`} onComplete={d} /> : `I don't recognize the command '${command}'.`}</span> },
        { render: (s, d) => <span className="text-zinc-400 text-sm whitespace-pre">{s ? <TypewriterText text={suggestion ? " Did you mean " : " Type "} onComplete={d} /> : (suggestion ? " Did you mean " : " Type ")}</span> },
        { render: (s, d) => <span className="text-claude text-sm cursor-pointer hover:underline" onClick={() => onCommandClick(suggestion || '/help')}>{s ? <TypewriterText text={suggestion || '/help'} onComplete={d} /> : (suggestion || '/help')}</span> },
        { render: (s, d) => <span className="text-zinc-400 text-sm">{s ? <TypewriterText text={suggestion ? "?" : " to see available commands."} onComplete={d} /> : (suggestion ? "?" : " to see available commands.")}</span> }
      ];
      return (
        <div className="my-2 break-words">
          <ToolUse action={`Execute command '${command}'`} />
          <StreamSequence items={[items[0]]} stepState={sharedStep} offset={0} />
          <div className="mt-1 leading-relaxed">
            <StreamSequence items={items.slice(1)} stepState={sharedStep} offset={1} />
          </div>
          <MetricsFooter tokens={45} />
        </div>
      );
    }
  }
});

type HistoryItem = {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string;
  command?: string;
  overridePrefix?: string;
  cwd?: string;
};

const VimEditor = ({ filename, onExit }: { filename: string, onExit: () => void }) => {
  const [content] = useState(() => {
    if (filename === 'experience.md') return "# Experience\n\n- Visa Inc. | AI Platform\n- VIZIO Inc. | Embedded SWE";
    return "";
  });
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (input === ':q' || input === ':wq' || input === ':q!') {
        onExit();
      }
      setInput("");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1c1c1c] text-[#bcbcbc] font-mono z-[100] flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto whitespace-pre-wrap">
        <div className="text-zinc-500 mb-4 italic">-- INSERT --</div>
        {content}
        <div className="h-4" />
        <div className="animate-pulse w-2 h-5 bg-zinc-400 inline-block" />
      </div>
      <div className="bg-[#303030] px-2 py-1 flex justify-between text-xs">
        <div>{filename || "[No Name]"}</div>
        <div>1,1 All</div>
      </div>
      <div className="bg-[#1c1c1c] px-2 py-1 flex items-center gap-2">
        <span className="text-zinc-400">:</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-sm"
          autoFocus
        />
      </div>
    </div>
  );
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
  const [emailState, setEmailState] = useState<{ step: 'subject' | 'body', subject: string } | null>(null);
  const [cwd, setCwd] = useState('~/portfolio');
  const [vimFile, setVimFile] = useState<string | null>(null);
  const [isGuiMode, setIsGuiMode] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null);

  const unlockAchievement = (title: string) => {
    if (achievements.includes(title)) return;
    setAchievements(prev => [...prev, title]);
    setRecentAchievement(title);
    setTimeout(() => setRecentAchievement(null), 4000);
  };
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const scrollToBottom = React.useCallback(() => {
    const main = mainRef.current;
    if (main) {
      // Use rAF to ensure DOM has been painted before scrolling
      requestAnimationFrame(() => {
        main.scrollTop = main.scrollHeight;
      });
    }
  }, []);

  // MutationObserver to auto-scroll when new content is added (streaming, tool use, etc.)
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const observer = new MutationObserver(() => {
      // Only auto-scroll if user is near the bottom (within 200px)
      const isNearBottom = main.scrollHeight - main.scrollTop - main.clientHeight < 200;
      if (isNearBottom) {
        main.scrollTop = main.scrollHeight;
      }
    });

    observer.observe(main, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const bootSequence = async () => {
      setHistory([{ 
        id: 'b1', 
        type: 'output', 
        content: '',
        command: 'welcome',
        cwd: cwd
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
      // Small delay to let render settle before focusing
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        scrollToBottom();
      });
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
        { id: Date.now().toString(), type: 'input', content: trimmedCmd, cwd },
        { id: (Date.now()+1).toString(), type: 'system', content: `Session terminated. Final cost: ${(sessionTokens * 0.000015).toFixed(4)}. Have a great day!` }
      ]);
      return;
    }

    const baseCmdLower = trimmedCmd.split(' ')[0].toLowerCase();
    if (baseCmdLower === 'sudo') unlockAchievement('Sneaky Developer');
    if (baseCmdLower === 'cat' && trimmedCmd.includes('.env') && cwd === '~/.config') unlockAchievement('API Key Hunter');
    if (baseCmdLower === 'cat' && trimmedCmd.includes('id_rsa.pub') && cwd === '~/.ssh') unlockAchievement('Hackerman');
    
    if (trimmedCmd.toLowerCase() === 'email') {
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistory(h => [
        ...h, 
        { id: Date.now().toString(), type: 'input', content: trimmedCmd, cwd },
        { id: (Date.now()+1).toString(), type: 'system', content: 'Initializing secure mail transfer protocol...' }
      ]);
      setEmailState({ step: 'subject', subject: '' });
      return;
    }
    const args = trimmedCmd.split(' ').filter(Boolean);
    const baseCmd = args[0]?.toLowerCase() || '';

    if (baseCmd === 'vim') {
      let file = args[1] || 'untitled.md';
      if (file.length > 1 && file.endsWith('/')) file = file.slice(0, -1);
      
      const resolution = resolvePath(cwd, file);
      let error = '';
      if (resolution.node?.type === 'dir') {
        error = `vim: ${file}: Is a directory`;
      }

      setCommandHistory(prev => [...prev, trimmedCmd]);
      
      if (error) {
        setHistory(h => [
          ...h, 
          { id: Date.now().toString(), type: 'input', content: trimmedCmd, cwd },
          { id: (Date.now()+1).toString(), type: 'output', command: `echo ${error}`, content: '', cwd }
        ]);
        return;
      }

      setHistory(h => [
        ...h, 
        { id: Date.now().toString(), type: 'input', content: trimmedCmd, cwd },
        { id: (Date.now()+1).toString(), type: 'output', command: trimmedCmd, content: '', cwd }
      ]);
      setTimeout(() => setVimFile(file), 1500);
      return;
    }

    if (baseCmd === 'gui') {
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistory(h => [
        ...h, 
        { id: Date.now().toString(), type: 'input', content: trimmedCmd, cwd },
        { id: (Date.now()+1).toString(), type: 'output', command: trimmedCmd, content: '', cwd }
      ]);
      setTimeout(() => setIsGuiMode(true), 2000);
      return;
    }
    
    if (baseCmd === 'cd') {
      let target = args[1] || '~';
      if (target.length > 1 && target.endsWith('/')) target = target.slice(0, -1);
      
      const resolution = resolvePath(cwd, target);
      let error = '';

      if (resolution.error) {
        error = `cd: ${target}: ${resolution.error}`;
      } else if (resolution.node?.type !== 'dir') {
        error = `cd: ${target}: Not a directory`;
      }

      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistory(h => [
        ...h,
        { id: Date.now().toString(), type: 'input', content: trimmedCmd, cwd },
        ...(error ? [{ id: (Date.now()+1).toString(), type: 'output' as const, command: `echo ${error}`, content: '', cwd }] : [])
      ]);

      if (!error) setCwd(resolution.path);
      return;
    }
    
    if (trimmedCmd.toLowerCase() === 'clear' || trimmedCmd.toLowerCase() === '/clear') {
      setHistory([]);
      return;
    }
    if (trimmedCmd) {
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistory(h => [...h, { id: Date.now().toString(), type: 'input', content: trimmedCmd, cwd }]);
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 300 + Math.random() * 400)); // 0.3s to 0.7s delay
      const tokenMap: Record<string, number> = {
        whoami: 125, experience: 240, projects: 130, skills: 120, contact: 70,
        neofetch: 180, resume: 60, history: 30, fortune: 35, help: 190, '/help': 190
      };
      const addedTokens = tokenMap[trimmedCmd.toLowerCase().split(' ')[0]] || 45;
      setSessionTokens(prev => prev + addedTokens);

      setHistory(h => [...h, { 
        id: (Date.now() + 1).toString(), 
        type: 'output', 
        content: '',
        command: trimmedCmd,
        cwd
      }]);
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (emailState) {
        if (emailState.step === 'subject') {
          setHistory(h => [
            ...h,
            { id: Date.now().toString(), type: 'input', content: input, overridePrefix: 'Subject: ' }
          ]);
          setEmailState({ step: 'body', subject: input });
          setInput('');
        } else {
          setHistory(h => [
            ...h,
            { id: Date.now().toString(), type: 'input', content: input, overridePrefix: 'Message: ' },
            { id: (Date.now()+1).toString(), type: 'system', content: 'Opening mail client...' }
          ]);
          window.open(`mailto:ahmed.maaz.eid@gmail.com?subject=${encodeURIComponent(emailState.subject)}&body=${encodeURIComponent(input)}`);
          setEmailState(null);
          setInput('');
        }
        return;
      }
      executeCommand(input);
    } else if (e.key === 'ArrowUp' && !emailState) {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown' && !emailState) {
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
      const parts = input.split(' ');
      
      if (parts.length <= 1) {
        const cmds = ['whoami', 'experience', 'projects', 'skills', 'contact', 'neofetch', 'resume', 'history', 'fortune', 'help', 'clear', 'exit', 'quit', 'ask', 'email', 'ls', 'cd', 'pwd', 'cat', 'sudo', 'rm', 'gui', 'vim', 'matrix', 'hack'];
        const match = cmds.find(c => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      } else if (parts.length === 2) {
        const baseCmd = parts[0].toLowerCase();
        const target = parts[1];
        
        if (['cd', 'cat', 'vim', 'rm', 'ls'].includes(baseCmd)) {
          // Find the last slash to separate directory and partial name
          const lastSlashIdx = target.lastIndexOf('/');
          let searchDir = cwd;
          let partialName = target;
          let pathPrefix = '';

          if (lastSlashIdx !== -1) {
            const dirPath = target.substring(0, lastSlashIdx);
            partialName = target.substring(lastSlashIdx + 1);
            pathPrefix = target.substring(0, lastSlashIdx + 1);
            
            // Resolve the directory where we are autocompleting
            const res = resolvePath(cwd, dirPath || '/');
            if (!res.error && res.node?.type === 'dir') {
              searchDir = res.path;
            } else {
              return; // Invalid path, don't autocomplete
            }
          }

          const resolution = resolvePath(cwd, searchDir);
          if (!resolution.error && resolution.node?.type === 'dir') {
            const files = Object.keys(resolution.node.children);
            const match = files.find(f => f.startsWith(partialName));
            if (match) {
              const isDir = resolution.node.children[match].type === 'dir';
              setInput(`${baseCmd} ${pathPrefix}${match}${isDir ? '/' : ''}`);
            }
          }
        }
      }
    }
  };

  return (
    <ScrollContext.Provider value={scrollToBottom}>
    <div className="h-[100dvh] tui-bg text-zinc-100 font-mono text-[13px] sm:text-[14px] selection:bg-claude/30 flex flex-col cursor-default"
         onClick={() => { if (!isTerminated && !vimFile) inputRef.current?.focus(); }}>

      {vimFile && <VimEditor filename={vimFile} onExit={() => setVimFile(null)} />}
      
      {isGuiMode && (
        <div className="fixed inset-0 bg-zinc-950 z-[1000] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-2 border-claude border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="text-xl font-bold text-zinc-100 mb-2">Booting Legacy GUI...</h2>
          <p className="text-zinc-400 max-w-md">The modern terminal interface is currently being bridged to the 2D document-based viewport.</p>
          <button 
            onClick={() => setIsGuiMode(false)}
            className="mt-8 px-6 py-2 bg-claude text-zinc-950 font-bold rounded hover:bg-claude/90 transition-colors"
          >
            Abort & Return to Terminal
          </button>
        </div>
      )}

      {/* Terminal Main Content */}
      <main ref={mainRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 custom-scrollbar">
        <div className="w-full pb-16">
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
                  <span className={item.overridePrefix ? "text-zinc-500 font-bold text-sm leading-none" : "text-claude font-bold text-sm leading-none whitespace-pre"}>
                    {item.overridePrefix || `${item.cwd || '~'} ❯`}
                  </span>
                  <span className="text-zinc-100 text-sm leading-none">{item.content}</span>
                </div>
              )}

              {item.type === 'output' && (
                <div className="tui-fade-in">
                  {item.command === 'welcome' ? (
                    <StartupBanner cwd={cwd} />
                  ) : item.command?.startsWith('echo ') ? (
                    <div className="text-red-400 text-sm mt-3">{item.command.replace('echo ', '')}</div>
                  ) : (
                    <CommandOutput command={item.command!} onCommandClick={executeCommand} commandHistory={commandHistory} cwd={item.cwd || cwd} />
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Thinking State */}
          {isProcessing && <ThinkingBlock />}

          {/* Active Input Line */}
          {!isBooting && !isProcessing && (
            <div className="flex flex-col mt-6 transition-opacity duration-200">
              <div className="flex items-center gap-2 relative">
                <span className={emailState ? "text-zinc-500 font-bold text-sm leading-none whitespace-pre" : "text-claude text-sm font-bold leading-none whitespace-pre"}>
                  {emailState ? (emailState.step === 'subject' ? 'Subject: ' : 'Message: ') : `${cwd} ❯`}
                </span>
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
                  {!input && (
                    <span className="absolute left-0 text-zinc-600 text-sm pointer-events-none select-none">
                      {emailState ? (emailState.step === 'subject' ? '(e.g. Opportunity at Stripe)' : '(Press Enter to send via mail client)') : "try 'whoami' or 'projects'..."}
                    </span>
                  )}
                  <div className="absolute left-0 top-0 pointer-events-none flex items-center h-full">
                    <span className="text-transparent whitespace-pre text-sm">{input}</span>
                    <span className="cursor-block"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={bottomRef} className="h-12 sm:h-8" />
        </div>
      </main>

      {/* Sticky Status Bar */}
      <div className="shrink-0 bg-zinc-900 border-t border-zinc-800 p-2 px-4 text-[10px] sm:text-[11px] text-zinc-500 flex justify-between z-50">
        <div>AME Code v2.0.26</div>
        <div className="flex gap-3 sm:gap-4">
          <span>Context: {sessionTokens} tokens</span>
          <span className="hidden sm:inline">Session Cost: ${(sessionTokens * 0.000015).toFixed(5)}</span>
          <span className="sm:hidden">${(sessionTokens * 0.000015).toFixed(4)}</span>
        </div>
      </div>

      {recentAchievement && (
        <div className="fixed bottom-12 right-4 sm:bottom-10 sm:right-6 bg-zinc-800 border border-zinc-700 p-3 sm:p-4 rounded-lg shadow-2xl flex items-center gap-3 tui-fade-in z-50">
          <div className="text-xl sm:text-2xl">🏆</div>
          <div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Achievement Unlocked</div>
            <div className="text-zinc-200 text-xs sm:text-sm font-semibold">{recentAchievement}</div>
          </div>
        </div>
      )}
    </div>
    </ScrollContext.Provider>
  );
}
