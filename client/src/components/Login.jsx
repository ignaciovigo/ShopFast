import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import CONSTANTS from "../constants/constants";
export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const [error, setError] = useState();
  const prevData = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    setData({ email: CONSTANTS.GUEST_EMAIL, password: CONSTANTS.GUEST_PASS });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (prevData.current === JSON.stringify(data)) return;
      prevData.current = JSON.stringify(data);
      setLoading(true);
      await login(data);
      setLoading(false);
      setData({ email: "", password: "" });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 h-full bg-gradient-to-r to-[--bg-200] from-[--bg-100] border-[--border] py-2 sm:py-10 md:px-5 sm:px-10 lg:px-20 xl:px-32 overflow-auto'>
      {/* section container */}
      <div className='flex items-center justify-center w-full'>
        {/* primera col container */}
        <img
          src={`/assets/logoShopFast.png`}
          alt='ShopFast logo'
          className='rounded-lg bourder border-[--border] w-auto max-w-[500px] min-w-[200px]'
        />
      </div>
      <div className='px-10 flex flex-col items-center justify-center w-full h-full'>
        {/* segunda col */}
        <form
          onSubmit={handleSubmit}
          className='bg-[--bg-100] p-4 sm:p-6 rounded-lg flex flex-col justify-around items-center sm:min-h-[200px] md:min-h-[300px] lg:min-h-[400px]'
        >
          <div className='flex flex-col max-h-fit gap-5 items-center'>
            {/* primera row */}
            <h1 className='text-md text-2xl font-bold text-center text-[--text-100]'>
              Sign in
            </h1>
            <div
              onClick={handleClick}
              className='py-1 px-2 border cursor-pointer border-gray-500 text-gray-500 rounded-full w-fit text-center hover:border-gray-700 hover:text-gray-600 transition-colors duration-300 ease-in-out'
            >
              Enter as Guest
            </div>
            <span className='font-medium text-xs text-[--text-400] text-center sm:my-5'>
              with email
            </span>
          </div>
          <div className='grid grid-cols-1 gap-5 sm:my-3'>
            {/* segunda row */}
            <input
              value={data.email}
              onChange={handleChange}
              className='shadow appearance-none border border-[--border] bg-[--input] text-[--text-100] placeholder:text-md rounded w-full py-2 px-3 leading-tight focus:outline-gray-500 focus:shadow-outline'
              required
              type='email'
              id='email'
              name='email'
              placeholder='Email'
            />

            <input
              value={data.password}
              onChange={handleChange}
              className='shadow appearance-none border border-[--border] bg-[--input] text-[--text-100] placeholder:text-md rounded w-full py-2 px-3 leading-tight focus:outline-gray-500 focus:shadow-outline'
              required
              type='password'
              id='password'
              name='password'
              placeholder='Password'
            />
          </div>
          <p
            className={`text-red-600 text-xs text-light mb-1 ${
              error ? "visible" : "invisible"
            }`}
          >
            {error}
          </p>
          <button
            type='submit'
            className='flex ff-fourth h-10 items-center transition-all 3s ease-in border border-[--border] text-[--text-100] gap-3 rounded-md bg-[--bg-100] text-sm font-medium hover:bg-[--bg-500] hover:text-[--text-300] flex-none justify-start p-2 px-3 hover:ring-2 hover:ring-[--primary-100]'
          >
            Sign in
            {isLoading && <span className='w-5 h-5'>{<Loader />}</span>}
          </button>
          <span className='text-light font-thin text-[--text-400] text-sm text-center break-words flex gap-1'>
            Do not have an account?
            <Link to='/register' className='text-sky-500 text-normal'>
              Register
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
}
