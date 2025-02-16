"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function ShopFilters({ currentCategory, currentSubcategory }) {
  const t = useTranslations("shop");

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="categories">
          <AccordionTrigger>{t("categories.title")}</AccordionTrigger>
          <AccordionContent>
            {/* Category filters */}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>{t("price")}</AccordionTrigger>
          <AccordionContent>
            <Slider 
              defaultValue={[0, 1000]} 
              min={0} 
              max={1000} 
              step={10}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>{t("availability.title")}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="inStock" />
                <label htmlFor="inStock">{t("availability.inStock")}</label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 