"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItemCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <nav className="flex text bg-green-950 text-white h-[90px] justify-center px-3 pt-5">
      <div className="font-bold w-[60%] px-5 list-none">
        <li>
          <Link href="/">Ecommerce</Link>
        </li>
      </div>
      <ul className="flex list-none gap-3 w-[40%] justify-around px-[30px]">
        <li>
          <Link href="/" className="hover:font-semibold">Home</Link>
        </li>
        <li>
          <Link href="/categories" className="hover:font-semibold">Categories</Link>
        </li>
        <li>
          <Link href="/cart" className="hover:font-semibold">
            Cart
            <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {cartItemCount}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
