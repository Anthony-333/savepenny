import { create } from 'zustand';
import React, { PropsWithChildren } from 'react';

interface StoreState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default function StoreProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
} 