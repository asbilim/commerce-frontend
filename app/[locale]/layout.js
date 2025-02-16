import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { EcommerceFooter } from "@/components/layout/footer";
import { EcommerceHeader } from "@/components/layout/header";
import { clashGrotesk } from "@/lib/fonts";
import { Providers } from "@/components/providers/providers";

export const metadata = {
  title: "Modern Ecommerce shop",
  description: "This is a full nextjs Ecommerce customizable shop",
};

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={clashGrotesk.variable}>
      <body>
        <Providers messages={messages} locale={locale}>
          <Toaster />
          <EcommerceHeader />
          {children}
          <EcommerceFooter />
        </Providers>
      </body>
    </html>
  );
}
