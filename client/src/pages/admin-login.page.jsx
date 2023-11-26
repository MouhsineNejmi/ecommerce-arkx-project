import UserAuthForm from '../components/user/user-auth-form.component';

const AdminLogin = () => {
  return (
    <div className='container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Welcome to the dashboard <br />
              Login to continue
            </h1>
            <p className='text-sm text-muted-foreground'>
              {"Let's"} get back to your business
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900'>
          <img
            src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/2d07fa176298827.64c24c67c730f.jpg'
            alt='Desing Elegance Dashboard Login'
            className='w-full h-full'
          />
        </div>
        <div className='relative z-20 flex items-center text-lg uppercase font-medium text-right'>
          <h2 className='font-bold font-bold text-lg'>
            Desing <span className='text-gold text-lg'>Elegance</span>
          </h2>
        </div>
        <div className='relative z-20 mt-auto text-sm text-white/40 text-right'>
          Design Elegance - 2023
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
