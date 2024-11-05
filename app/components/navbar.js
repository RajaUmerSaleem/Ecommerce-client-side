import React from 'react'
import Link from 'next/link';
const Navbar = () => {
  return (
    <nav className='flex text-white bg-purple-800 h-[90px] justify-center px-3 pt-5'>
      <div className='font-bold w-[60%] px-5 list-none'><li><Link href="/">Ecommerce</Link></li></div>
      <ul className="flex list-none gap-3 w-[40%] justify-around px-[30px]">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/all-products">All Products</Link></li>
        <li><Link href="/categories">Categories</Link></li>
        <li><Link href="/account">Account</Link></li>
        <li><Link href="/cart">Cart</Link></li>
      </ul>
      <div><img src="search-svgrepo-com.svg" alt="this is serach icon" className='w-[25px] filter invert' /></div>
    </nav>
  )
}

export default Navbar
