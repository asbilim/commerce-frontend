"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-[20px] z-[1] opacity-40 blur-xl transition duration-500 group-hover:opacity-75",
          animate && "animate-gradient",
          className
        )}
        style={{
          background:
            "linear-gradient(to right, #00cc88, #4c49bd, #0891b2, #00cc88)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className={cn("relative z-[2] rounded-[20px]", className)}>
        {children}
      </div>
    </div>
  );
};
