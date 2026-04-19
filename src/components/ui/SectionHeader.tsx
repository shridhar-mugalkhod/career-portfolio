import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({ label, title, subtitle, align = 'center' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <AnimatedSection variant="fadeUp">
      <div className={`mb-12 ${alignClass}`}>
        <p
          className="text-small font-medium uppercase tracking-widest mb-4"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </p>
        <h2
          className="font-display font-bold mb-4"
          style={{ fontSize: 'var(--text-h2)', color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-body ${align === 'center' ? 'max-w-lg mx-auto' : 'max-w-lg'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}
