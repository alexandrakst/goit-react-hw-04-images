import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchInput, setsearchInput] = useState(null);

  const handleFormSubmit = searchInput => {
    setsearchInput(searchInput);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchInput={searchInput} />
    </div>
  );
};
