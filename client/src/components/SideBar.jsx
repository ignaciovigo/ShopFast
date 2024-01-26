import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SidebarData from "./sidebarData";
import { IconContext } from "react-icons/lib";
import { useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import logoImage from '../../public/logoShopFast.png'

export default function SideBar() {
  const { currentUser, logout } = useAuth();  
  const {pathname} = useLocation()
  return (
    
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center md:justify-center rounded-md bg-[--bg-500] p-4 md:h-40 group/logo"
        to="/products"
      >
       <img src={logoImage} alt="ShopFast Logo"  className="w-[200px] h-auto group-hover/logo:scale-105 transition-all duration-200"/>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      <IconContext.Provider value={{ className: "text-[--primary-100] h-[2rem] w-[2rem]" }}>
          {SidebarData.map((data, key) => {
            if (data.role.includes(currentUser.role)) {
              return (
                <Link
            key={key}
            to={data.path}
            className={`flex h-[48px] ff-fourth grow items-center border border-[--border] text-[--text-100] justify-center gap-3 rounded-md bg-[--bg-200] text-md font-medium hover:bg-[--bg-500] hover:text-[--text-300] md:flex-none md:justify-start p-0 md:p-2 md:px-3 transition-all duration-200
             ${pathname === data.path ? 'bg-[--bg-400] text-[--text-200]': ''}`}
          >
            <span className="w-6">
                  {data.icon}
                  </span>
            <p className="hidden md:block">{data.title}</p>
          </Link>
              );
            }
          })}
        </IconContext.Provider>
        <div className="hidden h-auto w-full grow rounded-md bg-[--bg-200] md:block border border-[--border]"></div>
        <Link onClick={() => logout()} className='flex h-[48px] ff-fourth grow items-center border border-[--border] text-[--text-100] justify-center gap-3 rounded-md bg-[--bg-200] p-3 text-md font-medium hover:bg-[--bg-500] hover:text-[--text-300] md:flex-none md:justify-start md:p-2 md:px-3'>
            <BiLogOut className='text-[--primary-100] w-6 h-6'/>            
              <p className="hidden md:block">Sign Out</p>
            </Link>
      </div>
    </div>

  );
}
