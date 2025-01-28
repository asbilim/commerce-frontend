"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useRouter } from "@/i18n/routing";
import { LoadingButton as Button } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { FaGoogle } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { registerUser } from "@/components/services/auth";
import { toast } from "sonner";

const signupSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "auth.signup.validation.username_min" }),
    email: z
      .string()
      .email({ message: "auth.signup.validation.invalid_email" }),
    password1: z
      .string()
      .min(12, { message: "auth.signup.validation.password_min" })
      .regex(/[0-9]/, { message: "auth.signup.validation.password_number" })
      .regex(/[a-z]/, { message: "auth.signup.validation.password_lowercase" })
      .regex(/[A-Z]/, { message: "auth.signup.validation.password_uppercase" })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        message: "auth.signup.validation.password_special",
      }),
    password2: z.string(),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "auth.signup.validation.password_mismatch",
    path: ["password2"],
  });

function SignupForm() {
  const t = useTranslations();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    control, // Add control for Controller
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();
  const onSubmit = async (data) => {
    setLoading(true);
    const result = await registerUser(data);
    console.log(result);
    setLoading(false);
    console.log("Form Data:", data);
    if (result.success) {
      toast.success(t("auth.signup.success") || "Verification email sent.");
      router.push({
        pathname: "/auth/account-activation/sent",
        query: { email: data.email },
      });
    } else {
      if (result.errors) {
        Object.keys(result.errors).forEach((key) => {
          toast.error(`${key}: ${result.errors[key].join(", ")}`);
        });
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google Signup Initiated");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">{t("auth.signup.username")}</Label>
            <Input
              id="username"
              placeholder={t("auth.signup.placeholder_username")}
              {...register("username")}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <p className="text-xs text-red-500">
                {t(errors.username.message)}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.signup.email")}</Label>
            <Input
              id="email"
              placeholder={t("auth.signup.placeholder_email")}
              type="email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{t(errors.email.message)}</p>
            )}
          </div>

          {/* Password1 Field using Controller */}
          <div className="space-y-2">
            <Label htmlFor="password1">{t("auth.signup.password")}</Label>
            <Controller
              name="password1"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  id="password1"
                  {...field}
                  placeholder={t("auth.signup.password")}
                />
              )}
            />
            {errors.password1 && (
              <p className="text-xs text-red-500">
                {t(errors.password1.message)}
              </p>
            )}
          </div>

          {/* Password2 Field */}
          <div className="space-y-2">
            <Label htmlFor="password2">
              {t("auth.signup.confirm_password")}
            </Label>
            <Input
              id="password2"
              type="password"
              placeholder={t("auth.signup.placeholder_password")}
              {...register("password2")}
              aria-invalid={errors.password2 ? "true" : "false"}
            />
            {errors.password2 && (
              <p className="text-xs text-red-500">
                {t(errors.password2.message)}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          loading={loading}
          spinnerVariant="pinwheel">
          {t("auth.signup.signup_button")}
        </Button>
      </form>

      {/* Separator */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">
            {t("auth.signup.or_continue_with")}
          </span>
        </div>
      </div>

      {/* Google Signup Button */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleGoogleSignup}>
        <FaGoogle className="mr-2" /> {t("auth.signup.google_signup")}
      </Button>

      {/* Signin Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {t("auth.signup.already_have_account")}{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            {t("auth.signup.signin")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export { SignupForm };
