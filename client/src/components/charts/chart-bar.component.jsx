import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import CustomLegend from './custom-legend.component';
import CustomTooltip from './custom-tooltip.compont';
import numberFormatter from '../../helpers/numberFormatter';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const ChartBar = () => {
  return (
    <div className='h-[400px] bg-secondary p-4 pb-0 rounded-xl'>
      <div className='pb-6 flex items-center justify-between text-sm'>
        <h3 className='font-semibold'>Registered Customers Analytics</h3>
        <div className='flex items-center gap-5'>
          <CustomLegend className={'bg-main-1'} legend={'Customers'} />
        </div>
      </div>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey='name'
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={numberFormatter}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: 5 }}
          />
          <Bar dataKey='total' fill='#2965ff' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;
