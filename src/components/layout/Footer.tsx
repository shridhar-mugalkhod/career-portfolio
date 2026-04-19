import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';
import { portfolioConfig } from '@/config/portfolio.config';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
};

function SocialIcon({ icon, url, platform }: { icon: string; url: string; platform: string }) {
  const ref = useMagneticEffect<HTMLAnchorElement>({ strength: 0.4, radius: 80 });

  const IconComponent = iconMap[icon];
  if (!IconComponent) return null;

  return (
    <a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-fast hover:-translate-y-1"
      style={{
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
      aria-label={platform}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
      }}
    >
      <IconComponent size={18} />
    </a>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative py-12 px-6"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-6">
        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {portfolioConfig.social.map((s) => (
            <SocialIcon key={s.platform} icon={s.icon} url={s.url} platform={s.platform} />
          ))}
        </div>

        {/* Copyright */}
        <p className="text-small" style={{ color: 'var(--text-tertiary)' }}>
          &copy; {new Date().getFullYear()} {portfolioConfig.personal.name}. All rights reserved.
        </p>

        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          className="absolute right-6 bottom-12 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-secondary)',
          }}
          whileHover={{ scale: 1.1, rotate: -360 }}
          transition={{ duration: 0.5 }}
          aria-label="Back to top"
        >
          <FiArrowUp size={18} />
        </motion.button>
      </div>
    </footer>
  );
}
