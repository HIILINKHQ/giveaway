import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    color: 'white', // change the input text color
    backgroundColor : "rgba(255,255,255,.1) !important",
    borderColor : "red !important"
  },
})

const winpad = definePartsStyle({
    field: {
      border: '1px solid',
      borderColor: 'rgba(255,255,255,.3) !important',
      background: 'rgba(255,255,255,.1) !important',

      _hover : {
        borderColor: 'rgba(255,255,255,.7) !important',
      },
      _active : {
        borderColor: 'rgba(255,255,255,.7) !important',
      },
      _invalid: {
        borderColor: 'red.300 !important',
      },
      _placeholder: {
        color : "rgba(255,255,255,.2)"
      },

  
      // Let's also provide dark mode alternatives
      _dark: {
        borderColor: 'rgba(255,255,255,.3) !important',
        background: 'rgba(255,255,255,.1) !important',
      },
    },
    addon: {
      border: '1px solid',
      borderColor: 'gray.200',
      background: 'gray.200',
      borderRadius: 'full',
      color: 'gray.500',
  
      _dark: {
        borderColor: 'gray.600',
        background: 'gray.600',
        color: 'gray.400',
      },
    },
  })

export const inputTheme = defineMultiStyleConfig({ baseStyle, variants : {winpad} })