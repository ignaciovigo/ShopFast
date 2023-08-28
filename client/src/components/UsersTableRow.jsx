import { formatDistanceToNow } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";
import { removeUserById, updateUserRole } from "../../services/callsApi.js";
import { toast } from "react-hot-toast";

export default function UsersTableRow({
  email,
  fullName,
  role,
  lastActivity,
  _id,
  refreshUsers
}) {
  const [ selectedRole, setSelectedRole ] = useState(role)
  const [showSaveBtn, setShowSaveBtn] = useState(false)

  useEffect(() => {
    setShowSaveBtn(selectedRole !== role);
  }, [selectedRole, role]);
  const handleChange = (e) => {
    setSelectedRole(e.target.value)
  }
  const handleRemove =  async () => {
    try {
      const resp = await removeUserById({id: _id})
      refreshUsers()
      toast.success(resp.message)
    } catch (error) {
     toast.error(error.message) 
    }
  };
  const handleSave = async () => {
    try {
      const resp = await updateUserRole({email: email, update:{ role: selectedRole}})
      toast.success(resp.message)
      setShowSaveBtn(false)
      refreshUsers()
    } catch (error) {
      toast.error(error.message)
      console.error(error) 
    }
  }
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ff-second  sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 '>
      <th
        scope='row'
        className='md:px-3 md:py-3 px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {email}
      </th>
      <td className='md:py-3 px-1 py-1'>{fullName}</td>
      <td className='md:py-3 px-1 py-1'>
      <select className="bg-gray-800 text-white border border-gray-600 rounded-md p-1" value={selectedRole} onChange={handleChange}>
        {
          role === 'USER' 
          ? <>
          <option value="USER" >{role}</option>
          <option value="PREMIUM">PREMIUM</option>
          </>
          :
          <>
          <option value="PREMIUM">{role}</option>
          <option value="USER" >USER</option>
          </>
        }
      </select>  
      </td>
      <td className='md:py-3 px-1 py-1'>
        {formatDistanceToNow(new Date(lastActivity), { addSuffix: true })}
      </td>
      <td className='flex items-center md:py-3 justify-center gap-1'>
        <button
      type="button"
        className={`font-medium flex justify-center py-1 items-center bg-slate-500/50 hover:bg-slate-800 transition-colors duration-100 ease-in rounded-md px-1 text-green-500 ${!showSaveBtn && 'invisible' }`}
        data-btn='save'
        onClick={handleSave}
      >
        <FaSave className="pointer-events-none"/>
        Save
      </button>
        <button
          type='button'
          onClick={handleRemove}
          className='font-medium text-red-600 py-1 dark:text-red-500 flex items-center justify-center hover:bg-slate-800 transition-colors duration-100 ease-in rounded-md px-1'
        >
          <FaTrash className='pointer-events-none' />
          Remove
        </button>
      </td>
    </tr>
  );
}
