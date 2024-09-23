import React from 'react';
import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handelInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div>
      <label>
        <input
          type="text"
          value={query}
          onChange={handelInputChange}
          placeholder="Search here..."
        />
      </label>
    </div>
  );
};

export default Search;
