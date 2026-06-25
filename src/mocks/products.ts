export interface ProductVariant {
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDesc: string;
  price: number;
  originalPrice?: number;
  category: string;
  categoryLabel: string;
  images: string[];
  variants: ProductVariant[];
  tags: string[];
  badge: 'novo' | 'bestseller' | 'oferta' | null;
  badgeLabel?: string;
  material: string;
  color: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'bota-baixa-em-couro',
    name: 'Bota Baixa em Couro',
    description: 'Bota baixa em couro legítimo brasileiro com acabamento artesanal impecável. Solado de borracha antiderrapante e palmilha anatômica com espuma de memória para conforto prolongado. Modelo versátil que transita do casual ao elegante.',
    shortDesc: 'Couro legítimo, acabamento artesanal',
    price: 38990,
    category: 'botas',
    categoryLabel: 'Botas',
    images: [
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/18690c63-ad75-48e6-be45-3ed613c4e055_Bota-baixa-em-couro.png?v=d4386077c839ddc0ef880158cecbe120',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/18690c63-ad75-48e6-be45-3ed613c4e055_Bota-baixa-em-couro.png?v=d4386077c839ddc0ef880158cecbe120',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/18690c63-ad75-48e6-be45-3ed613c4e055_Bota-baixa-em-couro.png?v=d4386077c839ddc0ef880158cecbe120',
    ],
    variants: [
      { size: '34', stock: 3 },
      { size: '35', stock: 5 },
      { size: '36', stock: 7 },
      { size: '37', stock: 4 },
      { size: '38', stock: 6 },
      { size: '39', stock: 2 },
      { size: '40', stock: 3 },
      { size: '41', stock: 1 },
    ],
    tags: ['couro-legitimo', 'bota', 'inverno', 'elegante'],
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    material: 'Couro Legítimo',
    color: 'Verde Militar',
  },
  {
    id: '2',
    slug: 'bota-cano-baixo-em-pelica',
    name: 'Bota Cano Baixo em Pelica',
    description: 'Bota cano baixo em pelica premium com forro macio interno. Modelo confortável e elegante para o outono-inverno. Acabamento refinado que valoriza qualquer look, do casual ao mais sofisticado.',
    shortDesc: 'Pelica premium, forro macio',
    price: 29990,
    category: 'botas',
    categoryLabel: 'Botas',
    images: [
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/a10167e7-e6e4-492a-8bcd-e411f2a43709_Bota-cano-baixo-em-pelica.png?v=3ae18286c11b032a7a98a889f5cf9af7',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/a10167e7-e6e4-492a-8bcd-e411f2a43709_Bota-cano-baixo-em-pelica.png?v=3ae18286c11b032a7a98a889f5cf9af7',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/a10167e7-e6e4-492a-8bcd-e411f2a43709_Bota-cano-baixo-em-pelica.png?v=3ae18286c11b032a7a98a889f5cf9af7',
    ],
    variants: [
      { size: '34', stock: 4 },
      { size: '35', stock: 6 },
      { size: '36', stock: 8 },
      { size: '37', stock: 5 },
      { size: '38', stock: 3 },
      { size: '39', stock: 4 },
      { size: '40', stock: 2 },
      { size: '41', stock: 1 },
    ],
    tags: ['pelica', 'bota', 'inverno', 'conforto'],
    badge: 'novo',
    badgeLabel: 'Novo',
    material: 'Pelica',
    color: 'Preto',
  },
  {
    id: '3',
    slug: 'bota-com-salto-em-pelica',
    name: 'Bota com Salto em Pelica',
    description: 'Bota com salto bloco de 5cm em pelica premium. Conforto o dia todo graças à palmilha acolchoada e ao salto anatômico. Modelo elegante que valoriza a silhueta sem sacrificar o bem-estar dos pés.',
    shortDesc: 'Salto bloco 5cm, conforto o dia todo',
    price: 34990,
    category: 'botas',
    categoryLabel: 'Botas',
    images: [
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/8a586003-826f-4882-ad0f-685914b867a3_Bota-com-salto-em-pelica.png?v=b433acf59ec47052c992845f42efc7e3',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/8a586003-826f-4882-ad0f-685914b867a3_Bota-com-salto-em-pelica.png?v=b433acf59ec47052c992845f42efc7e3',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/8a586003-826f-4882-ad0f-685914b867a3_Bota-com-salto-em-pelica.png?v=b433acf59ec47052c992845f42efc7e3',
    ],
    variants: [
      { size: '35', stock: 5 },
      { size: '36', stock: 7 },
      { size: '37', stock: 4 },
      { size: '38', stock: 6 },
      { size: '39', stock: 3 },
      { size: '40', stock: 2 },
    ],
    tags: ['pelica', 'bota', 'salto', 'elegante'],
    badge: null,
    material: 'Pelica Premium',
    color: 'Caramelo',
  },
  {
    id: '4',
    slug: 'coturno-em-petwork-baixo-em-couro',
    name: 'Coturno em Petwork Baixo em Couro',
    description: 'Coturno moderno em couro com petwork baixo e solado tratorado. Design urbano e robusto para quem busca estilo e durabilidade. Interior forrado em tecido macio que mantém os pés aquecidos e confortáveis.',
    shortDesc: 'Couro petwork, solado tratorado',
    price: 41990,
    category: 'coturnos',
    categoryLabel: 'Coturnos',
    images: [
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/7c5eeaca-aa99-476f-9b20-9fef5aeeba62_coturno-em-petwork-baixo-em-couro.png?v=8b3642eba82b0eff1a3b53a942817326',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/7c5eeaca-aa99-476f-9b20-9fef5aeeba62_coturno-em-petwork-baixo-em-couro.png?v=8b3642eba82b0eff1a3b53a942817326',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/7c5eeaca-aa99-476f-9b20-9fef5aeeba62_coturno-em-petwork-baixo-em-couro.png?v=8b3642eba82b0eff1a3b53a942817326',
    ],
    variants: [
      { size: '34', stock: 2 },
      { size: '35', stock: 4 },
      { size: '36', stock: 6 },
      { size: '37', stock: 3 },
      { size: '38', stock: 5 },
      { size: '39', stock: 4 },
      { size: '40', stock: 2 },
      { size: '41', stock: 1 },
    ],
    tags: ['couro-legitimo', 'coturno', 'inverno', 'urbano'],
    badge: 'bestseller',
    badgeLabel: 'Best Seller',
    material: 'Couro Legítimo',
    color: 'Preto',
  },
  {
    id: '5',
    slug: 'mocassim-tradicional',
    name: 'Mocassim Tradicional',
    description: 'Mocassim tradicional em couro liso de alta qualidade com pesponto artesanal. Solado flexível em borracha natural para máximo conforto. Design atemporal que transita do escritório ao happy hour com elegância.',
    shortDesc: 'Couro liso, pesponto artesanal',
    price: 32990,
    category: 'mocassins',
    categoryLabel: 'Mocassins',
    images: [
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/7a8cde48-5de1-46c1-81b1-9b1526a96980_Mocassim-tradicional.png?v=eba8f457444bd386587a60c969039cb0',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/7a8cde48-5de1-46c1-81b1-9b1526a96980_Mocassim-tradicional.png?v=eba8f457444bd386587a60c969039cb0',
      'https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/7a8cde48-5de1-46c1-81b1-9b1526a96980_Mocassim-tradicional.png?v=eba8f457444bd386587a60c969039cb0',
    ],
    variants: [
      { size: '34', stock: 3 },
      { size: '35', stock: 5 },
      { size: '36', stock: 7 },
      { size: '37', stock: 4 },
      { size: '38', stock: 6 },
      { size: '39', stock: 3 },
      { size: '40', stock: 2 },
      { size: '41', stock: 1 },
    ],
    tags: ['couro-legitimo', 'mocassim', 'classico'],
    badge: 'novo',
    badgeLabel: 'Novo',
    material: 'Couro Liso',
    color: 'Marrom',
  },
  {
    id: '6',
    slug: 'bota-ankle-heels-nude',
    name: 'Bota Ankle Heels Nude',
    description: 'Bota ankle boot com salto bloco médio de 6cm, confeccionada em couro nude suave. Fechamento com zíper interno para facilitar o calce. A cor nude alonga visualmente as pernas e combina com qualquer look.',
    shortDesc: 'Salto bloco 6cm',
    price: 37990,
    originalPrice: 42990,
    category: 'botas',
    categoryLabel: 'Botas',
    images: [
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/6473f82028584dd3eeb4679a98e3cc8e.jpeg',
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/3e71fd36ff1c2b062d76491716d45869.jpeg',
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/308f37018fc8eeac2f707c49284013a8.jpeg',
    ],
    variants: [
      { size: '34', stock: 1 },
      { size: '35', stock: 4 },
      { size: '36', stock: 6 },
      { size: '37', stock: 3 },
      { size: '38', stock: 5 },
      { size: '39', stock: 2 },
      { size: '40', stock: 3 },
      { size: '41', stock: 1 },
    ],
    tags: ['couro-legitimo', 'bota', 'salto', 'elegante'],
    badge: 'oferta',
    badgeLabel: '12% OFF',
    material: 'Couro Suave',
    color: 'Nude',
  },
  {
    id: '7',
    slug: 'mocassim-camurca-terracota',
    name: 'Mocassim Camurça Terracota',
    description: 'Mocassim em camurça premium na cor terracota, uma das tendências do outono-inverno. Borla decorativa frontal e solado em couro natural. Leve, flexível e perfeito para o clima ameno.',
    shortDesc: 'Camurça premium',
    price: 29990,
    category: 'mocassins',
    categoryLabel: 'Mocassins',
    images: [
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/308f37018fc8eeac2f707c49284013a8.jpeg',
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/6473f82028584dd3eeb4679a98e3cc8e.jpeg',
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/3e71fd36ff1c2b062d76491716d45869.jpeg',
    ],
    variants: [
      { size: '35', stock: 4 },
      { size: '36', stock: 6 },
      { size: '37', stock: 5 },
      { size: '38', stock: 3 },
      { size: '39', stock: 4 },
      { size: '40', stock: 2 },
      { size: '41', stock: 1 },
    ],
    tags: ['couro-legitimo', 'mocassim', 'camurca', 'tendencia'],
    badge: 'novo',
    badgeLabel: 'Novo',
    material: 'Camurça Premium',
    color: 'Terracota',
  },
  {
    id: '8',
    slug: 'sandalia-rasteira-croco-branco',
    name: 'Sandália Rasteira Croco Branco',
    description: 'Sandália rasteira com estampa croco em couro branco. Tiras finas que ajustam confortavelmente ao pé. Solado ultra flexível e antiderrapante. Perfeita para o dia a dia com elegância casual.',
    shortDesc: 'Couro croco branco',
    price: 25990,
    originalPrice: 28990,
    category: 'sandalias',
    categoryLabel: 'Sandálias',
    images: [
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/308f37018fc8eeac2f707c49284013a8.jpeg',
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/6473f82028584dd3eeb4679a98e3cc8e.jpeg',
      'https://static.readdy.ai/image/b5ef711504dbc5810dba496181a0e7d4/3e71fd36ff1c2b062d76491716d45869.jpeg',
    ],
    variants: [
      { size: '34', stock: 3 },
      { size: '35', stock: 5 },
      { size: '36', stock: 7 },
      { size: '37', stock: 6 },
      { size: '38', stock: 4 },
      { size: '39', stock: 5 },
      { size: '40', stock: 3 },
      { size: '41', stock: 2 },
    ],
    tags: ['couro-legitimo', 'sandalia', 'rasteira', 'verao'],
    badge: 'oferta',
    badgeLabel: '10% OFF',
    material: 'Couro Croco',
    color: 'Branco',
  },
];

export const categories = [
  { slug: 'botas', name: 'Botas' },
  { slug: 'coturnos', name: 'Coturnos' },
  { slug: 'mocassins', name: 'Mocassins' },
  { slug: 'sandalias', name: 'Sandálias' },
  { slug: 'acessorios', name: 'Acessórios' },
];

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}