import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { QueueListIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const TriggerView = () => {
  const [selectedView, setSelectedView] = useState('grid');
  const handleSelectedView = () =>
    setSelectedView((prev) => (prev === 'grid' ? 'list' : 'grid'));

  return (
    <ToggleGroup
      type='single'
      defaultValue={selectedView}
      onChange={handleSelectedView}
    >
      <ToggleGroupItem value='list' aria-label='Toggle list'>
        <QueueListIcon className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='grid' aria-label='Toggle grid'>
        <Squares2X2Icon className='h-4 w-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default TriggerView;
