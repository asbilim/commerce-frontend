"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MoveRight, Search, ShoppingCart, User, X } from "lucide-react";
import { ThemeToggle } from "@/components/fonctions/theme-toggle";
import { LanguageSwitcher } from "../fonctions/language-switcher";

function EcommerceHeader() {
  const t = useTranslations("ui.header");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const navigationItems = [
    { title: t("home"), href: "/" },
    {
      title: t("shop"),
      description: t("explore_products"),
      featured: [
        {
          title: t("new_arrivals"),
          href: "/shop/new-arrivals",
          image: "/api/placeholder/300/200",
          description: "Discover our latest collections and trending items",
        },
        {
          title: t("best_sellers"),
          href: "/shop/best-sellers",
          image: "/api/placeholder/300/200",
          description: "Shop our most popular products",
        },
      ],
      items: [
        { title: t("new_arrivals"), href: "/shop/new-arrivals" },
        { title: t("best_sellers"), href: "/shop/best-sellers" },
        { title: t("sale"), href: "/shop/sale" },
        { title: t("all_products"), href: "/shop/all" },
      ],
    },
    {
      title: t("categories"),
      description: t("browse_categories"),
      featured: [
        {
          title: t("electronics"),
          href: "/category/electronics",
          image: "/api/placeholder/300/200",
          description: "Latest gadgets and technology",
        },
        {
          title: t("clothing"),
          href: "/category/clothing",
          image: "/api/placeholder/300/200",
          description: "Fashion for every style",
        },
      ],
      items: [
        { title: t("electronics"), href: "/category/electronics" },
        { title: t("clothing"), href: "/category/clothing" },
        { title: t("home_garden"), href: "/category/home-garden" },
        { title: t("books"), href: "/category/books" },
      ],
    },
    { title: t("about"), href: "/about" },
    { title: t("contact"), href: "/contact" },
  ];

  const searchVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background/80 backdrop-blur-md border-b">
      <div className="container relative mx-auto min-h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  {item.href ? (
                    <Link href={item.href} className="text-lg font-medium">
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <div className="text-lg font-medium">{item.title}</div>
                      <div className="ml-4 space-y-1">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block text-sm text-muted-foreground hover:text-primary">
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[900px] p-6">
                          <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="text-lg font-medium">
                                {item.description}
                              </h4>
                              <div className="grid grid-cols-2 gap-4">
                                {item.items?.map((subItem) => (
                                  <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    className="group block space-y-2 rounded-md p-3 hover:bg-accent">
                                    <div className="font-medium group-hover:text-primary transition-colors">
                                      {subItem.title}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {item.featured?.map((feature) => (
                                <Link
                                  key={feature.title}
                                  href={feature.href}
                                  className="block space-y-2">
                                  <div className="overflow-hidden rounded-lg">
                                    <motion.img
                                      src={feature.image}
                                      alt={feature.title}
                                      className="aspect-[3/2] object-cover w-full"
                                      whileHover={{ scale: 1.05 }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  </div>
                                  <h3 className="font-medium">
                                    {feature.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-xl absolute left-1/2 -translate-x-1/2">
          EcomStore
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={searchVariants}
                className="absolute right-0 top-full mt-2 w-full max-w-md bg-background border rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={t("search")}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem>
                    {t("welcome", { username })}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/auth/login" className="w-full">
                    {t("login")}
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          <div className="hidden sm:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export { EcommerceHeader };
