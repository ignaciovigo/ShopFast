import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? -1000 : 1000,
        opacity: 0
      };
    }
  };
  const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};
export default function Carousel({ images,initialIndex }) {
    
    const [[page,direction], setPage] = useState([initialIndex,0])

    const imageIndex = wrap(0, images?.length, page);

    const paginate =(newDirection) => {
        setPage([page + newDirection, newDirection]);
      };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="rounded-[16px] order-2 overflow-hidden"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div className="p-2 hidden sm:block order-3 border-solid border-2 rounded-full hover:bg-gray-800/30 active:scale-90 duration-100 cursor-pointer" onClick={() => paginate(1)}>
      <HiChevronRight className="pointer-events-none w-6 h-6" />
      </div>
      <div className="p-2 hidden sm:block  order-1  border-solid border-2 rounded-full hover:bg-gray-800/30 active:scale-90 duration-100 cursor-pointer " onClick={() => paginate(-1)}>
        
      <HiChevronLeft className="pointer-events-none w-6 h-6 " />
      </div>
    </>
  )
}
