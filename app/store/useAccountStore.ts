import { create } from 'zustand';
import { storage } from '@/app/_layout';

export interface SavedAccount {
  id: string;
  type: string;
  name: string;
  balance: string;
  notes: string;
  bankId?: string;
  bankDisplayName?: string;
  colors: [string, string];
  sliderPosition: [number, number];
  lastFourDigits: string;
  showLastFourDigits: boolean;
  currency: string;
  paymentNetwork?: "visa" | "mastercard";
}

interface AccountStore {
  savedAccounts: SavedAccount[];
  currentIndex: number;
  setSavedAccounts: (accounts: SavedAccount[]) => void;
  setCurrentIndex: (index: number) => void;
  initializeAccounts: () => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  savedAccounts: [],
  currentIndex: 0,
  setSavedAccounts: (accounts) => {
    set({ savedAccounts: accounts });
    storage.set("accounts", JSON.stringify(accounts));
  },
  setCurrentIndex: (index) => set({ currentIndex: index }),
  initializeAccounts: () => {
    const accounts = JSON.parse(storage.getString("accounts") || "[]");
    set({ savedAccounts: accounts });
  },
}));

export default useAccountStore; 