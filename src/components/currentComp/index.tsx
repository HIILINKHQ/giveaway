// displaying current competitions...
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
import CurrentCompLoader from "./currentCompLoader";
import Join from "../join";
import { formatAddress } from "@/utils/helpers/formatAddress";
import MatchEntries from "../join/MatchEntries";
import ApecoinCard from "./ApecoinCard";
import { useEffect, useState } from "react";
import { accountDetailsType } from "@/layouts/accountDetails";
import { useAccount, useReadContract } from "wagmi";
import abi from "@/contract/abis/winpad.abi.json";
import { apeChain } from "viem/chains";

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
    entryNFTAddress: string;
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  refetch: any;
};

const CurrentComp = ({ data, refetch }: CurrentCompProps) => {
  const [accountDetails, setAccountDetails] =
    useState<accountDetailsType>(null);
  const { prizeAddress, prizeId, totalEntries, endDate, id, entryNFTAddress } =
    data;

  // console.log("data", data);
  const toast = useToast();
  const { address } = useAccount();
  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";

  const { data: isJoined, refetch: isJoinedRefetch } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: "entries",
    chainId: apeChain.id,
    args: [id, address as `0x${string}`],
  });

  useEffect(() => {
    async function fetchProfile(wallet: `0x${string}`) {
      const response = await fetch(`/api/profile?wallet=${wallet}`);
      const data = await response.json();
      if (data.error) {
        console.error("Error fetching profile:", data.error);
      } else {
        // console.log("User Profile:", data);
        setAccountDetails(data);
      }
    }

    if (data?.creator) {
      fetchProfile(data?.creator as `0x${string}`);
    }
  }, [data]);

  return (
    <Join
      matchId={id ?? 0n}
      refetch={refetch}
      entryNFTAddress={entryNFTAddress}
    >
      <VStack
        w="100%"
        maxW={MAXW}
        alignItems="stretch"
        bg="black"
        border="1px solid rgba(255,255,255,.1)"
        px={["10px", "10px", "10px", null]}
        py={["10px", "10px", "10px", null]}
        borderRadius={["16px", "16px", "16px", null]}
        justifyContent="flex-start"
        flex={1}
        pos="relative"
        overflow="hidden"
        cursor="pointer"
        className="match_card"
      >
        <Box
          pos="absolute"
          minW="100%"
          minH="100%"
          top={0}
          left={0}
          bg="linear-gradient(337deg, rgba(0,0,0,1) 47%, rgba(255,255,255,1) 100%)"
          filter="blur(5px)"
        />
        <Box pos="relative" zIndex={2}>
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

          {/* <Box
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
              <Timer targetTimestamp={Number(endDate ?? 0n)} />
            </HStack>
          </Box> */}
        </Box>

        <MatchEntries
          totalEntries={totalEntries}
          matchId={data.id}
          key={totalEntries}
          endDate={endDate}
        />

        <Box w="100%" pos="relative" p="1px" zIndex={2}>
          <Button
            w="100%"
            borderRadius="6px"
            zIndex={1}
            color="white"
            _hover={{
              bg: "linear-gradient(-90deg, rgba(34,34,34,1) 22%, rgba(78,78,78,1) 100%)",
            }}
            fontSize="14px"
            bg={
              isJoined
                ? "linear-gradient(-90deg, rgba(18,18,18,1) 32%, rgba(45,45,45,1) 100%)"
                : "linear-gradient(-90deg, rgba(34,34,34,1) 32%, rgba(78,78,78,1) 100%)"
            }
            fontWeight={700}
          >
            {isJoined ? "JOINED" : "JOIN NOW"}
          </Button>
          {/* <Box className="animated-border-box" _before={{backgroundImage : "conic-gradient(rgba(0, 0, 0, 0),#07daff, rgba(0, 0, 0, 0) 25%)"}}/>
        <Box className="animated-border-box-glow" _before={{backgroundImage : "conic-gradient(rgba(0, 0, 0, 0),#07daff, rgba(0, 0, 0, 0) 25%)"}}/> */}
        </Box>

        <HStack
          w="100%"
          justifyContent="space-between"
          color="white"
          pt="20px"
          zIndex={2}
        >
          <Text fontSize="10px" fontWeight={500} opacity={0.4}>
            CREATED BY
          </Text>
          {accountDetails ? (
            <HStack alignItems="center" lineHeight={1}>
              <Text
                fontSize="10px"
                className="header_gradient"
                fontWeight={500}
              >
                {" "}
                {accountDetails?.username ?? formatAddress(data?.creator)}
              </Text>
              <Box
                boxSize="20px"
                bg={
                  accountDetails?.avatar_url?.length
                    ? `url(${accountDetails?.avatar_url})`
                    : "#eee"
                }
                bgSize="cover"
                bgPos="center"
                borderRadius="50%"
              />
            </HStack>
          ) : (
            <HStack>
              {" "}
              <Text fontSize="10px" fontWeight={500}>
                {formatAddress(data?.creator)}
              </Text>{" "}
              <Box bg="gray" boxSize="20px" borderRadius="50%" />{" "}
            </HStack>
          )}
        </HStack>

        <Box className="grainy-bg" opacity={0.2} zIndex={-1} />
      </VStack>
    </Join>
  );

  return <CurrentCompLoader />;
};

export default CurrentComp;
