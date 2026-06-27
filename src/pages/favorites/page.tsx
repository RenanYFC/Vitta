import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/base/ProductCard';
import QuickViewModal from '@/components/feature/QuickViewModal';
import ScrollToTop from '@/components/feature/ScrollToTop';
import type { Product } from '@/mocks/products';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';

export default function Favorites() {
  const wishlist = useCartStore((s) => s.wishlist);
  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products that are in the wishlist
  const favoritedProducts = products.filter((product) => wishlist.includes(product.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
          <span className="font-body text-sm text-brand-secondary">Carregando seus favoritos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white pt-8 md:pt-12 animate-premium-page">
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6">
          <Link to="/" className="font-body text-sm text-brand-secondary hover:text-teal transition-colors">
            Início
          </Link>
          <i className="ri-arrow-right-s-line text-brand-muted text-sm" />
          <span className="font-body text-sm text-brand-text">Favoritos</span>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl text-brand-text mb-2">
          Meus Favoritos
        </h1>
        <p className="font-body text-sm text-brand-secondary mb-8">
          {favoritedProducts.length} {favoritedProducts.length === 1 ? 'modelo salvo' : 'modelos salvos'}
        </p>

        {favoritedProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-lg border border-brand-border px-4">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-cream mb-4">
              <i className="ri-heart-line text-3xl text-brand-muted" />
            </div>
            <h2 className="font-display text-2xl text-brand-text mb-2">
              Sua lista de favoritos está vazia
            </h2>
            <p className="font-body text-sm text-brand-secondary max-w-md mx-auto mb-6">
              Navegue pelo nosso catálogo e clique no ícone de coração para salvar seus modelos favoritos aqui.
            </p>
            <Link
              to="/colecao"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal text-white font-body text-sm font-medium rounded-md hover:bg-teal-dark transition-colors"
            >
              Explorar Coleção
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ rowGap: '40px', columnGap: '24px' }}>
            {favoritedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
}
