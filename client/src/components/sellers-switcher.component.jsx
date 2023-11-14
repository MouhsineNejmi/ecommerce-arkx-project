import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const sellers = [
  {
    label: 'Mohammed Chale7',
    value: 'chli7a',
  },
  {
    label: 'Mol lmakhbaza',
    value: 'khbiza',
  },
  {
    label: 'Mol thon',
    value: 'thona',
  },
  {
    label: 'Mol rwaye7',
    value: 'rwi7a',
  },
];

const SellersSwitcher = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedSeller, setSelectedSeller] = React.useState(sellers[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a seller'
          className='justify-between mb-4 p-2 hover:bg-main-1'
        >
          <Avatar className='mr-3 h-5 w-5'>
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedSeller.value}.png`}
              alt={selectedSeller.label}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <h3 className='text-xs font-semibold mr-2'>{selectedSeller.label}</h3>
          <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput
              placeholder='Search seller...'
              className='py-2 h-[35px] text-xs'
            />
            <CommandEmpty>No seller found.</CommandEmpty>
            {sellers.map((seller) => (
              <CommandGroup key={seller.label}>
                <CommandItem
                  key={seller.value}
                  onSelect={() => {
                    setSelectedSeller(seller);
                    setOpen(false);
                  }}
                  className='text-xs cursor-pointer'
                >
                  <Avatar className='mr-2 h-5 w-5'>
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${seller.value}.png`}
                      alt={seller.label}
                      className='grayscale'
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {seller.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedSeller.value === seller.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SellersSwitcher;
