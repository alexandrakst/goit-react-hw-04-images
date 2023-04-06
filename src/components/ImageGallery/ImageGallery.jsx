import { useState, useEffect } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '33593271-922b400b6ee77099ecc074fd7';

export const ImageGallery = ({ searchInput }) => {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchInput) {
      return;
    }

    setLoading(true);

    fetch(
      `${BASE_URL}/?q=${searchInput}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(images => setImages(images.hits))

      .finally(() => setLoading(false));
  }, [searchInput]);

  const onLoadMore = loadMoreImages => {
    setImages(prevState => [...prevState, ...loadMoreImages]);
  };

  if (loading) {
    return <Loader />;
  } else
    return (
      <>
        <ul className={css.imageGallery}>
          {images &&
            images.map(image => (
              <ImageGalleryItem image={image} key={image.id} />
            ))}
        </ul>
        {images && <Button searchInput={searchInput} onLoadMore={onLoadMore} />}
      </>
    );
};

ImageGallery.propTypes = {
  searchInput: PropTypes.string,
};
