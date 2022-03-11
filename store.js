import create from "zustand";

export const useStore = create(() => ({
  hover: null,
  hoverCategory: null,
  selectedCategory: null,
  hoverTime: null,
  expanded: true,
  gasMaximum: 0,
  energyMaximum: 0,
  energyPriceMaximum: 0,
}));
