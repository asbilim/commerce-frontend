"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// Brand logos
const BRAND_LOGOS = [
  "/brands/nike.svg",
  "/brands/adidas.svg",
  "/brands/puma.svg",
  "/brands/reebok.svg",
  "/brands/under-armour.svg",
  "/brands/new-balance.svg",
  "/brands/asics.svg",
  "/brands/fila.svg",
];

// Categories with real images
const CATEGORIES = [
  {
    title: "Men's Fashion",
    image: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg",
    items: "2,345",
  },
  {
    title: "Women's Fashion",
    image: "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg",
    items: "3,456",
  },
  {
    title: "Accessories",
    image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg",
    items: "1,234",
  },
  {
    title: "Footwear",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    items: "2,789",
  },
  {
    title: "Sports",
    image: "https://images.pexels.com/photos/2729899/pexels-photo-2729899.jpeg",
    items: "1,567",
  },
  {
    title: "Lifestyle",
    image: "https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg",
    items: "2,123",
  },
];

// Featured products with real images
const FEATURED_PRODUCTS = [
  {
    title: "Premium Cotton T-Shirt",
    price: "$29.99",
    image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
  },
  {
    title: "Classic Denim Jacket",
    price: "$89.99",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
  },
  {
    title: "Leather Crossbody Bag",
    price: "$129.99",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
  },
  {
    title: "Minimalist Watch",
    price: "$199.99",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
  },
];

// Trending products with real images
const TRENDING_PRODUCTS = [
  {
    title: "Vegan Leather Jacket",
    price: "$149.99",
    image: "https://images.pexels.com/photos/3184417/pexels-photo-3184417.jpeg",
  },
  {
    title: "Minimalist Running Sneakers",
    price: "$99.99",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
  },
  {
    title: "Casual Slip-On Shoes",
    price: "$54.99",
    image: "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg",
  },
  {
    title: "Vintage Sunglasses",
    price: "$79.99",
    image:
      "https://images.pexels.com/photos/46710/sunglasses-retro-vintage-fashion-46710.jpeg",
  },
  {
    title: "Sports Cap",
    price: "$29.99",
    image: "https://images.pexels.com/photos/433919/pexels-photo-433919.jpeg",
  },
];

// Blog posts with real images
const BLOG_POSTS = [
  {
    title: "Summer Fashion Trends 2024",
    excerpt: "Discover the hottest styles for the upcoming season...",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
    date: "2024-03-15",
  },
  {
    title: "Sustainable Fashion Guide",
    excerpt: "How to build an eco-friendly wardrobe...",
    image: "https://images.pexels.com/photos/2466756/pexels-photo-2466756.jpeg",
    date: "2024-03-10",
  },
  {
    title: "Accessorizing 101",
    excerpt: "Master the art of completing your outfit...",
    image: "https://images.pexels.com/photos/1937336/pexels-photo-1937336.jpeg",
    date: "2024-03-05",
  },
];

export default function Home() {
  const t = useTranslations("homepage");
  const { scrollY } = useScroll();
  const [brandsRef, brandsApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
  });

  // Parallax effect for hero section
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Auto-scroll brands carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (brandsApi) brandsApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [brandsApi]);

  return (
    <main className="w-full flex flex-col items-center">
      {/* Hero Section with Enhanced Effects */}
      <motion.section
        className="relative w-full min-h-screen pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <Image
          src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />

        <div className="relative h-full w-full">
          <div className="container mx-auto px-4 h-[80vh] flex items-center">
            <motion.div
              className="max-w-4xl space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}>
              <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white/10 backdrop-blur-sm">
                <TextGenerateEffect
                  words={t.rich("hero.title", { br: () => " " })}
                  className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6"
                />
                <motion.p
                  className="text-xl sm:text-2xl text-white/90 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}>
                  {t("hero.subtitle")}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}>
                  <Button
                    size="lg"
                    variant="default"
                    className="group bg-white text-black hover:bg-white/90 text-lg">
                    <Link href="/shop">{t("hero.cta")}</Link>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </BackgroundGradient>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Brands Carousel with Fixed Width Images */}
      <section className="container py-16 px-4">
        <motion.h2
          className="text-xl font-medium text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          {t("brands.title")}
        </motion.h2>
        <div className="overflow-hidden max-w-6xl mx-auto" ref={brandsRef}>
          <div className="flex gap-8">
            {BRAND_LOGOS.map((logo, i) => (
              <motion.div
                key={i}
                className="flex-none w-32 h-20 bg-white/5 backdrop-blur-sm rounded-lg p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <div className="w-full h-full relative">
                  <Image
                    src={logo}
                    alt={`Brand ${i + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container py-24">
        <h2 className="text-3xl font-bold mb-12">{t("categories.title")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {CATEGORIES.map((category, i) => (
            <Card
              key={i}
              className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="overflow-hidden rounded-lg">
                  <motion.img
                    src={category.image}
                    alt={category.title}
                    className="object-cover w-full h-48"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{category.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.items} items
                </p>
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
          {FEATURED_PRODUCTS.map((product, i) => (
            <Card
              key={i}
              className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="relative aspect-[3/4] p-0 overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-muted/10 py-24 w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">{t("products.trending")}</h2>
            <Button variant="ghost" className="group">
              {t("common.view_all")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            {TRENDING_PRODUCTS.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="relative aspect-square p-0 overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-md font-bold">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.price}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
          {BLOG_POSTS.map((post, i) => (
            <Card
              key={i}
              className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="relative aspect-video p-0 overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {post.date}
                </p>
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
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>
                <h2 className="text-3xl font-bold">{t("banner.title")}</h2>
                <p>{t("banner.subtitle")}</p>
              </motion.div>
              <Button variant="secondary" className="w-fit group">
                {t("banner.cta")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
            <div className="relative">
              <motion.img
                src="https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg"
                alt="Summer Collection"
                className="object-cover w-full h-full"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Newsletter */}
      <section className="container py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}>
          <Card>
            <CardContent className="p-12 text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">{t("newsletter.title")}</h2>
              <p className="text-muted-foreground">
                {t("newsletter.subtitle")}
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <Input
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1"
                />
                <Button>{t("newsletter.cta")}</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
