"use client";  
import Image from "next/image";  
import { useState, useEffect } from "react";  
import axios from "axios";  
import { Swiper, SwiperSlide } from 'swiper/react';  
import 'swiper/swiper-bundle.css'; // Import Swiper styles  
import SwiperCore, { Navigation, Pagination } from 'swiper';  

// Install Swiper modules  
SwiperCore.use([Navigation, Pagination]);  

export default function Home() {  
  const [products, setProducts] = useState([]);  

  useEffect(() => {  
    async function fetchProducts() {  
      try {  
        const res = await axios.get('/api/product');  
        setProducts(res.data);  
      } catch (error) {  
        console.error("Error fetching products:", error);  
      }  
    }  

    fetchProducts();  
  }, []);  

  return (  
    <>  
      <div>Product List</div>  
      <div className="w-[100vw] flex gap-3 flex-wrap justify-center items-center ">  
        {products.map((product) => (  
          <div key={product._id} className="bg-gray-500 text-white p-4 rounded-md w-[20vw]">  
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>  
            <p className="mb-2">{product.description}</p>  
            <p className="text-lg mb-4">${product.price}</p>   
            {product.images.length > 1 ? (  
              <Swiper  
                navigation  
                pagination={{ clickable: true }}  
                className="mySwiper"  
              >  
                {product.images.map((image, index) => (  
                  <SwiperSlide key={index}>  
                    <img   
                      src={image}   
                      alt={`${product.name} image ${index + 1}`}   
                      width={300}   
                      height={300}   
                      className="w-full h-48 object-cover rounded-md"   
                    />  
                  </SwiperSlide>  
                ))}  
              </Swiper>  
            ) : (  
              <img   
                src={product.images[0]}   
                alt={`${product.name} image`}   
                width={300}   
                height={300}   
                className="w-full h-48 object-cover rounded-md"   
              />  
            )}  
          </div>  
        ))}  
      </div>  
    </>  
  );  
}