"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('/api/product');
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    async function fetchCategories() {
      try {
        const res = await axios.get('/api/category');
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchProducts();
    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

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

  const handleReadMore = (product) => {
    const query = new URLSearchParams({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.images[0]
    }).toString();
  
    router.push(`/viewproduct?${query}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category._id === selectedCategory : true;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <>
      <ToastContainer />
      <div className="w-[99vw] flex gap-3 flex-wrap justify-center items-center p-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md w-[70%]"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories
            .filter((category) => category.parent === null)
            .map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="w-[99vw] flex gap-3 flex-wrap justify-center items-center p-2">
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            className="w-[20vw] flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-slate-200 p-4 rounded-md w-[100%]">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl mb-2">{product.name}</h2>
              <p className="text-lg mb-4">${product.price}</p>
              <button
                className="bg-blue-500 text-white p-2 rounded-md" 
                onClick={() => handleReadMore(product)}
              >
                Read More
              </button>
            </div>
            <button
              className="bg-white w-full m-2 border border-blue-900 rounded-md"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </>
  );
}