"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get('/api/category');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    initial: { x: '-100vw' },
    animate: { x: 0 },
    exit: { x: '100vw' },
    transition: { duration: 1, repeat: Infinity, repeatType: 'loop' },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Categories</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {categories.map((category) => (
          <motion.div
            key={category._id}
            className="bg-gray-200 p-4 rounded-md shadow-md"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold">{category.name}</h2>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryPage;