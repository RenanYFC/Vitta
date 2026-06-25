import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-off-white pt-6 md:pt-10 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center py-12 md:py-20">
        {/* Animated checkmark */}
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-teal/10 mb-6 animate-bounce">
          <i className="ri-check-line text-4xl text-teal" />
        </div>

        <h1 className="font-display text-2xl md:text-3xl text-brand-text mb-2">
          Pedido Confirmado!
        </h1>
        <p className="font-body text-sm text-brand-secondary mb-8">
          Obrigada pela sua compra. Você receberá um e-mail de confirmação em breve.
        </p>

        <div className="bg-white rounded-lg border border-brand-border p-6 mb-8">
          <p className="font-body text-xs text-brand-secondary mb-1">
            Número do pedido
          </p>
          <p className="font-body text-xl font-semibold text-brand-text tracking-wider">
            #VT-2025-8742
          </p>
          <p className="font-body text-xs text-brand-secondary mt-3">
            Previsão de entrega: <span className="text-brand-text font-medium">07 a 12 de maio de 2026</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/colecao">
            <span className="inline-flex items-center gap-2 px-8 py-3 bg-teal text-white font-body text-sm font-medium rounded-md hover:bg-teal-dark transition-colors">
              Continuar Comprando
              <i className="ri-arrow-right-line" />
            </span>
          </Link>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-whatsapp text-whatsapp font-body text-sm font-medium rounded-md hover:bg-whatsapp/5 transition-colors"
          >
            <i className="ri-whatsapp-line" />
            Acompanhar pedido
          </a>
        </div>
      </div>
    </div>
  );
}