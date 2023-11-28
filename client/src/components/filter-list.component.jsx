import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen'];
const prices_range = [
  'All Prices',
  '$0-99$',
  '$100-$399',
  '$400-699',
  '$700-$1000',
];

const FilterList = () => {
  return (
    <div className='flex gap-8'>
      <div className='flex flex-col gap-2'>
        <label className='text-zinc-500'>Categories:</label>

        <Select className='h-full flex flex-col gap-2 max-w-xs overflow-y-auto'>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder={categories[0]} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem
                key={index}
                className='text-md cursor-pointer font-poppins dark:text-white hover:text-black hover:font-semibold hover:bg-gray-100 rounded-lg focus:border-[2px] focus:ring focus:ring-violet-300 hover:underline decoration-black'
                value={category}
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-zinc-500'>Prices:</label>

        <Select className='h-full flex flex-col gap-2 max-w-xs overflow-y-auto'>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder={prices_range[0]} />
          </SelectTrigger>
          <SelectContent>
            {prices_range.map((range, index) => (
              <SelectItem
                key={index}
                className='text-md cursor-pointer font-poppins dark:text-white hover:text-black hover:font-semibold hover:bg-gray-100 rounded-lg focus:border-[2px] focus:ring focus:ring-violet-300 hover:underline decoration-black'
                value={range}
              >
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterList;
