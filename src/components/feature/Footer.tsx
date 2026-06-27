import { Link } from 'react-router-dom';

const logoUrl = "https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/b4648f43-e5e9-4d69-a3be-fdc92ab130f5_Vitta-01.jpg.jpeg?v=cdebadaeb7cd7cc5998b437d0aceae2a";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src={logoUrl}
                alt="Vitta Calçados"
                className="h-12 w-auto object-contain"
                style={{ maxHeight: '48px' }}
              />
            </Link>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Elegância que você sente em cada passo.
            </p>
            <p className="font-body text-xs text-white/40 mt-4">
              © 2025 Vitta Calçados — Todos os direitos reservados
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.instagram.com/vitta_calcados20/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-teal transition-colors"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-sm text-white" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-whatsapp transition-colors"
                aria-label="WhatsApp"
              >
                <i className="ri-whatsapp-line text-sm text-white" />
              </a>
            </div>
          </div>

          {/* Column 2 — Lojas */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Nossas Lojas
            </h4>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-start gap-2">
                  <i className="ri-map-pin-line text-white/40 text-sm mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      Av. Paulista, 1000 — Bela Vista<br />
                      São Paulo — SP, 01310-000
                    </p>
                    <p className="font-body text-xs text-white/40 mt-1">
                      Seg–Sex 9h–18h | Sáb 9h–13h
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-2">
                  <i className="ri-map-pin-line text-white/40 text-sm mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-white/70 leading-relaxed">
                      Rua Oscar Freire, 450 — Jardins<br />
                      São Paulo — SP, 01426-001
                    </p>
                    <p className="font-body text-xs text-white/40 mt-1">
                      Seg–Sex 9h–18h | Sáb 9h–13h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 — Atendimento */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Atendimento
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <i className="ri-whatsapp-line text-whatsapp text-sm" />
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-instagram-line text-white/40 text-sm" />
                <a
                  href="https://www.instagram.com/vitta_calcados20/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  @vitta_calcados20
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-mail-line text-white/40 text-sm" />
                <a
                  href="mailto:contato@vittacalcados.com.br"
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  contato@vittacalcados.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-global-line text-white/40 text-sm" />
                <span className="font-body text-sm text-white/70">
                  vittacalcados.com.br
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 — Links Úteis */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Informações
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                'Política de Troca e Devolução',
                'Política de Privacidade',
                'Guia de Numeração',
                'Rastrear Meu Pedido',
                'Perguntas Frequentes (FAQ)',
                'Trabalhe Conosco',
              ].map((item) => (
                <li key={item}>
                  <span className="font-body text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Pagamento */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Pagamento
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Payment badge icons */}
              <span className="px-2.5 py-1 bg-white/10 rounded font-body text-[10px] text-white/80 whitespace-nowrap">Visa</span>
              <span className="px-2.5 py-1 bg-white/10 rounded font-body text-[10px] text-white/80 whitespace-nowrap">Mastercard</span>
              <span className="px-2.5 py-1 bg-white/10 rounded font-body text-[10px] text-white/80 whitespace-nowrap">PIX</span>
              <span className="px-2.5 py-1 bg-white/10 rounded font-body text-[10px] text-white/80 whitespace-nowrap">Boleto</span>
              <span className="px-2.5 py-1 bg-white/10 rounded font-body text-[10px] text-white/80 whitespace-nowrap">American Express</span>
              <span className="px-2.5 py-1 bg-white/10 rounded font-body text-[10px] text-white/80 whitespace-nowrap">Elo</span>
            </div>
            <p className="font-body text-xs text-white/50 mb-3">
              Parcelamento em até 10x sem juros
            </p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-body text-[10px] text-white/40">
                <i className="ri-shield-check-line" />
                SSL
              </span>
              <span className="flex items-center gap-1 font-body text-[10px] text-white/40">
                <i className="ri-lock-line" />
                Compra Segura
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0A0A0A]">
        <div className="w-full px-4 md:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30 text-center sm:text-left">
            © 2025 Vitta Calçados — CNPJ: XX.XXX.XXX/0001-XX — Todos os direitos reservados
          </p>
          <p className="font-body text-xs text-white/30 text-center sm:text-right">
            Desenvolvido com amor para calçados brasileiros
          </p>
        </div>
      </div>
    </footer>
  );
}
