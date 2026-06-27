import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/mocks/products';

interface MiniCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_THRESHOLD = 39900;

export default function MiniCartDrawer({ isOpen, onClose }: MiniCartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getCartTotal = useCartStore((s) => s.getCartTotal);

  const subtotal = useMemo(() => getCartTotal(), [items, getCartTotal]);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0" style={{ zIndex: 150 }}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 h-full w-full max-w-[380px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
          <h2 className="font-body text-base font-semibold text-brand-text">
            Meu Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-cream transition-colors cursor-pointer"
            aria-label="Fechar carrinho"
          >
            <i className="ri-close-line text-xl text-brand-text" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-cream mb-4">
                <i className="ri-shopping-bag-line text-3xl text-brand-muted" />
              </div>
              <p className="font-body text-base font-medium text-brand-text mb-1">
                Seu carrinho está vazio
              </p>
              <p className="font-body text-sm text-brand-secondary mb-6">
                Explore nossa coleção e encontre o par perfeito.
              </p>
              <Link to="/colecao" onClick={onClose}>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-body text-sm font-medium rounded-md hover:bg-teal-dark transition-colors cursor-pointer">
                  Ver Coleção
                  <i className="ri-arrow-right-line" />
                </span>
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-start gap-3"
                >
                  <Link
                    to={`/produto/${item.product.slug}`}
                    onClick={onClose}
                    className="w-16 h-20 flex-shrink-0 rounded-md overflow-hidden bg-cream"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/produto/${item.product.slug}`}
                      onClick={onClose}
                      className="block"
                    >
                      <h3 className="font-body text-sm font-medium text-brand-text hover:text-teal transition-colors leading-tight truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="font-body text-xs text-brand-secondary">
                      Tam: {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {/* Stepper */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-sm border border-brand-border bg-white font-body text-xs text-brand-text hover:bg-cream transition-colors cursor-pointer"
                          aria-label="Diminuir"
                        >
                          <i className="ri-subtract-line" />
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center font-body text-xs text-brand-text">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-sm border border-brand-border bg-white font-body text-xs text-brand-text hover:bg-cream transition-colors cursor-pointer"
                          aria-label="Aumentar"
                        >
                          <i className="ri-add-line" />
                        </button>
                      </div>
                      <span className="font-display text-sm text-teal font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-cream transition-colors cursor-pointer flex-shrink-0"
                    aria-label="Remover"
                  >
                    <i className="ri-close-line text-brand-secondary" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-border p-5 space-y-4">
            {/* Free shipping progress */}
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="font-body text-xs text-brand-secondary mb-1.5">
                  Falta {formatPrice(remainingForFreeShipping)} para frete grátis!
                </p>
                <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-teal">
                <i className="ri-truck-line" />
                <span className="font-body text-xs font-medium">
                  Você ganhou frete grátis!
                </span>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-brand-secondary">Subtotal</span>
              <span className="font-body text-base font-semibold text-brand-text">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full py-3.5 bg-teal text-white font-body text-sm font-semibold rounded-md hover:bg-teal-dark transition-colors text-center"
              >
                Finalizar Compra
              </Link>
              <button
                onClick={onClose}
                className="w-full py-3 border border-brand-border text-brand-text font-body text-sm rounded-md hover:bg-cream transition-colors cursor-pointer"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}