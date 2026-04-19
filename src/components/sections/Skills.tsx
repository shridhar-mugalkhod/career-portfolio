import { motion } from 'framer-motion';
import { FiMonitor, FiServer, FiCloud, FiTool, FiCode } from 'react-icons/fi';
import { portfolioConfig } from '@/config/portfolio.config';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useInView } from 'react-intersection-observer';
import { EASE_OUT_EXPO } from '@/constants/animation';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FiMonitor,
  FiServer,
  FiCloud,
  FiTool,
  FiCode,
};

function SkillCard({ group, index }: { group: typeof portfolioConfig.skills[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = iconMap[group.icon];

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-xl card-glow"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: EASE_OUT_EXPO,
      }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div
            className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}
          >
            <Icon size={20} />
          </div>
        )}
        <h3 className="font-display font-bold" style={{ fontSize: 'var(--text-h3)', color: 'var(--text-primary)' }}>
          {group.category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-full text-small font-medium transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { skills } = portfolioConfig;

  return (
    <SectionWrapper id="skills" alternate divider="wave">
      <SectionHeader label="Skills" title="Technologies I Work With" />

      <div className="grid sm:grid-cols-2 gap-6">
        {skills.map((group, i) => (
          <SkillCard key={group.category} group={group} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
