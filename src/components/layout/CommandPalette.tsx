import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSun, FiMoon, FiFileText, FiGithub, FiHome, FiUser, FiBriefcase, FiCode, FiFolder, FiMail } from 'react-icons/fi';
import { portfolioConfig } from '@/config/portfolio.config';
import { useTheme } from '@/hooks/useTheme';
import { EASE_OUT_EXPO } from '@/constants/animation';

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // Keyboard shortcut
  useEffect(() => {
    if (!portfolioConfig.commandPalette) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  }, []);

  const commands: Command[] = useMemo(
    () => [
      { id: 'hero', label: 'Go to Home', icon: <FiHome size={16} />, action: () => scrollTo('hero'), keywords: ['home', 'top', 'hero'] },
      { id: 'about', label: 'Go to About', icon: <FiUser size={16} />, action: () => scrollTo('about'), keywords: ['about', 'bio'] },
      { id: 'experience', label: 'Go to Experience', icon: <FiBriefcase size={16} />, action: () => scrollTo('experience'), keywords: ['experience', 'work', 'career'] },
      { id: 'skills', label: 'Go to Skills', icon: <FiCode size={16} />, action: () => scrollTo('skills'), keywords: ['skills', 'tech'] },
      { id: 'projects', label: 'Go to Projects', icon: <FiFolder size={16} />, action: () => scrollTo('projects'), keywords: ['projects', 'portfolio', 'work'] },
      { id: 'contact', label: 'Go to Contact', icon: <FiMail size={16} />, action: () => scrollTo('contact'), keywords: ['contact', 'email', 'hire'] },
      {
        id: 'theme',
        label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        icon: theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />,
        action: () => { toggleTheme(); setOpen(false); },
        keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
      },
      {
        id: 'resume',
        label: 'Open Resume',
        icon: <FiFileText size={16} />,
        action: () => { window.open(portfolioConfig.personal.resumeUrl, '_blank'); setOpen(false); },
        keywords: ['resume', 'cv', 'download'],
      },
      {
        id: 'github',
        label: 'Visit GitHub',
        icon: <FiGithub size={16} />,
        action: () => { window.open(`https://github.com/${portfolioConfig.githubUsername}`, '_blank'); setOpen(false); },
        keywords: ['github', 'code', 'repo'],
      },
    ],
    [theme, toggleTheme, scrollTo]
  );

  const filtered = query
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : commands;

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within the palette
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter' && filtered.length > 0) {
        e.preventDefault();
        filtered[selectedIndex]?.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filtered, selectedIndex]);

  if (!portfolioConfig.commandPalette) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[200]"
            style={{ backgroundColor: 'var(--overlay-bg)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed top-[20%] left-1/2 z-[201] w-[90%] max-w-lg -translate-x-1/2 rounded-xl overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
            }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid var(--border-subtle)' }}
            >
              <FiSearch size={18} style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                autoFocus
                className="flex-1 bg-transparent text-body outline-none"
                style={{ color: 'var(--text-primary)' }}
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={filtered[selectedIndex]?.id}
              />
              <kbd
                className="px-2 py-0.5 rounded text-xs font-mono"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-tertiary)',
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div id="command-list" role="listbox" className="max-h-[300px] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-small" style={{ color: 'var(--text-tertiary)' }}>
                  No results found
                </p>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    id={cmd.id}
                    role="option"
                    aria-selected={i === selectedIndex}
                    onClick={cmd.action}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-small transition-colors"
                    style={{
                      color: 'var(--text-primary)',
                      backgroundColor: i === selectedIndex ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span style={{ color: 'var(--accent)' }}>{cmd.icon}</span>
                    {cmd.label}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
