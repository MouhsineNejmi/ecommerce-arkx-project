import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PaymentValidation } from '../../lib/validation/payment';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';

const CheckoutDetails = () => {
  const form = useForm({
    resolver: zodResolver(PaymentValidation),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '06-xxxxxxxx',
      email: '',
    },
  });

  return (
    <div className='w-2/3'>
      <Form {...form}>
        {/* Contact Information */}
        <div className='border border-zinc-300 p-6 py-8 mb-8'>
          <h3 className='font-semibold mb-4'>Contact Information</h3>
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='first_name'
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className='dark:border-white'
                      placeholder='First name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='last_name'
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className='dark:border-white'
                      placeholder='Last name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    className='dark:border-white'
                    placeholder='Phone number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    className='dark:border-white'
                    placeholder='Your Email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='border border-zinc-300 p-6 py-8 mb-8'>
          <h3 className='font-semibold mb-4'>Shipping Address</h3>
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='first_name'
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className='dark:border-white'
                      placeholder='First name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='last_name'
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className='dark:border-white'
                      placeholder='Last name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    className='dark:border-white'
                    placeholder='Phone number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    className='dark:border-white'
                    placeholder='Your Email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
};

export default CheckoutDetails;
