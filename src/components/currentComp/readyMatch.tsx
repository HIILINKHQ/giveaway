// displaying current competitions...
"use client";

import { Box, Button, Center, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import NftCard from "../nftCard";
import { MAXW } from "@/utils/globals";
import Timer from "./timer";
import CurrentCompLoader from "./currentCompLoader";
import { HiOutlineClock, HiOutlineLockClosed } from "react-icons/hi2";
import { orbitron } from "@/fonts";
import MatchEntries from "../join/MatchEntries";
import ApecoinCard from "./ApecoinCard";
import { formatAddress } from "@/utils/helpers/formatAddress";

type CurrentCompProps = {
  data: {
    allowedTiers: bigint[];
    endDate: bigint;
    exists: boolean;
    id: string;
    isEnded: boolean;
    prizeAddress: string;
    nftId: bigint;
    totalEntries: bigint;
    winner: string;
    prizeType : number;
    prizeId : bigint;
    creator: string;
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  refetch: any;
};

const ReadyMatch = ({ data }: CurrentCompProps) => {
  const { prizeAddress, prizeId, totalEntries, endDate, id } = data;


  return (
    
      <VStack
      w="100%"
      maxW={MAXW}
      alignItems="stretch"
      bg="linear-gradient(60deg, rgb(15, 15, 15),rgba(22, 22, 22, 0.95))"
      border="1px solid rgba(255,255,255,.1)"
      px={["10px", "16px", "16px", null]}
      py={["16px", "16px", "16px", null]}
      borderRadius={["16px", "16px", "16px", null]}
      justifyContent="flex-start"
      flex={1}
      pos="relative"
      overflow="hidden"
      cursor="pointer"
      className="match_card"
      >
        <Box pos="relative">
          <Box pos="relative" overflow="hidden" borderRadius="12px">
          {data.prizeType === 1 ? <ApecoinCard prizeId={data.prizeId} /> :  <NftCard
              contractAddress={prizeAddress ?? ""}
              tokenId={Number(prizeId).toString() ?? ""}
            />}
           
          </Box>

          <Box
            pos="absolute"
            display="flex"
            aspectRatio={1}
            justifyContent="center"
            alignItems="flex-end"
            w="100%"
            top="0"
            left="0"
            zIndex={2}
            p="16px"
          >
            <HStack
              bg="black"
              color="white"
              px="16px"
              py="8px"
              borderRadius="16px"
              spacing="10px"
              border="1px solid rgba(255,255,255,.2)"
            >
              <HiOutlineLockClosed strokeWidth={2} size={18} color="#2948ff" />
              <Text className={orbitron.className}>Giveaway Closed</Text>
            </HStack>
          </Box>
        </Box>
        {/* <Box w="90%" borderTop="1px dashed rgba(255,255,255,.1)" mx="auto" /> */}
       <MatchEntries totalEntries={totalEntries} matchId={data.id}/>

      <HStack h="40px" w="100%" alignItems="center" className={orbitron.className}>
      <Text w="100%" color="white" textAlign="center" opacity={0.6}> Winner will picked soon
      </Text>
      </HStack>

  <HStack w="100%" justifyContent="space-between"  px="6px" color="white" pt="8px">
      <Text fontSize="13px" fontWeight={500} opacity={0.4}>Created by</Text>
      <HStack >
          <Text fontSize="13px" fontWeight={500}>{formatAddress(data?.creator)}</Text>
          <Box bg="gray" boxSize="20px" borderRadius="50%"/>
        </HStack>
      </HStack>
        <Box className="grainy-bg" opacity={0.2} zIndex={-1} />
      </VStack>
  );

  return <CurrentCompLoader />;
};

export default ReadyMatch;
