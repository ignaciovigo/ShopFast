import React from "react";
import useCart from "../hooks/useCart";
import { BiTrash, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
export default function CartContainer({ showButtonPay }) {
  const { cart, totalPrice, clearCart, removeToCart } = useCart();

  return (
    <div className='p-4 flex flex-col'>
      <div className='flex justify-between items-end mb-1'>
        <h2 className='text-2xl font-normal ff-fourth text-[--text-100]'>Your Cart</h2>
        
        <span
          className={`${cart.length === 0 ? 'hidden' :''} p-1 bg-[--bg-100] border border-[--border] hover:bg-[--bg-400]  hover:ring-1 hover:ring-[--primary-100] transition-all ease-in 300 flex justify-center items-center text-black rounded-md cursor-pointer`}
          onClick={() => clearCart()}
        >
          <BiTrash className='pointer-events-none h-6 w-6 text-[--primary-100]' />
        </span>
      </div>
      {cart.length > 0 ? (
        <>
          <div className='border border-[--border] rounded-lg shadow-md  max-h-[70vh] overflow-y-auto'>
            <ul className='divide-y divide-[--border]'>
              {cart.map((e) => {
                return (
                  <li
                    className='flex items-center p-2 bg-[--bg-100]'
                    key={e.product.id + "3"}
                  >
                    <img
                      src={e.product.thumbnails[0]}
                      alt={`image product ${e.product.title}`}
                      className='w-16 h-16 mr-4 rounded'
                    />
                    <div className="w-full flex flex-col items-start justify-center gap-1 ff-second">
                      <h3 className='text-lg font-semibold leading-none text-[--text-100]'>
                        {e.product.title}
                      </h3>            
                      <div className="flex justify-start w-full h-full items-center gap-4">
                      <p className='text-[--text-400] flex gap-1 ff-fourth'>
                        Quantity:
                        <span className='text-[--text-100] font-bold'>{e.quantity}</span>
                      </p>
                      <p className='text-[--text-400] flex gap-1'>
                        Price:
                        <span className='text-[--text-100] font-bold '><span className="text-[--primary-100] text-sm">$</span>{e.product.price}</span>
                      </p>
                      
                      </div>
                    </div>
                    <p className="text-[--text-100] mt-auto mb-2"><span className="text-[--primary-100] text-sm">$</span>{(e.quantity * e.product.price).toFixed(2)}</p>
                    <span
                      className='p-1 bg-[--bg-100] hover:bg-[--bg-400] border border-[--border] rounded-md cursor-pointer active:scale-90 duration-100 mb-auto'
                      onClick={() => removeToCart(e)}
                    >
                      <BiX className='pointer-events-none h-6 w-6 text-[--primary-100]' />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='mt-4 flex justify-between items-end flex-col gap-2'>
            {showButtonPay && (
              <>
                <p className='text-lg text-[--text-400] flex gap-2 ff-fourth'>
                  Total Price:
                  <span className='text-[--text-100] text-lg font-semibold'><span className="text-[--primary-100] text-sm">$</span>{totalPrice()}</span>
                </p>
                <Link
                  to={"/cart"}
                  data-btn='close'
                  className='flex ff-fourth h-10 items-center transition-all 3s ease-in border border-[--border] text-[--text-100] gap-3 rounded-md bg-[--bg-100] text-sm font-medium hover:bg-[--bg-500] hover:text-[--text-300] flex-none justify-start p-2 px-3 hover:ring-2 hover:ring-[--primary-100]'
                >
                  Go to payment
                </Link>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-48">
        <h1 className='text-[--text-400] text-3xl ff-third text-center'>
          Not products
        </h1>
        </div>
      )}
    </div>
  );
}
