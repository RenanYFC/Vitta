import { Link } from 'react-router-dom';

export default function HeroSection() {
  const imageUrl = "https://readdy.ai/api/search-image?query=Elegant%20confident%20woman%20in%20her%2040s%20walking%20gracefully%20on%20a%20sunlit%20autumn%20street%20wearing%20stylish%20leather%20ankle%20boots%20warm%20cream%20and%20terracotta%20color%20palette%20soft%20golden%20hour%20lighting%20editorial%20fashion%20photography%20blurred%20warm%20background%20sophisticated%20and%20approachable%20mood%20high%20end%20lifestyle%20magazine%20style&width=1600&height=800&seq=vitta-hero-real-1&orientation=landscape";

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden bg-cream">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Overlays */}
      {/* Horizontal Gradient Overlay: Whitish cream fading from left to right */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(245, 240, 234, 0.9) 0%, rgba(245, 240, 234, 0.7) 50%, rgba(245, 240, 234, 0.4) 100%)'
        }}
      />
      
      {/* Vertical Gradient Overlay: Fades to cream at the bottom boundary */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(245, 240, 234, 0) 0%, rgba(245, 240, 234, 0) 50%, rgba(245, 240, 234, 0.8) 100%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-xl">
          {/* Label */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
          >
            <span className="font-body text-[11px] tracking-[0.15em] uppercase text-teal font-medium">
              Coleção Outono · Inverno 2025-2026
            </span>
          </div>

          {/* H1 */}
          <div
            className="opacity-0 animate-fade-in-up mt-5"
            style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
          >
            <h1 className="font-display text-4xl md:text-[52px] leading-[1.15] md:leading-[1.1] text-brand-text">
              Elegância que
              <br />
              <em className="text-teal italic">você sente</em>
              <br />
              em cada passo.
            </h1>
          </div>

          {/* Subtext */}
          <div
            className="opacity-0 animate-fade-in-up mt-5"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            <p className="font-body text-[15px] text-[#444444] leading-[1.6] max-w-md">
              Calçados femininos premium em couro legítimo brasileiro.
              Conforto real, elegância acessível.
            </p>
          </div>

          {/* Buttons */}
          <div
            className="opacity-0 animate-fade-in-up mt-8"
            style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/colecao"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal text-white font-body text-sm font-medium rounded-md hover:bg-teal-dark transition-colors whitespace-nowrap"
              >
                Ver Coleção
                <i className="ri-arrow-right-line" />
              </Link>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-teal text-teal font-body text-sm font-medium rounded-md hover:bg-teal/5 transition-colors whitespace-nowrap bg-white/20 backdrop-blur-sm"
              >
                <i className="ri-whatsapp-line" />
                Fale no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}