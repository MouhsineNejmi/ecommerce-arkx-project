import { ColumnDef } from '@tanstack/react-table';

import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { CheckCircle2, XCircle } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

export type Product = {
  product_image: string;
  product_name: string;
  active: boolean;
  ordered: number;
  stock: number;
  price: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'product_image',
    header: () => <div className='text-sm'>Product Image</div>,
    cell: ({ row }) => {
      const product_image = row.getValue('product_image');
      const product_name = row.getValue('product_name');
      return (
        <img
          className='w-10 h-10'
          src={product_image as string}
          alt={product_name as string}
        />
      );
    },
  },
  {
    accessorKey: 'product_name',
    header: () => <div className='text-sm'>Product Name</div>,
  },
  {
    accessorKey: 'status',
    header: () => <div className='text-sm'>Status</div>,
    cell: ({ row }) => {
      const isActive = row.getValue('status');
      const title = isActive ? 'active' : 'inactive';

      return <span>{title}</span>;
    },
  },
  {
    accessorKey: 'stock',
    header: () => <div className='text-sm'>Stock</div>,
  },
  {
    accessorKey: 'ordered',
    header: () => <div className='text-sm'>Ordered</div>,
  },
  {
    accessorKey: 'price',
    header: () => <div className='text-sm'>Price</div>,
  },
];
