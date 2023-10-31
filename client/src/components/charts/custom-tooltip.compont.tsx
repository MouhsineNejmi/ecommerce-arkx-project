const CustomTooltip = ({ active, payload, label }: any) => {
  const sales = payload[0]?.payload?.sales;

  if (active && payload && payload.length) {
    return (
      <div className='bg-main-1 text-xs text-white p-1 rounded-sm'>
        <p>{`$ ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
