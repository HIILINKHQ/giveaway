"use client";

import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import NftCard from "../nftCard";
import { MAXW } from "@/utils/globals";
import Timer from "./timer";
import CurrentCompLoader from "./currentCompLoader";
import Join from "../join";
import { formatAddress } from "@/utils/helpers/formatAddress";
import { HiOutlineClock } from "react-icons/hi2";
import { orbitron } from "@/fonts";
import MatchEntries from "../join/MatchEntries";
import ApecoinCard from "../currentComp/ApecoinCard";
import Link from "next/link";

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
    prizeType: number;
    prizeId: bigint;
    creator: string;
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  refetch: any;
};

const PastComp = ({ data, refetch }: CurrentCompProps) => {
  const { prizeAddress, prizeId, totalEntries, endDate, id } = data;

  console.log("data", data);
  const toast = useToast();

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
            {data.prizeType === 1 ? (
              <ApecoinCard prizeId={data.prizeId} />
            ) : (
              <NftCard
                contractAddress={prizeAddress ?? ""}
                tokenId={Number(prizeId).toString() ?? ""}
              />
            )}
            {/* <Center className={`match_card_util ${orbitron.className}`}>
              <Box textShadow="0 0 5px white" fontWeight={500}>Join now</Box>
            </Center> */}
          </Box>

          <Box
            w="40%"
            h="2px"
            bg="white"
            pos="absolute"
            top="0"
            left="30%"
            zIndex={2}
            borderRadius="50%"
          />
          <Box
            w="100%"
            h="200px"
            pos="absolute"
            top="0"
            left="0%"
            zIndex={2}
            filter="blur(2px)"
            bg="radial-gradient(53.293236277382746% 100% at 50.000000000000014% 3.5083047578154947e-12%, rgba(255, 255, 255, .1) 17.68043041229248%, rgba(0, 0, 0, 0) 71.67174816131592%);"
          />

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
            <HiOutlineClock strokeWidth={2} size={18} color="#EFB036" />

            <Text>Ended</Text>
          </HStack>
        </Box>
        </Box>

        <MatchEntries
          totalEntries={totalEntries}
          matchId={data.id}
          key={totalEntries}
        />

      

        <HStack
          w="100%"
          justifyContent="space-between"
          px="6px"
          color="white"
          pt="8px"
        >
          <Text fontSize="13px" fontWeight={500} opacity={0.4}>
            Created by
          </Text>
          <HStack>
            <Text fontSize="13px" fontWeight={500}>
              {formatAddress(data?.creator)}
            </Text>
            <Box bg="gray" boxSize="20px" borderRadius="50%" />
          </HStack>
        </HStack>
        {data?.winner !== "0x0000000000000000000000000000000000000000"  ? <Link href={`https://apescan.io/address/${data?.winner}`} target="_blank">
         <Box w="100%" pos="relative" p="1px">
        <VStack
          bg="black"
          color="white"
          zIndex={2}
          pos="relative"
          borderRadius="12px"
          spacing={0}
          className={orbitron.className}
          py="8px"
        >
          <Text fontSize={"12px"} opacity={0.5}>Winner</Text>
          <Text>{formatAddress(data?.winner)}</Text>
        </VStack>

        <Box
          className="animated-border-box"
          _before={{
            backgroundImage:
              "conic-gradient(rgba(0, 0, 0, 0),#07daff, rgba(0, 0, 0, 0) 25%)",
          }}
          zIndex={1}
        />
        <Box
          className="animated-border-box-glow"
          _before={{
            backgroundImage:
              "conic-gradient(rgba(0, 0, 0, 0),#07daff, rgba(0, 0, 0, 0) 25%)",
          }}
          zIndex={1}
        />
      </Box></Link> : <HStack flexGrow={1} color="white" zIndex={1} justifyContent="center" className={orbitron.className} opacity={1}>
        <Text>Match Cancelled.</Text></HStack>}

        <Box className="grainy-bg" opacity={0.2} zIndex={-1} />
      </VStack>

  );

  return <CurrentCompLoader />;
};

export default PastComp;
