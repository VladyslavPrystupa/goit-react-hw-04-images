import { useState } from 'react';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';

import {
  Form,
  SearchFormButton,
  SearchFormInput,
  Header,
} from './Searchbar.styled';

export const Searchbar = ({ onSearch }) => {
  const [searcValue, setSearcValue] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;
    setSearcValue(value);
  };

  const reset = () => {
    setSearcValue('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searcValue.trim() === '') {
      return toast.error('enter value!', { autoClose: 2000 });
    }

    onSearch(searcValue);

    reset();
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size="2em" />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searcValue"
          value={searcValue}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};
