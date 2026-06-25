import { useState, useEffect, useCallback } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const checkScroll = useCallback(() => {
    setVisible(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 w-12 h-12 bg-teal text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-dark transition-colors cursor-pointer"
      aria-label="Voltar ao topo"
    >
      <i className="ri-arrow-up-line text-lg" />
    </button>
  );
}