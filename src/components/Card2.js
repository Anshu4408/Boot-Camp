import React from 'react'
import Image from 'next/image'

const Card2 = ({  logo }) => {
    return (
        <div>
          <div className='bg-[#CFD5EB] w-[35vw] h-[25vw] md:w-[21vw] md:h-[15vw] rounded-lg md:rounded-2xl flex gap-4 justify-center items-center '> 
            <Image src={logo} alt="community logo" className='w-20 md:w-30 rounded-2xl mx-2  ' width={120} height={120} />
          </div>
        </div>
    )
}

export default Card2
