import React from 'react'

const Card = ({ name, img, logo }) => {
    return (
        <div>
            <div className='bg-[#2B2742] w-[40vw] h-[20vw]  md:w-[30vw] md:h-[15vw] rounded-lg md:rounded-2xl flex gap-4 justify-between'>

                < img src={img} alt="community image" className=' object-cover rounded-2xl' />
                <div className='flex flex-col gap-y-4 items-end p-4'>

                    <img src={logo} alt="community logo" className=' w-0 md:w-30 rounded-2xl mx-2  ' />
                    <p className='text-[10px] text-white  line-clamp-1  md:line-clamp-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod itaque cumque doloremque veritatis facilis, mollitia illo alias. Quaerat cupiditate provident quo animi, officiis dolores alias.</p>
                    <button className='flex text-white p-1 justify-center items-center md:gap-1 cursor-pointer'>
                        <p className='m-0 text-[10px] md:text-lg'>EXPLORE</p>
                        <p className='m-0 text-[10px] md:text-lg'>&gt;</p>
                    </button> 
                </div>
            </div>
        </div>
    )
}

export default Card
