// displaying current competitions...
"use client";


import {  HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { MAXW } from "@/utils/globals";

const CurrentCompLoader = () => {

  return (
    <VStack
      w="100%"
      maxW={MAXW}
      alignItems="stretch"
      bg="linear-gradient(60deg, #000, #111924)"
      border="1px solid rgba(255,255,255,.05)"
      px={["10px", "16px", "16px", null]}
      py={["16px", "16px", "16px", null]}
      borderRadius={["12px", "12px", "12px", null]}
      justifyContent="flex-start"
      flex={1}
    >

    <Skeleton aspectRatio={1} w="100%" borderRadius="6px"/>

    <Skeleton w="100%" h="32px"  borderRadius="6px"/>
   <HStack>
   <VStack
       py="12px"
       spacing={0}
       color="white"
       alignItems="flex-start"
       backdropFilter="blur(10px)"
       w="100%"
     >
       <Text fontSize="14px" fontWeight={700}>
       Seats
       </Text>
       <Skeleton w="100%" h="20px" />
     </VStack>
     <VStack
       py="12px"
       spacing={0}
       color="white"
       alignItems="flex-start"
       backdropFilter="blur(10px)"
       w="100%"
     >
       <Text fontSize="14px" fontWeight={700}>
         Ending in
       </Text>
       <Skeleton w="100%" h="20px" />
     </VStack>
   </HStack>

   <Skeleton w="100%" h="32px"  borderRadius="6px"/>
   
    </VStack>
  );
};

export default CurrentCompLoader;
