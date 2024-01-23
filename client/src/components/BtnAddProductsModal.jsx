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
          className='ff-fourth items-center border h-10 flex border-[--border]  hover:ring-2 hover:ring-[--primary-100] text-[--text-100] gap-3 rounded-md bg-[--bg-200] text-md font-medium hover:bg-[--bg-500] hover:text-[--text-300] flex-none justify-start p-2 px-3 transition-all ease-in 300s'
          type='button'
          onClick={handleClick}
          >
        <FaPlus className='text-[--primary-100]' />
        <span className='text-[--text-100] text-sm'>
        Add Product
        </span>
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
