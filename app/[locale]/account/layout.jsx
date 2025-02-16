"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function AccountLayout({ children }) {
  const { data: session } = useSession();
  const t = useTranslations("account.navigation");
  const pathname = usePathname();

  const navigation = [
    {
      title: t("profile"),
      href: "/account/profile",
    },
    {
      title: t("invoices"),
      href: "/account/invoices",
    },
    {
      title: t("settings"),
      href: "/account/settings",
    },
  ];

  if (!session) {
    return (
      <main className="container py-8 px-4 my-24 md:px-12">
        <Card>
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">{t("please_login")}</h1>
            <Button asChild>
              <Link href="/auth/login">{t("login")}</Link>
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="container py-8 px-4 my-24 md:px-12">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 space-y-4">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors",
                  pathname === item.href ? "bg-accent" : "transparent"
                )}>
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
