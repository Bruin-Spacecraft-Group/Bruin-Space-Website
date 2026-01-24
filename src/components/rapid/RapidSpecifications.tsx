"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, type Variants } from "motion/react";

interface SpecItem {
  title: string;
  description: string;
  image: string;
}

export const RapidSpecifications = ({ specs }: { specs: SpecItem[] }) => {
  const { scrollY } = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(true);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const prev = scrollY.getPrevious() ?? 0;
      setIsScrollingDown(latest > prev);
    });
  }, [scrollY]);

  const cardVariants: Variants = {
    hidden: ({ directionDown }: { directionDown: boolean }) => ({
      opacity: 0,
      y: directionDown ? -50 : 50, 
    }),
    visible: ({ directionDown, index, total }: { directionDown: boolean; index: number; total: number }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        bounce: 0.4,
        delay: directionDown 
          ? index * 0.1 
          : (total - 1 - index) * 0.1,
      },
    }),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {specs.map((spec, index) => (
        <motion.div
          key={index}
          
          custom={{ 
            directionDown: isScrollingDown, 
            index: index, 
            total: specs.length 
          }}
          
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          viewport={{ once: false, amount: 0.2 }}
          
          className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.15)]"
        >
          <div className="h-56 w-full bg-black/50 relative overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-slate-900"></div>
            
            <img
              src={spec.image}
              alt={spec.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
              {spec.title}
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              {spec.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};