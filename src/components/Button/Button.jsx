import { Component } from 'react';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '33593271-922b400b6ee77099ecc074fd7';

export class Button extends Component {
  state = {
    page: 1,
    loading: false,
  };

  componentDidUpdate(prevProps, _) {
    if (prevProps.searchInput !== this.props.searchInput) {
      this.setState({ page: 1 });
    }
  }

  onLoadMore = () => {
    this.setState({ loading: true });

    fetch(
      `${BASE_URL}/?q=${this.props.searchInput}&page=${
        this.state.page + 1
      }&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(images => {
        this.props.onLoadMore(images.hits);
      })
      .finally(() => this.setState({ loading: false }));

    this.setState((prevState, props) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else if (this.state.page * 12 >= this.props.total) {
      return null;
    } else
      return (
        <button className={css.button} onClick={this.onLoadMore}>
          Load more
        </button>
      );
  }
}
Button.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
