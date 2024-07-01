import { ProductFilters } from '../src/dto/products.dto';

export const parseProductQueryParams = (query: {
  [key: string]: any;
}): ProductFilters => {
  const parsedQuery: ProductFilters = {};

  Object.entries(query).forEach(([key, value]) => {
    if (value === 'true') {
      parsedQuery[key] = true;
    } else if (value === 'false') {
      parsedQuery[key] = false;
    } else {
      parsedQuery[key] = value;
    }
  });

  return parsedQuery;
};
