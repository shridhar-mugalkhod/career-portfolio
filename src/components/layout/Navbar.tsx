import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio.config';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all"
        style={{
          backgroundColor: scrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          {/* Logo / Initials */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-display text-xl font-bold tracking-tight"
            style={{ color: 'var(--accent)' }}
            aria-label="Go to top"
          >
            {portfolioConfig.personal.initials}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative group px-3 py-2 text-small font-medium transition-colors"
                style={{
                  color: activeSection === link.id ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px]"
                    style={{ backgroundColor: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Hover underline */}
                <span
                  className="absolute bottom-0 left-3 right-3 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-fast"
                  style={{ backgroundColor: 'var(--accent-hover)' }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={portfolioConfig.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex px-4 py-2 rounded-full text-small font-medium transition-all"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-primary)',
              }}
            >
              Resume
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <motion.span
                className="block h-[2px] w-full rounded-full"
                style={{ backgroundColor: 'var(--text-primary)' }}
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-[2px] w-full rounded-full"
                style={{ backgroundColor: 'var(--text-primary)' }}
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="block h-[2px] w-full rounded-full"
                style={{ backgroundColor: 'var(--text-primary)' }}
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[98]"
              style={{ backgroundColor: 'var(--overlay-bg)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[99] rounded-t-2xl px-6 pb-8 pt-4"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-subtle)',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) setMobileOpen(false);
              }}
            >
              {/* Drag handle */}
              <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: 'var(--text-tertiary)' }} />
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="py-3 text-left text-body font-medium transition-colors"
                    style={{
                      color: activeSection === link.id ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={portfolioConfig.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 py-3 rounded-xl text-center text-body font-medium"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
