"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "/images/flags/gb.svg",
  },
  {
    code: "fr",
    name: "Français",
    flag: "/images/flags/fr.svg",
  },
  // Add more languages as needed
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (languageCode) => {
    const newPathname = pathname.replace(`/${locale}`, `/${languageCode}`);
    router.push(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            width={24}
            height={24}
            className="rounded-sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-2">
            <Image
              src={language.flag}
              alt={language.name}
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
