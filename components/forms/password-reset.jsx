"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

const emailSchema = z.object({
  email: z
    .string()
    .email({ message: "auth.passwordReset.validation.invalid_email" }),
});

function PasswordResetLinkForm() {
  const [emailSent, setEmailSent] = useState(false);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data) => {
    console.log("Reset Link Request:", data.email);
    // TODO: Backend call to send reset password link
    setEmailSent(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg space-y-6">
      {!emailSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-xl font-semibold text-center">
            {t("auth.passwordReset.title")}
          </h2>
          <div className="space-y-2">
            <Label>{t("auth.passwordReset.email")}</Label>
            <Input
              placeholder={t("auth.passwordReset.placeholder_email")}
              type="email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{t(errors.email.message)}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            {t("auth.passwordReset.sendResetLink")}
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">
            {t("auth.passwordReset.email_sent_title")}
          </h2>
          <p className="text-muted-foreground">
            {t("auth.passwordReset.email_sent_message")}
          </p>
          <Button
            variant="outline"
            onClick={() => setEmailSent(false)}
            className="w-full">
            {t("auth.passwordReset.send_again")}
          </Button>
        </div>
      )}
    </div>
  );
}

export { PasswordResetLinkForm };
