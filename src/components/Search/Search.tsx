import React, { ChangeEventHandler, FormEventHandler } from 'react';
import SearchProps from './SearchProps';
import './Search.sass';

const Search = ({ search, onSearch }: SearchProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onSearch(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input
        className='search__input ff-monste text-lg'
        type='text'
        value={search}
        placeholder='Search a drink'
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
