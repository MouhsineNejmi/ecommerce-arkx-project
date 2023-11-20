// import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    // Controller,
    // FormProvider,
    // SubmitHandler,
    useForm,
} from 'react-hook-form';
import { useGetAllSubcategoryQuery } from '../app/api/subcategories.api';
import { Loader2 } from 'lucide-react';
import TipTap from './tip-tap.component';

const productSchema = z.object({
    product_name: z
        .string()
        .min(2, { message: 'Must be 2 or more characters long' })
        .max(50, { message: 'Must be 50 or fewer characters long' }),
    product_image: z.instanceof(File),
    subcategory_id: z
        .string()
        .min(1, { message: 'Subcategory field is required' }),
    short_description: z
        .string()
        .min(1, { message: 'Short description field is required' }),
    long_description: z
        .string()
        .min(1, { message: 'Long description field is required' }),
    price: z
        .number()
        .min(0, { message: 'Price must be a non-negative number' }),
    quantity: z
        .number()
        .min(0, { message: 'Quantity must be a non-negative number' }),
    discount_price: z
        .number()
        .min(0)
        .max(
            z.lazy(() =>
                z.number().refine((value) => value <= productSchema.price, {
                    message:
                        'Discount price must be less than or equal to the regular price',
                })
            )
        ),
    options: z.array(z.string()),
});

const AdminProductForm = () => {
    const {
        data: subcategories,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetAllSubcategoryQuery();

    const loading = isLoading || isFetching;

    function setRichText(value) {
        form.setValue('description', value, { shouldValidate: true });
    }

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            product_name: '',
            short_description: '',
            long_description: '',
            price: 0,
            quantity: 0,
            discount_price: 0,
            product_image: '',
        },
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    if (loading) {
        return <Loader2 />;
    }

    if (isError) {
        console.error(error);
    }

    console.log(subcategories);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='product_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name:</FormLabel>
                            <FormControl>
                                <Input placeholder='Product Name' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='short_description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description:</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Short Description'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='long_description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Long Description:</FormLabel>
                            <FormControl>
                                <TipTap
                                    description={field.value}
                                    setRichText={setRichText}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='grid grid-cols-3 gap-5'>
                    <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Price:</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Product Price'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='quantity'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Quantity:</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Product Quantity'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='discount_price'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discount Price:</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Discount Price'
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
                    name='subcategory_id'
                    // eslint-disable-next-line no-unused-vars
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select a subcategory:</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className='w-[250px]'>
                                        <SelectValue placeholder='Select a subcategory' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {subcategories &&
                                                subcategories.map(
                                                    ({
                                                        _id,
                                                        subcategory_name,
                                                    }) => (
                                                        <SelectItem
                                                            key={_id}
                                                            value={_id}
                                                        >
                                                            {subcategory_name}
                                                        </SelectItem>
                                                    )
                                                )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};

export default AdminProductForm;
