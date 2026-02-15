import React from "react";
import { playfairBlack } from "@/app/font";
const items = Array.from({ length: 200 });
const activeCells = [14, 105, 167, 180, 200, 17, 45, 78, 123, 156, 189];

const Hero = () => {
  return (<>
    <div className="relative flex bg-[#615977] min-w-[80vw] aspect-[2/1] rounded-2xl overflow-hidden ">


      {/* Grid */}
      <div className="grid grid-cols-10 sm:grid-cols-15 lg:grid-cols-20 w-full
  bg-[linear-gradient(130.47deg,#CBAEE4_3.71%,#42248B_73.02%)] overflow-hidden">
        {items.map((_, index) => (
          <div
            key={index}
            className={`
              aspect-square bg-[#010510] border border-[#0D0F14]
              ${activeCells.includes(index) ? "bg-[#0D0F14]" : ""}
            `}
          />
        ))}
      </div>
      {/* Vertical lines */}
      <div className="pointer-events-none absolute
  left-[30%]  top-[65%] bottom-[5%] w-[0.5px] md:w-[0.75px]
 bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)]" />

      <div className="pointer-events-none absolute
  left-[20%] top-[15%] bottom-[65%] w-[0.5px] md:w-[0.75px]
  bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)]" />

      <div className="pointer-events-none absolute
  left-[10%] top-[45%] bottom-[25%] w-[0.5px] md:w-[0.75px]
  bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)]" />

      <div className="pointer-events-none absolute
  left-[60%] top-[5%] bottom-[75%] w-[0.5px] md:w-[0.75px]
  bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)]" />

      <div className="pointer-events-none absolute
  left-[80%] top-[35%] bottom-[45%] w-[0.5px] md:w-[0.75px]
  bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)]" />

      {/* Horizontal line */}
      <div className="pointer-events-none absolute
  top-[80%] left-[25%] right-[25%] h-[0.5px] md:h-[0.75px]
  bg-[linear-gradient(90deg,#391D77_0%,#CBAEE4_51%,#3F2083_100%)]" />

      <div className="pointer-events-none absolute inset-0
  bg-[radial-gradient(circle_at_center,transparent_90%,#010510_70%,#010510_100%)]" />

      {/* Soft diagonal purple wash */}
      {/* <div className="pointer-events-none absolute inset-0
        bg-gradient-to-bl from-[#622CD5]/20 via-transparent to-transparent" /> */}
      {/* Left glow */}
      <div className="pointer-events-none absolute
 
  w-[120px] h-[640px]
  left-[20%] top-[-20%]
  bg-[#48219b]
 
  blur-[50px]

  rotate-[-48deg]" />
   <div className="pointer-events-none absolute
 
  w-[180px] h-[400px]
  right-[0%] top-[-25%]
  bg-[#48219b]
  blur-[50px]
  rounded-full

  rotate-[-48deg]" />
      
    </div>



    <div className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center justify-center gap-y-1'>
      <p style={{ fontFamily: "var(--font-playfair-black)" }} className={`text-4xl sm:text-3xl md:text-6xl font-semibold
  bg-gradient-to-b from-[#FFFFFF] to-[#999999]
  bg-clip-text text-transparent    font-[var(--font-playfair-black)] `}>Ready when you are. </p>
      <p className='text-2xl sm:text-3xl md:text-4xl font-semibold
  bg-gradient-to-b from-[#FFFFFF] to-[#999999]
  bg-clip-text text-transparent'>  Let’s get started.</p>
      <p className='text-sm my-4 text-center text-[#ACACAC]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, quasi aspernatur! Libero et atque praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti magnam illum repellendus reiciendis debitis? Voluptatum?</p>
    </div>
  </>
  );
};

export default Hero;