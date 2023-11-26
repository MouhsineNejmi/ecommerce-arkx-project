/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import ProfileUploader from './profile-uploader.component';

import {
  UserProfileValidation,
  UserValidation,
  CustomerProfileValidation,
  CustomerValidation,
} from '../../lib/validation';
import {
  useCreateCustomerMutation,
  useCreateUserMutation,
} from '../../app/api/auth.api';
import { useUpdateUserMutation } from '../../app/api/users.api';
import { useUpdateCustomerMutation } from '../../app/api/customers.api';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useToast } from '../ui/use-toast';

const UserForm = ({ user, action = 'Create', account_type = 'User' }) => {
  const { toast } = useToast();

  let zodValidation = null;

  if (account_type === 'User') {
    zodValidation =
      action === 'Update' ? UserProfileValidation : UserValidation;
  } else if (account_type === 'Customer') {
    zodValidation =
      action === 'Update' ? CustomerProfileValidation : CustomerValidation;
  }

  const form = useForm({
    resolver: zodResolver(zodValidation),
    defaultValues: {
      first_name: user ? user.first_name : '',
      last_name: user ? user.last_name : '',
      username: user ? user.username : '',
      role: user ? user.role : '',
      email: user ? user.email : '',
      password: '',
    },
  });

  const [
    createUser,
    { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate },
  ] = useCreateUserMutation();
  const [
    updateUser,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateUserMutation();

  const [
    createCustomer,
    {
      isLoading: isLoadingCreateCustomer,
      isError: isErrorCreateCustomer,
      error: errorCreateCustomer,
    },
  ] = useCreateCustomerMutation();
  const [
    updateCustomer,
    {
      isLoading: isLoadingCustomerUpdate,
      isError: isErrorCustomerUpdate,
      error: errorCustomerUpdate,
    },
  ] = useUpdateCustomerMutation();

  const isLoading =
    isLoadingCreate ||
    isLoadingUpdate ||
    isLoadingCreateCustomer ||
    isLoadingCustomerUpdate;

  useEffect(() => {
    if (isErrorCreate) {
      toast({
        title: errorCreate?.data.message,
        variant: 'destructive',
      });
    }

    if (isErrorUpdate) {
      toast({
        title: errorUpdate?.data.message,
        variant: 'destructive',
      });
    }

    if (isErrorCreateCustomer) {
      toast({
        title: errorCreateCustomer?.data.message,
        variant: 'destructive',
      });
    }

    if (isErrorCustomerUpdate) {
      toast({
        title: errorCustomerUpdate?.data.message,
        variant: 'destructive',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSubmit = async (value) => {
    // ACTION = UPDATE
    if (user && action === 'Update') {
      if (account_type === 'User') {
        const updatedUser = await updateUser({
          userId: user._id,
          updatedUser: value,
        });

        if (updatedUser.data) {
          toast({
            title: `${action} user success`,
          });
        }
      } else if (account_type === 'Customer') {
        const updatedCustomer = await updateCustomer({
          customerId: user._id,
          updatedCustomer: value,
        });

        if (updatedCustomer.data) {
          toast({
            title: `${action} customer success`,
          });
        }
      }
    }

    // ACTION = CREATE
    if (action === 'Create') {
      if (account_type === 'User') {
        const newUser = await createUser({
          ...value,
          account_type: 'user',
        });

        if (!newUser || newUser.error) {
          toast({
            title: `${action} user failed. Please try again.`,
          });
        }

        if (newUser.data) {
          toast({
            title: `${action} user success!`,
          });
          form.reset();
        }
      } else if (account_type === 'Customer') {
        const newCustomer = await createCustomer({
          ...value,
          account_type: 'customer',
        });

        if (!newCustomer || newCustomer.error) {
          toast({
            title: `${action} user failed. Please try again.`,
            variant: 'destructive',
          });
        }

        if (newCustomer.data) {
          toast({
            title: `${action} customer success!`,
          });
          form.reset();
        }
      }
    }
  };

  return (
    <div className='w-full flex justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex flex-col gap-8 w-full max-w-5xl'
        >
          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <ProfileUploader
                    fieldChange={field.onChange}
                    mediaUrl={user?.profile_image}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='First Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Last Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            disabled={action === 'edit' ? true : false}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {action === 'Create' && (
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {account_type === 'User' && (
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className='w-[180px] text-sm'>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='admin'>Admin</SelectItem>
                          <SelectItem value='manager'>Manager</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <div className='flex items-center justify-end'>
            <Button
              type='submit'
              className='whitespace-nowrap bg-gold hover:bg-light-gold'
              disabled={isLoading}
            >
              {isLoading && <Loader2 className='animate-spin' />}
              {action} {account_type}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
