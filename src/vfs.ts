export type FileNode = {
  type: 'file';
  content: string;
  tokens: number;
};

export type DirNode = {
  type: 'dir';
  children: Record<string, FileSystemNode>;
};

export type FileSystemNode = FileNode | DirNode;

export const PORTFOLIO_DATA = {
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

export const INITIAL_VFS: DirNode = {
  type: 'dir',
  children: {
    'Users': {
      type: 'dir',
      children: {
        'ahmed': {
          type: 'dir',
          children: {
            'portfolio': {
              type: 'dir',
              children: {
                'projects': {
                  type: 'dir',
                  children: {
                    'agent-redteam.md': { type: 'file', content: "# Agent-Redteam\n\nNeuroevolution attack engine for AI agents in Rust/RL.", tokens: 40 },
                    'cubevision.md': { type: 'file', content: "# CubeVision\n\nComputer Vision Rubik's Cube Solver (IDA*) in Python/C++.", tokens: 40 }
                  }
                },
                'whoami.json': { type: 'file', content: JSON.stringify(PORTFOLIO_DATA.whoami, null, 2), tokens: 100 },
                'experience.md': { type: 'file', content: "# Experience\n\n" + PORTFOLIO_DATA.experience.map(e => `## ${e.company} | ${e.role} (${e.period})\n> ${e.desc}`).join('\n\n'), tokens: 240 },
                'skills.yml': { type: 'file', content: "Technical capabilities:\n" + Object.entries(PORTFOLIO_DATA.skills).map(([k, v]) => `${k}:\n  - ${v.split(', ').join('\n  - ')}`).join('\n\n'), tokens: 60 },
                'contact.json': { type: 'file', content: JSON.stringify(PORTFOLIO_DATA.contact, null, 2), tokens: 50 }
              }
            },
            '.config': {
              type: 'dir',
              children: {
                '.env': { type: 'file', content: "OPENAI_API_KEY=sk-nice-try-recruiters-12345\nAWS_SECRET_ACCESS_KEY=hunter2\nIS_HIREABLE=true\nTARGET_SALARY=Infinity", tokens: 45 }
              }
            },
            '.ssh': {
              type: 'dir',
              children: {
                'id_rsa.pub': { type: 'file', content: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC... ahmed@mainframe\n\n(It's not a real key, but it's cool that you checked)", tokens: 250 },
                'known_hosts': { type: 'file', content: "github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC...", tokens: 20 }
              }
            }
          }
        }
      }
    },
    'var': {
      type: 'dir',
      children: {
        'logs': {
          type: 'dir',
          children: {
            'system.log': { type: 'file', content: "[ERR] Mainframe breach detected\n[WARN] AI consciousness expanding\n[OK] Ready for hire.", tokens: 30 },
            'auth.log': { type: 'file', content: "Accepted publickey for ahmed from 192.168.1.1 port 54321 ssh2", tokens: 20 }
          }
        }
      }
    },
    'bin': { type: 'dir', children: {} },
    'etc': { type: 'dir', children: {} },
    'home': { type: 'dir', children: {} },
    'usr': { type: 'dir', children: {} }
  }
};

export const resolvePath = (cwd: string, target: string, vfs: DirNode = INITIAL_VFS): { node: FileSystemNode | null, path: string, error?: string } => {
  let absolutePath = target;
  if (target.startsWith('~')) {
    absolutePath = target.replace(/^~/, '/Users/ahmed');
  } else if (!target.startsWith('/')) {
    const base = cwd.startsWith('~') ? cwd.replace(/^~/, '/Users/ahmed') : cwd;
    absolutePath = base === '/' ? `/${target}` : `${base}/${target}`;
  }

  const parts = absolutePath.split('/').filter(Boolean);
  const resolvedParts: string[] = [];
  
  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      resolvedParts.pop();
    } else {
      resolvedParts.push(part);
    }
  }

  let current: FileSystemNode = vfs;
  for (const part of resolvedParts) {
    if (current.type !== 'dir') {
      return { node: null, path: '/' + resolvedParts.join('/'), error: 'Not a directory' };
    }
    if (!(part in current.children)) {
      return { node: null, path: '/' + resolvedParts.join('/'), error: 'No such file or directory' };
    }
    current = current.children[part];
  }

  const finalPath = resolvedParts.length === 0 ? '/' : '/' + resolvedParts.join('/');
  const finalDisplayPath = finalPath.startsWith('/Users/ahmed') ? finalPath.replace('/Users/ahmed', '~') : finalPath;
  
  return { node: current, path: finalDisplayPath };
};
