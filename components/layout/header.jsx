"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
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
import { Menu, MoveRight, X, ShoppingCart, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/fonctions/theme-toggle";
import { LanguageSwitcher } from "../fonctions/language-switcher";

function EcommerceHeader() {
  const t = useTranslations("ui.header");

  const navigationItems = [
    { title: t("home"), href: "/" },
    {
      title: t("shop"),
      description: t("explore_products"),
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

  const [isOpen, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Link href={item.href} legacyBehavior passHref>
                        <Button variant="ghost">{item.title}</Button>
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div>
                            <p>{item.title}</p>
                            <p className="text-muted-foreground text-sm">
                              {item.description}
                            </p>
                          </div>
                          <Button size="sm" className="mt-10">
                            {t("view_all", { title: item.title })}
                          </Button>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
          <Link href="/" className="font-semibold text-xl">
            EcomStore
          </Link>
        </div>
        <div className="flex justify-end w-full gap-4 items-center">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem>
                    {t("welcome", { username })}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Link href="/auth/login">{t("login")}</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && <span>{t("cart", { count: cartCount })}</span>}
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export { EcommerceHeader };
