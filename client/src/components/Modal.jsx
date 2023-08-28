import { useState } from "react";
import { HiShoppingCart, HiX } from "react-icons/hi";
import {motion} from 'framer-motion'

export default function Modal({ children, isCart }) {
  const [toggleModal, setToggleModal] = useState(false);
  const handleClick = () => {
    setToggleModal(!toggleModal);
  };
  const handleClose = (e) => {
    if (e.target.dataset.btn === "close") return setToggleModal(false);
  };
  return (
    <>
      {isCart ? (
        <button
          type='button'
          onClick={handleClick}
          className='bg-second p-1 rounded-md'
        >
          <HiShoppingCart className='text-black w-7 h-7' />
        </button>
      ) : (
        ""
      )}
      {toggleModal && (
        <div
          className='fixed inset-0 bg-black backdrop-blur-md bg-opacity-30 z-30 flex justify-center items-center'
          data-btn='close'
          onClick={handleClose}
        >
          <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            ease: [0, 0.5, 0.2, 1.01]
          }}
          className='flex flex-col bg-white p-2 rounded-md max-w-2xl w-full'>
            <div className='flex justify-end items-center'>
              <span
                className='px-2 py-1 bg-second rounded-md cursor-pointer'
                onClick={handleClose}
                data-btn='close'
              >
                <HiX className='text-black pointer-events-none h-5 w-5 bg-second' />
              </span>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </>
  );
}
