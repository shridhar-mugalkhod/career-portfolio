import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { portfolioConfig } from '@/config/portfolio.config';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EASE_OUT_EXPO } from '@/constants/animation';

export default function Testimonials() {
  const { testimonials } = portfolioConfig;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Autoplay with pause-on-hover
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  if (testimonials.length === 0) return null;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  const testimonial = testimonials[current];

  return (
    <SectionWrapper id="testimonials" alternate divider="wave">
      <SectionHeader label="Testimonials" title="What People Say" />

      <div
        className="relative max-w-2xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="text-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragStart={(_, info) => { dragStartX.current = info.point.x; }}
            onDragEnd={(_, info) => {
              const swipe = info.point.x - dragStartX.current;
              if (Math.abs(swipe) > 50) {
                if (swipe < 0) next();
                else prev();
              }
            }}
          >
            {/* Quote */}
            <div
              className="p-8 rounded-xl mb-6"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
            >
              <svg
                className="w-8 h-8 mx-auto mb-4"
                style={{ color: 'var(--accent)' }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <p className="text-body italic leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                "{testimonial.quote}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              {testimonial.avatarUrl && (
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="text-left">
                <p className="text-small font-medium" style={{ color: 'var(--text-primary)' }}>
                  {testimonial.author}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  {testimonial.role} @ {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === current ? 'var(--accent)' : 'var(--text-tertiary)',
                  transform: i === current ? 'scale(1.5)' : 'scale(1)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
            aria-label="Next testimonial"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
