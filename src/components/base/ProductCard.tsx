import { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/mocks/products';
import { formatPrice } from '@/mocks/products';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = memo(function ProductCard({ product, onQuickView }: ProductCardProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlist = useCartStore((s) => s.wishlist);
  const addToCart = useCartStore((s) => s.addToCart);

  const inWishlist = wishlist.includes(product.id);

  const badgeColors: Record<string, string> = {
    novo: 'bg-lavender',
    new: 'bg-lavender',
    bestseller: 'bg-teal',
    oferta: 'bg-[#C8553D]',
    sale: 'bg-[#C8553D]',
    highlight: 'bg-lavender',
    vintage: 'bg-teal',
    exclusive: 'bg-teal',
    classic: 'bg-brand-text',
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 2000);
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative aspect-[3/4] bg-cream overflow-hidden">
        <Link
          to={`/produto/${product.slug}`}
          className="block w-full h-full"
        >
          <div className="flex items-center justify-center w-full h-full p-4">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </Link>

        {/* Badge */}
        {product.badge && product.badgeLabel && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full font-body text-[11px] font-semibold text-white ${badgeColors[product.badge] || 'bg-teal'}`}
          >
            {product.badgeLabel}
          </span>
        )}

        {/* Wishlist heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors cursor-pointer z-10"
          aria-label={inWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {inWishlist ? (
            <i className="ri-heart-fill text-lg text-lavender" />
          ) : (
            <i className="ri-heart-line text-lg text-brand-text" />
          )}
        </button>

        {/* Hover overlay */}
        <div
          onClick={() => navigate(`/produto/${product.slug}`)}
          className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 transition-opacity duration-200 cursor-pointer ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="px-6 py-2.5 bg-white text-brand-text font-body text-sm font-medium rounded-md hover:bg-cream transition-colors cursor-pointer"
          >
            Visualização Rápida
          </button>
          <Link
            to={`/produto/${product.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-2.5 bg-teal text-white font-body text-sm font-medium rounded-md hover:bg-teal-dark transition-colors"
          >
            Ver detalhes
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 px-1">
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-body text-sm font-medium text-brand-text hover:text-teal transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-[11px] text-brand-secondary mt-0.5">
          {product.shortDesc}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-display text-base text-teal font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-brand-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Size dots */}
        <div className="flex items-center gap-1.5 mt-2">
          {product.variants.map((variant) => (
            <button
              key={variant.size}
              onClick={() => {
                if (variant.stock > 0) {
                  setSelectedSize(
                    selectedSize === variant.size ? null : variant.size,
                  );
                  setShowSizeError(false);
                }
              }}
              disabled={variant.stock <= 0}
              className={`w-[26px] h-[26px] flex items-center justify-center rounded-sm text-[10px] font-body font-medium transition-all cursor-pointer ${
                variant.stock > 0
                  ? selectedSize === variant.size
                    ? 'bg-teal text-white border border-teal'
                    : 'border border-teal text-teal hover:bg-teal/10'
                  : 'border border-brand-border text-brand-muted cursor-not-allowed line-through'
              }`}
              aria-label={`Tamanho ${variant.size}${variant.stock <= 0 ? ' indisponível' : ''}`}
            >
              {variant.size}
            </button>
          ))}
        </div>
        {showSizeError && (
          <p className="font-body text-[11px] text-[#C8553D] mt-1">
            Selecione um tamanho primeiro
          </p>
        )}
      </div>
    </div>
  );
});

export default ProductCard;
