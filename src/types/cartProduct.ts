import type { Product } from "./products";

// the product doesnt need to know abou the qty but the cart does
export type cartProduct = {
  product: Product;
  qty: number;
};
