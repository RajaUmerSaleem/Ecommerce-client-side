"use client"
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewProduct() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const name = searchParams.get('name');
    const description = searchParams.get('description');
    const price = searchParams.get('price');
    const image = searchParams.get('image');
    if (name && description && price && image) {
      setProduct({ name, description, price, images: [image] });
    }
  }, [searchParams]);
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cart.some(item => item._id === product._id);
    if (productExists) {
      toast.error('Product is already in the cart!');
    } else {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      toast.success('Product added to cart!');
    }
  };
  if (!product) {
    return <div className="flex justify-center items-center h-[85vh]">Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <button onClick={() => window.location.href = '/'} className="m-2 bg-red-500 text-white rounded-md w-[50px]">Back</button>
      <div className="flex justify-center items-center h-[85vh] p-4">
        <div className="bg-yellow-300 shadow-md rounded-lg p-6 max-w-sm">
          <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold">Price: ${product.price}</p>
          <button onClick={() => handleAddToCart(product)} className="m-2 bg-green-500 text-white rounded-md w-full">Add to Cart</button>
        </div>
      </div>
    </>
  );
}