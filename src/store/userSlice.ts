// creating slices for different parts of the application is more efficient and maintanable

import type { StateCreator } from "zustand";

type userState = {
  userName: string;
  fullname: string;
  address: string;
  age: number;
};

type userAction = {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>; // simulate fetching user from serve (asynchronous) action
};

export type userSlice = userState & userAction;

export const createUserSlice: StateCreator<
  userSlice,
  [["zustand/immer", never]],
  [],
  userSlice
> = (set) => ({
  address: "",
  age: 0,
  fullname: "",
  userName: "",
  //   setAddress: (address: string) =>
  //     set((state) => ({ ...state, address: address })),

  //updating state in a immutable way or ({...state, address)})
  // Aslo set actually measures state and so we can simply do
  // set(() => ({address }))
  //Generally we can over the immutability of the state problem by using the immer midleware provided by zstand

  //   Because we're wrapping the store with immer, we can use the mutable way of updating the state
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
  fetchUser: async () => {
    // simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => {
      state.userName = "kwakuedem80@gmail.com";
      state.fullname = "Edem Kwaku";
      state.age = 25;
      state.address = "Accra, Ghana";
    });
  },
});
