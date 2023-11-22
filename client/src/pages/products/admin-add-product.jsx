import AdminProductForm from '../../components/products/admin-product-form.component';

const AdminAddProduct = () => {
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold capitalize pb-2'>Add Product</h2>
      <AdminProductForm />
    </div>
  );
};

export default AdminAddProduct;
