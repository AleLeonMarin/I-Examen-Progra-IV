import React from "react";
import "~/css/styles/modal.css";

interface ModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon">ℹ️</div>
        <p className="modal-message">{message}</p>
        <button onClick={onClose} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;