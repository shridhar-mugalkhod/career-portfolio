import { useRef, useCallback, useEffect } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticEffect<T extends HTMLElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.3, radius = 150 } = options;
  const ref = useRef<T>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < radius) {
          const pull = (1 - distance / radius) * strength;
          el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
        } else {
          el.style.transform = 'translate(0, 0)';
        }
      });
    },
    [strength, radius]
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = 'translate(0, 0)';
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (ref.current) ref.current.style.transition = '';
    }, 400);
  }, []);

  useEffect(() => {
    // Only enable on devices with fine pointer (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const el = ref.current;
    el?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el?.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
