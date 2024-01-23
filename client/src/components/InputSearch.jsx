import { BiSearchAlt } from "react-icons/bi";
import debounce from 'just-debounce-it'
import { useCallback } from "react";

export default function InputSearch({ getProductsBySearch, search, setSearch, isLoading, placeholder }) {

 const debounceProducts = useCallback(
    debounce((newSearch) => {
        getProductsBySearch(newSearch)
    }, 700),
    []
 )
  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debounceProducts(newSearch)
  };
  return (
    <article className='flex rounded-lg bg-[--input] p-1 w-full max-w-xl min-w-sm'>
      <label htmlFor='searchText' className="flex justify-center items-center ps-2">
        <BiSearchAlt className='text-[--primary-100] w-8 h-8' />
      </label>
      <input
        type='text'
        value={search}
        onChange={handleChange}
        id='searchText'
        placeholder={placeholder}
        className='bg-transparent text-[--text-100] placeholder:text-sm outline-none rounded-sm h-8 w-full'
      />
    </article>
  );
}
