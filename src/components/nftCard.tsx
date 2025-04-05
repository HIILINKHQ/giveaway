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
import { useRecoilValue } from 'recoil';
import { tokenMetadata } from '@/atom';
import { useEffect, useState } from 'react';

type NftCardProps = {
  contractAddress: string;
  tokenId: string;
};

const NftCard = ({ contractAddress, tokenId }: NftCardProps) => {
  const [data, setData] = useState<any>({});
  const nftData = useRecoilValue<Record<string, any>>(tokenMetadata);

  useEffect(() => {
    setData(nftData[`${contractAddress.toLocaleLowerCase()}:${tokenId}`]);
  });
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
            <Image
              src={data?.imageSmall || ''}
              zIndex={1}
              w="100%"
              loading="lazy"
            />
            <Skeleton pos="absolute" aspectRatio={1} w="100%" zIndex={0} />
          </Box>
        </AspectRatio>

        <VStack w="100%">
          <HStack justifyContent="space-between" w="100%">
            <Text fontSize="13px" isTruncated fontWeight={600}>
              {data?.collection?.name}
            </Text>
            <HStack gap="10px">
              <Text fontWeight={600} fontSize="13px">
                #{data?.tokenId}
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
    </Box>
  );
};

export default NftCard;
