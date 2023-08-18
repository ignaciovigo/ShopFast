import { useState } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import FormAddProduct from "./FormAddProduct";
import CONSTANTS from "../constants/constants";
import { toast } from "react-hot-toast";

export default function ProductTableRow({
  title,
  price,
  code,
  stock,
  category,
  status,
  thumbnails,
  description,
  id,
  refreshProducts
}) {
  const [toggleModal, setToggleModal] = useState(false);

  const handleClick = () => {
    setToggleModal(!toggleModal)
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
  
  return (
    <>
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ff-second  sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 '>
        <th
          scope='row'
          className='md:px-3 md:py-3 px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white'
        >
          {title}
        </th>
        <td className='md:py-3 px-1 py-1'>${price}</td>
        <td className='md:py-3 px-1 py-1'>{code}</td>
        <td className='md:py-3 px-1 py-1'>{stock}</td>
        <td className='md:py-3 px-1 py-1'>{category}</td>
        <td className='md:py-3 px-1 py-1'>
          {status == true ? (
            <FaCheck className='text-green-300 w-10' />
          ) : (
            <FaXmark className='text-red-300 w-10' />
          )}
        </td>
        <td className='flex items-center px-6 py-4 space-x-3 justify-center'>
          <button
          type="button"
            className='font-medium flex justify-center items-center bg-slate-500/50 hover:bg-slate-800 transition-colors duration-100 ease-in rounded-md px-1 text-blue-500'
            data-btn='open'
            onClick={handleClick}
          >
            <FaEdit className="pointer-events-none"/>
            Edit
          </button>
          <button type="button" onClick={handleRemove} className='font-medium text-red-600 dark:text-red-500 flex items-center justify-center hover:bg-slate-800 transition-colors duration-100 ease-in rounded-md px-1'>
            <FaTrash className="pointer-events-none"/>
            Remove
          </button>
        </td>
      </tr>
      {toggleModal && (
        <div className='fixed inset-0 bg-black backdrop-blur-md bg-opacity-30 z-30 flex justify-center items-center w-full '>
          <section className='flex justify-center items-center p-2 rounded-md w-full max-w-[800px] gap-3'>
            <FormAddProduct
              action='PUT'
              product={
                {title,
                price,
                code,
                stock,
                category,
                status,
                thumbnails,
                description,
                id}
            }
            tittle='Update product'
            refreshProducts={refreshProducts}
            toggle={handleClick}
            />
          </section>
        </div>
      )}
    </>
  );
}
