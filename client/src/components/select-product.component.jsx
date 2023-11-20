import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SelectProduct = () => {
    return (
        <div>
            <Select>
                <SelectTrigger className='w-[150px] dark:border-white'>
                    <SelectValue placeholder='All Products' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='apple'>All Products</SelectItem>
                        <SelectItem value='banana'>Banana</SelectItem>
                        <SelectItem value='blueberry'>Blueberry</SelectItem>
                        <SelectItem value='grapes'>Grapes</SelectItem>
                        <SelectItem value='pineapple'>Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectProduct;
