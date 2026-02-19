'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WelcomeBanner = ({ userName = 'Kashish' }) => {
  const route = useRouter();
  return (
    <div className="bg-gradient-to-r from-[#281981] to-[#6D63A8] rounded-xl p-10 py-35 text-white flex items-center justify-between overflow-hidden relative h-56">
      <div className="relative z-10 max-w-2xl">
        <h3 className="text-4xl font-bold mb-3">Hello, {userName}!</h3>
        <p className="text-lg opacity-90 leading-relaxed mb-4">
          We missed you! Check out what's new and improved in your dashboard Lorem ipsum dolor sit amet consectetur. Et ornare phasellus nulla eu eu.
        </p>
        <button className="px-6 py-3 bg-[#e7f0fd6d]  rounded-sm  text-white font-medium hover:bg-rgba(255,255,255,0.3) cursor-pointer transition" onClick={()=>route.push('/user/courses')}>
          Explore More Courses
        </button>
      </div>
      
    <Image src="/user.svg" alt="Welcome Illustration" width={300} height={200} className="absolute right-0 bottom-0 opacity-80 pointer-events-none" />
    </div>
  );
};

export default WelcomeBanner;
