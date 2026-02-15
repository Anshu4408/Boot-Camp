"use client";

import { useState } from "react";

export default function Faqs({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full  mb-5">

      <div className="w-[150px] h-[16px] bg-[#190E3F] rounded-t-md"></div>


      <div className="bg-[#190E3F] rounded-b-lg rounded-tr-lg overflow-hidden flex flex-col shadow-[0_15px_35px_rgba(0,0,0,0.3)]  ">


        <div
          className={`grid transition-[grid-template-rows,padding] duration-500 ease-in-out px-3 ${isOpen ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]"
            }`}
        >

          <div className={`min-h-0 overflow-hidden bg-[#CFD5EB] rounded-t-md -rotate-1 ${isOpen ? "mb-[-15]" : "min-h-0"}`} >

            <div
              className={`p-6 pb-8 text-[#3b3b52] md:text-base  leading-relaxed transition-all duration-500 ease-out text-[10px] ${isOpen
                ? "translate-y-0 opacity-100 delay-100 "
                : "translate-y-4 opacity-0"
                }`}
            >
              {children}
            </div>
          </div>
        </div>


        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="relative z-10 w-full bg-[#615292] hover:bg-[#6e5c9e] border-none p-4 px-6 flex justify-between items-center text-white text-[17px] font-medium cursor-pointer text-left transition-colors duration-200"
        >
          <span className='text-[12px] md:text-md lg:text-lg'>{title}</span>


          <div className="relative w-3.5 h-3.5 flex-shrink-0">

            <span
              className={`absolute top-[6px] left-0 w-3.5 h-[2px] bg-white rounded-sm transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
                }`}
            ></span>

            <span
              className={`absolute top-0 left-[6px] w-[2px] h-3.5 bg-white rounded-sm transition-all duration-300 ease-in-out ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
            ></span>
          </div>
        </button>
      </div>
    </div>
  );
}