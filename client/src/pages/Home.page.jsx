import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2 className='font-bold text-3xl'>Home</h2>
            <Link to='/admin/login' className='text-blue-500 underline text-lg'>
                Login
            </Link>
        </div>
    );
};

export default Home;
