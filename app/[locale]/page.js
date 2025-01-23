import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("homepage");
  return (
    <div>
      <h1>{t("greeting", { name: "john" })}</h1>
      <p>{t("welcome")}</p>
    </div>
  );
}
