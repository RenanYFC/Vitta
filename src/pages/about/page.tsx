import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-off-white pt-6 md:pt-10">
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6">
          <Link to="/" className="font-body text-sm text-brand-secondary hover:text-teal transition-colors">
            Início
          </Link>
          <i className="ri-arrow-right-s-line text-brand-muted text-sm" />
          <span className="font-body text-sm text-brand-text">Sobre</span>
        </nav>

        {/* Hero story */}
        <section className="max-w-3xl mb-16 md:mb-20">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-medium">
            Nossa História
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-text mt-4 mb-6 leading-tight">
            Elegância que você sente
            <br />
            <em className="text-teal">em cada passo.</em>
          </h1>
          <div className="space-y-4">
            <p className="font-body text-base text-brand-secondary leading-relaxed">
              Nascemos em 2020, em plena pandemia, com duas pequenas lojas no bairro dos Jardins, em São Paulo.
              O desafio era grande, mas a paixão por calçados de qualidade era ainda maior.
            </p>
            <p className="font-body text-base text-brand-secondary leading-relaxed">
              Desde o início, nossa missão foi clara: oferecer calçados femininos premium em couro legítimo
              brasileiro, com design sofisticado e preços justos. Cada modelo é pensado para a mulher
              contemporânea que valoriza conforto sem abrir mão da elegância.
            </p>
            <p className="font-body text-base text-brand-secondary leading-relaxed">
              Hoje, com mais de 40 modelos exclusivos em nossa coleção, continuamos a expandir nossa
              presença online para atender clientes de todo o Brasil. A Vitta é mais do que uma marca de
              calçados — é um convite para você sentir elegância a cada passo.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-brand-text mb-2">
              Nossos Valores
            </h2>
            <p className="font-body text-sm text-brand-secondary max-w-md mx-auto">
              Tradição artesanal brasileira com design contemporâneo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-leaf-line',
                title: 'Couro Legítimo',
                desc: '100% couro brasileiro selecionado dos melhores curtumes certificados. Cada peça passa por um rigoroso controle de qualidade antes de chegar até você.',
              },
              {
                icon: 'ri-heart-3-line',
                title: 'Conforto Real',
                desc: 'Palmilhas anatômicas com espuma de memória para você usar o dia todo. Nosso lema: beleza não pode doer.',
              },
              {
                icon: 'ri-vip-crown-line',
                title: 'Elegância Acessível',
                desc: 'Design sofisticado com preços justos. Luxo que cabe no seu bolso, sem comprometer a qualidade artesanal.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-lg p-6 md:p-8 text-center border border-brand-border"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-teal/10 mb-4">
                  <i className={`${item.icon} text-2xl text-teal`} />
                </div>
                <h3 className="font-display text-xl text-brand-text mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-brand-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Store info + Map */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-brand-border overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Info */}
              <div className="lg:w-1/3 p-6 md:p-8">
                <h3 className="font-display text-xl text-brand-text mb-5">
                  Nossa Loja
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-cream flex-shrink-0">
                      <i className="ri-map-pin-line text-teal" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-brand-text">
                        Endereço
                      </p>
                      <p className="font-body text-sm text-brand-secondary">
                        Rua Oscar Freire, 1234
                        <br />
                        Jardins, São Paulo — SP
                        <br />
                        CEP: 01426-001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-cream flex-shrink-0">
                      <i className="ri-time-line text-teal" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-brand-text">
                        Horário de Funcionamento
                      </p>
                      <p className="font-body text-sm text-brand-secondary">
                        Segunda a Sexta: 10h às 19h
                        <br />
                        Sábado: 10h às 16h
                        <br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-cream flex-shrink-0">
                      <i className="ri-whatsapp-line text-whatsapp" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-brand-text">
                        WhatsApp
                      </p>
                      <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-teal hover:underline"
                      >
                        (11) 99999-9999
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-cream flex-shrink-0">
                      <i className="ri-mail-line text-teal" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-brand-text">
                        E-mail
                      </p>
                      <a
                        href="mailto:contato@vittacalcados.com.br"
                        className="font-body text-sm text-teal hover:underline"
                      >
                        contato@vittacalcados.com.br
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="lg:w-2/3 bg-cream">
                <iframe
                  title="Localização Vitta Calçados"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197502189732!2d-46.6742713!3d-23.5630412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd5f3b8b9c3b8c8b8!2sR.%20Oscar%20Freire%2C%201234%20-%20Jardins%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001426-001!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '360px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social CTA */}
        <section className="text-center py-8">
          <p className="font-body text-sm text-brand-secondary mb-4">
            Siga a Vitta nas redes sociais
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-cream hover:bg-teal transition-colors group"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line text-lg text-brand-text group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-cream hover:bg-teal transition-colors group"
              aria-label="Pinterest"
            >
              <i className="ri-pinterest-line text-lg text-brand-text group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-cream hover:bg-whatsapp transition-colors group"
              aria-label="WhatsApp"
            >
              <i className="ri-whatsapp-line text-lg text-brand-text group-hover:text-white transition-colors" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}