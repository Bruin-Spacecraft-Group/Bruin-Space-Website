"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export const Timeline = ({ data }: { data: TimelineItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 50%"],
  });

  const height = useTransform(scrollYProgress, [0, 1], [0, containerHeight]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto py-20 px-4 md:px-8"
    >

      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-neutral-900 border-x border-neutral-800 h-full hidden md:block"></div>
      
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] h-full hidden md:block overflow-hidden z-0">
         <motion.div
            style={{ height }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-cyan-500 to-purple-600 origin-top opacity-100"
          >
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-cyan-400 to-transparent blur-sm"></div>
         </motion.div>
      </div>

      <div className="relative z-10 flex flex-col gap-12 mt-10">
        {data.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
    return (
      <div
          className={cn(
            "flex flex-col md:flex-row gap-6 items-center relative",
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          )}
      >
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-4 border-neutral-800 z-20 flex items-center justify-center shadow-2xl">
              <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"
              />
          </div>
          
          <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }} 
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              
              className={cn(
                  "w-full md:w-1/2",
                  index % 2 === 0 ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"
              )}
          >
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-10 group-hover:opacity-50 blur transition duration-500"></div>
                <div className="relative p-6 md:p-8 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-2xl h-full">
                    <div className={cn(
                        "flex items-center mb-3",
                        index % 2 === 0 ? "md:justify-end" : "justify-start"
                    )}>
                        <span className="font-mono text-sm font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                            {item.year}
                        </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-base md:text-lg">
                        {item.description}
                    </p>
                </div>
            </div>
          
          </motion.div>
          <div className="hidden md:block w-1/2"></div>
      </div>
    );
};