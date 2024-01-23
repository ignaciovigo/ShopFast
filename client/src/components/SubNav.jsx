import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import CartContainer from './CartContainer'
export default function SubNav() {
  const { currentUser} = useAuth() 
  return (
    <nav className='w-full flex justify-end pt-4 items-center pe-3'>
        <div className='flex gap-3'>
          {
            ['USER','PREMIUM'].includes(currentUser?.role) && (
        <Modal title='Your Cart' isCart>
          <CartContainer showButtonPay/>
        </Modal>
            )
          }
        </div>
    </nav>
  )
}
