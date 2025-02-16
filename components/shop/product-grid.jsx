"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProductGrid({ category, subcategory }) {
  const t = useTranslations("shop");
  
  // This would normally fetch products based on category/subcategory
  const products = []; // Placeholder for product data

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}>
          <Card>
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t("add_to_cart")}</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
} 