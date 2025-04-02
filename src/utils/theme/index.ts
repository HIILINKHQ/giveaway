// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./componentStyles/Input";
import { buttonTheme } from "./componentStyles/Button";
import { Inter, Poppins } from "next/font/google";

// 2. Call `extendTheme` and pass your custom values
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
  components: {
    Input: inputTheme,
    Button: buttonTheme,
  },
  fonts: {
    body: poppins.style.fontFamily,
    inter: inter.style.fontFamily,
  },
});

export default theme;
