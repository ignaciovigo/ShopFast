import { useState } from "react";
import { toast } from "react-hot-toast";
import CONSTANTS from "../constants/constants";
import {motion} from 'framer-motion'
const emptyForm =  {
  title: "",
  description: "",
  price: "",
  thumbnails: [],
  code: "",
  stock: "",
  status: false,
  category: "",
}
export default function FormAddProduct({action, product, tittle, refreshProducts, toggle}) {
  const [formData, setFormData] = useState(() => {
    if(action === 'PUT') return product
    if(action === 'POST') return emptyForm
  }
)
  const disable = action === 'PUT' && JSON.stringify(product) === JSON.stringify(formData)
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "price" || e.target.name === "stock") {
      value = Number(e.target.value);
    }
    if (e.target.name === "status") {
      value = e.target.value === "true";
    }
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const thumbnailsArray = action === 'POST' 
    ? formData.thumbnails.split(",").map((url) => url.trim())
     :formData.thumbnails
    console.log(thumbnailsArray)
    const url =  action === 'POST' ? CONSTANTS.PRODUCTS_URL : CONSTANTS.PRODUCTS_URL+`/${product.id}`
    try {
      const result = await fetch( url, {
        method: action,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, thumbnails: thumbnailsArray }),
      });

      const resp = await result.json();
      if (resp.status === "success") {
        toast.success(resp.message);
        if(action === 'POST') setFormData(emptyForm);
        refreshProducts();
        toggle({target: {dataset: {src:' hola'}}})
      }
      if (resp.status === "error") throw resp;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.2,
      ease: [0, 0.5, 0.2, 1.01]
    }} 
    className='bg-white shadow-lg rounded-lg overflow-y-auto scrollbar max-h-[600px]'>
      <div className='p-6'>
        <h2 className='text-2xl font-bold  text-black mb-4 ff-third'>{tittle}</h2>
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-1 gap-2 ff-fourth'
        >
          <div>
            <div className=' '>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='title'
              >
                Product title
              </label>
              <input
              required
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-500 focus:shadow-outline'
                id='title'
                name='title'
                type='text'
                placeholder='Enter the product title'
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className=' '>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='price'
              >
                Price
              </label>
              <input
              required
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-500 focus:shadow-outline'
                id='price'
                name='price'
                type='number'
                step='0.01'
                placeholder='Enter the product price'
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className=' '>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='code'
              >
                Product code
              </label>
              <input
              required
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-500 focus:shadow-outline'
                id='code'
                name='code'
                type='text'
                placeholder='Enter the product code'
                value={formData.code}
                onChange={handleChange}
              />
            </div>

            <div className=' '>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='stock'
              >
                Stock
              </label>
              <input
              required
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-500 focus:shadow-outline'
                id='stock'
                name='stock'
                type='number'
                placeholder='Enter the product stock'
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div className=' '>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='category'
              >
                Category
              </label>
              <input
              required
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-500 focus:shadow-outline'
                id='category'
                name='category'
                type='text'
                placeholder='Enter the product category'
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className=' '>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='status'
              >
               Status
              </label>
              <select
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-500 focus:shadow-outline'
                id='status'
                name='status'
                value={formData.status}
                onChange={handleChange}
              >
                <option value={true}>Available</option>
                <option value={false}>Not available</option>
              </select>
            </div>
          </div>
          <div className=' '>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='description'
            >
              Product description
            </label>
            <textarea
              className='shadow resize-none appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-500 focus:shadow-outline'
              id='description'
              name='description'
              placeholder='Enter the product description'
              rows='4'
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='thumbnails'
            >
              URLs of the images (separated by commas)
            </label>
            <textarea
              className='shadow resize-none appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-500 focus:shadow-outline'
              id='thumbnails'
              name='thumbnails'
              placeholder='Enter the URLs of the images separated by commas'
              rows='4'
              value={formData.thumbnails}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="flex justify-evenly gap-2 w-full col-span-1 sm:col-span-2">
          <button
          className="bg-red-200 transition-colors duration-100 ease-in hover:bg-red-400 black font-bold py-2 px-4 rounded focus:outline-gray-500 focus:shadow-outline ff-third text-black"
          type="button"
          onClick={toggle}
          >
            Cancel
          </button>
          <button
            className={`${disable && 'opacity-60'} bg-second hover:bg-yellow-500 black font-bold py-2 px-4 rounded focus:outline-gray-500 focus:shadow-outline ff-third text-black`}
            type='submit'
            disabled={disable}
            onSubmit={handleSubmit}
          >
            {tittle}
          </button>

          </div>
        </form>
      </div>
    </motion.div>
  );
}
