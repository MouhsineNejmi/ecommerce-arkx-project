import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';

const SearchProduct = () => {
    return (
        <div className='search relative'>
            <Input
                className='w-[250px] pl-10 dark:border-white'
                type='text'
                placeholder='Search'
            />
            <Search
                size={16}
                color='currentColor'
                className='absolute top-1/2 left-3 transform -rotate-12 -translate-y-1/2'
            />
        </div>
    );
};

export default SearchProduct;
