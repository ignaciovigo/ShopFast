import React, { useState } from "react";
import ProductTableRow from "./ProductTableRow";
import FormAddProduct from "./FormAddProduct";
import { FaPlus } from "react-icons/fa";
export default function ProductTable({
  getProducts,
  setSearch,
  products,
  isLoading,
  refreshProducts,
}) {
  const [toggleModal, setToggleModal] = useState(false);
  const handleClick = () => {
    setToggleModal(!toggleModal);
  };
  return (
    <div className='relative shadow-md sm:rounded-lg w-full flex flex-col gap-2'>
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
      <div className="w-full overflow-x-auto scrollbar">

      
      <table className='w-full text-sm text-left  text-gray-500 dark:text-gray-400'>
        <thead className='text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ff-fourth'>
          <tr className=' sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'>
            <th scope='col' className='md:px-3 md:py-3'>
              Product title
            </th>
            <th scope='col' className='md:py-3 px-1 py-1'>
              Price
            </th>
            <th scope='col' className='md:py-3 px-1 py-1'>
              CODE
            </th>
            <th scope='col' className='md:py-3 px-1 py-1'>
              Stock
            </th>
            <th scope='col' className='md:py-3 px-1 py-1'>
              Category
            </th>
            <th scope='col' className='md:py-3 px-1 py-1'>
              status
            </th>
            <th scope='col' className='md:py-3 px-1 py-1 text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((e) => (
            <ProductTableRow
              refreshProducts={refreshProducts}
              key={e.id}
              {...e}
            />
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
}
