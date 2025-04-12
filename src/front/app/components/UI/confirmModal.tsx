import React, { useEffect, useRef } from "react";
import "~/css/styles/confirmModal.css";

interface ConfirmModalProps {
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-box">
        <div className="confirm-modal-icon">⚠️</div>
        <p className="confirm-modal-message">{message}</p>
        <div className="confirm-modal-buttons">
          <button onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button
            ref={confirmButtonRef}
            onClick={onConfirm}
            className="confirm-button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;