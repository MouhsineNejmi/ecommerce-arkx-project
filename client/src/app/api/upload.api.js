import { apiSlice } from './api';

export const uploadApi = apiSlice.injectEndpoints({
  tagTypes: ['Upload'],
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query(data) {
        return {
          url: 'upload',
          prepareHeaders: (headers) => {
            headers.set('Content-Type', 'multipart/form-data');
            return headers;
          },
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
    deleteImage: builder.mutation({
      query({ public_id, product_image }) {
        return {
          url: `upload/${public_id}`,
          method: 'DELETE',
          body: { product_image },
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { useUploadImagesMutation, useDeleteImageMutation } = uploadApi;
