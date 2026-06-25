import { memo, type ReactNode } from 'react';

interface SectionTitleProps {
  label?: string;
  title: ReactNode;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle = memo(function SectionTitle({
  label,
  title,
  subtitle,
  centered = false,
}: SectionTitleProps) {
  return (
    <div className={`${centered ? 'text-center' : ''}`}>
      {label && (
        <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-medium">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-brand-text mt-2 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-base text-brand-secondary mt-3 max-w-lg mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
});

export default SectionTitle;