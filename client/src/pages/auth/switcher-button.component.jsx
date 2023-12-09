/* eslint-disable react/prop-types */
const SwitcherButton = ({ isLogin, onToggle }) => {
  return (
    <div className='flex items-center bg-light-gray text-background rounded-full p-1 cursor-pointer'>
      <div
        className={`flex-1 text-center py-3 rounded-full ${
          isLogin ? 'bg-gold text-white' : 'text-black'
        }`}
        onClick={onToggle}
      >
        Login
      </div>
      <div
        className={`flex-1 text-center py-3 rounded-full ${
          !isLogin ? 'bg-gold text-white' : 'text-black'
        }`}
        onClick={onToggle}
      >
        Register
      </div>
    </div>
  );
};

export default SwitcherButton;
