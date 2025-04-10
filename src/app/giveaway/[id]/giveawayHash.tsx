// displaying current competitions...
'use client';

import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Link,
  Skeleton,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { MAXW } from '@/utils/globals';
import { formatAddress } from '@/utils/helpers/formatAddress';
import { useEffect, useState } from 'react';
import { accountDetailsType } from '@/layouts/accountDetails';
import { useAccount, useReadContract } from 'wagmi';
import abi from '@/contract/abis/winpad.abi.json';
import { apeChain } from 'viem/chains';
import ApecoinCard from '@/components/currentComp/ApecoinCard';
import NftCard from '@/components/nftCard';
import MatchEntries from '@/components/join/MatchEntries';
import Join from '@/components/join';
import CurrentCompLoader from '@/components/currentComp/currentCompLoader';
import { LuExternalLink } from 'react-icons/lu';

const GiveawayComp = ({ hash }: { hash: string }) => {
  const [accountDetails, setAccountDetails] =
    useState<accountDetailsType>(null);
  const [gaData, setGaData] = useState<any>({});
  const [gaMetadata, setGaMetadata] = useState<any>();
  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';

  const { data, refetch, isLoading, isSuccess } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: 'getOngoingMatches',
    chainId: apeChain.id,
    args: [0, 100],
  });

  const { prizeAddress, prizeId, totalEntries, endDate, id, entryNFTAddress } =
    gaData;

  //   // console.log("data", data);
  const toast = useToast();
  const { address } = useAccount();

  const { data: isJoined, refetch: isJoinedRefetch } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: 'entries',
    chainId: apeChain.id,
    args: [id, address as `0x${string}`],
  });

  useEffect(() => {
    async function fetchProfile(wallet: `0x${string}`) {
      const response = await fetch(`/api/profile?wallet=${wallet}`);
      const data = await response.json();
      if (data.error) {
        console.error('Error fetching profile:', data.error);
      } else {
        // console.log("User Profile:", data);
        setAccountDetails(data);
      }
    }

    if (gaData?.creator) {
      fetchProfile(gaData?.creator as `0x${string}`);
    }

    async function fetchMetadata() {
      const response = await fetch(
        `https://api-apechain.reservoir.tools/tokens/v7?tokens=${prizeAddress}:${prizeId}`
      );
      const resjson = await response.json();
      setGaMetadata(resjson.tokens[0].token);
    }
    if (gaData?.prizeAddress && gaData?.prizeId) {
      fetchMetadata();
    }
  }, [gaData]);

  useEffect(() => {
    if (isSuccess) {
      const ga = (data as []).filter(({ id }) => id === hash);
      setGaData(ga[0]);
    }
  }, [isLoading]);

  if (Object.keys(gaData).length === 0) {
    return <Text color="white">Loading...</Text>;
  }
  return (
    <VStack w="100%" maxW={MAXW} justifyContent="center" alignItems="center">
      <Join
        matchId={id ?? 0n}
        refetch={refetch}
        entryNFTAddress={entryNFTAddress}
        prizeAddress={prizeAddress}
        prizeId={prizeId.toString()}
      >
        <VStack
          w={['80%', '50%', '30%']}
          alignItems="center"
          justifyContent="center"
        >
          <VStack
            w="100%"
            maxW={MAXW}
            alignItems="stretch"
            bg="black"
            border="1px solid rgba(255,255,255,.1)"
            px={['10px', '10px', '10px', null]}
            py={['10px', '10px', '10px', null]}
            borderRadius={['16px', '16px', '16px', null]}
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
                {gaData.prizeType === 1 ? (
                  <ApecoinCard prizeId={gaData.prizeId} />
                ) : (
                  <Box p="1px" borderRadius="14px" pos="relative">
                    <VStack
                      maxW="100%"
                      minW="100%"
                      borderRadius="16px"
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
                      >
                        <Box pos="relative">
                          <Image
                            src={gaMetadata?.imageSmall || ''}
                            zIndex={1}
                            w="100%"
                            loading="lazy"
                          />
                          <Skeleton
                            pos="absolute"
                            aspectRatio={1}
                            w="100%"
                            zIndex={0}
                          />
                        </Box>
                      </AspectRatio>

                      <VStack w="100%">
                        <HStack justifyContent="space-between" w="100%">
                          <Text fontSize="13px" isTruncated fontWeight={600}>
                            {gaMetadata?.collection?.name}
                          </Text>
                          <HStack gap="10px">
                            <Text fontWeight={600} fontSize="13px">
                              #{gaMetadata?.tokenId}
                            </Text>
                            <Link
                              href={`https://magiceden.io/item-details/apechain/${prizeAddress}/${prizeId}`}
                              target="_blank"
                            >
                              <LuExternalLink
                                size="10px"
                                color="rgba(255,255,255, 0.5)"
                              />
                            </Link>
                          </HStack>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>
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
            </Box>

            <MatchEntries
              totalEntries={totalEntries}
              matchId={gaData.id}
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
                  bg: 'linear-gradient(-90deg, rgba(34,34,34,1) 22%, rgba(78,78,78,1) 100%)',
                }}
                fontSize="14px"
                bg={
                  isJoined
                    ? 'linear-gradient(-90deg, rgba(18,18,18,1) 32%, rgba(45,45,45,1) 100%)'
                    : 'linear-gradient(-90deg, rgba(34,34,34,1) 32%, rgba(78,78,78,1) 100%)'
                }
                fontWeight={700}
              >
                {isJoined ? 'JOINED' : 'JOIN NOW'}
              </Button>
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
                    {' '}
                    {accountDetails?.username ?? formatAddress(gaData?.creator)}
                  </Text>
                  <Box
                    boxSize="20px"
                    bg={
                      accountDetails?.avatar_url?.length
                        ? `url(${accountDetails?.avatar_url})`
                        : '#eee'
                    }
                    bgSize="cover"
                    bgPos="center"
                    borderRadius="50%"
                  />
                </HStack>
              ) : (
                <HStack>
                  {' '}
                  <Text fontSize="10px" fontWeight={500}>
                    {formatAddress(gaData?.creator)}
                  </Text>{' '}
                  <Box bg="gray" boxSize="20px" borderRadius="50%" />{' '}
                </HStack>
              )}
            </HStack>

            <Box className="grainy-bg" opacity={0.2} zIndex={-1} />
          </VStack>
        </VStack>
      </Join>
    </VStack>
  );

  return <CurrentCompLoader />;
};

export default GiveawayComp;
