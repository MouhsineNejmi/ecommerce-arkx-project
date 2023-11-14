import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const ProductCard = () => {
    return (
        <Link to='/admin/product/:id'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='font-bold text-xl'>Brown Hoddie</h2>
                    <span className='capitalize text-slate-400'>
                        Classic Nylon
                    </span>
                </div>
                <div className='py-2 px-4 rounded-full border border-slate-300 dark:border-slate-700 transition-all group-hover:bg-main-1'>
                    <p className='capitalize text-slate-700 dark:text-slate-400 group-hover:text-white '>
                        New
                    </p>
                </div>
            </div>

            {/* Product Image */}
            <div className='group py-2 transition-all group-hover:py-4 overflow-hidden rounded-md'>
                <img
                    src='https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Product 1'
                    className={cn(
                        'h-72 w-full object-cover transition-all group-hover:scale-105 aspect-[3/4]'
                    )}
                />
            </div>

            <div className='flex items-center justify-between'>
                <div className='space-y-1 text-sm'>
                    <p className='text-xs text-muted-foreground'>Unknown</p>
                    <h3 className='font-semibold leading-none'>Tshirt</h3>
                </div>
                <div className='space-y-1 text-sm'>
                    <p className='text-xs text-muted-foreground'>$80</p>
                    <h3 className='font-semibold leading-none'>$210</h3>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
