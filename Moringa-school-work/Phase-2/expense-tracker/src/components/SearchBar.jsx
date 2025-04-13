import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search expenses..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
