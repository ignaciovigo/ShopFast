import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useUsers from "../hooks/useUsers";
import UsersTableRow from "./UsersTableRow";
import { useState } from "react";
import InputSearch from "./InputSearch";
import CONSTANTS from "../constants/constants";
export default function UsersTable() {
  const { allUsers, getUsers } = useUsers();
  const [search, setSearch] = useState('')
  
  const handleClick =  (e) => {
    const type = e.target.dataset.btn
    if(type === 'prev') getUsers({ newURL: allUsers.prevLink, search});
    if(type === 'next') getUsers({ newURL: allUsers.nextLink, search});
  }
  const getUsersBySearch = (newSearch) => {
    getUsers({search: newSearch})
  }
  const refreshUsers = () => {
    getUsers({search, newURL:CONSTANTS.ALL_USERS_URL+`?page=${allUsers.page}`})

  }
  return (
    <div className='relative shadow-md sm:rounded-lg w-full flex flex-col gap-2'>
      <InputSearch setSearch={setSearch} search={search} getProductsBySearch={getUsersBySearch} placeholder='Search by email or fullname...'/>
      <div className="w-full overflow-x-auto scrollbar">
      <table className='w-full text-sm text-left  text-[--text-400]'>
        <thead className='ttext-xs uppercase bg-[--bg-200] text-[--text-100] ff-third'>
          <tr className=' sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'>
            <th scope='col' className='md:px-3 md:py-3'>
              email
            </th>
            <th scope='col' className='md:py-3 px-1 py-1'>
              Fullname
            </th>
            <th scope='col' className='md:py-3 px-1 py-1'>
              role
            </th>
            <th scope='col' className='md:py-3 px-1 py-1'>
              active
            </th>
            <th scope='col' className='md:py-3 px-1 py-1 text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
          allUsers.docs ?
            allUsers.docs.map((user) => {
              return (
                <UsersTableRow key={user._id} {...user} refreshUsers={refreshUsers}/>
              )
            })
            : null
          }
        </tbody>
      </table>
      </div>
      <div className="flex justify-center items-center gap-3 h-full w-full mt-auto">
        {
            <button  className={`${allUsers.prevLink ?'visible' :'invisible' } bg-[--bg-200] hover:bg-[--bg-400] text-[--primary-200] hover:text-[--primary-100] font-bold py-2 px-4 rounded active:scale-90 duration-100`} onClick={handleClick} data-btn='prev' ><HiChevronLeft className="pointer-events-none" /> </button> 
        }
        <p className="text-md text-gray-500 cursor-default">{allUsers.page}</p>
        {
          
            <button  className={`${allUsers.nextLink ?'visible' :'invisible' } bg-[--bg-200] hover:bg-[--bg-400] text-[--primary-200] hover:text-[--primary-100] font-bold py-2 px-4 rounded active:scale-90 duration-100`} onClick={handleClick} data-btn='next' ><HiChevronRight className="pointer-events-none" /></button>
          
        }
      </div>
    </div>
  );
}
