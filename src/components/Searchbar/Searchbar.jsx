import { useState } from 'react';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleInputChange = event =>
    setValue(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      Notify.info('Please enter a search query');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className="button-label"></span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={value}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
