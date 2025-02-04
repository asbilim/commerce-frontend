"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const t = useTranslations("homepage");

  return (
    <main className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-muted/5" />
        <div className="container relative h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-left duration-1000">
              {t.rich("hero.title", {
                br: () => <br />,
              })}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-in fade-in slide-in-from-left duration-1000 delay-150">
              {t("hero.subtitle")}
            </p>
            <Button
              size="lg"
              className="group animate-in fade-in slide-in-from-left duration-1000 delay-300">
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Brands Carousel */}
      <section className="container py-12">
        <h2 className="text-lg font-medium text-muted-foreground mb-6">
          {t("brands.title")}
        </h2>
        <div className="flex overflow-x-auto gap-8 pb-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-32 rounded-lg" />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container py-24">
        <h2 className="text-3xl font-bold mb-12">{t("categories.title")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <Skeleton className="aspect-square rounded-lg mb-6" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-24">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">{t("products.featured")}</h2>
          <Button variant="ghost" className="group">
            {t("common.view_all")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="group">
              <CardHeader className="relative aspect-[3/4] p-0 overflow-hidden">
                <Skeleton className="w-full h-full" />
              </CardHeader>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-muted/10 py-24 w-full">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">{t("products.trending")}</h2>
            <Button variant="ghost" className="group">
              {t("common.view_all")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="group">
                <CardHeader className="relative aspect-square p-0 overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </CardHeader>
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container py-24">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">{t("blog.title")}</h2>
          <Button variant="ghost" className="group">
            {t("common.view_all")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="group">
              <CardHeader className="relative aspect-video p-0 overflow-hidden">
                <Skeleton className="w-full h-full" />
              </CardHeader>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Banner */}
      <section className="container py-24">
        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <CardContent className="p-12 flex flex-col justify-center space-y-6">
              <h2 className="text-3xl font-bold">{t("banner.title")}</h2>
              <p>{t("banner.subtitle")}</p>
              <Button variant="secondary" className="w-fit group">
                {t("banner.cta")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
            <Skeleton className="aspect-square lg:aspect-auto" />
          </div>
        </Card>
      </section>

      {/* Newsletter */}
      <section className="container py-24">
        <Card>
          <CardContent className="p-12 text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">{t("newsletter.title")}</h2>
            <p className="text-muted-foreground">{t("newsletter.subtitle")}</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                placeholder={t("newsletter.placeholder")}
                className="flex-1"
              />
              <Button>{t("newsletter.cta")}</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
