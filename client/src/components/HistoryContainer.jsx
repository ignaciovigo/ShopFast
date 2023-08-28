import { HiChevronDown, HiMenuAlt4 } from "react-icons/hi";
import Spinner from "./Spinner";
import { useTicketData } from "../hooks/useTicketData";
import { motion } from "framer-motion";

export default function HistoryContainer() {
  const {
    ticketsData,
    isLoading,
    hasNextPage,
    error,
    loadMoreTickets,
    toggleTicketExpansion,
  } = useTicketData();
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <div className='max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-3'>
            <h2 className='text-2xl font-bold ff-third'>Your tickets</h2>
          </div>

          {ticketsData.length > 0
          ? ticketsData.map((ticket, index) => (
            <motion.div
              initial='hidden'
              animate='visible'
              variants={variants}
              key={index}
              className={`bg-gray-300 p-4 rounded-lg mb-4 transition-all duration-300 ease-in ff-second ${
                ticket.expanded ? "h-auto" : "h-20"
              }`}
            >
              <div className='w-full text-left focus:outline-none flex justify-between items-center'>
                <div>
                  <h3 className='text-md font-semibold ff-third'>
                    {ticket.time}
                  </h3>
                  <p className='text-gray-600 mb-2 ff-third'>
                    Total: ${ticket.amount}
                  </p>
                </div>
                <button
                  onClick={() => toggleTicketExpansion(index)}
                  className='px-2 flex items-center justify-center py-1 bg-second text-sm rounded-lg text-black ff-fourth'
                >
                  View products
                  <HiChevronDown
                    className={`w-5 h-5 ${
                      ticket.expanded && "rotate-180 text-black transition-all duration-100"
                    }`}
                  />
                </button>
              </div>
              {ticket.expanded && (
                <motion.div
                  initial='hidden'
                  animate='visible'
                  variants={variants}
                  className='mt-2 transition-all duration-300 ease-in'
                >
                   <p className='text-gray-600 mb-2 ff-third'>
                    Address: {ticket.address}
                  </p>
                  <p className='text-gray-800 ff-fourth'>
                    Products: {ticket.products}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))
        :
        <h4 className="ff-third text-2xl font-semibold text-gray-500 text-center">No tickets</h4>}
          {hasNextPage && (
            <div className='text-center mt-4'>
              <button
                disabled={isLoading}
                className='p-2 bg-second rounded-md hover:bg-yellow-500 ff-fourth'
                onClick={loadMoreTickets}
              >
                {isLoading ? <Spinner /> : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
