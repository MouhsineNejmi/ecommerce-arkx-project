/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const CustomTooltip = ({ active, payload, label }) => {
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
