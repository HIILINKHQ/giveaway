'use client';

import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useAccount, useReadContract } from 'wagmi';
import abi from '@/contract/abis/winpad.abi.json';
import { apeChain } from 'viem/chains';
import PastComp from '../pastComp';
import { orbitron } from '@/fonts';
import { useEffect, useState } from 'react';
import MyFilter from '../ongoinMatches/myFilter';
import { useSetRecoilState } from 'recoil';
import { tokenMetadata } from '@/atom';
// import { watchContractEvent } from '@wagmi/core'

const PastMatches = () => {
  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
  const [isAll, setIsAll] = useState(true);
  const setTokenMetadatas = useSetRecoilState(tokenMetadata);

  const { address } = useAccount();

  const { data, refetch, isLoading } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: 'getMatchHistory',
    chainId: apeChain.id,
    args: [0, 300],
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
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    setTokenMetadatas((prev: {}) => {
      return { ...prev, ...resultFlat };
    });
  }

  useEffect(() => {
    if (!isLoading) {
      fetchTokensInBatches();
    }
  }, [isLoading]);

  return (
    <VStack w="100%" pt="24px" minH="100vh">
      <VStack>
        <Text
          color="white"
          fontWeight={900}
          fontSize={['50px', null, '60px', null, '70px']}
          fontFamily="inter"
          textAlign="center"
        >
          GIVEAWAYS <br /> HISTORY
        </Text>

        {address ? (
          <HStack w="100%" justifyContent="flex-end">
            <MyFilter setIsAll={setIsAll} isAll={isAll} />
          </HStack>
        ) : null}
      </VStack>
      <SimpleGrid w="100%" columns={[1, 2, 3, 4]} spacing="10px" pt="20px">
        {/* eslint-disable @typescript-eslint/no-explicit-any */}
        {(data as any)
          ?.filter((el: { creator: string }) =>
            isAll ? true : address ? el.creator === address : true
          )
          ?.reverse()
          ?.map((el: bigint) => (
            <PastComp data={el as any} key={el} refetch={refetch} />
          ))}
      </SimpleGrid>
    </VStack>
  );
};

export default PastMatches;
