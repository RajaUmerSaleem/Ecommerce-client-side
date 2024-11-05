import React from 'react'

const page = () => {
  return (
  <>
  <div className='font-serif text-[50px] p-5'>
    All Products
  </div>
    <div className='flex flex-wrap gap-5 justify-center'>
        <div className='w-[300px] h-[300px] bg-gray-300 flex justify-center items-center'>Product 1</div>
        <div className='w-[300px] h-[300px] bg-gray-300 flex justify-center items-center'>Product 2</div>
        <div className='w-[300px] h-[300px] bg-gray-300 flex justify-center items-center'>Product 3</div>
        <div className='w-[300px] h-[300px] bg-gray-300 flex justify-center items-center'>Product 4</div>
        <div className='w-[300px] h-[300px] bg-gray-300 flex justify-center items-center'>Product 5</div>
        <div className='w-[300px] h-[300px] bg-gray-300 flex justify-center items-center'>Product 6</div>
    </div>
  </>
  )
}

export default page
