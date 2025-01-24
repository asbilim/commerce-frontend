"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  label = "Password",
  placeholder = "Enter your password",
  value = "",
  onChange,
  customRequirements,
  ...rest
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [localPassword, setLocalPassword] = useState(value);

  useEffect(() => {
    setLocalPassword(value);
  }, [value]);

  const defaultRequirements = [
    { regex: /.{12,}/, text: "At least 12 characters long" },
    { regex: /[0-9]/, text: "Contains at least 1 number" },
    { regex: /[a-z]/, text: "Contains at least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "Contains at least 1 uppercase letter" },
    {
      regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      text: "Contains at least 1 special character",
    },
    {
      regex: /^(?!.*(.)\1{2}).*$/,
      text: "No 3 consecutive repeated characters",
    },
  ];

  const requirements = customRequirements || defaultRequirements;

  const checkStrength = (pass) => {
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(localPassword);
  const strengthScore = strength.filter((req) => req.met).length;

  const getStrengthColor = (score) => {
    if (score === 0) return "bg-border";
    if (score <= 2) return "bg-red-500";
    if (score <= 4) return "bg-orange-500";
    if (score <= 5) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setLocalPassword(newPassword);
    onChange(newPassword); // Pass the value directly
  };

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div>
      <div className="space-y-2">
        <div className="relative">
          <Input
            className="pe-9"
            placeholder={placeholder}
            type={isVisible ? "text" : "password"}
            value={localPassword}
            onChange={handleChange}
            {...rest}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}>
            <AnimatePresence mode="wait">
              {isVisible ? (
                <EyeOff size={16} key="hide" />
              ) : (
                <Eye size={16} key="show" />
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemax={requirements.length}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(strengthScore / requirements.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${getStrengthColor(
            strengthScore
          )} transition-all duration-500 ease-out`}
        />
      </motion.div>
    </div>
  );
}

export { PasswordInput };
