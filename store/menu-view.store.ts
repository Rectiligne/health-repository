import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MenuViewStore {
  small: boolean;
  updateView: (newView: boolean) => void;
}

export const useMenuViewStore = create<MenuViewStore>()(
  persist(
    (set) => ({
      small: false,
      updateView: (newView) => set({ small: newView }),
    }),
    {
      name: "menu-view-storage",
    }
  )
);
