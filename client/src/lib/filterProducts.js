const filterProducts = (
  products,
  selectedCategory,
  searchQuery,
  priceRange
) => {
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPriceRange =
      priceRange[0] !== undefined
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : true;

    return matchesCategory && matchesSearch && matchesPriceRange;
  });
};

export default filterProducts;
