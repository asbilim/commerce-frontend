"use client";

import { motion } from "framer-motion";
import ProductCard from "./product-card";

const recentlyViewedProducts = [
  {
    id: 7,
    title: "Smart Watch",
    price: 249,
    imageUrl: "/images/mock/smartwatch.jpg",
    recentlyViewed: true,
  },
  {
    id: 8,
    title: "Portable Charger",
    price: 39,
    imageUrl: "/images/mock/charger.jpg",
    recentlyViewed: true,
  },
  {
    id: 9,
    title: "Noise-Cancelling Headphones",
    price: 299,
    imageUrl: "/images/mock/premium-headphones.jpg",
    recentlyViewed: true,
  },
];

export default function RecentlyViewed() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentlyViewedProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
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
