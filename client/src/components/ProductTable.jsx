import React, { useState } from "react";
import ProductTableRow from "./ProductTableRow";
import FormAddProduct from "./FormAddProduct";
import { FaPlus } from "react-icons/fa";
import BtnAddProductsModal from "./BtnAddProductsModal";
export default function ProductTable({
  getProducts,
  setSearch,
  products,
  isLoading,
  refreshProducts,
}) {
  
  return (
    <div className='relative shadow-md sm:rounded-lg w-full flex flex-col gap-2'>
     <BtnAddProductsModal refreshProducts={refreshProducts}/>
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
