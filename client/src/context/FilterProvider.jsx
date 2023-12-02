/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => [],
  sort: '',
  setSort: () => '',
};

const FilterContext = createContext(INITIAL_FILTER_DATA);

export const FilterProvider = ({ children }) => {
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [sort, setSort] = useState('asc');

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        sort,
        setSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
