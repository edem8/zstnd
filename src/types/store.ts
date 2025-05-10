import type { cartSlice } from "@/store/cartSlice";
import type { userSlice } from "@/store/userSlice";

// Adding userSice to the store: userSlice = userSate + userActions
// We can add more slices using the & operator
// Adding slices to the store allows for access of the state and actions in various slices using store.item
export type Store = userSlice & cartSlice;
