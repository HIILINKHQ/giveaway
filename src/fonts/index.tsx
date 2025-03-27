import localFont from "next/font/local";
import { Poppins, Roboto } from "next/font/google";

const orbitron = Poppins({
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-orbitron",
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "500", "900"],
});

export { orbitron, roboto };
