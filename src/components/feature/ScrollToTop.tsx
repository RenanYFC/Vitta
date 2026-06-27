import { useState, useEffect, useCallback } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkScroll = useCallback(() => {
    setVisible(window.scrollY > 400);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', checkScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-4 md:right-6 z-40 w-12 h-12 bg-teal text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-dark transition-colors cursor-pointer"
      style={{ bottom: isMobile ? '96px' : '80px' }}
      aria-label="Voltar ao topo"
    >
      <i className="ri-arrow-up-line text-lg" />
    </button>
  );
}
