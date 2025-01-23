import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/fonctions/theme-toggle";
import { SignupForm } from "@/components/forms/signup";
export default function HomePage() {
  const t = useTranslations("homepage");
  return (
    <div>
      <h1>{t("greeting", { name: "john" })}</h1>
      <p>{t("welcome")}</p>
      <ThemeToggle />
    </div>
  );
}
