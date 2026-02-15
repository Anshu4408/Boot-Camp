import React from "react";

const ButtonFooter = ({ name }) => {
  return (
    <button className="flex items-center gap-1 bg-white/10 rounded-full px-3 md:px-4 py-1.5 md:py-2 border border-[#B3B3B3] hover:bg-white hover:text-[#292740] transition font-bold text-[9px] md:text-[10px]">
      
      <span>{name}</span>

      <svg
        className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
      
    </button>
  );
};

export default ButtonFooter;