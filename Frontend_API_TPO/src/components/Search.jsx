import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Search = ({ onSearch, onSearchClick }) => {
  return (
    <InputGroup className="mb-3" style={{ maxWidth: '300px'}}>
      <FormControl
        placeholder="Buscar producto"
        aria-label="Buscar producto"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Button variant="outline-secondary" onClick={onSearchClick}>
        <FaSearch />
      </Button>
    </InputGroup>
  );
};

export default Search;
