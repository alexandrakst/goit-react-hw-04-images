import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = e => {
    this.setState({ showModal: false });
  };

  render() {
    const { image } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImg}
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.openModal}
        />
        {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <img src={image.largeImageURL} alt={image.tags} width="900px" />
          </Modal>
        )}
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
