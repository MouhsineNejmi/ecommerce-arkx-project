import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type CardItemProps = {
  name: string;
  icon: React.ReactElement;
  amount: string;
  growth: string;
};

const CardItem = ({
  name,
  icon,
  amount,
  growth,
}: CardItemProps): React.ReactElement => {
  return (
    <Card className='shadow-sm border-slate-300'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pt-4 pb-2'>
        <CardTitle className='text-[11px] font-medium'>{name}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className='pb-4'>
        <div className='text-xl font-bold'>{amount}</div>
        <p className='text-xs text-green-400'>{growth}</p>
      </CardContent>
    </Card>
  );
};

export default CardItem;
