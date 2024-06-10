import { useEffect, useState } from "react";

import PreviewModal from "@/components/modals/preview-modal";
import StoreModal from "@/components/modals/store-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
      <PreviewModal />
    </>
  );
};

export default ModalProvider;
