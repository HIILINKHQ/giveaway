"use client"

import React from 'react';
import { useForm as useFormSpree } from '@formspree/react';
import { useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  Text,
  Center,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { MAXW } from '@/utils/globals';

import Link from "next/link";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

const datas = [
  {
    icon: FaXTwitter,
    path: "https://x.com/WinPad_io",
  },
  {
    icon: FaDiscord,
    path: "https://discord.gg",
  },
];

const Socials = () => {
  return (
    <HStack spacing="12px" fontSize="24px">
      {datas.map((e) => (
        <Link href={e.path} key={e.path} target="_blank">
          <Box
            color="rgba(255,255,255,1)"
            transition="ease-out 0.3s"
            _hover={{ color: "rgba(255,255,255,1)" }}
          >
            <e.icon />
          </Box>
        </Link>
      ))}
    </HStack>
  );
};



const Info = () => {
  

  return (
   <Center minH="100vh" maxW={MAXW} mx="auto" p={["10px", null, 0 , null]} zIndex={1}>
    <VStack color="white" spacing="16px">
        <Text maxW={["100%", null, "400px", "500px"]} textAlign="center">ApeChain&apos;s premiere crypto & NFT competition platform powered by ThankApe. Launching Q1 2025 with Auctions, Minigames & more. We Win Together!</Text>
        <Socials  />
    </VStack>
   </Center>
  );
};

export default Info;
