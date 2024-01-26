import { HiChevronDown, HiMenuAlt4 } from "react-icons/hi";
import Spinner from "./Spinner";
import { useTicketData } from "../hooks/useTicketData";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HistoryContainer() {
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    status,
    tickets,
    isFetching,
    isFetchingNextPage
  } = useTicketData();
  const [expandedTickets, setExpandedTickets] = useState([]);
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const toggleTicketExpansion = (index) => {
    setExpandedTickets((prevExpandedTickets) => {
      const updatedTickets = [...prevExpandedTickets];
      updatedTickets[index] = !updatedTickets[index];
      return updatedTickets;
    });
  };

  return (
    
     <div className='max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <div className='bg-[--bg-200] border border-[--border] shadow-lg rounded-lg overflow-hidden'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-3'>
            <h2 className='text-2xl font-bold ff-third text-[--text-100]'>Your tickets</h2>
          </div>

          {status === 'success' && tickets.length > 0
          ? tickets?.map((ticket, index) => (
            <motion.div
              initial='hidden'
              animate='visible'
              variants={variants}
              key={index}
              className={`bg-[--bg-100] p-4 rounded-lg mb-4 transition-all duration-300 ease-in text-md ff-fourth ${
                expandedTickets[index] ? "h-auto" : "h-20"
              }`}
            >
              <div className='w-full text-left focus:outline-none flex justify-between items-center'>
                <div>
                  <h3 className='text-md font-semibold ff-fourth text-[--text-100]'>
                    {ticket.time}
                  </h3>
                  <p className='text-[--text-400] mb-2 ff-third text-lg'>
                    Total: <span className="text-[--primary-100] text-sm">$</span>{ticket.amount}
                  </p>
                </div>
                <button
                  onClick={() => toggleTicketExpansion(index)}
                  className='px-2 flex items-center justify-center mb-auto py-2 bg-[--bg-200] text-xs rounded-lg text-[--primary-100] ff-fourth'
                >
                  View more
                  <HiChevronDown
                    className={`w-5 h-5 ${
                      expandedTickets[index] && "rotate-180 text-[--primary-100] transition-all duration-100"
                    }`}
                  />
                </button>
              </div>
              {expandedTickets[index] && (
                <motion.div
                  initial='hidden'
                  animate='visible'
                  variants={variants}
                  className='mt-2 transition-all duration-300 ease-in'
                >
                   <p className='text-md font-semibold ff-fourth text-[--text-400]'>
                    Address: <span className="text-[--text-200] font-normal">{ticket.address}</span>
                  </p>
                  <p className='text-md font-semibold ff-fourth text-[--text-400]'>
                    Products: <span className="text-[--text-200] font-normal">{ticket.products}</span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))
        :
        <h4 className="ff-third text-2xl font-semibold text-gray-500 text-center">No tickets</h4>}
          {isFetchingNextPage ? '' : hasNextPage ? (
            <div className='text-center mt-4 flex items-center justify-center'>
              <button
                className='ff-fourth items-center border h-10 flex border-[--border]  hover:ring-1 hover:ring-[--primary-100] text-[--text-100] gap-3 rounded-md bg-[--bg-100] text-md font-medium hover:bg-[--bg-500] hover:text-[--text-300] flex-none justify-center p-2 px-3 transition-all ease-in 300s'
                onClick={fetchNextPage}
              >
                {status === 'pending' ? <Spinner /> : "Load More"}
              </button>
            </div>
          ):''}
        </div>
      </div>
    </div>
  );
}
