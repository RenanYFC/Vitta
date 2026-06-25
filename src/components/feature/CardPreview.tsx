interface CardPreviewProps {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  flipped: boolean;
}

export default function CardPreview({ number, name, expiry, cvv, flipped }: CardPreviewProps) {
  const maskedNumber = number.length > 0
    ? number.padEnd(19, '•')
    : '•••• •••• •••• ••••';

  const displayName = name || 'SEU NOME AQUI';
  const displayExpiry = expiry || 'MM/AA';
  const displayCvv = cvv || '•••';

  const getCardBrand = () => {
    const clean = number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(clean)) return 'mastercard';
    if (/^3[47]/.test(clean)) return 'amex';
    if (/^3[068]/.test(clean)) return 'diners';
    if (/^6/.test(clean)) return 'elo';
    return 'default';
  };

  const brand = getCardBrand();
  const brandIcons: Record<string, string> = {
    visa: 'VISA',
    mastercard: 'Mastercard',
    amex: 'Amex',
    diners: 'Diners',
    elo: 'Elo',
    default: 'Cartão',
  };

  return (
    <div className="relative w-full max-w-[320px] mx-auto" style={{ perspective: '800px' }}>
      <div
        className="relative w-full aspect-[1.6] rounded-xl transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl p-5 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #1B5E5A 0%, #2A7A75 50%, #1B5E5A 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-8 rounded bg-amber-400/80 flex items-center justify-center">
              <div className="w-6 h-5 border border-amber-600/40 rounded-sm" />
            </div>
            <span className="font-body text-xs text-white/80 tracking-wider">
              {brandIcons[brand]}
            </span>
          </div>
          <div className="font-body text-lg text-white tracking-[0.15em] font-mono">
            {maskedNumber}
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-body text-[9px] text-white/50 uppercase tracking-wider mb-0.5">
                Titular
              </p>
              <p className="font-body text-xs text-white uppercase tracking-wider truncate max-w-[180px]">
                {displayName}
              </p>
            </div>
            <div>
              <p className="font-body text-[9px] text-white/50 uppercase tracking-wider mb-0.5">
                Validade
              </p>
              <p className="font-body text-xs text-white tracking-wider">
                {displayExpiry}
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #144A47 0%, #1B5E5A 50%, #144A47 100%)',
          }}
        >
          <div className="w-full h-10 bg-black/30 mt-4" />
          <div className="px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-8 bg-white/90 rounded-sm flex items-center px-3">
                <span className="font-body text-xs text-brand-text tracking-[0.3em]">
                  ••••••••••••••••
                </span>
              </div>
              <div className="bg-white/90 px-3 py-1.5 rounded-sm">
                <span className="font-body text-xs text-brand-text font-semibold">
                  CVV
                </span>
                <span className="font-body text-xs text-brand-text ml-1">
                  {displayCvv}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1" />
          <div className="px-5 pb-4 flex items-center justify-between">
            <span className="font-body text-[10px] text-white/50">
              Este cartão é propriedade do banco emissor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}