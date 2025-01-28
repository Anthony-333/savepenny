import { create } from "zustand";
import { router } from "expo-router";

interface FormData {
  name: string;
  balance: string;
  notes: string;
  bankId?: string;
  bankDisplayName?: string;
  paymentNetwork?: "visa" | "mastercard";
  colors: [string, string];
  sliderPosition: [number, number];
  isNetworkDropdownOpen: boolean;
  activeColorIndex: number;
}

interface FormStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  setBank: (bankId: string, bankDisplayName: string) => void;
  setPaymentNetwork: (network: "visa" | "mastercard") => void;
  setColors: (colors: [string, string]) => void;
  setActiveColorIndex: (index: number) => void;
  setSliderPosition: (position: [number, number]) => void;
  toggleNetworkDropdown: () => void;
  submitForm: (type: string, category: string) => void;
}

const initialState: FormData = {
  name: "",
  balance: "",
  notes: "",
  bankId: undefined,
  bankDisplayName: undefined,
  paymentNetwork: undefined,
  colors: ["#FF0000", "#4B0082"],
  sliderPosition: [0, 100],
  isNetworkDropdownOpen: false,
  activeColorIndex: 0,
};

export const useFormStore = create<FormStore>((set, get) => ({
  formData: initialState,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ formData: initialState }),
  setBank: (bankId, bankDisplayName) =>
    set((state) => ({
      formData: {
        ...state.formData,
        bankId,
        bankDisplayName,
      },
    })),
  setPaymentNetwork: (network) =>
    set((state) => ({
      formData: {
        ...state.formData,
        paymentNetwork: network,
        isNetworkDropdownOpen: false,
      },
    })),
  setColors: (colors) =>
    set((state) => ({
      formData: {
        ...state.formData,
        colors,
      },
    })),
  setActiveColorIndex: (index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        activeColorIndex: index,
      },
    })),
  setSliderPosition: (position) =>
    set((state) => ({
      formData: {
        ...state.formData,
        sliderPosition: position,
      },
    })),
  toggleNetworkDropdown: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        isNetworkDropdownOpen: !state.formData.isNetworkDropdownOpen,
      },
    })),
  submitForm: (type, category) => {
    const { formData, resetForm } = get();
    console.log("Form submitted:", formData);
    resetForm();
    router.push("/(dashboard)");
  },
}));
