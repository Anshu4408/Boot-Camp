import React from 'react'
import { Geist_Mono } from "next/font/google";
import ButtonFooter from './ButtonFooter';
import FooterParabola from './FooterParabola';

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const Footer = () => {
  return (
    <div className={geistMono.variable}>
      <div className="relative w-full min-h-[140px] md:h-[120px]">

        <FooterParabola />

        <div className="relative z-10 flex flex-col md:flex-row  md:items-end justify-between h-full px-4 md:px-6 py-4 pt-10 text-white ">

          
          <p className="order-1 md:order-none md:absolute md:left-1/2 md:-translate-x-1/2 text-xl md:text-2xl font-bold text-[#BAB8B8] mb-2 md:mb-0">
            LOGO
          </p>

      
          <div className="order-3 md:order-none text-xs md:text-sm font-mono text-[#A1A1A1]  md:text-left  ">
            © 2026 course website. All Rights Reserved.
          </div>

      
          <div className="order-2 md:order-none flex gap-3 md:gap-4 mb-2 md:mb-0">
            <ButtonFooter name="CONTACT" />
            <ButtonFooter name="LOCATE US" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;