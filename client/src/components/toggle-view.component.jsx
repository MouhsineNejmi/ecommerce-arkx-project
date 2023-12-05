/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { QueueListIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const ToggleView = ({ toggleView, setToggleView }) => {
  return (
    <ToggleGroup type='single' defaultValue={toggleView ? 'list' : 'grid'}>
      <ToggleGroupItem
        value='grid'
        aria-label='Toggle grid'
        onClick={() => setToggleView(false)}
      >
        <Squares2X2Icon className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem
        value='list'
        aria-label='Toggle list'
        onClick={() => setToggleView(true)}
      >
        <QueueListIcon className='h-4 w-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ToggleView;
