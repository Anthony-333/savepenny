import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface StoreState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
    }),
    {
      name: 'app-theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isDarkMode: state.isDarkMode })
    }
  )
);
