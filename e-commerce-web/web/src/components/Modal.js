import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* <button className="modal-close-button" onClick={onClose}>
          Close
        </button> */}
        {children}
      </div>
    </div>
  );
}

export default Modal;