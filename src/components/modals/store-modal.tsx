import Modal from "./modal";

import { useStoreModal } from "@/hooks/use-store-modal";

const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      actionLabel="Create Store"
      onSubmit={() => {}}
    />
  );
};

export default StoreModal;
