"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: (product.quantity || 1) + 1 };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product._id === productId) {
        if (product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        } else if (product.quantity === 1) {
          handleRemoveFromCart(productId);
          return null;
        }
      }
      return product;
    }).filter(product => product !== null);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    window.dispatchEvent(new Event('storage'));
  };

  const calculateTotalBill = () => {
    return cart.reduce((total, product) => {
      return total + (product.price * (product.quantity || 1));
    }, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }
    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerAddress: formData.address,
      orderItems: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1, 
      })),
      totalPrice: calculateTotalBill(),
    };
    try {
      const response = await axios.post('/api/orders', orderData);
      if (response.data.success) {
        toast.success('Order placed successfully!');
        setCart([]);
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('storage'));
        setFormData({
          name: '',
          email: '',
          address: '',
        });
      } else {
        toast.error('Failed to place order.');
      }
    } catch (error) {
      toast.error('Failed to place order.');
    }
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        className='w-[90vw] flex mx-auto'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-slate-200 w-[70%] flex flex-col font-bold justify-center items-center">
          {cart.length === 0 ? (
            <p className="text-xl mt-4">Your cart is empty.</p>
          ) : (
            <div className="w-full h-[85vh] overflow-scroll overflow-x-hidden flex flex-wrap justify-center items-center gap-4 p-4">
              {cart.map((product) => (
                <motion.div
                  key={product._id}
                  className="w-[20vw] flex flex-col justify-center items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-slate-200 p-4 rounded-md w-[100%] border border-gray-300">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h2 className="text-xl mb-2">{product.name}</h2>
                    <p className="text-lg mb-4">${product.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md m-1"
                      onClick={() => handleDecreaseQuantity(product._id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{product.quantity || 1}</span>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md m-1"
                      onClick={() => handleIncreaseQuantity(product._id)}
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <div className="w-[27%] bg-yellow-800 p-2 h-[80vh] flex flex-col justify-center items-center">
          <div className='w-[80%] bg-white font-extrabold h-[20vh] flex justify-center items-center mx-auto'>
            Total Bill: ${calculateTotalBill().toFixed(2)}
          </div>
          <form onSubmit={handleSubmit} className="w-full p-4">
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Place Order</button>
          </form>
          {cart.length > 0 && (
            <button
              className="bg-red-500 text-white w-[70%] rounded-md p-2"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CartPage;