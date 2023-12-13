/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Search } from 'lucide-react';

import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const FilterProduct = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    // Trigger the filter change with the updated category and search query
    onFilterChange({
      category: value,
      search: searchQuery,
      priceRange: selectedPriceRange,
    });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;

    setSearchQuery(value);
    onFilterChange({
      category: selectedCategory,
      search: value,
      priceRange: selectedPriceRange,
    });
  };

  const handlePriceRangeChange = (value) => {
    const [min, max] = value !== 'all' ? value.split('-').map(Number) : [];

    setSelectedPriceRange([min, max]);

    console.log([min, max]);

    onFilterChange({
      category: selectedCategory,
      search: searchQuery,
      priceRange: [min, max],
    });
  };

  return (
    <div className='flex gap-2'>
      <div className='search relative'>
        <Input
          className='w-[250px] pl-10 dark:border-white'
          type='text'
          placeholder='Search for products...'
          onChange={handleSearchChange}
        />
        <Search
          size={16}
          color='currentColor'
          className='absolute top-1/2 left-3 transform -rotate-12 -translate-y-1/2'
        />
      </div>

      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className='w-[150px] dark:border-white'>
          <SelectValue placeholder='All Products' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>All Products</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handlePriceRangeChange}>
        <SelectTrigger className='w-[150px] dark:border-white'>
          <SelectValue placeholder='Filter Prices' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>All Prices</SelectItem>
            <SelectItem value='0-99'>$0 - $99</SelectItem>
            <SelectItem value='100-399'>$100 - $399</SelectItem>
            <SelectItem value='400-999'>$400 - $999</SelectItem>
            <SelectItem value='1000-9999'>$1000+</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterProduct;
