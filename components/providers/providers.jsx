"use client";

import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/config/theme";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, messages, locale }) {
  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
