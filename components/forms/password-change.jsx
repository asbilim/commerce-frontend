"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl"; 

const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(12, { message: "Password must be at least 12 characters" })
      .regex(/[0-9]/, { message: "Password must contain at least 1 number" })
      .regex(/[a-z]/, {
        message: "Password must contain at least 1 lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least 1 uppercase letter",
      })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        message: "Password must contain at least 1 special character",
      }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

function PasswordChangeForm() {
  const t = useTranslations(); // Optional: If using i18n
  const {
    register,
    handleSubmit,
    control, // Add control for Controller
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordChangeSchema),
  });

  const onSubmit = (data) => {
    const { currentPassword, newPassword } = data;
    console.log("Password Change Data:", { currentPassword, newPassword });
    // TODO: Implement backend password change submission
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-center">
        {t("passwordChange.title") || "Change Password"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          {/* Current Password Field */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              {t("passwordChange.currentPassword") || "Current Password"}
            </Label>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  id="currentPassword"
                  {...field}
                  placeholder={
                    t("passwordChange.placeholder_currentPassword") ||
                    "Enter current password"
                  }
                />
              )}
            />
            {errors.currentPassword && (
              <p className="text-xs text-red-500">
                {t(errors.currentPassword.message) ||
                  errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">
              {t("passwordChange.newPassword") || "New Password"}
            </Label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  id="newPassword"
                  {...field}
                  placeholder={
                    t("passwordChange.placeholder_newPassword") ||
                    "Enter new password"
                  }
                />
              )}
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500">
                {t(errors.newPassword.message) || errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">
              {t("passwordChange.confirmNewPassword") || "Confirm New Password"}
            </Label>
            <Controller
              name="confirmNewPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  id="confirmNewPassword"
                  {...field}
                  placeholder={
                    t("passwordChange.placeholder_confirmNewPassword") ||
                    "Confirm new password"
                  }
                />
              )}
            />
            {errors.confirmNewPassword && (
              <p className="text-xs text-red-500">
                {t(errors.confirmNewPassword.message) ||
                  errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full">
          {t("passwordChange.changePasswordButton") || "Change Password"}
        </Button>
      </form>
    </div>
  );
}

export { PasswordChangeForm };
