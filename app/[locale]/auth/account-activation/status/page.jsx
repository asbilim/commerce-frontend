"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";

export default function ActivationPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("is");
  const t = useTranslations();
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl space-y-6 text-center">
      {status === "success" ? (
        <>
          <h2 className="text-2xl font-semibold text-green-600">
            {t("auth.activation.success_title")}
          </h2>
          <p className="text-muted-foreground">
            {t("auth.activation.success_message")}
          </p>
          <Button onClick={handleRedirect} className="w-full">
            {t("auth.activation.login_button")}
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-red-600">
            {t("auth.activation.failure_title")}
          </h2>
          <p className="text-muted-foreground">
            {t("auth.activation.failure_message")}
          </p>
          <Button onClick={handleRedirect} variant="outline" className="w-full">
            {t("auth.activation.try_again_button")}
          </Button>
        </>
      )}
    </div>
  );
}
