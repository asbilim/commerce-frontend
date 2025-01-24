"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { LoadingButton as Button } from "../ui/loading-button";
import { resendVerificationEmail } from "../services/auth";

function PendingPage({ email }) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  // Add a cooldown state to control when the button is clickable again
  const [cooldown, setCooldown] = useState(false);

  const handleResendEmail = async () => {
    setLoading(true);
    setCooldown(true);

    await resendVerificationEmail(email);
    setLoading(false);

    // Disable button for 60 seconds
    setTimeout(() => {
      setCooldown(false);
    }, 60000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl space-y-4">
      <h2 className="text-2xl font-semibold text-center text-primary">
        {t("auth.pending.title")}
      </h2>
      <p className="text-center text-muted-foreground">
        {t("auth.pending.message", { email: email })}
      </p>
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {t("auth.pending.check_spam")}
      </div>

      <div className="text-center mt-4">
        <Button
          onClick={handleResendEmail}
          loading={loading}
          disabled={loading || cooldown}>
          {t("auth.pending.resend_email_button")}
        </Button>
      </div>

      {cooldown && (
        <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t("auth.pending.resend_cooldown_message") ||
            "Please wait 1 minute before trying again."}
        </div>
      )}
    </div>
  );
}

export { PendingPage };
