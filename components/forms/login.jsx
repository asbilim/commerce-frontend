"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { FaGoogle } from "react-icons/fa";
import { useTranslations } from "next-intl";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

function LoginForm() {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    control, // Add control for Controller
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // TODO: Implement backend login submission
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Initiated");
    // TODO: Implement Google OAuth login
  };

  return (
    <div className="w-full max-w-md mx-auto p-6   rounded-xl shadow-lg space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.login.email") || "Email"}</Label>
            <Input
              id="email"
              placeholder={
                t("auth.login.placeholder_email") || "hi@yourcompany.com"
              }
              type="email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-xs text-red-500">
                {t(errors.email.message) || errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field using Controller */}
          <div className="space-y-2">
            <Label htmlFor="password">
              {t("auth.login.password") || "Password"}
            </Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  id="password"
                  {...field}
                  placeholder={
                    t("auth.login.placeholder_password") ||
                    "Enter your password"
                  }
                />
              )}
            />
            {errors.password && (
              <p className="text-xs text-red-500">
                {t(errors.password.message) || errors.password.message}
              </p>
            )}
            <div className="text-right">
              <Link
                href="/auth/reset-password"
                className="text-xs text-primary hover:underline">
                {t("auth.login.forgot_password") || "Forgot password?"}
              </Link>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full">
          {t("auth.login.login_button") || "Log In"}
        </Button>
      </form>

      {/* Separator */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">
            {t("auth.login.or_continue_with") || "Or continue with"}
          </span>
        </div>
      </div>

      {/* Google Login Button */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleGoogleLogin}>
        <FaGoogle className="mr-2" />{" "}
        {t("auth.login.google_login") || "Log in with Google"}
      </Button>

      {/* Signup Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {t("auth.login.no_account") || "Don't have an account?"}{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            {t("auth.login.signup") || "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export { LoginForm };
