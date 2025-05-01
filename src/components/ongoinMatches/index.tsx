'use client';

import { HStack, SimpleGrid, Text, useQuery, VStack } from '@chakra-ui/react';
import { useAccount, useReadContract } from 'wagmi';
import abi from '@/contract/abis/winpad.abi.json';
import { apeChain } from 'viem/chains';
import CurrentComp from '../currentComp';
import ReadyMatch from '../currentComp/readyMatch';
import CreateMatch from '../my/AdminLayout/functions/matches';
import { useEffect, useState } from 'react';
import { MAXW } from '@/utils/globals';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenMetadata } from '@/atom';

const OnGoingMatches = () => {
  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
  const [isAll, setIsAll] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const setTokenMetadatas = useSetRecoilState(tokenMetadata);

  const { address } = useAccount();

  const { data, refetch, isLoading } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: 'getOngoingMatches',
    chainId: apeChain.id,
    args: [0, 200],
  });
  console.log(data);

  const {
    data: readyMatches,
    refetch: refetchReady,
    isLoading: isReadyLoading,
  } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: 'getReadyMatches',
    chainId: apeChain.id,
    args: [0, 100],
  });

  async function fetchTokensInBatches() {
    const MAX_BATCH_SIZE = 50;
    const datas = (data as any).map(
      (el: any) => `${el.prizeAddress}:${el.prizeId}`
    );

    // Split into chunks of 50
    const chunks: string[][] = [];
    for (let i = 0; i < datas.length; i += MAX_BATCH_SIZE) {
      chunks.push(datas.slice(i, i + MAX_BATCH_SIZE));
    }

    // Helper to fetch one chunk
    const fetchChunk = async (chunk: string[]) => {
      const encodedTokens = `${chunk.join('&tokens=')}`;
      const url = `https://api-apechain.reservoir.tools/tokens/v7?tokens=${encodedTokens}&limit=100`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: '*/*',
        },
      });

      if (!res.ok) {
        throw new Error(`Error fetching tokens: ${res.status}`);
      }

      const data1 = await res.json();
      return data1.tokens || [];
    };

    // Fetch all chunks (can be in parallel or sequential for safety)
    const results = await Promise.all(chunks.map(fetchChunk));

    // Flatten results
    const resultFlat = results.flat().reduce((acc, ele) => {
      acc[`${ele.token.contract}:${ele.token.tokenId}`] = ele.token;
      return acc;
    }, {} as Record<string, any>);
    setTokenMetadatas(resultFlat);
  }

  useEffect(() => {
    if (!isLoading && !isReadyLoading) {
      fetchTokensInBatches();
    }
  }, [isLoading, isReadyLoading]);

  return (
    <VStack w="100%" maxW={MAXW} px="32px" spacing="32px">
      <VStack gap="0" pb="100px">
        <Text
          color="white"
          fontWeight={900}
          fontSize={['50px', null, '60px', null, '70px']}
          fontFamily="inter"
        >
          GIVEAWAY
        </Text>
        <CreateMatch refetch={refetch} />
      </VStack>
      <HStack w="100%" justifyContent="center" fontWeight={700}>
        <Text
          onClick={() => setIsPublic(true)}
          color={isPublic ? 'rgba(34,34,34,1)' : '#a1a1a1'}
          bg={isPublic ? '#a1a1a1' : 'rgba(34,34,34,1)'}
          py="10px"
          px="20px"
          borderRadius="10px"
          cursor="pointer"
        >
          PUBLIC
        </Text>
        <Text
          bg={isPublic ? 'rgba(34,34,34,1)' : '#a1a1a1'}
          color={isPublic ? '#a1a1a1' : 'rgba(34,34,34,1)'}
          onClick={() => setIsPublic(false)}
          py="10px"
          px="20px"
          borderRadius="10px"
          cursor="pointer"
        >
          PRIVATE
        </Text>
      </HStack>
      {isLoading ? (
        'Loading'
      ) : (
        <SimpleGrid w="100%" columns={[1, 2, 3, 4]} spacing="10px">
          {/* eslint-disable @typescript-eslint/no-explicit-any */}
          {(data as any)
            ?.filter((el: { entryNFTAddress: string }) => {
              return !isPublic
                ? el.entryNFTAddress !=
                    '0x0000000000000000000000000000000000000000'
                : el.entryNFTAddress ==
                    '0x0000000000000000000000000000000000000000';
            })
            ?.reverse()
            ?.map((el: bigint) => (
              <CurrentComp data={el as any} key={el} refetch={refetch} />
            ))}
          {(readyMatches as any)
            ?.filter((el: { creator: string }) =>
              isAll ? true : address ? el.creator === address : true
            )
            ?.reverse()
            ?.map((el: bigint) => (
              <ReadyMatch
                data={el as any}
                key={`${Number(el)}_ready`}
                refetch={refetchReady}
              />
            ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default OnGoingMatches;
