import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '33593271-922b400b6ee77099ecc074fd7';

export default class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchInput !== this.props.searchInput) {
      this.setState({ loading: true });

      fetch(
        `${BASE_URL}/?q=${this.props.searchInput}&page=${
          this.state.page + 1
        }&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(images =>
          this.setState({ images: images.hits, totalHits: images.totalHits })
        )
        .finally(() => this.setState({ loading: false }));
    }
  }

  onLoadMore = loadMoreImages => {
    this.setState((prevState, props) => ({
      images: [...prevState.images, ...loadMoreImages],
    }));
  };

  render() {
    const { images } = this.state;

    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <>
        <ul className={css.imageGallery}>
          {images &&
            images.map(image => (
              <ImageGalleryItem image={image} key={image.id} />
            ))}
        </ul>
        {images && (
          <Button
            total={this.state.totalHits}
            searchInput={this.props.searchInput}
            onLoadMore={this.onLoadMore}
          />
        )}
      </>
    );
  }
}
ImageGallery.propTypes = {
  searchInput: PropTypes.string,
};
