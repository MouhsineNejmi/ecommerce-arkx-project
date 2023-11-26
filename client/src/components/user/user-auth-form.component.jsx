/* eslint-disable react/prop-types */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { useLoginUserMutation } from '../../app/api/auth.api';

import { LoginValidation } from '../../lib/validation';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const UserAuthForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'User Logged In Successfully!',
      });
      navigate('/admin/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  React.useEffect(() => {
    if (form.isSubmitSuccessful) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.isSubmitSuccessful]);

  const onSubmit = async (values) => {
    loginUser({ ...values, account_type: 'user' });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          {(isError || error) && (
            <h2 className='text-center text-red-500'>{error?.data.message}</h2>
          )}
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className='dark:border-white'
                      placeholder='Enter your username'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className='bg-gold hover:bg-light-gold'>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserAuthForm;
