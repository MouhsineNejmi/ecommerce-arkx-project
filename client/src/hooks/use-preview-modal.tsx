import { create } from "zustand";
import { Product, ProductVariant } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Product;
  productVariants?: ProductVariant[];
  // eslint-disable-next-line no-unused-vars
  onOpen: (data: Product, productVariants?: ProductVariant[]) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  productVariants: undefined,
  onOpen: (data, productVariants) =>
    set({ data, productVariants, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
