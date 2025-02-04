// lib/fonts.ts
import localFont from "next/font/local";

// This sets up a custom CSS variable so we can use it easily in className or in CSS.
export const clashGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/clash/OTF/ClashGrotesk-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/clash/OTF/ClashGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/clash/OTF/ClashGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/clash/OTF/ClashGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/clash/OTF/ClashGrotesk-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/clash/OTF/ClashGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-grotesk",
  display: "swap", // optional: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
});
