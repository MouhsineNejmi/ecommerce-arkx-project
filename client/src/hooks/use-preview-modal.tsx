import { create } from "zustand";
import { Product } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Product;
  // eslint-disable-next-line no-unused-vars
  onOpen: (data: Product) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Product) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
