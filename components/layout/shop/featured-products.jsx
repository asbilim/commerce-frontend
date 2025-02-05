"use client";

import { motion } from "framer-motion";
import ProductCard from "./product-card";

const featuredProducts = [
  {
    id: 4,
    title: "Bluetooth Speaker",
    price: 129,
    imageUrl: "/images/mock/speaker.jpg",
    featured: true,
  },
  {
    id: 5,
    title: "Fitness Tracker",
    price: 89,
    imageUrl: "/images/mock/fitness-tracker.jpg",
    featured: true,
  },
  {
    id: 6,
    title: "Wireless Earbuds",
    price: 149,
    imageUrl: "/images/mock/earbuds.jpg",
    featured: true,
  },
];

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: index * 0.2,
              duration: 0.3,
            },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
