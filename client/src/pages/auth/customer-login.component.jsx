import * as React from 'react';
import { Loader2 } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../app/api/auth.api';
import { useToast } from '../../components/ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';

import { LoginValidation } from '../../lib/validation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const CustomerLogin = () => {
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
        title: 'You Logged In Successfully!',
      });
      navigate('/');
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
    await loginUser({ ...values, account_type: 'customer' });
  };

  return (
    <div className='grid gap-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            {(isError || error) && (
              <h2 className='text-center text-red-500'>
                {error?.error || error?.data.message}
              </h2>
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
            <Button
              disabled={isLoading}
              className='bg-gold hover:bg-light-gold'
            >
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerLogin;
