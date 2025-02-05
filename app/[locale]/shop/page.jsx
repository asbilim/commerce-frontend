import { Suspense } from "react";
import { useTranslations } from "next-intl";
import ProductList from "@/components/layout/shop/product-list";
import FilterSidebar from "@/components/layout/shop/filter-sidebar";
import LoadingSkeleton from "@/components/reusables/loading-skeleton";

export default function ShopPage() {
  const t = useTranslations("shop");

  return (
    <main className="container py-8 px-4 my-24 md:px-12">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <FilterSidebar />
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
}
