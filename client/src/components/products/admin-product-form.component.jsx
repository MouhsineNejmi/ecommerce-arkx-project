/* eslint-disable react/prop-types */
import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import TipTap from './tip-tap.component';

import productSchema from '../../lib/validation/product';
import { getPublicIdFromUrl } from '../../helpers/cloudinary.helpers';

import { useGetAllCategoriesQuery } from '../../app/api/categories.api';
import { useUploadImagesMutation } from '../../app/api/upload.api';
import { useDeleteImageMutation } from '../../app/api/upload.api';

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
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/use-toast';

const AdminProductForm = ({ product }) => {
  const [files, setFiles] = React.useState([]);
  const [existingImages, setExistingImages] = React.useState(
    product ? product.product_images : []
  );

  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [uploadImages] = useUploadImagesMutation();
  const [deleteImage] = useDeleteImageMutation();

  function setRichText(value) {
    form.setValue('description', value, { shouldValidate: true });
  }

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: product ? product.product_name : '',
      short_description: product ? product.short_description : '',
      long_description: product ? product.long_description : '',
      price: product ? product.price : 0,
      quantity: product ? product.quantity : 0,
      discount_price: product ? product.discount_price : 0,
      product_images: existingImages,
    },
  });

  // const updateProduct = async () => {
  //   try {
  //     const updatedProductData = {
  //       product_name,
  //       price,
  //       discount_price,
  //       options,
  //       category_id,
  //       short_description,
  //       long_description,
  //       quantity,
  //       // product_images: updatedImageUrls, // Use the new image URLs
  //     };

  //     // Dispatch the editProduct action with updated product data
  //     await updateProduct({ id: product._id, data: updatedProductData });
  //     navigate('/admin/products');
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };

  const handleDeleteImage = async (index, product_image) => {
    const public_id = getPublicIdFromUrl(product_image);
    await deleteImage({ public_id, product_image });

    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);

    toast({ title: 'Image deleted Successfully' });
  };

  const handleFileChange = (event) => {
    setFiles((prev) => [...prev, event.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append(`product_images`, files);

    await uploadImages(formData);
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  if (isLoading) {
    return <Loader2 />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <>
                  <input
                    type='file'
                    name='file'
                    {...field}
                    onChange={handleFileChange}
                    multiple
                  />
                  <Button onClick={handleUpload}>Upload</Button>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          {existingImages.map((product_image, index) => (
            <div key={index} className='relative'>
              <img
                src={product_image}
                alt='image'
                className='h-48 w-48 rounded-lg object-cover object-top'
              />
              <div
                className='absolute right-2 cursor-pointer top-2 w-7 h-7 flex items-center justify-center rounded-full bg-white'
                onClick={() => handleDeleteImage(index, product_image)}
              >
                <XMarkIcon className='w-5 h-5' />
              </div>
            </div>
          ))}
        </div>

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
                <Textarea placeholder='Short Description' {...field} />
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
                <TipTap description={field.value} setRichText={setRichText} />
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
                  <Input type='number' placeholder='Product Price' {...field} />
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
          name='category_id'
          // eslint-disable-next-line no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a category:</FormLabel>
              <FormControl>
                <Select defaultValue={product.category_id._id}>
                  <SelectTrigger className='w-[250px]'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories &&
                        categories.map(({ _id, name }) => (
                          <SelectItem key={_id} value={_id}>
                            {name}
                          </SelectItem>
                        ))}
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
