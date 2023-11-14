import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';

import SearchProduct from '../components/search-product.component';
import SelectProduct from '../components/select-product.component';
import ProductCard from '../components/product-card';

const AdminProducts = () => {
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className='p-4'>
            <div className='header'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <SearchProduct />
                        <SelectProduct />
                    </div>

                    {/* Add Product Button */}
                    <div className='flex items-center'>
                        <Button
                            disabled={isLoading}
                            className='flex items-center gap-1 pr-5 bg-main-1 text-white hover:bg-main-2'
                        >
                            {isLoading && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            <Plus size={18} />
                            <span className='capitalize'>Add New</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className='pt-6 grid grid-rows-1 grid-flow-row grid-cols-4'>
                <div className='cursor-pointer group p-4 rounded-md border border-slate-300 dark:border-slate-700'>
                    <ProductCard />
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
