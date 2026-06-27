import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/mocks/products';
import { formatPrice } from '@/mocks/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlist = useCartStore((s) => s.wishlist);

  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(null);
    setSizeError(false);
    setAddedToCart(false);
  }, [product?.id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  const inWishlist = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const badgeColors: Record<string, string> = {
    novo: 'bg-lavender',
    bestseller: 'bg-teal',
    oferta: 'bg-[#C8553D]',
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-cream transition-colors cursor-pointer shadow-sm"
          aria-label="Fechar"
        >
          <i className="ri-close-line text-xl text-brand-text" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left — Images */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="relative bg-cream rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full aspect-square object-contain p-4"
              />
              {product.badge && product.badgeLabel && (
                <span
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full font-body text-[11px] font-semibold text-white ${badgeColors[product.badge] || 'bg-teal'}`}
                >
                  {product.badgeLabel}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors cursor-pointer ${
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

          {/* Right — Info */}
          <div className="md:w-1/2 p-6 md:p-8 md:pl-0">
            <span className="font-body text-xs tracking-[0.15em] uppercase text-teal font-medium">
              {product.categoryLabel}
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-brand-text mt-1 leading-tight">
              {product.name}
            </h2>
            <p className="font-body text-sm text-brand-secondary mt-1 line-clamp-2">
              {product.shortDesc}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
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
            <div className="flex items-center gap-3 mt-3">
              {product.originalPrice && (
                <span className="font-body text-base text-brand-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-display text-2xl text-teal font-semibold">
                {formatPrice(product.price)}
              </span>
            </div>
            <p className="font-body text-xs text-brand-secondary mt-1">
              ou 10x de {formatPrice(Math.ceil(product.price / 10))} sem juros
            </p>

            {/* Material badge */}
            <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-lavender/10 rounded-full inline-flex">
              <i className="ri-leaf-line text-lavender text-sm" />
              <span className="font-body text-xs text-lavender font-medium">
                {product.material}
              </span>
            </div>

            {/* Size selector */}
            <div className="mt-5">
              <span className="font-body text-sm font-semibold text-brand-text">
                Tamanho
              </span>
              <div
                className={`flex flex-wrap gap-2 mt-2 ${sizeError ? 'animate-shake' : ''}`}
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
                    className={`w-12 h-12 flex items-center justify-center rounded-sm font-body text-sm font-medium transition-all cursor-pointer relative ${
                      variant.stock > 0
                        ? selectedSize === variant.size
                          ? 'bg-teal text-white border border-teal'
                          : 'border border-brand-border text-brand-text hover:border-teal hover:bg-teal/5'
                        : 'border border-brand-border text-brand-muted cursor-not-allowed bg-brand-border/30'
                    }`}
                  >
                    {variant.size}
                    {variant.stock <= 0 && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-[120%] h-px bg-brand-muted rotate-45" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="font-body text-xs text-[#C8553D] mt-2 animate-pulse">
                  Por favor, selecione um tamanho
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-5 space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 text-white font-body text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  addedToCart
                    ? 'bg-green-600'
                    : 'bg-teal hover:bg-teal-dark'
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-check-line" />
                    Adicionado!
                  </span>
                ) : (
                  'Adicionar ao Carrinho'
                )}
              </button>
              <a
                href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no produto ${product.name} (tamanho: ${selectedSize || '---'})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-whatsapp text-white font-body text-sm font-semibold rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <i className="ri-whatsapp-line" />
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
              <span className="flex items-center gap-1 font-body text-[11px] text-brand-secondary">
                <i className="ri-lock-line text-teal" />
                Compra Segura
              </span>
              <span className="flex items-center gap-1 font-body text-[11px] text-brand-secondary">
                <i className="ri-truck-line text-teal" />
                Frete Grátis acima R$399
              </span>
              <span className="flex items-center gap-1 font-body text-[11px] text-brand-secondary">
                <i className="ri-refresh-line text-teal" />
                Troca 30 dias
              </span>
              <span className="flex items-center gap-1 font-body text-[11px] text-brand-secondary">
                <i className="ri-checkbox-circle-line text-teal" />
                Produto Original
              </span>
            </div>

            <Link
              to={`/produto/${product.slug}`}
              onClick={onClose}
              className="block mt-5 text-center font-body text-sm text-teal hover:underline"
            >
              Ver página completa do produto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}