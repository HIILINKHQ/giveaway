// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
import { inputTheme } from "./componentStyles/Input"
import { buttonTheme } from "./componentStyles/Button"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
  components: {
    Input : inputTheme,
    Button : buttonTheme
  }
})


export default theme