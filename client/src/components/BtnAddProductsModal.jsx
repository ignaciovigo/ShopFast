import React, { useState } from 'react'
import FormAddProduct from './FormAddProduct';
import { FaPlus } from 'react-icons/fa';

export default function BtnAddProductsModal({refreshProducts}) {
    const [toggleModal, setToggleModal] = useState(false);
    const handleClick = () => {
      setToggleModal(!toggleModal);
    };
    return (
        <>
        <button
          className='bg-second hover:bg-yellow-500 black text-sm  py-2 px-4 rounded focus:outline-gray-500 flex gap-1 items-center justify-center focus:shadow-outline ff-third text-black w-fit'
          type='button'
          onClick={handleClick}
          >
        <FaPlus />Add new Product
        </button>
        {toggleModal && (
          <div className='fixed inset-0 bg-black backdrop-blur-md bg-opacity-30 z-30 flex justify-center items-center w-full '>
            <section className='flex justify-center items-center p-2 rounded-md w-full max-w-[800px] gap-3'>
              <FormAddProduct
                action='POST'
                tittle='Add product'
                refreshProducts={refreshProducts}
                toggle={handleClick}
              />
            </section>
          </div>
        )}
    </>
    )
}
