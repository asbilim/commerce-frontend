import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/config/theme";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { EcommerceFooter } from "@/components/layout/footer";
import { EcommerceHeader } from "@/components/layout/header";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Toaster />
            <EcommerceHeader />
            {children}
            <EcommerceFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
