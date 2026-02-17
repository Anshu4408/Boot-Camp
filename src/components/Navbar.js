"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
      
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        
       
        <button className="hidden md:block bg-[#292740] text-white px-6 text-[11px] py-1 font-semibold rounded-[26pc]">
          REGISTER
        </button>

       
        <div className="font-bold  md:hidden">LOGO</div>

      
        <ul className="hidden md:flex space-x-10 font-semibold">
          <li>Solutions</li>
          <li>Features</li>
          <li>Benefits</li>
          <li>Testimonials</li>
          <li>Resources</li>
        </ul>

      
        <button className="hidden md:block bg-[#292740] text-white px-6 text-[11px] py-1 font-semibold rounded-[26pc] cursor-pointer" onClick={() => router.push("/auth")}>
          REGISTER
        </button>

   
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-5 h-[2px] bg-black"></span>
          <span className="w-5 h-[2px] bg-black"></span>
          <span className="w-5 h-[2px] bg-black"></span>
        </button>
      </div>

    
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 pb-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 font-semibold">
          <li>Solutions</li>
          <li>Features</li>
          <li>Benefits</li>
          <li>Testimonials</li>
          <li>Resources</li>
          <button className="bg-[#292740] text-white px-6 text-[11px] py-1 font-semibold rounded-[26pc] cursor-pointer" onClick={() => router.push("/auth")}>
            REGISTER
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;