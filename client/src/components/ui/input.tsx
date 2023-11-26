import * as React from 'react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] =
      React.useState<boolean>(false);

    const togglePassword = () => setPasswordVisible(!passwordVisible);

    if (type === 'password') {
      return (
        <div className='relative'>
          <input
            type={passwordVisible ? 'text' : 'password'}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            {...props}
          />
          <div
            className='absolute right-4 top-1/2 -translate-y-1/2'
            onClick={togglePassword}
          >
            {passwordVisible ? (
              <EyeIcon className='w-5 h-5' />
            ) : (
              <EyeSlashIcon className='w-5 h-5' />
            )}
          </div>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
