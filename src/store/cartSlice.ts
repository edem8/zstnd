import type { cartProduct } from "@/types/cartProduct";
import type { Product } from "@/types/products";
import type { StateCreator } from "zustand";

type cartState = {
  products: cartProduct[];
  total: number;
};

type cartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductById: (productId: string) => cartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

export type cartSlice = cartState & cartActions;

// Because we have a reset action, we need to set the initial state
const initialState: cartState = {
  products: [],
  total: 0,
};

export const createCartSlice: StateCreator<
  cartSlice,
  [["zustand/immer", never]],
  [],
  cartSlice
> = (set, get) => ({
  ...initialState,
  incQty: (productId) =>
    set((state) => {
      const foundProduct = state.products.find(
        (product: cartProduct) => product.product.id === productId
      );

      if (foundProduct) {
        foundProduct.qty += 1;
      }
    }),
  decQty: (productId) =>
    set((state) => {
      const foundIndex = state.products.findIndex(
        (product: cartProduct) => product.product.id === productId
      );

      if (foundIndex !== -1) {
        if (state.products[foundIndex].qty === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].qty -= 1;
        }
      }
    }),
  addProduct: (product) =>
    set((state) => {
      state.products.push({ product, qty: 1 });
    }),
  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product: cartProduct) => product.product.id !== productId
      );
    }),
  getProductById: (productId) =>
    get().products.find((product) => product.product.id === productId),
  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
  reset: () => set(() => ({ ...initialState })),
});
