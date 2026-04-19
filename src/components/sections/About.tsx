import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio.config';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useInView } from 'react-intersection-observer';

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let rafId: number;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-h2 font-display font-bold" style={{ color: 'var(--accent)' }}>
        {count}+
      </p>
      <p className="text-small" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </div>
  );
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
}

function GitHubStatsWidget() {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${portfolioConfig.githubUsername}`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setStats({
            publicRepos: data.public_repos ?? 0,
            followers: data.followers ?? 0,
          });
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-4 px-4 py-2 rounded-full text-small"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--text-secondary)',
      }}
    >
      {stats ? (
        <>
          <span>{stats.publicRepos} repos</span>
          <span className="w-px h-4" style={{ backgroundColor: 'var(--border-subtle)' }} />
          <span>{stats.followers} followers</span>
        </>
      ) : (
        <>
          <span className="w-16 h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--border-subtle)' }} />
          <span className="w-px h-4" style={{ backgroundColor: 'var(--border-subtle)' }} />
          <span className="w-20 h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--border-subtle)' }} />
        </>
      )}
    </div>
  );
}

export default function About() {
  const { personal, stats } = portfolioConfig;

  return (
    <SectionWrapper id="about" alternate divider="wave">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <AnimatedSection variant="fadeLeft">
          <p
            className="text-small font-medium uppercase tracking-widest mb-4"
            style={{ color: 'var(--accent)' }}
          >
            About Me
          </p>
          <h2
            className="font-display font-bold mb-6"
            style={{ fontSize: 'var(--text-h2)', color: 'var(--text-primary)' }}
          >
            Building the future, one pixel at a time
          </h2>
          <p className="text-body mb-6" style={{ color: 'var(--text-secondary)' }}>
            {personal.bio}
          </p>

          {personal.openToWork && (
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-small font-medium mb-6"
              style={{
                backgroundColor: 'var(--success-soft)',
                color: 'var(--success)',
                border: '1px solid var(--success-border)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Open to opportunities
            </span>
          )}

          <div className="mt-6">
            <GitHubStatsWidget />
          </div>
        </AnimatedSection>

        {/* Right: avatar + stats */}
        <AnimatedSection variant="fadeRight" className="flex flex-col items-center gap-8">
          <motion.div
            className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden group"
            style={{
              border: '2px solid var(--accent-glow)',
            }}
            whileHover={{ rotate: 2 }}
          >
            <img
              src={personal.avatarUrl}
              alt={personal.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow: 'inset 0 0 40px var(--accent-glow)',
              }}
            />
          </motion.div>

          <div className="grid grid-cols-3 gap-8">
            <AnimatedCounter target={stats.yearsExperience} label="Years Exp." />
            <AnimatedCounter target={stats.projects} label="Projects" />
            <AnimatedCounter target={stats.clients} label="Happy Clients" />
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
