"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ProductGrid from "@/components/shop/product-grid";
import ShopFilters from "@/components/shop/filters";

export default function CategoryPage() {
  const t = useTranslations("shop");
  const params = useParams();
  const category = params.category;

  return (
    <div className="container mx-auto pt-32 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <ShopFilters currentCategory={category} />
        </aside>
        <main className="flex-1">
          <h1 className="text-4xl font-bold mb-8">
            {t(`categories.${category}`, { fallback: category })}
          </h1>
          <ProductGrid category={category} />
        </main>
      </div>
    </div>
  );
} 