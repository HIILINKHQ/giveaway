import { orbitron } from "@/fonts";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import { useEffect, useState } from "react";

type NftCardProps = {
  prizeId: bigint;
};

const ApecoinCard = ({ prizeId }: NftCardProps) => {
  return (
    <Box p="1px" borderRadius="14px" pos="relative">
      <VStack
        maxW="100%"
        minW="100%"
        borderRadius="16px"
        className={`${orbitron.className}`}
        color="white"
        alignItems="flex-start"
        pos="relative"
        zIndex={2}
      >
        <AspectRatio
          w="100%"
          ratio={1}
          borderRadius="12px"
          overflow="hidden"
          bg="black"
        >
          <Box
            pos="relative"
            bg="url(/apecoin.gif)"
            bgPos="center"
            bgSize="contain"
            bgRepeat="no-repeat"
          >
            {/* <Image src="/apecoin.gif" zIndex={1} w="100%"/> */}
            {/* <Skeleton pos="absolute" aspectRatio={1} w="100%" zIndex={0} /> */}
          </Box>
        </AspectRatio>

        <VStack pt="12px" w="100%" px="10px">
          <HStack justifyContent="center" w="100%">
            <Text fontSize="18px" isTruncated >
            {Number(prizeId ?? 0)} $APE GIVEAWAY
            </Text>
          
          </HStack>
        </VStack>
      </VStack>
      {/* <Box className="animated-border-box-glow" />
      <Box className="animated-border-box" /> */}
    </Box>
  );
};

export default ApecoinCard;
