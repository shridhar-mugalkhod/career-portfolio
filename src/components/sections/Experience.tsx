import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio.config';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useInView } from 'react-intersection-observer';
import { EASE_OUT_EXPO } from '@/constants/animation';

function TimelineEntry({ entry, index, isLast }: { entry: typeof portfolioConfig.experience[0]; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full border-2 flex-shrink-0 z-10"
          style={{
            borderColor: 'var(--accent)',
            backgroundColor: inView ? 'var(--accent)' : 'var(--bg-primary)',
          }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * 0.15, duration: 0.4, ease: EASE_OUT_EXPO }}
        />
        {!isLast && (
          <motion.div
            className="w-[2px] flex-1"
            style={{ backgroundColor: 'var(--border-subtle)' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: index * 0.15 + 0.2, duration: 0.6, ease: EASE_OUT_EXPO }}
          />
        )}
      </div>

      {/* Content */}
      <AnimatedSection variant="fadeUp" delay={index * 0.15} className="pb-10 flex-1">
        <div
          className="p-6 rounded-xl transition-all card-glow"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-display font-bold" style={{ fontSize: 'var(--text-h3)', color: 'var(--text-primary)' }}>
                {entry.role}
              </h3>
              <p className="text-small font-medium" style={{ color: 'var(--accent)' }}>
                {entry.companyUrl ? (
                  <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {entry.company}
                  </a>
                ) : (
                  entry.company
                )}
              </p>
            </div>
            <span className="text-small" style={{ color: 'var(--text-tertiary)' }}>
              {entry.duration}
            </span>
          </div>

          <div className="hidden md:block">
            <p className="text-body mb-4" style={{ color: 'var(--text-secondary)' }}>
              {entry.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="chip transition-transform hover:-translate-y-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile expandable content with animation */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden"
              >
                <p className="text-body mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {entry.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="chip transition-transform hover:-translate-y-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile expand indicator */}
          <button
            className="md:hidden mt-3 text-xs"
            style={{ color: 'var(--text-tertiary)' }}
            aria-label={expanded ? 'Collapse' : 'Expand'}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '— Less' : '+ More'}
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default function Experience() {
  const { experience } = portfolioConfig;

  return (
    <SectionWrapper id="experience" divider="diagonal">
      <SectionHeader label="Experience" title="Where I've Worked" />

      <div className="max-w-2xl mx-auto">
        {experience.map((entry, i) => (
          <TimelineEntry
            key={entry.company + entry.role}
            entry={entry}
            index={i}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
