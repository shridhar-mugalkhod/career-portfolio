import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_OUT_EXPO } from '@/constants/animation';
import type { ReactNode } from 'react';

type AnimationVariant =
  | 'fadeUp'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleUp'
  | 'staggerGrid'
  | 'drawLine';

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerGrid: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  },
  drawLine: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  },
};

export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}

export function AnimatedSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
  as = 'div',
}: AnimatedSectionProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '0px 0px',
  });

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={reduced ? reducedVariants : variants[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration: reduced ? 0.2 : duration,
        delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </MotionComponent>
  );
}
