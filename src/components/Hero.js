import React from "react";
import { playfairBlack } from "@/app/font";
import { Sparkles,ArrowRight } from "lucide-react";
const items = Array.from({ length: 200 });
const activeCells = [14, 105, 167, 180, 200, 17, 45, 78, 123, 156, 189];

const Hero = () => {
  return (<>
    <div className="relative w-full  mx-auto
  aspect-[2/1] min-h-[420px] sm:min-h-[500px]
  bg-[#615977] rounded-2xl overflow-hidden">


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
 bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)] z-20" />

      <div className="pointer-events-none absolute
  left-[20%] top-[15%] bottom-[65%] w-[0.5px] md:w-[0.75px]
  bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)] z-20" />

      <div className="pointer-events-none absolute
  left-[10%] top-[45%] bottom-[25%] w-[0.5px] md:w-[0.75px]
  bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)] z-20" />

      <div className="pointer-events-none absolute
  left-[60%] top-[5%] bottom-[75%] w-[0.5px] md:w-[0.75px]
  bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)] z-20" />

      <div className="pointer-events-none absolute
  left-[80%] top-[35%] bottom-[45%] w-[0.5px] md:w-[0.75px]
  bg-[linear-gradient(180deg,#090C17_0%,#622CD5_51%,#090C17_100%)] z-20" />

      {/* Horizontal line */}
      <div className="pointer-events-none absolute
  top-[80%] left-[15%] right-[15%]
  h-[0.5px] md:h-[0.75px]
  bg-[linear-gradient(90deg,#391D77_0%,#CBAEE4_51%,#3F2083_100%)]" />

      <div className="pointer-events-none absolute inset-0
  bg-[radial-gradient(circle_at_center,transparent_90%,#010510_70%,#010510_100%)]" />

      {/* Soft diagonal purple wash */}
      {/* <div className="pointer-events-none absolute inset-0
        bg-gradient-to-bl from-[#622CD5]/20 via-transparent to-transparent" /> */}
      {/* Left glow */}
      <div className="pointer-events-none absolute
  left-[20%] top-[-20%]
  w-[4vw] max-w-[140px]
  h-[80vh] max-h-[640px]
  bg-[#5e22de]
  blur-[40px] md:blur-[60px]
  rotate-[-48deg]" />
  <div className="pointer-events-none absolute
  left-[30%] top-[-20%]
  w-[8vw] max-w-[140px]
  h-[80vh] max-h-[640px]
  bg-[#010510]
  blur-[40px]
 
  rotate-[-48deg]" />
   <div className="pointer-events-none absolute
  left-[5%] top-[-5%]
  w-[8vw] max-w-[140px]
  h-[80vh] max-h-[640px]
  bg-[#010510]
 
  blur-[70px]
  rotate-[-48deg]" />
      <div className="pointer-events-none absolute
  right-[-5%] top-[-15%]
  w-[16vw] max-w-[180px]
  h-[60vh] max-h-[400px]
  bg-[#48219b]
  blur-[40px] md:blur-[60px]
  rounded-full
  rotate-[-48deg]" />
   <div className="pointer-events-none absolute
  right-[5%] top-[10%]
  w-[7vw] max-w-[180px]
  h-[70vh] max-h-[400px]
   bg-[#010510]
 blur-[40px] md:blur-[60px]
  rounded-full
  rotate-[-48deg]" />
   <button className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10   text-[6px] text-[#ffffffc9] md:text-[12px] mb-[14%] flex justify-center items-center gap-2 bg-[#010102] px-5 py-2 rounded-full shadow-[inset_0_0_8px_rgba(113,78,189,0.6)]"><span><Sparkles className="w-2 h-2 md:w-3 md:h-3 text-[#714EBD]" /></span>Welcome to the site_name</button>
      <div className="absolute top-1/2 left-1/2 z-10
  -translate-x-1/2 -translate-y-1/2
  text-white flex flex-col items-center text-center
  px-4 max-w-[90%] sm:max-w-[700px]">
   
        <p
          className="inline-block
  text-sm sm:text-2xl md:text-3xl lg:text-6xl font-semibold
  leading-[1.2] md:leading-[1.15] pb-2
  bg-gradient-to-b from-[#FFFFFF] to-[#999999]
  bg-clip-text text-transparent"
          style={{ fontFamily: "var(--font-playfair-black)" }}
        >
          Ready when you are.
        </p>
        <p className='text-sm sm:text-2xl md:text-4xl  font-medium mb-4
  bg-gradient-to-b from-[#FFFFFF] to-[#999999]
  bg-clip-text text-transparent'>  Let’s get started.</p>
        <p className='text-[6px]  md:text-[13px] my-4 text-center text-[#ACACAC]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, quasi aspernatur! Libero et atque praesentium.</p>
        <span className="md:flex-row md:gap-4  mt-8 flex flex-col justify-center items-center w-full max-w-[300px]">
          <button className="text-[6px] text-[#ffffffc9] md:text-[12px] mb-[14%] flex justify-center items-center gap-2 bg-[linear-gradient(90deg,#622CD5_0%,#33176F_100%)] font-semibold px-2 md:px-5 md:py-2 py-1 rounded-full w-full "><span className="">Get Started</span><ArrowRight className="w-2 h-2 md:w-3 md:h-3 font-semibold" /></button>
      <button className="text-[6px] text-[#ffffffc9] px-2 md:px-5 md:py-2 py-1 md:text-[12px] mb-[14%] flex justify-center items-center gap-2 bg-[#01010200]  rounded-full  border border-[#503982d6] font-semibold w-full">Learn More</button>
      
        </span>
        </div>

    </div>




  </>
  );
};

export default Hero;