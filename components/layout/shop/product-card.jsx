"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export default function ProductCard({ product }) {
  const t = useTranslations("shop");

  if (!product) {
    return (
      <Card className="p-4">
        <Skeleton className="h-40 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </Card>
    );
  }

  return (
    <motion.div
      className="group hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}>
      <Card>
        <div className="aspect-square relative overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Skeleton className="w-full h-full" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-muted-foreground">${product.price}</p>
          <div className="mt-4 flex justify-between items-center">
            <Button size="sm">{t("add_to_cart")}</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
