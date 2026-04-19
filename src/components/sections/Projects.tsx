import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { portfolioConfig, type Project } from '@/config/portfolio.config';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

function ProjectCard({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  return (
    <AnimatedSection
      variant={featured ? 'scaleUp' : 'fadeUp'}
      delay={index * 0.08}
      className={featured ? 'md:col-span-2' : ''}
    >
      <div
        className="group rounded-xl overflow-hidden transition-all card-glow"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          />
          {/* Featured badge */}
          {project.featured && (
            <span
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium z-10"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-primary)',
              }}
            >
              Featured
            </span>
          )}
          {/* Hover overlay (desktop) */}
          <div
            className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-normal hidden md:flex"
            style={{ backgroundColor: 'var(--overlay-bg)' }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-small font-medium"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                <FiExternalLink size={14} /> Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-small font-medium"
                style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
              >
                <FiGithub size={14} /> Code
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-bold mb-2" style={{ fontSize: 'var(--text-h3)', color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <p className="text-small mb-4" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="chip transition-transform hover:-translate-y-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
          {/* Mobile CTAs */}
          <div className="flex gap-3 md:hidden">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-small font-medium"
                style={{ color: 'var(--accent)' }}
              >
                <FiExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-small font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                <FiGithub size={14} /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Projects() {
  const { projects } = portfolioConfig;
  const categories: string[] = ['All', ...new Set(projects.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);
  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects" divider="diagonal">
      <SectionHeader label="Projects" title="Things I've Built" />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 justify-center" style={{ scrollSnapType: 'x mandatory' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full text-small font-medium whitespace-nowrap transition-colors"
            style={{
              scrollSnapAlign: 'start',
              backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--bg-secondary)',
              color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border-subtle)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Featured projects */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {featured.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} featured />
              ))}
            </div>
          )}

          {/* Other projects */}
          {others.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {others.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
