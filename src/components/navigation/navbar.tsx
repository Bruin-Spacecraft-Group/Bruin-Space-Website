"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Rapid", href: "/rapid" },
  { name: "Overseer", href: "#" },
  { name: "Contact Us", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-6 inset-x-4 z-50 h-16 max-w-7xl mx-auto rounded-full bg-black/10 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 hover:bg-black/40 hover:border-white/30 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)]">
        <div className="h-full flex items-center justify-between px-6">
          
          <div className="flex-1 flex justify-start">
            <a href="/" className="block">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-8 w-auto hover:opacity-80 transition-opacity" 
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end gap-3">
            <Button className="rounded-full bg-white text-black font-medium hover:bg-neutral-200 hover:scale-105 transition-all duration-300 px-6 hidden sm:flex">
              Join Us
            </Button>

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-neutral-950 border-l border-white/10 z-[70] p-6 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-medium text-neutral-300 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white">
                  Join Us
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}