import { create } from "zustand";
import { products } from "./data.json";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  sku?: string;
  inventory?: number;
  manufacturer?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  tags?: string[];
  reviews?: any[];
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  filterProductsByPrice: (maxPrice: number) => Product[];
  sortProducts: (sortBy: "name" | "price", order?: "asc" | "desc") => Product[];
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchProducts: () => Promise<void>;
}

const mockProducts: Product[] = products;

export const useProductStore = create<ProductStore>()((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  setProducts: (products) => set({ products }),

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      ),
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),

  getProductById: (id) => {
    const state = get();
    return state.products.find((product) => product.id === id);
  },

  searchProducts: (query) => {
    const state = get();
    const lowerQuery = query.toLowerCase();
    return state.products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  },

  filterProductsByPrice: (maxPrice) => {
    const state = get();
    return state.products.filter((product) => product.price <= maxPrice);
  },

  sortProducts: (sortBy, order = "asc") => {
    const state = get();
    const sorted = [...state.products].sort((a, b) => {
      if (sortBy === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
    return sorted;
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, this would be an actual API call
      set({
        products: mockProducts,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
        isLoading: false,
      });
    }
  },
}));
