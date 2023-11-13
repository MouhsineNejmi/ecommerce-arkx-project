import { useState } from "react";
import { Link,  } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// import { setCredentials } from "../app/features/auth/authSlice";
import { useLoginMutation } from "../app/features/auth/authApiSlice";

import lightLogo from "../assets/lightLogo.svg";
import mailIcon from "../assets/mailIcon.svg";
import passwordIcon from "../assets/passwordIcon.svg";

const Login = () => {
  // const navigate = useNavigate() 
  const [login, { isLoading }] = useLoginMutation();
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  // const [errMsg, setErrMsg] = useState('')
  const [visible, setVisible] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await login({ user })
        console.log(userData);
        // dispatch(setCredentials({ user }))
        // setUser({ email: '', password: ''})
        // navigate('/welcome')
    } catch (err) {
      console.log(err);
    }
}

  return isLoading ? <h1>Loading...</h1> : (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-6">
      <div className="flex items-center justify-center ">
        <img src={lightLogo} className="mx-auto w-56 " alt="Logo" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <h4 className="mt-1 text-center text-sm font-medium text-gray-400	">
          Welcome Back, Please enter Your details
        </h4>
      </div>
      <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-1 flex items-center gap-3 px-3 py-1 border rounded-xl mb-4">
                <img src={mailIcon} />
                <hr className="h-[30px] w-[1px] bg-black/50" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="flex appearance-none w-full h-11 bg-transparent border-gray-300 rounded-xl	focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="mt-1 flex items-center gap-3 px-3 py-1 border rounded-xl relative">
                  <img src={passwordIcon} />
                  <hr className="h-[30px] w-[1px] bg-black/50" />
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="flex appearance-none w-full h-11 bg-transparent border-gray-300 rounded-xl	focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs">
              <Link
                href=".forget-password"
                className="font-medium text-gray-700 hover:text-blue-500"
              >
                Forget your password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="mt-3 group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
