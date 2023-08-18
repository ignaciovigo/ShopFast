import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import { HiChevronDown, HiUser } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'
import Modal from './Modal'
import CartContainer from './CartContainer'
import {motion} from 'framer-motion'

export default function SubNav() {
  const { currentUser, logout } = useAuth() 
  const [toggleDropdown, setToggleDropdown] = useState(false)
  return (
    <nav className='w-full bg-[#111111] flex justify-around py-2 items-center'>
        <div></div>
        <div className='flex gap-3'>
          {
            currentUser?.role === 'USER' && (
        <Modal title='Your Cart' isCart>
          <CartContainer showButtonPay/>
        </Modal>
            )
          }
        
        <div className='cursor-pointer text-white relative ' onClick={() => setToggleDropdown(!toggleDropdown)}>
          <span className='ff-second customLinks rounded-full flex gap-2'>
          {currentUser?.email}
          <HiChevronDown className={`text-second w-6 h-6 ${toggleDropdown && 'rotate-180'} transition-transform duration-200 ease-in`}/>
          </span>
          <motion.div
          initial={false}
          animate={toggleDropdown ? "open" : "closed"}
           variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.2,
                delayChildren: 0.3,
                staggerChildren: 0.05
              }
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
              }
            }
          }}
          className={`flex flex-col absolute bg-neutral-900 rounded-md ${toggleDropdown ? 'visible' : 'hidden'} w-full`}>
            <Link to={'/profile'} className='customLinks flex'>
            <HiUser  className='text-second w-6 h-6'/>
              Profile
            </Link>
            <Link onClick={() => logout()} className='customLinks flex'>
            <FiLogOut className='text-second w-6 h-6'/>
              Log out
            </Link>
          </motion.div>
        </div>
        </div>
    </nav>
  )
}
