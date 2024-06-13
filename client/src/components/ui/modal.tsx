import React, { useCallback, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogContent className="outline-none">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-2">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <hr />
        </DialogHeader>

        <div className="relative flex-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
