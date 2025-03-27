import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const winpad = defineStyle({
  border: '1px solid', // change the appearance of the border
  borderColor : "rgba(255,255,255,.1)",
  backgroundColor :"rgb(6, 5, 8)"
})

const winpadWhite = defineStyle({
    border: '1px solid', // change the appearance of the border
    borderColor : "rgba(255,255,255,.1)",
    backgroundColor :"rgb(245, 245, 245)",
    color: "black"
  })

export const buttonTheme = defineStyleConfig({
  variants: { winpad, winpadWhite },
})