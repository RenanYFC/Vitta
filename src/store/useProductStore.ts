import { create } from 'zustand';
import { products as staticProducts, type Product } from '@/mocks/products';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: staticProducts, // usa dados estáticos como fallback inicial
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Falha ao carregar produtos do servidor backend');
      }
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (err: any) {
      console.warn('Não foi possível conectar ao backend simulado. Usando dados locais como fallback:', err);
      set({
        products: staticProducts,
        error: err.message || 'Erro de conexão com o backend',
        loading: false,
      });
    }
  },
}));
