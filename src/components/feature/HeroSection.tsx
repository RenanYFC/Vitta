import { Link } from 'react-router-dom';

const leafPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 4 C44 4 56 16 56 30 C56 44 44 56 30 56 C16 56 4 44 4 30 C4 16 16 4 30 4 Z' fill='%231B5E5A' fill-opacity='0.06'/%3E%3C/svg%3E")`;

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5F0EA]">
      {/* Desktop split layout */}
      <div className="hidden md:flex h-[540px]">
        {/* Left 55% — warm off-white with botanical pattern */}
        <div className="flex-[55] relative">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: leafPattern }}
          />
          <div className="relative z-10 h-full flex items-center pl-20 pr-10">
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
                <h1 className="font-display text-[52px] leading-[1.1] text-brand-text">
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
                <p className="font-body text-[15px] text-[#666666] leading-[1.6] max-w-md">
                  Calçados femininos premium em couro legítimo brasileiro.
                  Conforto real, elegância acessível.
                </p>
              </div>

              {/* Buttons */}
              <div
                className="opacity-0 animate-fade-in-up mt-8"
                style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-3">
                  <Link
                    to="/colecao"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal text-white font-body text-sm font-medium rounded-md hover:bg-teal-dark transition-colors whitespace-nowrap"
                  >
                    Ver Coleção
                    <i className="ri-arrow-right-line" />
                  </Link>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-teal text-teal font-body text-sm font-medium rounded-md hover:bg-teal/5 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-whatsapp-line" />
                    Fale no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 45% — deep teal with diagonal cut */}
        <div
          className="flex-[45] relative bg-teal flex items-center justify-center"
          style={{
            clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        >
          {/* Boot product image */}
          <div
            className="relative opacity-0 animate-fade-in-up"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            <img
              src="https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/8a586003-826f-4882-ad0f-685914b867a3_Bota-com-salto-em-pelica.png?v=b433acf59ec47052c992845f42efc7e3"
              alt="Bota com Salto em Pelica — Coleção Outono Inverno"
              className="max-h-[340px] w-auto object-contain"
              style={{
                transform: 'translateY(-20px)',
                filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.25))',
              }}
            />
            {/* Badge overlapping top-right */}
            <div
              className="absolute -top-2 -right-4 bg-lavender text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg opacity-0 animate-fade-in"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              <span className="font-display text-2xl font-bold">40</span>
              <span className="font-body text-[10px] uppercase tracking-wider">modelos</span>
              <span className="font-body text-[10px] uppercase tracking-wider">exclusivos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked layout */}
      <div className="md:hidden">
        {/* Top text area */}
        <div className="relative px-6 pt-10 pb-8">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: leafPattern }}
          />
          <div className="relative z-10">
            <span className="font-body text-[11px] tracking-[0.15em] uppercase text-teal font-medium">
              Coleção Outono · Inverno 2025-2026
            </span>
            <h1 className="font-display text-[36px] leading-[1.15] text-brand-text mt-4">
              Elegância que
              <br />
              <em className="text-teal italic">você sente</em>
              <br />
              em cada passo.
            </h1>
            <p className="font-body text-[15px] text-[#666666] leading-[1.6] mt-4 max-w-sm">
              Calçados femininos premium em couro legítimo brasileiro.
              Conforto real, elegância acessível.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6">
              <Link
                to="/colecao"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal text-white font-body text-sm font-medium rounded-md hover:bg-teal-dark transition-colors whitespace-nowrap"
              >
                Ver Coleção
                <i className="ri-arrow-right-line" />
              </Link>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-teal text-teal font-body text-sm font-medium rounded-md hover:bg-teal/5 transition-colors whitespace-nowrap"
              >
                <i className="ri-whatsapp-line" />
                Fale no WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Teal block with boot */}
        <div className="relative bg-teal flex items-center justify-center py-12 px-6">
          <div className="relative">
            <img
              src="https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/8a586003-826f-4882-ad0f-685914b867a3_Bota-com-salto-em-pelica.png?v=b433acf59ec47052c992845f42efc7e3"
              alt="Bota com Salto em Pelica — Coleção Outono Inverno"
              className="max-h-[280px] w-auto object-contain"
              style={{
                filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.25))',
              }}
            />
            <div className="absolute -top-2 -right-2 bg-lavender text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
              <span className="font-display text-xl font-bold">40</span>
              <span className="font-body text-[9px] uppercase tracking-wider">modelos</span>
              <span className="font-body text-[9px] uppercase tracking-wider">exclusivos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}