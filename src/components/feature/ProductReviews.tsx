const reviews = [
  {
    name: 'Fernanda M.',
    initials: 'FM',
    date: '15/04/2026',
    rating: 5,
    comment: 'Comprei a bota baixa em couro e estou simplesmente encantada! O couro é macio, o acabamento é impecável e o conforto é surreal. Já usei por 8 horas seguidas sem sentir dor nos pés. Super recomendo!',
  },
  {
    name: 'Camila R.',
    initials: 'CR',
    date: '02/04/2026',
    rating: 5,
    comment: 'Atendimento excelente pelo WhatsApp. Me ajudaram a escolher o tamanho certo e a entrega chegou em 5 dias. A qualidade do material é notável, dá pra ver que é couro legítimo mesmo. Vou comprar mais cores!',
  },
  {
    name: 'Patrícia L.',
    initials: 'PL',
    date: '20/03/2026',
    rating: 4,
    comment: 'A bota com salto em pelica é linda e super confortável. O salto de 5cm é perfeito para o dia a dia no escritório. Só acho que poderia ter mais opções de cores, mas a qualidade compensa. Parabéns Vitta!',
  },
];

export default function ProductReviews() {
  return (
    <div className="space-y-5">
      {reviews.map((review) => (
        <div
          key={review.name}
          className="bg-white rounded-lg border border-brand-border p-5"
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
              <span className="font-body text-xs font-semibold text-teal">
                {review.initials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-body text-sm font-medium text-brand-text">
                  {review.name}
                </span>
                <span className="font-body text-xs text-brand-muted">
                  {review.date}
                </span>
              </div>
              <div className="flex items-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`ri-star-fill text-xs ${
                      star <= review.rating
                        ? 'text-amber-400'
                        : 'text-brand-border'
                    }`}
                  />
                ))}
              </div>
              <p className="font-body text-sm text-brand-secondary mt-2 leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}