import { orbitron } from '@/fonts';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type NftCardProps = {
  contractAddress: string;
  tokenId: string;
};

type tokenDataType = {
  token: {
    image: string;
    tokenId: string;
    collection: {
      name: string;
    };
  };
};

async function fetchTokens(contractAddress: string, tokenId: string) {
  const baseUrl = 'https://api-apechain.reservoir.tools/tokens/v7';
  const params = new URLSearchParams({
    tokens: `${contractAddress}:${tokenId}`,
  });

  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching tokens:', error);
  }
}

async function refreshTokenMetadata(contractAddress: string, tokenId: string) {
  const REFRESH_BASE_URI = 'https://api-apechain.reservoir.tools';
  const tokenSet = `${contractAddress}:${tokenId}`;

  try {
    const response = await fetch(`${REFRESH_BASE_URI}/tokens/refresh/v2`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_RESERVOIR_API_KEY ?? '',
      },
      body: JSON.stringify({
        liquidityOnly: false,
        overrideCoolDown: false,
        tokens: [tokenSet],
      }),
    });

    if (!response.ok)
      throw new Error(`Error refreshing token! Status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error('Error refreshing token metadata:', error);
    return null;
  }
}

const NftCard = ({ contractAddress, tokenId }: NftCardProps) => {
  const { data } = useQuery({
    queryKey: ['nftData', contractAddress, tokenId],
    queryFn: () => fetchTokens(contractAddress, tokenId),
    enabled: !!contractAddress && !!tokenId,
  });
  const token = data?.tokens?.[0]?.token;
  const image = token?.image;
  const collectionName = token?.collection?.name;
  const tokenIdValue = token?.tokenId;
  const tokenIdNumber = tokenIdValue ? parseInt(tokenIdValue) : null;
  const tokenIdString = tokenIdNumber ? tokenIdNumber.toString() : '';
  const tokenIdWithHash = `#${tokenIdString}`;

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
        <AspectRatio w="100%" ratio={1} borderRadius="12px" overflow="hidden">
          <Box pos="relative">
            <Image src={image} zIndex={1} w="100%" loading="lazy" />
            <Skeleton pos="absolute" aspectRatio={1} w="100%" zIndex={0} />
          </Box>
        </AspectRatio>

        <VStack w="100%">
          <HStack justifyContent="space-between" w="100%">
            <Text fontSize="13px" isTruncated fontWeight={600}>
              {collectionName}
            </Text>
            <HStack gap="10px">
              <Text fontWeight={600} fontSize="13px">
                {tokenIdWithHash}
              </Text>
              <Link
                href={`https://magiceden.io/item-details/apechain/${contractAddress}/${tokenId}`}
                target="_blank"
              >
                <LuExternalLink size="10px" color="rgba(255,255,255, 0.5)" />
              </Link>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
      {/* <Box className="animated-border-box-glow" />
      <Box className="animated-border-box" /> */}
    </Box>
  );
};

export default NftCard;
