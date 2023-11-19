// /* eslint-disable react/prop-types */
// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Loader2 } from 'lucide-react';

// import ProfileUploader from '../shared/profile-uploader.component';

// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';
// import { useToast } from '../ui/use-toast';

// import { CustomerValidation } from '../../lib/validation';
// import { useCreateUserMutation } from '../../app/api/auth.api';
// import { useUpdateCustomerMutation } from '../../app/api/users.api';

// const UserForm = ({ customer, action = 'Create' }) => {
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const form = useForm({
//     resolver: zodResolver(CustomerValidation),
//     defaultValues: {
//       first_name: customer ? customer.first_name : '',
//       last_name: customer ? customer.last_name : '',
//       username: customer ? customer.customername : '',
//       email: customer ? customer.email : '',
//       password: '',
//     },
//   });

//   // const [
//   //   createUser,
//   //   { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate },
//   // ] = useCreateUserMutation();
//   // const [
//   //   updateCustomer,
//   //   { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
//   // ] = useUpdateCustomerMutation();

//   useEffect(() => {
//     if (isErrorCreate || isErrorUpdate) {
//       if (Array.isArray(errorCreate).data.error) {
//         errorCreate.data.error.forEach((el) =>
//           toast({ title: el.message, variant: 'destructive' })
//         );
//       } else {
//         toast.error({
//           title: errorCreate.data.message,
//           variant: 'destructive',
//         });
//       }

//       if (Array.isArray(errorUpdate).data.error) {
//         errorUpdate.data.error.forEach((el) =>
//           toast({ title: el.message, variant: 'destructive' })
//         );
//       } else {
//         toast({ title: errorUpdate.data.message, variant: 'destructive' });
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoadingCreate, isLoadingUpdate]);

//   const handleSubmit = async (value) => {
//     // ACTION = UPDATE
//     if (user && action === 'Update') {
//       const updatedUser = await updateUser({
//         userId: user._id,
//         updatedUser: value,
//       });

//       if (updatedUser.data) {
//         toast({
//           title: `${action} user success`,
//         });
//         navigate('/admin/users');
//       }
//     }

//     // ACTION = CREATE
//     if (action === 'Create') {
//       const newUser = await createUser({
//         ...value,
//         account_type: 'user',
//       });

//       if (!newUser || newUser.error) {
//         toast({
//           title: `${action} user failed. Please try again.`,
//         });
//         navigate('/admin/users');
//       }

//       if (newUser.data) {
//         toast({
//           title: `${action} user success!`,
//         });
//         form.reset();
//         navigate('/admin/users');
//       }
//     }
//   };

//   return (
//     <div>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleSubmit)}
//           className='flex flex-col gap-8 w-full  max-w-5xl'
//         >
//           <FormField
//             control={form.control}
//             name='file'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Profile Image</FormLabel>
//                 <FormControl>
//                   <ProfileUploader
//                     fieldChange={field.onChange}
//                     mediaUrl={user?.profile_image}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='first_name'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder='First Name' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='last_name'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Last Name' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='username'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Username' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='email'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Email' type='email' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {action === 'Create' && (
//             <FormField
//               control={form.control}
//               name='password'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input placeholder='Password' type='password' {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           )}

//           <FormField
//             control={form.control}
//             name='role'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>User Role</FormLabel>
//                 <FormControl>
//                   <Select
//                     defaultValue={field.value}
//                     onValueChange={field.onChange}
//                   >
//                     <SelectTrigger className='w-[180px] text-sm'>
//                       <SelectValue placeholder='Select a role' />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>User Role</SelectLabel>
//                         <SelectItem value='admin'>Admin</SelectItem>
//                         <SelectItem value='manager'>Manager</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <div className='flex items-center justify-end'>
//             <Button
//               type='submit'
//               className='whitespace-nowrap bg-main-1 hover:bg-main-2'
//               disabled={isLoadingCreate || isLoadingUpdate}
//             >
//               {(isLoadingCreate || isLoadingUpdate) && (
//                 <Loader2 className='animate-spin' />
//               )}
//               {action} User
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default UserForm;
