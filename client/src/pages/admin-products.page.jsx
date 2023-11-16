import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';

import SearchProduct from '../components/search-product.component';
import SelectProduct from '../components/select-product.component';
import ProductCard from '../components/product-card.component';

import { useGetAllProductsQuery } from '../app/api/products.api';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
    const {
        data: products,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetAllProductsQuery();

    const loading = isLoading || isFetching;

    if (loading) {
        return <Loader2 />;
    }

    if (isError) {
        console.error(error);
    }

    return (
        <div className='p-4'>
            <div className='header'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <SearchProduct />
                        <SelectProduct />
                    </div>

                    {/* Add Product Button */}
                    <Link to='/admin/product/add' className='flex items-center'>
                        <Button
                            disabled={isLoading}
                            className='flex items-center gap-1 pr-5 bg-main-1 text-white hover:bg-main-2'
                        >
                            {loading && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            <Plus size={18} />
                            <span className='capitalize'>Add New</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className='pt-6 grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <div className='cursor-pointer group p-4 rounded-md border border-slate-300 dark:border-slate-700'>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
