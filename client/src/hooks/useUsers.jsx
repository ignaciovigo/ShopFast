import { useEffect, useRef, useState } from 'react'
import { getAllUsers } from '../../services/callsApi'
import { toast } from 'react-hot-toast'

export default function useUsers() {
    const [allUsers, setAllUsers] = useState({})
    

    const getUsers = async ({search = null, newURL = null}) => {

      try {
        const users = await getAllUsers({ search, newURL })
        if(users.docs.length > 0){
          setAllUsers(users)
        } else {
        toast.error(`Not users with the email or full name "${search}"`)
        return
        }
      } catch (error) {
        console.error(error)
        toast.error(error.message);
      }
    }

    useEffect(() => {
      getUsers({search: ''})
    },[])
  return { allUsers, getUsers }
}
