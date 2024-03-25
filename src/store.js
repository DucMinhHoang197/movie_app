import create from "zustand";

const useStore = create((set) => ({
  url: "",
  urlMovie: (url) => set({ url }),
}));

export default useStore;
