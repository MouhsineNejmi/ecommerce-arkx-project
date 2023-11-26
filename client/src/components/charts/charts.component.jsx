import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import chartsData from '../../data/charts.data';
import numberFormatter from '../../helpers/numberFormatter';
import CustomTooltip from './custom-tooltip.compont';
import CustomLegend from './custom-legend.component';
import CalendarDateRangePicker from '../date-range-picker.component';

const Charts = () => {
  return (
    <div className='h-[400px] bg-secondary p-4 pb-0 rounded-xl'>
      <div className='pb-6 flex items-center justify-between text-sm'>
        <h3 className='font-semibold'>Earning Analytics</h3>
        <div className='flex items-center gap-5'>
          <CustomLegend className={'bg-gold'} legend={'Earning'} />
          <CalendarDateRangePicker />
        </div>
      </div>

      <ResponsiveContainer width='100%' height='85%'>
        <AreaChart data={chartsData}>
          <defs>
            <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#E5B906' stopOpacity={0.2}></stop>
              <stop offset='100%' stopColor='#E5B906' stopOpacity={0}></stop>
            </linearGradient>
          </defs>

          <XAxis dataKey='name' axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={numberFormatter}
            axisLine={false}
            tickLine={false}
          />
          <CartesianGrid vertical={false} height={1} opacity={0.05} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: 5 }}
          />
          <Area
            type='monotone'
            dataKey='sales'
            stroke='#E5B906'
            fill='url(#color)'
            style={{
              filter: `drop-shadow(0px 0px 4px #E5B906)`,
            }}
            activeDot={{ r: 6 }}
            className='shadow-lg text-black'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
