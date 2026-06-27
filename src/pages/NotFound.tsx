import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-20 bg-off-white animate-premium-page">
      <div className="relative z-10 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-cream mb-6">
          <i className="ri-hammer-line text-3xl text-teal animate-pulse" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-brand-text mb-3">
          Página em Construção
        </h1>
        <p className="font-body text-sm md:text-base text-brand-secondary mb-8">
          Estamos preparando novidades para você. Esta página estará disponível em breve!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal text-white font-body text-sm font-medium rounded-md hover:bg-teal-dark transition-colors"
        >
          Voltar para o Início
          <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </div>
  );
}