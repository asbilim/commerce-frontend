"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function EcommerceFooter() {
  const t = useTranslations("ui.footer");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const successAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <footer className="bg-background border-t mt-48">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">EcomStore</h3>
            <p className="text-muted-foreground">{t("company.description")}</p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                aria-label={t("company.social.facebook")}>
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                aria-label={t("company.social.instagram")}>
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                aria-label={t("company.social.twitter")}>
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                aria-label={t("company.social.youtube")}>
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("quick_links.title")}</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/shop"
                className="hover:text-primary transition-colors">
                {t("quick_links.shop_all")}
              </Link>
              <Link
                href="/new-arrivals"
                className="hover:text-primary transition-colors">
                {t("quick_links.new_arrivals")}
              </Link>
              <Link
                href="/best-sellers"
                className="hover:text-primary transition-colors">
                {t("quick_links.best_sellers")}
              </Link>
              <Link
                href="/sale"
                className="hover:text-primary transition-colors">
                {t("quick_links.sale")}
              </Link>
              <Link
                href="/blog"
                className="hover:text-primary transition-colors">
                {t("quick_links.blog")}
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t("customer_service.title")}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/contact"
                className="hover:text-primary transition-colors">
                {t("customer_service.contact")}
              </Link>
              <Link
                href="/shipping"
                className="hover:text-primary transition-colors">
                {t("customer_service.shipping")}
              </Link>
              <Link
                href="/returns"
                className="hover:text-primary transition-colors">
                {t("customer_service.returns")}
              </Link>
              <Link
                href="/faq"
                className="hover:text-primary transition-colors">
                {t("customer_service.faq")}
              </Link>
              <Link
                href="/size-guide"
                className="hover:text-primary transition-colors">
                {t("customer_service.size_guide")}
              </Link>
            </nav>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("newsletter.title")}</h3>
            <p className="text-muted-foreground">
              {t("newsletter.description")}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="shrink-0"
                  aria-label={t("newsletter.subscribe")}>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              <AnimatePresence>
                {isSubscribed && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={successAnimation}
                    className="flex items-center gap-2 text-sm text-primary">
                    <CheckCircle className="h-4 w-4" />
                    <span>{t("newsletter.success")}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Contact Information */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{t("contact.address")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{t("contact.email")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{t("contact.phone")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container px-4 py-6 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {t("bottom_bar.copyright", { year: new Date().getFullYear() })}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors">
              {t("bottom_bar.privacy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors">
              {t("bottom_bar.terms")}
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-primary transition-colors">
              {t("bottom_bar.accessibility")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { EcommerceFooter };
