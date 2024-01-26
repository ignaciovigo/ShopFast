import React, { useState } from "react";
import CartContainer from "./CartContainer";
import useCart from "../hooks/useCart";
import { toast } from "react-hot-toast";
import CONSTANTS from "../constants/constants";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";

export default function Purchase() {
  const { totalPrice, cart, updateCart, clearCart } = useCart();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productsPurchased, setProductsPurchased] = useState([]);
  const { currentUser } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const handleClick = async () => {
    setIsLoading(true);
    const products = cart.map((e) => ({
      product: e.product.id,
      quantity: e.quantity,
    }));
    try {
      if (products.length === 0) return;
      if(!deliveryAddress && !creditCardNumber){
        toast.error('Must complete the fields required')
        return
      }
      const result = await fetch(
        CONSTANTS.CART_URL + `/${currentUser.cartId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products),
        }
      );
      const resp = await result.json();
      if (resp.status === "success") {
        const confirmPurchase = await fetch(
          CONSTANTS.CART_URL + `/${currentUser.cartId}/purchase`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({address: deliveryAddress, creditCard: creditCardNumber})
          }
        );
        const resultPurchase = await confirmPurchase.json();
        if (resultPurchase.status === "success") {
          toast.success(
            resultPurchase.message,
            " Check your email for more details!"
          );
          clearCart();
          setDeliveryAddress('')
          setCreditCardNumber('')
        }
        if (resultPurchase.status === "error") {
          toast(
            `Not stock! these products were not processed ${resultPurchase.payload.failedProducts
              .map((e) => e.title)
              .join(", ")}`,
            { duration: 6000 }
          );
          updateCart(resultPurchase.payload.failedProducts);
          if (resultPurchase.payload.purchasedProducts.length > 0) {
            setProductsPurchased(
              resultPurchase.payload.purchasedProducts.map((e) => e.title)
            );
            setTimeout(() => {
              setProductsPurchased([]);
            }, 7000);
          }
        }
      }
      if (resp.status === "error") throw resp;
    } catch (error) {
      toast(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <div className='bg-[--bg-200] border border-[--border] shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2'>
        <h2 className='text-2xl font-bold mb-4 md:col-span-3 ff-fourth ps-4 text-[--text-100] p-4'>Purchase</h2>
        <CartContainer />
        <div className='bg-[--bg-200] rounded-lg shadow-md p-6'>
          <section className='w-full flex flex-col justify-center items-center gap-2'>
          <div className="mt-4">
    <label className="block text-[--text-400] text-sm  ">Delivery Address:</label>
    <input
      type="text"
      value={deliveryAddress}
      onChange={(e) => setDeliveryAddress(e.target.value)}
      className="shadow appearance-none border border-[--border] bg-[--input] text-[--text-100] placeholder:text-md rounded w-full py-2 px-3 leading-tight focus:outline-gray-500 focus:shadow-outline placeholder:text-sm"
      placeholder="Enter your delivery address"
      
    />
  </div>
  <div className="mt-4">
    <label className="block text-[--text-400] text-sm  ">Credit Card Number:</label>
    <input
      type="number"
      value={creditCardNumber}
      onChange={(e) => setCreditCardNumber(e.target.value)}
      className="shadow appearance-none border border-[--border] bg-[--input] text-[--text-100] placeholder:text-md rounded w-full py-2 px-3 leading-tight focus:outline-gray-500 focus:shadow-outline placeholder:text-sm"
      placeholder="Enter your credit card number"
    />
  </div>
            <h1 className='text-[--text-400] text-2xl flex gap-1 items-center justify-between max-w-xs w-full'>
              Total Price 

              <span>
              <span className="text-[--primary-100]">$</span>{totalPrice()}
              </span>
            </h1>
            <div>
              <button
                disabled={isLoading}
                onClick={handleClick}
                className='ff-fourth items-center border h-10 flex border-[--border]  hover:ring-1 hover:ring-[--primary-100] text-[--text-100] gap-3 rounded-md bg-[--bg-100] text-md font-medium hover:bg-[--bg-500] hover:text-[--text-300] flex-none justify-evenly p-2 px-3 transition-all ease-in 300s'
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Processing...
                  </>
                ) : (
                  "Confirm purchase"
                )}
              </button>
              {productsPurchased.length > 0 && (
                <div className='bg-green-200 p-4 rounded'>
                  <p className='text-green-800 font-semibold'>
                    The buy was successfully!
                  </p>
                  <p className='text-green-800'>
                    The following products have been bought:
                  </p>

                  <ul className='list-disc pl-6 mt-2'>
                    {productsPurchased.map((title, ind) => (
                      <li key={ind} className='text-green-800'>
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
