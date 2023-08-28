import React from "react";
import {FaHome, FaListUl,FaUserAlt, FaMicrosoft,FaClipboardList } from "react-icons/fa";
import { HiInbox, HiShoppingBag, HiShoppingCart, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import {AiOutlineSearch, AiOutlineUser} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
const SidebarData = [
  {
    title: "Products",
    path: '/products',
    icon: <HiShoppingBag />,
    role: ['USER','ADMIN', 'PREMIUM']
  },
  {
    title: "History",
    path: "/history",
    icon: <FaClipboardList />,
    role: ['USER', 'PREMIUM']
  },
  {
    title: "Users",
    path: "/usermanagement",
    icon: <FaMicrosoft />,
    role: ['ADMIN'],
  },
  {
    title: "Cart",
    path: "/cart",
    icon: <HiShoppingCart />,
    role: ['USER', 'PREMIUM']
  },
];

export default SidebarData;
