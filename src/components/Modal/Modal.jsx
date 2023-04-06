import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';
//import { createPortal } from 'react-dom';

//const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  const handleEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  handleEsc: PropTypes.func,
  handleBackdropClick: PropTypes.func,
  onClick: PropTypes.func,
};
