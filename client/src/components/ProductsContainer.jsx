import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductList from "./ProductList";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import InputSearch from "./InputSearch";
import { useAuth } from "../hooks/useAuth";
import ProductTable from "./ProductTable";
import BtnAddProductsModal from "./BtnAddProductsModal";
import Modal from "./Modal";
import CartContainer from "./CartContainer";

export default function ProductsContainer() {
  const [search, setSearch] = useState("");
  const { products, isLoading, getProducts, prevLink, nextLink, currentPage } =
    useProducts({ search });
  const { currentUser } = useAuth();
  const restartSearch = "";

  const getProductsBySearch = (newSearch) => {
    getProducts({ search: newSearch });
  };
  const refreshProducts = () => {
    setSearch(restartSearch);
    getProducts({ search: restartSearch });
  };
  const handleClick = (e) => {
    const type = e.target.dataset.btn;
    if (type === "prev") return getProducts({ link: prevLink, search });
    if (type === "next") return getProducts({ link: nextLink, search });
  };
  return (
    <section className='h-full w-full flex flex-col gap-5 items-start py-4 px-3'>
      {currentUser.role === "USER" && (
        <>
          <div className='flex justify-center sm:items-center max-w-2xl w-full gap-2 flex-col sm:flex-row'>
            <InputSearch
              getProductsBySearch={getProductsBySearch}
              search={search}
              setSearch={setSearch}
              isLoading={isLoading}
              placeholder='Search by title or category...'
            />
            <Modal title='Your Cart' isCart>
              <CartContainer showButtonPay />
            </Modal>
          </div>
          <ProductList
            role={currentUser.role}
            products={products}
            isLoading={isLoading}
          />
        </>
      )}
      {currentUser.role === "ADMIN" && (
        <>
          <InputSearch
            getProductsBySearch={getProductsBySearch}
            search={search}
            setSearch={setSearch}
            isLoading={isLoading}
            placeholder='Search by title or category...'
          />
          <ProductTable products={products} refreshProducts={refreshProducts} />
        </>
      )}
      {currentUser.role === "PREMIUM" && (
        <>
          <div className='flex justify-center sm:items-center max-w-2xl w-full gap-2 flex-col sm:flex-row'>
            <InputSearch
              getProductsBySearch={getProductsBySearch}
              search={search}
              setSearch={setSearch}
              isLoading={isLoading}
              placeholder='Search by title or category...'
            />
            <BtnAddProductsModal refreshProducts={refreshProducts} />
            <Modal title='Your Cart' isCart>
              <CartContainer showButtonPay />
            </Modal>
          </div>
          <ProductList
            role={currentUser.role}
            products={products}
            isLoading={isLoading}
          />
        </>
      )}
      <div className='flex justify-center items-center gap-3 mt-auto w-full'>
        {
          <button
            disabled={isLoading || !prevLink}
            className={`${
              prevLink ? "visible" : "invisible"
            } bg-[--bg-200] hover:bg-[--bg-400] text-[--primary-200] hover:text-[--primary-100] font-bold py-2 px-4 rounded active:scale-90 duration-100`}
            onClick={handleClick}
            data-btn='prev'
          >
            <BiChevronLeft className='pointer-events-none' />{" "}
          </button>
        }
        <p className='text-sm text-gray-500 cursor-default'>{currentPage}</p>
        {
          <button
            disabled={isLoading || !nextLink}
            className={`${
              nextLink ? "visible" : "invisible"
            } bg-[--bg-200] hover:bg-[--bg-400] text-[--primary-200] hover:text-[--primary-100] font-bold py-2 px-4 rounded active:scale-90 duration-100`}
            onClick={handleClick}
            data-btn='next'
          >
            <BiChevronRight className='pointer-events-none' />
          </button>
        }
      </div>
    </section>
  );
}
