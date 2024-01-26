import { useRef, useState } from "react";
import CONSTANTS from "../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import logoImage from '../../public/logoShopFast.png'
export default function Register() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });
  const prevData = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const register = async () => {
      try {
        if (prevData.current === JSON.stringify(data)) return;
        prevData.current = JSON.stringify(data);
        setLoading(true);
        const resp = await fetch(CONSTANTS.REGISTER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const response = await resp.json();
        if (response.status === "error") throw response;
        setLoading(false);
        setError(null);
        toast.success(response.message);
        navigate("/login");
      } catch (error) {
        setError(error.message);
        setLoading(false);
        toast.error(error.message);
      }
    };
    register();
  };
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 bg-[bg--100] bg-gradient-to-r to-[--bg-200] border border-[--border] from-[--bg-100] h-full py-2 sm:py-10 md:px-5 sm:px-10 lg:px-20 xl:px-32 overflow-auto'>
      {/* section container */}
      <div className='flex items-center justify-center w-full'>
        {/* first col container */}
        <img
          src={logoImage}
          alt='ShopFast logo'
          className='rounded-lg bourder border-[--border] w-auto max-w-[500px] min-w-[200px]'
        />
      </div>
      <div className='px-10 flex flex-col items-center justify-center w-full h-full'>
        {/* second col */}
        <form
          onSubmit={handleSubmit}
          className='bg-[--bg-100] p-4 sm:p-6 rounded-lg flex flex-col justify-around items-center sm:min-h-[200px] md:min-h-[300px] lg:min-h-[400px]'
        >
          {/* container form */}
          <div className='flex flex-col max-h-fit gap-5 items-center'>
            {/* first row */}
            <h1 className='text-md text-2xl font-bold text-center text-[--text-100]'>
              Sing up
            </h1>
            <span className='font-medium text-xs text-[--text-400] text-center sm:my-5'>
              with email
            </span>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:my-5'>
            {/* second row */}
            <input
              value={data.firstName}
              onChange={handleChange}
              className='shadow appearance-none border border-[--border] bg-[--input] text-[--text-100] placeholder:text-md rounded w-full py-2 px-3 leading-tight focus:outline-gray-500 focus:shadow-outline'
              required
              type='text'
              id='firstName'
              name='firstName'
              placeholder='First name'
            />

            <input
              value={data.lastName}
              onChange={handleChange}
              className='shadow appearance-none border border-[--border] bg-[--input] text-[--text-100] placeholder:text-md rounded w-full py-2 px-3 leading-tight focus:outline-gray-500 focus:shadow-outline'
              required
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Last name'
            />

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
              value={data.age}
              onChange={handleChange}
              className='shadow appearance-none border border-[--border] bg-[--input] text-[--text-100] placeholder:text-md rounded w-full py-2 px-3 leading-tight focus:outline-gray-500 focus:shadow-outline'
              required
              type='number'
              id='age'
              max={80}
              min={16}
              name='age'
              placeholder='Age'
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
            className={`text-red-600 text-xs text-light my-2 ${
              error ? "visible" : "invisible"
            }`}
          >
            {error}
          </p>
          <button
            type='submit'
            className='flex ff-fourth h-10 items-center transition-all 3s ease-in border border-[--border] text-[--text-100] gap-3 rounded-md bg-[--bg-100] text-sm font-medium hover:bg-[--bg-500] hover:text-[--text-300] flex-none justify-start p-2 px-3 hover:ring-2 hover:ring-[--primary-100]'
          >
            Sing up
            {isLoading && (
              <span className='w-5 h-5'>
                <Loader />
              </span>
            )}
          </button>
          <span className='text-light font-thin text-[--text-400] flex gap-1 text-sm text-center break-words'>
            Already have an account?
            <Link to='/login' className='text-sky-500 text-normal'>
              Sign in
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
}
