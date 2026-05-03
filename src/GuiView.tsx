import React, { useState, useEffect } from 'react';

const TWEAK_DEFAULTS = {
    showTerminal: true,
    darkMode: false,
    accentColor: "#c96442",
    fontSize: 16
};

const Terminal = () => {
    const [lines, setLines] = useState<{type: string, text: string}[]>([]);
    const [currentText, setCurrentText] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const sequence = [
        { type: 'input', text: 'ame-code --whoami' },
        { type: 'output', text: 'Initializing Ahmed Eid Portfolio Engine v2.0...' },
        { type: 'output', text: 'Role: AI Architect & Software Engineer' },
        { type: 'output', text: 'Status: Ready for orchestration.' },
        { type: 'input', text: 'ame-code --summary' },
        { type: 'output', text: 'AI Architect specializing in autonomous agent orchestration and Tier-0 payment systems ($500M+ annually).' }
    ];

    useEffect(() => {
        if (lineIndex < sequence.length) {
            const line = sequence[lineIndex];
            if (charIndex < line.text.length) {
                const timeout = setTimeout(() => {
                    setCurrentText(prev => prev + line.text[charIndex]);
                    setCharIndex(prev => prev + 1);
                }, line.type === 'input' ? 50 : 15);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setLines(prev => [...prev, { ...line, text: currentText }]);
                    setCurrentText('');
                    setCharIndex(0);
                    setLineIndex(prev => prev + 1);
                }, 600);
                return () => clearTimeout(timeout);
            }
        }
    }, [lineIndex, charIndex, sequence]);

    return (
        <div className="terminal-window">
            <div className="terminal-header">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
                <div className="mono" style={{ marginLeft: 'auto', fontSize: '0.7rem', opacity: 0.5 }}>ahmedeid — zsh — 80×24</div>
            </div>
            <div className="terminal-body">
                {lines.map((line, i) => (
                    <div key={i} style={{ marginBottom: '0.75rem' }}>
                        {line.type === 'input' && <span className="prompt">&gt;</span>}
                        <span style={{ color: line.type === 'output' ? '#b0aea5' : '#faf9f5' }}>
                            {line.text}
                        </span>
                    </div>
                ))}
                {lineIndex < sequence.length && (
                    <div>
                        {sequence[lineIndex].type === 'input' && <span className="prompt">&gt;</span>}
                        <span style={{ color: sequence[lineIndex].type === 'output' ? '#b0aea5' : '#faf9f5' }}>
                            {currentText}
                        </span>
                        <span className="cursor"></span>
                    </div>
                )}
                {lineIndex === sequence.length && (
                    <div>
                        <span className="prompt">&gt;</span>
                        <span className="cursor"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

const Tweaks = ({ config, setConfig }: { config: any, setConfig: any }) => {
    return (
        <div className="tweaks">
            <div className="tweaks-title">
                <span>𐕣 Appearance</span>
                <span style={{ opacity: 0.3 }}>v1.0</span>
            </div>
            <div className="tweak-row">
                <span>Terminal</span>
                <input type="checkbox" checked={config.showTerminal} onChange={e => setConfig({...config, showTerminal: e.target.checked})} />
            </div>
            <div className="tweak-row">
                <span>Dark Mode</span>
                <input type="checkbox" checked={config.darkMode} onChange={e => setConfig({...config, darkMode: e.target.checked})} />
            </div>
            <div className="tweak-row">
                <span>Size</span>
                <input type="range" min="14" max="20" value={config.fontSize} onChange={e => setConfig({...config, fontSize: parseInt(e.target.value)})} />
            </div>
        </div>
    );
};

export const GuiView = ({ onClose }: { onClose: () => void }) => {
    const [config, setConfig] = useState(TWEAK_DEFAULTS);
    const [activeSection, setActiveSection] = useState('hero');

    const cssVariables = {
        '--gui-bg': config.darkMode ? '#141413' : '#f5f4ed',
        '--gui-surface': config.darkMode ? '#30302e' : '#faf9f5',
        '--gui-fg': config.darkMode ? '#f5f4ed' : '#141413',
        '--gui-muted': '#5e5d59',
        '--gui-border': config.darkMode ? '#3d3d3a' : '#e8e6dc',
        '--gui-accent': config.accentColor,
        '--gui-accent-soft': '#d97757',
        '--gui-code-bg': '#141413',
        '--gui-code-fg': '#f5f4ed',
        '--gui-font-serif': "'Iowan Old Style', 'Charter', 'Georgia', serif",
        '--gui-font-sans': "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
        '--gui-font-mono': "'JetBrains Mono', 'IBM Plex Mono', 'Menlo', monospace",
        '--gui-radius-sm': '6px',
        '--gui-radius-md': '12px',
        '--gui-radius-lg': '24px',
    } as React.CSSProperties;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, { threshold: 0.5 });

        ['hero', 'skills', 'projects', 'experience'].forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [config]);

    return (
        <div style={{ ...cssVariables, backgroundColor: 'var(--gui-bg)', color: 'var(--gui-fg)', fontFamily: 'var(--gui-font-sans)', lineHeight: 1.6, minHeight: '100vh', fontSize: `${config.fontSize}px`, paddingBottom: '2rem' }} className="gui-container">
            <style>{`
                .gui-container * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                
                .gui-container ::-webkit-scrollbar {
                    width: 8px;
                }
                .gui-container ::-webkit-scrollbar-track {
                    background: var(--gui-bg);
                }
                .gui-container ::-webkit-scrollbar-thumb {
                    background: var(--gui-border);
                    border-radius: 4px;
                }
                .gui-container ::-webkit-scrollbar-thumb:hover {
                    background: var(--gui-muted);
                }

                .gui-container h1, .gui-container h2, .gui-container h3 {
                    font-family: var(--gui-font-serif);
                    font-weight: 500;
                }

                .gui-container .mono {
                    font-family: var(--gui-font-mono);
                }

                .gui-container .inner-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .gui-container .terminal-window {
                    background: var(--gui-code-bg);
                    color: var(--gui-code-fg);
                    border-radius: var(--gui-radius-md);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
                    font-family: var(--gui-font-mono);
                    overflow: hidden;
                    border: 1px solid var(--gui-border);
                    margin-bottom: 3rem;
                }

                .gui-container .terminal-header {
                    background: #2a2a28;
                    padding: 0.75rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border-bottom: 1px solid #3d3d3a;
                }

                .gui-container .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }
                .gui-container .dot-red { background: #ff5f56; }
                .gui-container .dot-yellow { background: #ffbd2e; }
                .gui-container .dot-green { background: #27c93f; }

                .gui-container .terminal-body {
                    padding: 1.5rem;
                    min-height: 400px;
                    font-size: 0.95rem;
                }

                .gui-container .prompt {
                    color: var(--gui-accent-soft);
                    margin-right: 0.5rem;
                }

                .gui-container .cursor {
                    display: inline-block;
                    width: 8px;
                    height: 1.2em;
                    background: var(--gui-accent);
                    vertical-align: middle;
                    animation: gui-blink 1s step-end infinite;
                }

                @keyframes gui-blink {
                    50% { opacity: 0; }
                }

                .gui-container .nav-pills {
                    position: sticky;
                    top: 1rem;
                    z-index: 100;
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }

                .gui-container .pill {
                    background: var(--gui-surface);
                    border: 1px solid var(--gui-border);
                    padding: 0.5rem 1rem;
                    border-radius: var(--gui-radius-lg);
                    font-size: 0.85rem;
                    color: var(--gui-muted);
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }

                .gui-container .pill:hover, .gui-container .pill.active {
                    background: var(--gui-fg);
                    color: var(--gui-bg);
                    border-color: var(--gui-fg);
                }

                .gui-container section {
                    padding: 4rem 0;
                    border-bottom: 1px solid var(--gui-border);
                }

                .gui-container .section-title {
                    font-size: 2.5rem;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .gui-container .section-title::after {
                    content: "";
                    flex: 1;
                    height: 1px;
                    background: var(--gui-border);
                }

                .gui-container .grid-layout {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .gui-container .card {
                    background: var(--gui-surface);
                    border: 1px solid var(--gui-border);
                    border-radius: var(--gui-radius-md);
                    padding: 2rem;
                    transition: transform 0.2s, box-shadow 0.2s;
                    position: relative;
                    overflow: hidden;
                }

                .gui-container .card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }

                .gui-container .card-tag {
                    font-family: var(--gui-font-mono);
                    font-size: 0.7rem;
                    color: var(--gui-accent);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.5rem;
                }

                .gui-container .card-title {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }

                .gui-container .card-desc {
                    font-size: 0.95rem;
                    color: var(--gui-muted);
                    margin-bottom: 1.5rem;
                }

                .gui-container .skills-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .gui-container .skill-tag {
                    background: var(--gui-border);
                    padding: 0.4rem 0.8rem;
                    border-radius: var(--gui-radius-sm);
                    font-family: var(--gui-font-mono);
                    font-size: 0.85rem;
                }

                .gui-container .timeline-item {
                    position: relative;
                    padding-left: 2rem;
                    padding-bottom: 3rem;
                    border-left: 1px solid var(--gui-border);
                }

                .gui-container .timeline-item::before {
                    content: "";
                    position: absolute;
                    left: -5px;
                    top: 0;
                    width: 9px;
                    height: 9px;
                    background: var(--gui-accent);
                    border-radius: 50%;
                }

                .gui-container .timeline-date {
                    font-family: var(--gui-font-mono);
                    font-size: 0.85rem;
                    color: var(--gui-accent);
                    margin-bottom: 0.5rem;
                }

                .gui-container .timeline-role {
                    font-size: 1.25rem;
                    font-weight: 500;
                }

                .gui-container .timeline-company {
                    color: var(--gui-muted);
                    margin-bottom: 1rem;
                }

                .gui-container .tweaks {
                    position: fixed;
                    bottom: 4rem;
                    right: 2rem;
                    background: var(--gui-surface);
                    border: 1px solid var(--gui-border);
                    border-radius: var(--gui-radius-md);
                    padding: 1rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    z-index: 1000;
                    width: 240px;
                    font-size: 0.8rem;
                }

                .gui-container .tweaks-title {
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                    display: flex;
                    justify-content: space-between;
                }

                .gui-container .tweak-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .gui-container .tweak-row input {
                    cursor: pointer;
                }

                .gui-container .status-bar {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: #1a1a18;
                    color: #b0aea5;
                    padding: 0.25rem 1rem;
                    font-family: var(--gui-font-mono);
                    font-size: 0.65rem;
                    display: flex;
                    justify-content: space-between;
                    z-index: 1001;
                    border-top: 1px solid #3d3d3a;
                }

                .gui-container .status-item {
                    display: flex;
                    gap: 1rem;
                }

                @keyframes gui-fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .gui-container .animate-in {
                    animation: gui-fadeIn 0.6s ease forwards;
                }

                @media (max-width: 768px) {
                    .gui-container .section-title { font-size: 2rem; }
                    .gui-container .inner-container { padding: 1.5rem; }
                    .gui-container .tweaks { display: none; }
                }
            `}</style>
            
            <div className="inner-container">
                <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
                    <button 
                        onClick={onClose} 
                        className="pill" 
                        style={{ background: 'var(--gui-fg)', color: 'var(--gui-bg)', borderColor: 'var(--gui-fg)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span className="dot dot-red" style={{ display: 'inline-block' }}></span> Close GUI
                    </button>
                </div>
                
                <nav className="nav-pills">
                    {['hero', 'skills', 'projects', 'experience'].map(id => (
                        <a key={id} href={`#${id}`} className={`pill ${activeSection === id ? 'active' : ''}`}>
                            ~/{id === 'hero' ? 'home' : id}
                        </a>
                    ))}
                </nav>

                <header id="hero" className="animate-in" style={{ paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                        <div>
                            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--gui-accent)', marginBottom: '0.5rem' }}>// IDENTITY_ROOT</div>
                            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}>Ahmed Eid</h1>
                            <p style={{ fontSize: '1.4rem', color: 'var(--gui-muted)', marginTop: '0.75rem', maxWidth: '650px', fontWeight: '400' }}>
                                AI Architect building autonomous agentic workflows and Tier-0 B2B payment systems.
                            </p>
                        </div>
                        <div className="mono" style={{ fontSize: '0.75rem', textAlign: 'right', color: 'var(--gui-accent)', opacity: 0.8, display: 'none' }}>
                            [OS: AME_ENV]<br/>
                            [STATUS: ACTIVE]
                        </div>
                    </div>
                    {config.showTerminal && <Terminal />}
                </header>

                <section id="skills" className="animate-in">
                    <h2 className="section-title">Technical Capabilities</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                                <span className="mono" style={{ color: 'var(--gui-accent)', fontSize: '1rem' }}>01_</span> AI/ML Architecture
                            </h3>
                            <div className="skills-container">
                                {['LangGraph', 'MCP', 'RL', 'Neuroevolution', 'LSTM', 'LLM Security', 'PyTorch'].map(s => <span key={s} className="skill-tag">{s}</span>)}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                                <span className="mono" style={{ color: 'var(--gui-accent)', fontSize: '1rem' }}>02_</span> Engineering Stacks
                            </h3>
                            <div className="skills-container">
                                {['Rust', 'Python', 'Java', 'TypeScript', 'C/C++', 'Go', 'Next.js', 'React'].map(s => <span key={s} className="skill-tag">{s}</span>)}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                                <span className="mono" style={{ color: 'var(--gui-accent)', fontSize: '1rem' }}>03_</span> Distributed Systems
                            </h3>
                            <div className="skills-container">
                                {['Kubernetes', 'AWS', 'Kafka', 'Redis', 'PostgreSQL', 'Prometheus'].map(s => <span key={s} className="skill-tag">{s}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="animate-in">
                    <h2 className="section-title">Selected Protocols</h2>
                    <div className="grid-layout">
                        <div className="card">
                            <div className="card-tag">Project :: Agent-Redteam</div>
                            <h3 className="card-title">Autonomous Adversarial AI</h3>
                            <p className="card-desc">Stress-testing AI coding agents using Genetic Algorithms and Neuroevolution. Built a parallel execution runner for high-throughput attack synthesis.</p>
                            <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--gui-accent)', marginTop: '1rem' }}>
                                STATUS: +35% Vulnerability Discovery
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-tag">Project :: CubeVision</div>
                            <h3 className="card-title">Real-Time Rubik's Solver</h3>
                            <p className="card-desc">Computer vision system achieving 98% detection accuracy. Employs Korf's IDA* for optimal sub-20 move solving in real-time environments.</p>
                            <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--gui-accent)', marginTop: '1rem' }}>
                                STATUS: &lt; 20 Move Solutions
                            </div>
                        </div>
                    </div>
                </section>

                <section id="experience" className="animate-in">
                    <h2 className="section-title">Professional Log</h2>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-date">2024 — PRESENT</div>
                            <div className="timeline-role">Software Engineer — AI & Payments</div>
                            <div className="timeline-company">Visa Inc.</div>
                            <ul style={{ marginLeft: '1.2rem', fontSize: '0.95rem', color: 'var(--gui-muted)', listStyleType: 'square' }}>
                                <li>Architected release automation with LangGraph multi-agent orchestration.</li>
                                <li>Tier-0 B2B payment APIs processing $500M+ annually (99.99% uptime).</li>
                                <li>Real-time transaction monitoring reducing triage time by 40%.</li>
                            </ul>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-date">2023</div>
                            <div className="timeline-role">SWE Intern — Machine Learning</div>
                            <div className="timeline-company">Visa Inc.</div>
                            <p className="card-desc" style={{ marginLeft: '1.2rem' }}>LSTM-based API anomaly detection (95% accuracy). Optimized TPS by 50%.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-date">2022</div>
                            <div className="timeline-role">SWE Intern — Embedded</div>
                            <div className="timeline-company">VIZIO Inc.</div>
                            <p className="card-desc" style={{ marginLeft: '1.2rem' }}>OTA firmware update system with delta patching for 19M+ devices.</p>
                        </div>
                    </div>
                </section>

                <footer id="contact" style={{ padding: '8rem 0', textAlign: 'center' }}>
                    <div className="mono" style={{ color: 'var(--gui-accent)', marginBottom: '1.5rem', fontSize: '0.8rem' }}>[TERMINATING_SESSION]</div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '3rem', fontFamily: 'var(--gui-font-serif)', letterSpacing: '-0.02em' }}>Available for orchestration.</h2>
                    <div className="nav-pills" style={{ justifyContent: 'center' }}>
                        <a href="mailto:ahmed.maaz.eid@gmail.com" className="pill">email</a>
                        <a href="https://github.com/AME-CS" className="pill">github</a>
                        <a href="https://linkedin.com/in/ahmed-maaz-eid" className="pill">linkedin</a>
                    </div>
                </footer>
            </div>

            <div className="status-bar">
                <div className="status-item">
                    <span>● ONLINE</span>
                    <span>ENV: PRODUCTION</span>
                    <span>PORT: 8080</span>
                </div>
                <div className="status-item">
                    <span>UTF-8</span>
                    <span>LN: 42, COL: 1</span>
                    <span>2025-05-03 12:00:00</span>
                </div>
            </div>

            <Tweaks config={config} setConfig={setConfig} />
        </div>
    );
};
