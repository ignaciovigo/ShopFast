import { useState } from "react";
import {motion} from 'framer-motion'
import { BiCartAlt, BiX } from "react-icons/bi";

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
          className='flex ff-fourth h-10 grow items-center border border-[--border] hover:ring-2 hover:ring-[--primary-100] text-[--text-100] justify-center gap-3 rounded-md bg-[--bg-200] p-3 text-md font-medium hover:bg-[--bg-500] hover:text-[--text-300] md:flex-none md:justify-start md:p-2 md:px-3 transition-all ease-in 300s'
        >
          <BiCartAlt className='text-[--primary-100] w-7 h-7' />
          <span className="text-[--text-100] text-sm">View Cart</span>
        </button>
      ) : (
        ""
      )}
      {toggleModal && (
        <div
          className='fixed inset-0 bg-black backdrop-blur-md bg-opacity-30 z-30 flex justify-end items-center'
          data-btn='close'
          onClick={handleClose}
        >
          <motion.div
          initial={{ opacity: 0,translateX: 576, }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 0.2,
            ease: [0, 0.5, 0.2, 1.01]
          }}
          className='flex flex-col bg-[--bg-300] p-2 rounded-md rounded-r-none max-w-xl w-full h-screen'>
            <div className='flex justify-start items-center'>
              <span
                className='flex h-[48px] ff-fourth items-center border border-[--border] transition-all ease-in 300 text-[--text-100] gap-3 rounded-md bg-[--bg-100] text-md font-medium hover:bg-[--bg-400] hover:text-[--text-300] flex-none justify-start p-2 px-3'
                onClick={handleClose}
                data-btn='close'
              >
                <BiX className='text-[--primary-100] pointer-events-none h-5 w-5' />
              </span>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </>
  );
}
