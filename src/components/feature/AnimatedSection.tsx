import { type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in-up' | 'fade-in';
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fade-in-up',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${className} ${inView ? `animate-${animation}` : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}