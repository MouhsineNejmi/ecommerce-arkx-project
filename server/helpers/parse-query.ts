import { Prisma } from '@prisma/client';

export const parseProductQueryParams = (query: {
  [key: string]: any;
}): Prisma.ProductWhereInput => {
  const parsedQuery: Prisma.ProductWhereInput = {};

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
