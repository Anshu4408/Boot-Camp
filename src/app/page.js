import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '@/components/Hero'
import Card from '@/components/Card'
import Card2 from '@/components/Card2'
import Faqs from '@/components/Faqs'
import Footer from '@/components/Footer'


const page = () => {
  return (<>
     <Navbar  />
    <div className='min-h-screen  p-3 flex flex-col gap-5 px-7 mb-20 md:mb-40 gap-y-5 md:gap-y-10 '>
     
      <Hero/>
       <h1 className='text-lg md:text-3xl '>COMMUNITIES</h1>
      <div>
       
        <div className='flex gap-5  overflow-scroll scrollbar-hide'>
          <Card name="Community 1" img="./img7.svg" logo="./image2.svg"/>
          <Card name="Community 1" img="./img7.svg" logo="./image2.svg"/>
          <Card name="Community 1" img="./img7.svg" logo="./image2.svg"/>
      
        </div>
         <div className='flex gap-5 mt-5 overflow-scroll scrollbar-hide'>
          <Card2  logo="./image3.svg" />
          <Card2  logo="./image3.svg" />
          <Card2  logo="./image3.svg" />
         
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
    <Footer/>
  </>
  )
}

export default page
