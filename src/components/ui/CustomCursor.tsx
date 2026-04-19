import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isVisible = useRef(false);

  useEffect(() => {
    // Only run on desktop with fine pointer (not touch devices)
    const isTouchDevice = () => {
      return (
        !window.matchMedia('(pointer: fine)').matches ||
        navigator.maxTouchPoints > 0
      );
    };

    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (glowRef.current) glowRef.current.style.opacity = '1';
      }

      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    // Glow follows with lag (lerp)
    const animateGlow = () => {
      const lerp = 0.08;
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * lerp;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * lerp;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x - 150}px, ${glowPos.current.y - 150}px)`;
      }

      rafRef.current = requestAnimationFrame(animateGlow);
    };

    // Detect hoverable elements for accent dot
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, label');
      if (dotRef.current) {
        dotRef.current.style.backgroundColor = isInteractive ? 'var(--accent)' : 'var(--text-primary)';
        dotRef.current.style.width = isInteractive ? '12px' : '8px';
        dotRef.current.style.height = isInteractive ? '12px' : '8px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animateGlow);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Small precise dot */}
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 z-[10001] pointer-events-none"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--text-primary)',
          mixBlendMode: 'difference',
          opacity: 0,
          willChange: 'transform',
          transition: 'width 200ms, height 200ms, background-color 200ms',
        }}
      />
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="custom-cursor fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          opacity: 0,
          willChange: 'transform',
          filter: 'blur(40px)',
        }}
      />
    </>
  );
}
