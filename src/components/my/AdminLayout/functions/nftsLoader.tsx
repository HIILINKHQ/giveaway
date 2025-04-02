"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Text,
  Button,
  VStack,
  HStack,
  Spinner,
  SimpleGrid,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  AspectRatio,
  Image,
  Box,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

const NFTGallery = ({
  nftDetails: { address, tokenId: _tokenId },
  setNFTDetails,
}: {
  nftDetails: {
    address: string;
    tokenId: string;
  };

  setNFTDetails: (data: { address: string; tokenId: string }) => void;
}) => {
  const { address: _Address } = useAccount();
  const [tokens, setTokens] = useState<any[]>([]); // Array of fetched NFTs
  const [isLoadFinished, setIsLoadFinished] = useState(false);

  const BASE_URI = "https://api-apechain.reservoir.tools";

  const fetchNFTs = async (
    walletAddress: string,
    continuation: string | null = null
  ) => {
    try {
      setIsLoadFinished(false);
      const limit = "100";
      const continuationParam = continuation
        ? `&continuation=${continuation}`
        : "";
      const balanceUrl = `${BASE_URI}/users/${walletAddress}/tokens/v7?limit=${limit}${continuationParam}`;
      const balanceResponse = await fetch(balanceUrl);
      const balanceData = await balanceResponse.json();

      setTokens((prevTokens) => [...prevTokens, ...balanceData.tokens]);

      const _continuation = balanceData?.continuation;
      if (_continuation) {
        await fetchNFTs(walletAddress, _continuation);
        return;
      }

      setIsLoadFinished(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (_Address) {
      setTokens([]);
      fetchNFTs(_Address);
    }
  }, [_Address]);

  const handleSelectNFT = (contract: string, tokenId: string) => {
    setNFTDetails({ address: contract, tokenId });
  };

  return (
    <VStack w="100%" align="flex-start" spacing={4}>
      <HStack alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          Your NFTs
        </Text>{" "}
        <Text fontSize="14px" opacity={0.5} pt="6px">
          / {tokens?.length} found /
        </Text>
      </HStack>

      {!isLoadFinished ? (
        <Spinner size="lg" />
      ) : (
        <SimpleGrid columns={[3, 4, 5, 5]} w="100%" spacing="10px">
          {tokens.map((token, idx) => {
            const isSelected =
              address === token.token.contract &&
              Number(token.token.tokenId) === Number(_tokenId);
            return (
              <VStack
                key={`${token.token.contract}-${token.token.tokenId}-${idx}`}
                w="100%"
              >
                <AspectRatio w="100%" ratio={1}>
                  {token.token.image ? (
                    <Image
                      src={token.token.image}
                      alt={`NFT ${token.token.tokenId}`}
                    />
                  ) : (
                    <Box bg="#eee"></Box>
                  )}
                </AspectRatio>

                <VStack w="100%">
                  <Text color="rgba(255,255,255, 0.5)">
                    {token.token.tokenId}
                  </Text>
                  <Text noOfLines={1} w="100%" textAlign="center">
                    {token.token?.collection?.name}
                  </Text>
                  <Button
                    size="sm"
                    bg="linear-gradient(-90deg, rgba(34,34,34,1) 32%, rgba(78,78,78,1) 100%)"
                    border="1px solid rgba(255,255,255, 0.3)"
                    borderRadius="20px"
                    w="80%"
                    color="white"
                    onClick={() =>
                      handleSelectNFT(token.token.contract, token.token.tokenId)
                    }
                    variant={isSelected ? "outline" : "solid"}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </Button>
                </VStack>
              </VStack>
            );
          })}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default NFTGallery;
