import React, { useState } from "react";
import useCart from "../hooks/useCart";
import { HiTrash, HiX } from "react-icons/hi";
import CONSTANTS from "../constants/constants";
import { toast } from "react-hot-toast";
export default function ItemProduct({ product, role, refreshProducts }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [urlImage, setUrlImage] = useState(null);

  const {
    title,
    description,
    stock,
    price,
    category,
    thumbnails,
    code,
    status,
    id,
  } = product;

  const handleAddToCart = () => {
    addToCart({ product, quantity });
    setQuantity(1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  const handleRemove = async () => {
    try {
      const result = await fetch(CONSTANTS.PRODUCTS_URL + `/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const resp = await result.json();
      if (resp.status === "success") {
        refreshProducts();
        toast.success(resp.message);
      } else {
        throw resp;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleClickImage = (e) => {
    setUrlImage(e.target.src);
  };
  return (
    <div
      key={id}
      className='bg-white rounded-lg shadow-md p-4 flex flex-col gap-1 justify-center items-stretch'
    >
      <div className='grid grid-cols-3 gap-2 col-span-2'>
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`Product img ${index+1}`}
            className='w-full h-auto rounded text-sm hover:scale-[1.1] cursor-pointer duration-100'
            onClick={handleClickImage}
          />
        ))}
      </div>
      <div className='flex'>
        <div className='flex flex-col w-full'>
          <h2 className='text-md ff-fourth font-semibold'>{title}</h2>
          <div className="flex justify-between">
          <p className='text-gray-500 text-sm mt-auto ff-fourth'>
            Stock: {stock}
          </p>
          <p className='text-gray-500 text-sm ff-fourth'>{category}</p>

          </div>
        </div>
        {role === "ADMIN" && (
          <button className='p-2 bg-red-300 rounded-md' onClick={handleRemove}>
            <HiTrash className='h-5 w-5 pointer-events-none text-red-800' />
          </button>
        )}
      </div>
      <p className='text-gray-700 leading-tight break-words text-sm overflow-y-auto max-h-16 ff-third scrollbar font-bold'>
        {description}
      </p>
      
      {role === "USER" && (
        <>
          <div className='flex items-center justify-center mt-auto'>
            <button
              onClick={decreaseQuantity}
              className='px-3 py-1 text-sm text-gray-500 hover:text-gray-700 bg-red-200 hover:bg-red-300 rounded-l active:scale-[0.9] duration-100'
            >
              -
            </button>
            <span className='px-3 py-1 text-sm font-medium'>{quantity}</span>
            <button
              onClick={increaseQuantity}
              className='px-3 py-1 text-sm text-gray-500 hover:text-green-700 bg-green-200 hover:bg-green-300 rounded-r active:scale-[0.9] duration-100'
            >
              +
            </button>
          </div>
          <button
            className='bg-second text-[#111111] rounded px-4 py-1 hover:bg-yellow-500 ff-third text-md active:scale-[0.9] duration-100 flex justify-evenly'
            onClick={handleAddToCart}
          >
            <p className='text-gray-800 text-xl ff-fourth font-bold self-center'> <span className="align-middle text-sm">$</span>{price}</p>
            Add to Cart
          </button>
        </>
      )}
      {
        urlImage && (
          <div
          className='fixed inset-0 bg-black backdrop-blur-md bg-opacity-30 z-30 flex justify-center items-center'
          onClick={() => setUrlImage(null)}
        >
          <section className='flex flex-col p-2 rounded-md max-w-2xl w-full'>
            <div className='absolute top-0 right-10'>
              <span
                className='px-2 py-1 rounded-md cursor-pointer'
                onClick={() => setUrlImage(null)}
              >
                <HiX className='text-white pointer-events-none h-7 w-7' />
              </span>
            </div>
            <img src={urlImage} alt='product image selected' />
          </section>
        </div>
        )
      }
      
    </div>
  );
}
