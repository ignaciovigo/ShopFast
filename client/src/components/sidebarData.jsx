import { BiStoreAlt, BiHistory, BiCustomize, BiCartAlt, BiUser } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";


const SidebarData = [
  {
    title: "Products",
    path: '/products',
    icon: <BiStoreAlt />,
    role: ['USER','ADMIN', 'PREMIUM']
  },
  {
    title: "History",
    path: "/history",
    icon: <BiHistory />,
    role: ['USER', 'PREMIUM']
  },
  {
    title: "Users",
    path: "/usermanagement",
    icon: <BiCustomize />,
    role: ['ADMIN'],
  },
  {
    title: "Payment",
    path: "/cart",
    icon: <MdOutlinePayment />,
    role: ['USER', 'PREMIUM']
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <BiUser />,
    role: ['USER', 'PREMIUM','ADMIN']
  }
];

export default SidebarData;
