import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImg}
        src={image.webformatURL}
        alt={image.tags}
        onClick={openModal}
      />
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={image.largeImageURL} alt={image.tags} width="900px" />
        </Modal>
      )}
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
