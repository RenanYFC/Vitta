import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, formatPrice } from '@/mocks/products';
import { useCartStore } from '@/store/useCartStore';
import ProductCard from '@/components/base/ProductCard';
import ProductReviews from '@/components/feature/ProductReviews';
import ScrollToTop from '@/components/feature/ScrollToTop';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('descricao');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlist = useCartStore((s) => s.wishlist);

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug) || products[0];
  }, [products, slug]);

  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product, products]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize);
  };

  const inWishlist = wishlist.includes(product.id);

  const sizeGuideData = [
    { br: '34', cm: '22.0' },
    { br: '35', cm: '22.5' },
    { br: '36', cm: '23.0' },
    { br: '37', cm: '23.5' },
    { br: '38', cm: '24.0' },
    { br: '39', cm: '24.5' },
    { br: '40', cm: '25.0' },
    { br: '41', cm: '25.5' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-off-white pt-6 md:pt-10">
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 flex-wrap">
          <Link to="/" className="font-body text-sm text-brand-secondary hover:text-teal transition-colors whitespace-nowrap">
            Início
          </Link>
          <i className="ri-arrow-right-s-line text-brand-muted text-sm" />
          <Link to={`/colecao?categoria=${product.category}`} className="font-body text-sm text-brand-secondary hover:text-teal transition-colors whitespace-nowrap">
            {product.categoryLabel}
          </Link>
          <i className="ri-arrow-right-s-line text-brand-muted text-sm" />
          <span className="font-body text-sm text-brand-text truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left - Gallery (60%) */}
          <div className="flex-1 lg:max-w-[58%]">
            <div
              className="relative bg-cream rounded-lg overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full aspect-[4/5] object-contain p-6 transition-transform duration-300 ${zoomed ? 'scale-[1.4]' : 'scale-100'}`}
                style={
                  zoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : undefined
                }
              />
              {product.badge && product.badgeLabel && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full font-body text-[11px] font-semibold text-white bg-lavender">
                  {product.badgeLabel}
                </span>
              )}
              {/* Share icon */}
              <button
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors cursor-pointer z-10"
                aria-label="Compartilhar"
              >
                <i className="ri-share-line text-brand-text" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors cursor-pointer bg-cream ${
                    selectedImage === idx ? 'border-teal' : 'border-transparent hover:border-brand-border'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Info (40%) */}
          <div className="flex-1 lg:max-w-[38%]">
            <span className="font-body text-xs tracking-[0.15em] uppercase text-teal font-medium">
              {product.categoryLabel}
            </span>
            <h1 className="font-display text-[28px] md:text-[30px] text-brand-text mt-2 leading-tight">
              {product.name}
            </h1>
            <p className="font-body text-sm text-brand-secondary mt-2 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`ri-star-fill text-sm ${star <= 4 ? 'text-amber-400' : star === 5 ? 'text-amber-400/40' : 'text-amber-400'}`}
                  />
                ))}
              </div>
              <span className="font-body text-xs text-brand-secondary">
                4.8 (47 avaliações)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <div className="flex items-center gap-3">
                {product.originalPrice && (
                  <span className="font-body text-base text-brand-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="font-display text-[26px] text-lavender font-semibold">
                  {formatPrice(product.price)}
                </span>
              </div>
              <p className="font-body text-xs text-brand-secondary mt-1">
                ou 10x de {formatPrice(Math.ceil(product.price / 10))} sem juros
              </p>
            </div>

            {/* Material badge */}
            <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-lavender/10 rounded-full inline-flex">
              <i className="ri-leaf-line text-lavender" />
              <span className="font-body text-sm text-lavender font-medium">
                {product.material}
              </span>
            </div>

            {/* Color swatches */}
            <div className="mt-5">
              <span className="font-body text-sm font-semibold text-brand-text">
                Cor: {product.color}
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="w-5 h-5 rounded-full ring-2 ring-teal ring-offset-2 cursor-pointer"
                  style={{ backgroundColor: '#4A6741' }}
                  aria-label={product.color}
                />
              </div>
            </div>

            {/* Size selector */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-sm font-semibold text-brand-text">
                  Tamanho
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="font-body text-xs text-teal hover:underline cursor-pointer"
                >
                  Ver guia de numeração
                </button>
              </div>
              <div
                className={`grid grid-cols-4 sm:grid-cols-8 gap-2 ${sizeError ? 'animate-shake' : ''}`}
              >
                {product.variants.map((variant) => (
                  <button
                    key={variant.size}
                    onClick={() => {
                      if (variant.stock > 0) {
                        setSelectedSize(
                          selectedSize === variant.size ? null : variant.size,
                        );
                        setSizeError(false);
                      }
                    }}
                    disabled={variant.stock <= 0}
                    className={`w-full aspect-square flex items-center justify-center rounded-sm font-body text-sm font-medium transition-all cursor-pointer relative ${
                      variant.stock > 0
                        ? selectedSize === variant.size
                          ? 'bg-teal text-white border border-teal'
                          : 'border border-brand-border text-brand-text hover:border-teal hover:bg-teal/5'
                        : 'border border-brand-border text-brand-muted cursor-not-allowed bg-brand-border/30'
                    }`}
                  >
                    {variant.size}
                    {variant.stock <= 0 && (
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="w-[120%] h-px bg-brand-muted rotate-45" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="font-body text-sm text-[#C8553D] mt-2 animate-pulse">
                  Por favor, selecione um tamanho
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-teal text-white font-body text-base font-semibold rounded-md hover:bg-teal-dark transition-colors cursor-pointer"
              >
                Adicionar ao Carrinho
              </button>
              <a
                href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no produto ${product.name} (tamanho: ${selectedSize || '---'})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-whatsapp text-white font-body text-base font-semibold rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <i className="ri-whatsapp-line text-xl" />
                Comprar pelo WhatsApp
              </a>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-full py-3 border border-brand-border text-brand-text font-body text-sm rounded-md hover:bg-cream transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {inWishlist ? (
                  <i className="ri-heart-fill text-lavender" />
                ) : (
                  <i className="ri-heart-line" />
                )}
                {inWishlist ? 'Remover da Lista' : 'Adicionar à Lista de Desejos'}
              </button>
            </div>

            {/* Trust icons */}
            <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-brand-border">
              <span className="flex items-center gap-1 font-body text-[11px] text-brand-secondary whitespace-nowrap">
                <i className="ri-lock-line text-teal" />
                Compra Segura
              </span>
              <span className="text-brand-border">|</span>
              <span className="flex items-center gap-1 font-body text-[11px] text-brand-secondary whitespace-nowrap">
                <i className="ri-truck-line text-teal" />
                Frete Grátis acima R$399
              </span>
              <span className="text-brand-border">|</span>
              <span className="flex items-center gap-1 font-body text-[11px] text-brand-secondary whitespace-nowrap">
                <i className="ri-refresh-line text-teal" />
                Troca 30 dias
              </span>
              <span className="text-brand-border">|</span>
              <span className="flex items-center gap-1 font-body text-[11px] text-brand-secondary whitespace-nowrap">
                <i className="ri-checkbox-circle-line text-teal" />
                Produto Original
              </span>
            </div>

            {/* Accordions */}
            <div className="mt-8 space-y-2">
              {[
                { id: 'descricao', label: 'Descrição Completa', content: product.description },
                { id: 'materiais', label: 'Materiais e Cuidados', content: `Material externo: ${product.material}. Palmilha: Espuma de memória com revestimento em couro. Solado: Borracha natural antiderrapante.\n\nCuidados: Limpar com pano úmido e sabão neutro. Evitar exposição direta ao sol por longos períodos. Usar impermeabilizante para couro a cada 3 meses.` },
                { id: 'entrega', label: 'Entrega e Prazo', content: 'Entrega em até 7 dias úteis em todo o Brasil. Frete grátis para compras acima de R$ 399.\n\nCalcule o frete inserindo seu CEP no carrinho de compras. Trocas e devoluções em até 30 dias após o recebimento.' },
                { id: 'avaliacoes', label: 'Avaliações (47)', content: null },
              ].map((item) => (
                <div key={item.id} className="border border-brand-border rounded-md overflow-hidden">
                  <button
                    onClick={() =>
                      setActiveAccordion(
                        activeAccordion === item.id ? null : item.id,
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-3 bg-white cursor-pointer"
                  >
                    <span className="font-body text-sm font-medium text-brand-text">
                      {item.label}
                    </span>
                    <i
                      className={`ri-arrow-down-s-line text-brand-secondary transition-transform ${
                        activeAccordion === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeAccordion === item.id && (
                    <div className="px-4 pb-4 bg-white">
                      {item.id === 'avaliacoes' ? (
                        <ProductReviews />
                      ) : (
                        <p className="font-body text-sm text-brand-secondary leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 md:mt-20">
          <h2 className="font-display text-2xl md:text-3xl text-brand-text mb-6">
            Você também pode gostar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px' }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-brand-text">
                Guia de Tamanhos
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-cream cursor-pointer"
                aria-label="Fechar"
              >
                <i className="ri-close-line text-lg text-brand-text" />
              </button>
            </div>
            <p className="font-body text-sm text-brand-secondary mb-4">
              Meça o comprimento do seu pé (do calcanhar até a ponta do dedão maior) e consulte a tabela:
            </p>
            <div className="border border-brand-border rounded-md overflow-hidden">
              <div className="grid grid-cols-2 bg-cream">
                <div className="px-4 py-2 font-body text-xs font-semibold text-brand-text">
                  BR
                </div>
                <div className="px-4 py-2 font-body text-xs font-semibold text-brand-text">
                  Comprimento (cm)
                </div>
              </div>
              {sizeGuideData.map((row) => (
                <div
                  key={row.br}
                  className="grid grid-cols-2 border-t border-brand-border"
                >
                  <div className="px-4 py-2 font-body text-sm text-brand-text">
                    {row.br}
                  </div>
                  <div className="px-4 py-2 font-body text-sm text-brand-secondary">
                    {row.cm}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
}
