import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductList from "./ProductList";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import InputSearch from "./InputSearch";
import { useAuth } from "../hooks/useAuth";
import ProductTable from "./ProductTable";

export default function ProductsContainer() {
  const [search, setSearch] = useState("");
  const { products, isLoading, getProducts, prevLink, nextLink, currentPage } = useProducts({ search });
  const { currentUser } = useAuth()
  const restartSearch = ''

  const getProductsBySearch = (newSearch) => {
    getProducts({ search: newSearch })
  }
  const refreshProducts = () => {
    setSearch(restartSearch)
    getProducts({search: restartSearch})
  }
  const handleClick = (e) => {
    const type = e.target.dataset.btn
    if(type === 'prev') return getProducts({link: prevLink, search})
    if(type === 'next') return getProducts({link: nextLink, search})
  }
  return (
    <section className='h-full w-full flex flex-col gap-5 items-start py-4 px-3'>
      <InputSearch getProductsBySearch={getProductsBySearch} search={search} setSearch={setSearch} isLoading={isLoading}  />
      {
        currentUser.role === 'USER' ? <ProductList role={currentUser.role} getProducts={getProducts} setSearch={setSearch} products={products} isLoading={isLoading} /> : ""
      }
      {
        currentUser.role === 'ADMIN' ? <ProductTable getProducts={getProducts} setSearch={setSearch} products={products} isLoading={isLoading} refreshProducts={refreshProducts} /> : ""
      }
      <div className="flex justify-center items-center gap-3 mt-auto w-full">
        {
            <button  className={`${prevLink ?'visible' :'invisible' } bg-second hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded active:scale-90 duration-100`} onClick={handleClick} data-btn='prev' ><HiChevronLeft className="pointer-events-none" /> </button> 
        }
        <p className="text-md text-gray-500 cursor-default">{currentPage}</p>
        {
          
            <button  className={`${nextLink ?'visible' :'invisible' } bg-second hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded active:scale-90 duration-100`} onClick={handleClick} data-btn='next' ><HiChevronRight className="pointer-events-none" /></button>
          
        }
      </div>
    </section>
  );
}
