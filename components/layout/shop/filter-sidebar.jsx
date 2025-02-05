"use client";

import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FilterSidebar() {
  const t = useTranslations("shop");
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL Query Management
  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/shop?${params.toString()}`);
  };

  // Extract current price range from the URL or fallback
  const priceRange = searchParams.get("price")?.split("-") || ["0", "1000"];
  const [minPrice, maxPrice] = priceRange;

  // Extract current categories from the URL or fallback
  const selectedCategories = searchParams.getAll("category") || [];
  const selectedBrands = searchParams.getAll("brand") || [];
  const selectedRating = searchParams.get("rating") || "";
  const selectedAvailability = searchParams.get("availability") || "all";

  return (
    <motion.aside
      className="space-y-8"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}>
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">{t("filters")}</h2>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">{t("price")}</h3>
          <Slider
            defaultValue={[Number(minPrice), Number(maxPrice)]}
            max={1000}
            step={10}
            onValueChange={(value) =>
              updateParams({ price: `${value[0]}-${value[1]}` })
            }
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">{t("categories.title")}</h3>
          {["electronics", "clothing", "books"].map((category) => {
            const isChecked = selectedCategories.includes(category);
            return (
              <label
                key={category}
                className="flex items-center space-x-2 mb-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    const categories = new Set(selectedCategories);
                    if (checked) {
                      categories.add(category);
                    } else {
                      categories.delete(category);
                    }

                    const categoryParam = Array.from(categories).join(",");
                    updateParams({ category: categoryParam });
                  }}
                />
                <span className="text-sm">{t(`categories.${category}`)}</span>
              </label>
            );
          })}
        </div>

        {/* Brands Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">{t("brands.title")}</h3>
          {["apple", "samsung", "nike"].map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label key={brand} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    const brands = new Set(selectedBrands);
                    if (checked) {
                      brands.add(brand);
                    } else {
                      brands.delete(brand);
                    }

                    const brandParam = Array.from(brands).join(",");
                    updateParams({ brand: brandParam });
                  }}
                />
                <span className="text-sm">{t(`brands.${brand}`)}</span>
              </label>
            );
          })}
        </div>

        {/* Ratings Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">{t("ratings")}</h3>
          <RadioGroup
            value={selectedRating}
            onValueChange={(value) => updateParams({ rating: value })}>
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={rating.toString()} />
                <span className="text-sm">{t("rating", { rate: rating })}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Availability Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">{t("availability.title")}</h3>
          <RadioGroup
            value={selectedAvailability}
            onValueChange={(value) => updateParams({ availability: value })}>
            {["all", "inStock", "outOfStock"].map((availability) => (
              <label
                key={availability}
                className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={availability} />
                <span className="text-sm">
                  {t(`availability.${availability}`)}
                </span>
              </label>
            ))}
          </RadioGroup>
        </div>
      </Card>
    </motion.aside>
  );
}
