import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi';
import { portfolioConfig } from '@/config/portfolio.config';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useInView } from 'react-intersection-observer';
import { EASE_OUT_EXPO } from '@/constants/animation';

function EducationCard({ edu, index }: { edu: typeof portfolioConfig.education[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Extract location from institution (after comma)
  const parts = edu.institution.split(',');
  const name = parts[0].trim();
  const location = parts.slice(1).join(',').trim();

  // Extract grade from description if present
  const gradeMatch = edu.description?.match(/(CGPA|Grade|GPA|Percentage)[:\s]*([^\s.]+)/i);
  const grade = gradeMatch ? gradeMatch[0] : null;

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        delay: index * 0.2,
        duration: 0.7,
        ease: EASE_OUT_EXPO,
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, var(--accent), transparent, var(--accent))',
          backgroundSize: '200% 200%',
          animation: 'gradientMesh 4s ease-in-out infinite',
        }}
      />

      {/* Card content */}
      <div
        className="relative p-8 rounded-2xl h-full overflow-hidden cursor-pointer md:cursor-default transition-all"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Decorative background pattern */}
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B9EFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Top row: icon + year */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="w-14 h-14 flex items-center justify-center rounded-xl"
            style={{
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
            }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <FiBookOpen size={24} />
          </motion.div>
{/* 
          {grade && (
            <span
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
              }}
            >
              {grade}
            </span>
          )} */}
        </div>

        {/* Degree */}
        <h3
          className="font-display font-bold mb-3 leading-tight"
          style={{ fontSize: 'var(--text-h3)', color: 'var(--text-primary)' }}
        >
          {edu.degree}
        </h3>

        {/* Institution */}
        <p className="text-body font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
          {name}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-5">
          <span
            className="inline-flex items-center gap-1.5 text-small"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <FiCalendar size={14} />
            {edu.year}
          </span>
          {location && (
            <span
              className="inline-flex items-center gap-1.5 text-small"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <FiMapPin size={14} />
              {location}
            </span>
          )}
        </div>

        {/* Description - Desktop always visible, Mobile on expand */}
        <div className="hidden md:block">
          {edu.description && (
            <p className="text-small leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              {edu.description.replace(gradeMatch?.[0] ?? '', '').replace(/\.\s*$/, '').trim()}
            </p>
          )}
        </div>

        {/* Mobile expandable description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              {edu.description && (
                <p className="text-small leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                  {edu.description.replace(gradeMatch?.[0] ?? '', '').replace(/\.\s*$/, '').trim()}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px]"
          style={{ backgroundColor: 'var(--accent)' }}
          initial={{ width: '0%' }}
          animate={inView ? { width: '100%' } : { width: '0%' }}
          transition={{
            delay: index * 0.2 + 0.5,
            duration: 0.8,
            ease: EASE_OUT_EXPO,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Education() {
  const { education } = portfolioConfig;

  if (education.length === 0) return null;

  return (
    <SectionWrapper id="education" divider="diagonal">
      <SectionHeader label="Education" title="Academic Background" />

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {education.map((edu, i) => (
          <EducationCard key={edu.degree} edu={edu} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
