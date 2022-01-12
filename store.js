import create from "zustand";

export const useStore = create(() => ({
  hover: null,
  hoverCategory: null,
  hoverTime: null,
  expanded: true,
}));
