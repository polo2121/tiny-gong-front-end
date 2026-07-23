import { Margarine, Quicksand, Chewy } from "next/font/google";
import localFont from "next/font/local";

export const margarine = Margarine({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-margarine",
  display: "swap",
});

export const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chewy",
  display: "swap",
});

export const umoe = localFont({
  src: [
    {
      path: "../public/fonts/U-Moe-Handwritten-Font.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-umoe",
  display: "swap",
});
