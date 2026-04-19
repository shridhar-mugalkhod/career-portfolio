import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import { portfolioConfig } from '@/config/portfolio.config';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_OUT_EXPO } from '@/constants/animation';

function MagneticCTA({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const ref = useMagneticEffect<HTMLButtonElement>({ strength: 0.3, radius: 120 });

  const handleClick = () => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-body font-medium overflow-hidden group cursor-pointer"
      style={{
        backgroundColor: primary ? 'var(--accent)' : 'transparent',
        color: primary ? 'var(--bg-primary)' : 'var(--text-primary)',
        border: primary ? 'none' : '1px solid var(--border-hover)',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover bg slide */}
      <span
        className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-normal"
        style={{
          backgroundColor: primary ? 'var(--accent-hover)' : 'var(--accent-soft)',
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export default function Hero() {
  const { personal } = portfolioConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Split name into words, then letters for animation (preserving word boundaries)
  const nameWords = personal.name.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.03, delayChildren: reduced ? 0 : 0.2 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.1 : 0.5, ease: EASE_OUT_EXPO } },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, var(--accent-glow) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(59, 158, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(59, 158, 255, 0.04) 0%, transparent 50%)
          `,
          animation: reduced ? 'none' : 'gradientMesh 20s ease-in-out infinite',
          backgroundSize: '200% 200%',
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        style={reduced || isMobile ? {} : { y, opacity }}
      >
        {/* Name with gradient text */}
        <motion.h1
          className="font-display font-bold leading-tight mb-4"
          style={{
            fontSize: 'var(--text-hero)',
            background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 50%, var(--text-primary) 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: reduced ? 'none' : 'gradientMesh 6s ease-in-out infinite',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {nameWords.map((word, wi) => (
            <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((letter, li) => (
                <motion.span
                  key={`${wi}-${li}`}
                  variants={letterVariants}
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
              {wi < nameWords.length - 1 && (
                <motion.span variants={letterVariants} style={{ display: 'inline-block' }}>
                  {'\u00A0'}
                </motion.span>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-h3 font-body mb-6"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.6, duration: reduced ? 0.1 : 0.6, ease: EASE_OUT_EXPO }}
        >
          {personal.tagline}
        </motion.p>

        {/* Bio */}
        <motion.p
          className="text-body max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.9, duration: reduced ? 0.1 : 0.8 }}
        >
          {personal.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 1.1, duration: reduced ? 0.1 : 0.6, ease: EASE_OUT_EXPO }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <MagneticCTA href="#contact" primary>
              Let's Talk
            </MagneticCTA>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <MagneticCTA href="#projects">
              View Work
            </MagneticCTA>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 2, duration: reduced ? 0.1 : 0.6 }}
      >
        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2"
          style={{ color: 'var(--text-tertiary)' }}
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          aria-label="Scroll to About section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
            <FiArrowDown size={20} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
