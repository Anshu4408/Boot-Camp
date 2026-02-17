import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '@/components/Hero'
import Card from '@/components/Card'
import Card2 from '@/components/Card2'
import Faqs from '@/components/Faqs'
import Footer from '@/components/Footer'
import { BiSolidQuoteAltRight } from "react-icons/bi";



const page = () => {
  return (<>
    <Navbar />
    <div className='min-h-screen  p-3 flex flex-col gap-5 px-7 mb-20 md:mb-40 gap-y-5 md:gap-y-10 '>

      <Hero />
      <div className='flex flex-col gap-5 md:gap-10 items-center justify-center'>
        <div>
          <h1 className='text-lg md:text-5xl font-bold text-center mb-2 '>EXPLORE OUR COMMUNITIES</h1>

          <p className='text-[#555151] text-xl text-center'>Lorem ipsum dolor sit amet consectetur adiolestiae quisquam enim sed beatae possimus a natus! Nobis similique quo alias!</p>

        </div>
        <div className='flex items-center justify-around w-full my-5 '>
          <Card name="Community 1" img="./img7.svg" logo="./image2.svg" />
         <div className='flex flex-col items-end '>

        
             <svg width="54" height="37" viewBox="0 0 54 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54 28.149C54 18.766 52.233 11.8497 48.699 7.4C44.7408 2.46667 38.2853 0 29.3325 0V11.6078C35.2696 11.6078 38.7565 14.7516 39.7932 21.0392C40.1702 23.0706 40.3586 25.4405 40.3586 28.149V37H54V28.149ZM24.6675 28.149C24.6675 18.766 22.9005 11.8497 19.3665 7.4C15.4084 2.46667 8.95288 0 -2.6226e-06 0V11.6078C5.93717 11.6078 9.42408 14.7516 10.4607 21.0392C10.8377 23.0706 11.0262 25.4405 11.0262 28.149V37H24.6675L24.6675 28.149Z" fill="black" />
          </svg>
          <p className='text-center text-[#555151] px-20 text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, magnam?</p>
 
          </div>
        </div>
        
        <div className='flex items-center justify-around w-full my-5  '>
          <div className='flex flex-col '>

          <svg width="54" height="37" viewBox="0 0 54 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 28.149C0 18.766 1.76702 11.8497 5.30105 7.4C9.25916 2.46667 15.7147 0 24.6675 0V11.6078C18.7304 11.6078 15.2435 14.7516 14.2068 21.0392C13.8298 23.0706 13.6414 25.4405 13.6414 28.149V37H0V28.149ZM29.3325 28.149C29.3325 18.766 31.0995 11.8497 34.6335 7.4C38.5916 2.46667 45.0471 0 54 0V11.6078C48.0628 11.6078 44.5759 14.7516 43.5393 21.0392C43.1623 23.0706 42.9738 25.4405 42.9738 28.149V37H29.3325V28.149Z" fill="black" />
          </svg>
            <p className='text-center text-[#555151] px-20 text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, magnam?</p>

          </div>

        
          <Card name="Community 1" img="./img7.svg" logo="./image2.svg" />
        </div>
        <div className='flex items-center justify-around w-full my-5  '>

          <Card name="Community 1" img="./img7.svg" logo="./image2.svg" />
          <div className='flex flex-col items-end '>

          <p className='text-center text-[#555151] text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, magnam?</p>


          <svg width="54" height="37" viewBox="0 0 54 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M54 8.85098C54 18.234 52.233 25.1503 48.699 29.6C44.7408 34.5333 38.2853 37 29.3325 37V25.3922C35.2696 25.3922 38.7565 22.2484 39.7932 15.9608C40.1702 13.9294 40.3586 11.5595 40.3586 8.85098V0H54V8.85098ZM24.6675 8.85098C24.6675 18.234 22.9005 25.1503 19.3665 29.6C15.4084 34.5333 8.95288 37 -2.6226e-06 37V25.3922C5.93717 25.3922 9.42408 22.2484 10.4607 15.9608C10.8377 13.9294 11.0262 11.5595 11.0262 8.85098V0H24.6675V8.85098Z" fill="black" />
          </svg>
          </div>


        </div>

      </div>


      <h1 className='text-lg md:text-3xl '>FAQs</h1>
      <div>
        <Faqs title="How does the application process work?">
          It just works. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, ad.
        </Faqs>

        <Faqs title="How does the application process work?">
          It just works. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, laudantium?
        </Faqs>
        <Faqs title="How does the application process work?">
          It just works. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odio!
        </Faqs>
        <Faqs title="How does the application process work?">
          It just works. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, ad.
        </Faqs>

        <Faqs title="How does the application process work?">
          It just works. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, laudantium?
        </Faqs>
        <Faqs title="How does the application process work?">
          It just works. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odio!
        </Faqs>
      </div>
    </div>
    <Footer />
  </>
  )
}

export default page
