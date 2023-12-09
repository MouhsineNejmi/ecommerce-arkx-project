/* eslint-disable react/prop-types */
import { Controller } from 'react-hook-form';
import { cn } from '../lib/utils';

const FormInput = ({
  customLabel,
  name,
  control,
  className,
  handleChange,
  ...props
}) => {
  return (
    <div className={cn('relative flex flex-col', className)}>
      {customLabel ? (
        <label className='mb-2 z-0 font-small'>{customLabel}</label>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            className='border rounded-md p-2 px-4 mb-8'
            onChange={handleChange}
            {...field}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default FormInput;
