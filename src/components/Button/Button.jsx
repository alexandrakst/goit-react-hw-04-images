import { useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '33593271-922b400b6ee77099ecc074fd7';

export const Button = ({ searchInput, onLoadMore, total }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [searchInput]);

  const loadMore = () => {
    setLoading(true);

    fetch(
      `${BASE_URL}/?q=${searchInput}&page=${
        page + 1
      }&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(images => {
        onLoadMore(images.hits);
      })
      .finally(() => setLoading(false));

    setPage(prevState => prevState + 1);
  };

  if (loading) {
    return <Loader />;
  } else if (page * 12 >= total) {
    return null;
  } else
    return (
      <button className={css.button} onClick={loadMore}>
        Load more
      </button>
    );
};

Button.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
