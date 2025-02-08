import { create } from 'zustand';

type Screen = 'Home' | 'Analytics' | 'Wallet';

interface ScreenStore {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const useScreenStore = create<ScreenStore>((set) => ({
  activeScreen: 'Home',
  setActiveScreen: (screen) => set({ activeScreen: screen }),
}));

export default useScreenStore; 