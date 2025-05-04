import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GitHub, Linkedin, Sun, Moon } from 'lucide-react';

// Theme Context
const ThemeContext = React.createContext();
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-800/30 transition"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}

// Data
const bioText = `I'm Saim Sohail, a cybersecurity consultant and pentester obsessed with outsmarting adversaries and securing systems. With years of real-world red teaming, vulnerability assessments, and social engineering, I blend creativity and technique to uncover the unseen. I live for that "aha" moment when a complex exploit finally clicks.`;
const certs = [
  'OSCP - Offensive Security Certified Professional',
  'CEH - Certified Ethical Hacker',
  'CompTIA Security+',
  'PNPT - Practical Network Penetration Tester',
];
const tips = [
  {
    tip: 'Always run recon longer than you think you need to.',
    explanation: `Long recon is the bedrock of every successful engagement. By gathering extensive data on hosts, services, and user behavior, you reduce blind spots and increase the odds of finding hidden entry points. Think of reconnaissance like exploring a new city: the longer you scout alleys and side streets, the more secrets you'll uncover—maybe an unlocked door or an outdated service that's ripe for exploitation. Whether you’re using tools like Nmap, Amass, or custom scripts, a deep reconnaissance phase saves time later by preventing you from chasing dead ends. Remember: recon isn't a checklist, it's a mindset. Always question assumptions, pivot on new findings, and measure twice before striking once. This approach gives you the strategic high ground, turning noise into actionable insights and transforming recon from a chore into a superpower for any pentester.`
  },
  {
    tip: 'Don’t skip enumeration – it’s 80% of the job.',
    explanation: `Enumeration is where raw data becomes valuable intel. After recon, enumeration drills down into discovered assets: open ports, services, user accounts, and misconfigurations. This phase often reveals things you never even knew existed—like hidden administrative interfaces or legacy services still running default credentials. Tools like LDAP queries, SMB enumeration, and Kerberos attacks dig deeper into the network’s bowels. Think of enumeration as detective work: you’re piecing together how the system is put together and where its weakest seams lie. Mastery here turns a standard pentest into a surgical strike. Skipping enumeration is like building a house on sand—everything else you do is unstable. By spending time to enumerate thoroughly, you refine your path to exploitation, tailor your payloads for maximum effect, and ensure you don’t miss critical opportunities. In short, enumeration shapes success.`
  },
  {
    tip: 'Automate repetitive tasks but know how to do them manually.',
    explanation: `Automation speeds you through the grind: mass scanning, brute-forcing, and report generation become background noise. However, tools have limitations and blind spots. If you rely solely on automation, you may miss nuances that separate a mediocre report from a game-changing discovery. Learning manual techniques—like manually crafting HTTP requests for fuzzing or exploring code logic by hand—sharpens your intuition and uncovers novel angles. Automation and manual work are two sides of the same coin: automation handles scale, while manual work handles depth. By blending both, you maximize efficiency without sacrificing insight. Building custom scripts in Python or PowerShell also adds adaptability, letting you tweak behavior on the fly. Ultimately, the best pentesters wield both automation and manual dexterity, riding the wave of speed, then dropping in for the perfect manual strike.`
  },
  {
    tip: 'Keep your tools updated and read their changelogs.',
    explanation: `Tool updates aren’t just about new features—they’re about closing blind spots and fixing bugs that could skew results. Changelogs reveal new modules, signature updates, and changed defaults that impact your workflow. Reading them keeps you aware of emerging techniques and shifts in exploit landscapes. For example, a new version of SQLMap might include a fresh injection vector or improved detection of WAFs. Overlooking updates can mean missing half your targets or chasing outdated vulnerabilities. By integrating update checks into your routine—using simple scripts or CI pipelines to fetch the latest releases—you ensure your toolset is battle-ready. And by reviewing changelogs, you learn how tools evolve, enhancing your knowledge of attack vectors and defensive measures. This scholarly habit turns every tool release into a micro-masterclass on pentesting innovation.`
  },
  {
    tip: 'Buffer overflows aren’t dead. Learn them.',
    explanation: `Despite the rise of high‑level languages, legacy systems and IoT devices still rely on low-level code vulnerable to classic memory exploits. Understanding buffer overflows lets you craft precise payloads to hijack execution flow, bypassing modern mitigations like DEP and ASLR through techniques like ROP chains. Beyond nostalgia, buffer overflow skills sharpen your grasp of binary internals: stack frames, calling conventions, and memory layout. This depth translates across all pentesting tasks, improving your debugging and reverse engineering capabilities. Tools like GDB, Immunity Debugger, and pwntools are your atelier for sculpting exploits. By practicing on CTF challenges or vulnerable VMs, you build muscle memory for recognizing overflow patterns. Far from being an academic relic, buffer overflows are a vibrant part of the pentest toolkit—mastery here elevates you from automated scanning to custom exploit development, giving you an edge against hardened targets.`
  }
];

// Components
function Header() {
  const location = useLocation();
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-purple-800 text-white">
      <h1 className="text-3xl font-bold tracking-tight">Saim Sohail</h1>
      <nav className="space-x-4">
        <Link className={location.pathname === '/bio' ? 'underline' : ''} to="/bio">Bio</Link>
        <Link className={location.pathname === '/certs' ? 'underline' : ''} to="/certs">Certs</Link>
        <Link className={location.pathname === '/tips' ? 'underline' : ''} to="/tips">Tips</Link>
      </nav>
      <div className="flex space-x-2">
        <a href="https://github.com/username" aria-label="GitHub"><GitHub /></a>
        <a href="https://linkedin.com/in/username" aria-label="LinkedIn"><Linkedin /></a>
        <ThemeToggle />
      </div>
    </header>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<BioPage />} />
        <Route path="/certs" element={<CertsPage />} />
        <Route path="/tips" element={<TipsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] bg-gradient-to-r from-purple-800 to-blue-800 text-white text-center px-4">
      <motion.h2 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold mb-4">
        Welcome to My World of Cybersecurity
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, y: 10 }} transition={{ delay: 0.4 }} className="max-w-2xl">
        Dive in to explore my journey, certifications, and pro tips that level up your security game.
      </motion.p>
    </section>
  );
}

function BioPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-8">
      <article className="prose max-w-none text-gray-200">
        <h2>Who is Saim?</h2>
        <p>{bioText}</p>
      </article>
    </motion.section>
  );
}

function CertsPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Certifications</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-200">
        {certs.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    </motion.section>
  );
}

function TipsPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Tips You Wanna Know!</h2>
      {tips.map((item, idx) => (
        <div key={idx} className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <motion.h3 whileHover={{ scale: 1.02 }} className="text-xl font-medium text-blue-400 mb-3">
            {idx + 1}. {item.tip}
          </motion.h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {item.explanation}
          </p>
        </div>
      ))}
    </motion.section>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-950 dark:bg-gray-100 transition-colors">
          <Header />
          <AnimatedRoutes />
        </div>
      </ThemeProvider>
    </Router>
  );
}
