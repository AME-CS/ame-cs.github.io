const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const newComponents = `
const TypewriterText = ({ text, delay = 5 }: { text: string, delay?: number }) => {
  const [displayed, setDisplayed] = React.useState('');
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);
  return <span>{displayed}</span>;
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

const CommandOutput`;

content = content.replace('const CommandOutput', newComponents);

// Replace ToolUse action="Read file whoami.json" with TaskRunner
content = content.replace(
  /<ToolUse action="Read file whoami\.json" \/>\n\s*\{isVerbose && <VerboseLogs \/>\}\n\s*<div className="mt-3 text-zinc-300 mb-2">Here is your profile data:<\/div>\n\s*<div className="grid/g,
  `<TaskRunner tools={["List directory ./", "Read file whoami.json"]}>
            {isVerbose && <VerboseLogs />}
            <div className="mt-3 text-zinc-300 mb-2">Here is your profile data:</div>
            <div className="grid`
);

content = content.replace(
  /<\/div>\n\s*<MetricsFooter tokens=\{Math\.ceil\(JSON\.stringify\(PORTFOLIO_DATA\.whoami\)\.length \/ 4\) \+ 25\} \/>\n\s*<\/div>\n\s*\);\n\s*case 'experience':/g,
  `</div>\n          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.whoami).length / 4) + 25} />\n          </TaskRunner>\n        </div>\n      );\n    \n    case 'experience':`
);

// experience block
content = content.replace(
  /<ToolUse action="Read file experience\.md" \/>\n\s*<ToolUse action="Grep search 'timeline'" \/>\n\s*\{isVerbose && <VerboseLogs \/>\}\n\s*<div className="mt-3/g,
  `<TaskRunner tools={["Read file experience.md", "Grep search 'timeline'", "Formatting timeline markdown..."]}>
          {isVerbose && <VerboseLogs />}
          <div className="mt-3`
);

content = content.replace(
  /<\/div>\n\s*<MetricsFooter tokens=\{Math\.ceil\(JSON\.stringify\(PORTFOLIO_DATA\.experience\)\.length \/ 4\) \+ 40\} \/>\n\s*<\/div>\n\s*\);\n\s*case 'projects':/g,
  `</div>\n          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.experience).length / 4) + 40} />\n          </TaskRunner>\n        </div>\n      );\n      \n    case 'projects':`
);

// projects block
content = content.replace(
  /<ToolUse action="List directory \.\/projects" \/>\n\s*\{isVerbose && <VerboseLogs \/>\}\n\s*<div className="mt-3/g,
  `<TaskRunner tools={["List directory ./projects", "Read file projects/metadata.json", "Search github repositories...", "Formatting output..."]}>
          {isVerbose && <VerboseLogs />}
          <div className="mt-3`
);

content = content.replace(
  /<\/div>\n\s*<MetricsFooter tokens=\{Math\.ceil\(JSON\.stringify\(PORTFOLIO_DATA\.projects\)\.length \/ 4\) \+ 30\} \/>\n\s*<\/div>\n\s*\);\n\s*case 'skills':/g,
  `</div>\n          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.projects).length / 4) + 30} />\n          </TaskRunner>\n        </div>\n      );\n\n    case 'skills':`
);

// skills block
content = content.replace(
  /<ToolUse action="Read file skills\.yml" \/>\n\s*\{isVerbose && <VerboseLogs \/>\}\n\s*<div className="mt-3/g,
  `<TaskRunner tools={["Read file skills.yml"]}>
          {isVerbose && <VerboseLogs />}
          <div className="mt-3`
);

content = content.replace(
  /<\/div>\n\s*<MetricsFooter tokens=\{Math\.ceil\(JSON\.stringify\(PORTFOLIO_DATA\.skills\)\.length \/ 4\) \+ 20\} \/>\n\s*<\/div>\n\s*\);\n\s*case 'contact':/g,
  `</div>\n          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.skills).length / 4) + 20} />\n          </TaskRunner>\n        </div>\n      );\n\n    case 'contact':`
);

// contact block
content = content.replace(
  /<ToolUse action="Read file contact\.json" \/>\n\s*\{isVerbose && <VerboseLogs \/>\}\n\s*<div className="mt-3/g,
  `<TaskRunner tools={["Read file contact.json", "Verify external uplinks..."]}>
          {isVerbose && <VerboseLogs />}
          <div className="mt-3`
);

content = content.replace(
  /<\/div>\n\s*<MetricsFooter tokens=\{Math\.ceil\(JSON\.stringify\(PORTFOLIO_DATA\.contact\)\.length \/ 4\) \+ 20\} \/>\n\s*<\/div>\n\s*\);\n\s*case '\/help':/g,
  `</div>\n          <MetricsFooter tokens={Math.ceil(JSON.stringify(PORTFOLIO_DATA.contact).length / 4) + 20} />\n          </TaskRunner>\n        </div>\n      );\n\n    case '/help':`
);

// Add Typewriter to long descriptions
content = content.replace(
  /\{exp\.desc\}/g,
  `<TypewriterText text={exp.desc} delay={5} />`
);
content = content.replace(
  /\{p\.impact\}/g,
  `<TypewriterText text={p.impact} delay={5} />`
);


// App.tsx State Additions
content = content.replace(
  /const \[isProcessing, setIsProcessing\] = useState\(false\);\n  const \[isBooting, setIsBooting\] = useState\(true\);/,
  `const [isProcessing, setIsProcessing] = useState(false);\n  const [isBooting, setIsBooting] = useState(true);\n  const [sessionTokens, setSessionTokens] = useState(0);\n  const [isTerminated, setIsTerminated] = useState(false);`
);

// Terminated checks
content = content.replace(
  /if \(isProcessing \|\| isBooting\) return;/,
  `if (isProcessing || isBooting || isTerminated) return;`
);

content = content.replace(
  /if \(trimmedCmd\.toLowerCase\(\) === 'clear' \|\| trimmedCmd\.toLowerCase\(\) === '\/clear'\) \{/,
  `if (['exit', 'quit', '/exit', '/quit'].includes(trimmedCmd.toLowerCase())) {
      setIsTerminated(true);
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistory(h => [
        ...h, 
        { id: Date.now().toString(), type: 'input', content: trimmedCmd },
        { id: (Date.now()+1).toString(), type: 'system', content: \`Session terminated. Final cost: $\${(sessionTokens * 0.000015).toFixed(4)}. Have a great day!\` }
      ]);
      return;
    }
    
    if (trimmedCmd.toLowerCase() === 'clear' || trimmedCmd.toLowerCase() === '/clear') {`
);

// Session token accumulator inside executeCommand
content = content.replace(
  /setHistory\(h => \[\.\.\.h, \{ \n        id: \(Date\.now\(\) \+ 1\)\.toString\(\), \n        type: 'output', \n        content: '',\n        command: trimmedCmd \n      \}\]\);\n      setIsProcessing\(false\);/,
  `const tokenMap: Record<string, number> = {
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
      setIsProcessing(false);`
);

// Terminated Input check
content = content.replace(
  /\{\!\!isBooting && \!\!isProcessing && \(/,
  `{!isBooting && !isProcessing && !isTerminated && (`
);

// Status bar
content = content.replace(
  /<div ref=\{bottomRef\} className="h-4" \/>\n        <\/div>\n      <\/main>\n\n    <\/div>/,
  `<div ref={bottomRef} className="h-4" />
        </div>
      </main>

      {/* Sticky Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-2 px-4 text-[11px] text-zinc-500 flex justify-between z-50">
        <div>AME-OS v2.0.26</div>
        <div className="flex gap-4">
          <span>Context: {sessionTokens} tokens</span>
          <span>Session Cost: \${(sessionTokens * 0.000015).toFixed(5)}</span>
        </div>
      </div>
    </div>`
);


fs.writeFileSync(file, content);
console.log('Done!');
