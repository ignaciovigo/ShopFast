import React, { useState } from "react";
import useCart from "../hooks/useCart";
import { HiX } from "react-icons/hi";
import Carousel from "./Carousel";

export default function ItemProduct({ product, role }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [urlImage, setUrlImage] = useState(null);
  const [images, setImages] = useState([]);

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

  const handleClickImage = (e) => {
    const arrayOfImgs = Array.from(e.target.parentNode.childNodes).map(
      (e) => e.src
    );
    const index = arrayOfImgs.indexOf(e.target.src);
    setUrlImage({ url: e.target.src, index });
    setImages(arrayOfImgs);
  };
  return (
    <div
      key={id}
      className='bg-[--bg-200] border border-[--border] rounded-lg shadow-md p-4 flex flex-col gap-1 justify-center items-stretch'
    >
      <div className='grid grid-cols-3 gap-2 col-span-2'>
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`Product img ${index + 1}`}
            className='w-full h-auto rounded text-xs text-[--text-100] hover:scale-[1.1] cursor-pointer duration-100'
            onClick={handleClickImage}
          />
        ))}
      </div>
      <div className='flex'>
        <div className='flex flex-col w-full'>
          <h2 className='text-lg text-[--text-100] tracking-wide ff-fourth font-semibold text-balance'>{title}</h2>
          <div className='flex justify-between'>
            <p className='text-[--text-400] text-sm mt-auto ff-fourth'>
              Stock: {stock}
            </p>
            <p className='text-[--text-400] text-sm ff-fourth'>{category}</p>
          </div>
        </div>
      </div>
      <p className='text-[--text-400] leading-none break-words text-sm overflow-y-auto h-full ff-third scrollbar font-bold'>
        {description}
      </p>

      <div className='flex items-center justify-center mt-auto'>
        <button
          onClick={decreaseQuantity}
          className='px-3 py-1 text-sm text-gray-500 hover:text-gray-700 bg-red-200 hover:bg-red-300 rounded-l active:scale-[0.9] duration-100'
        >
          -
        </button>
        <span className='px-3 py-1 text-md font-bold ff-third text-[--text-100]'>{quantity}</span>
        <button
          onClick={increaseQuantity}
          className='px-3 py-1 text-sm text-gray-500 hover:text-green-700 bg-green-200 hover:bg-green-300 rounded-r active:scale-[0.9] duration-100'
        >
          +
        </button>
      </div>
      <button
        className='ff-fourth items-center border h-10 flex border-[--border]  hover:ring-1 hover:ring-[--primary-100] text-[--text-100] gap-3 rounded-md bg-[--bg-100] text-md font-medium hover:bg-[--bg-500] hover:text-[--text-300] flex-none justify-evenly p-2 px-3 transition-all ease-in duration-200 text-sm'
        onClick={handleAddToCart}
      >
        <p className='text-xl ff-fourth font-bold self-center text-[--text-100]'>
          <span className='align-middle text-sm text-[--primary-100]'>$</span>
          {price}
        </p>
        Add to Cart
      </button>
      {urlImage?.url && (
        <div className='fixed inset-0 bg-black backdrop-blur-md bg-opacity-30 z-30 flex justify-center items-center w-full '>
          <section className='flex justify-center items-center p-2 rounded-md overflow-hidden w-full max-w-[800px] gap-3'>
            <div className='absolute top-0 right-10'>
              <span
                className='px-2 py-1 rounded-md cursor-pointer'
                onClick={() => setUrlImage(null)}
              >
                <HiX className='text-white pointer-events-none h-7 w-7' />
              </span>
            </div>
            <Carousel images={images} initialIndex={urlImage.index} />
          </section>
        </div>
      )}
    </div>
  );
}

