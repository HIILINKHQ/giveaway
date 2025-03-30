"use client";

import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";
import abi from "@/contract/abis/winpad.abi.json";
import { apeChain } from "viem/chains";
import PastComp from "../pastComp";
import { orbitron } from "@/fonts";
import { useState } from "react";
import MyFilter from "../ongoinMatches/myFilter";
// import { watchContractEvent } from '@wagmi/core'

const PastMatches = () => {
  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";
  const [isAll, setIsAll] = useState(false);

  const { address } = useAccount();

  const { data, refetch } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: "getMatchHistory",
    chainId: apeChain.id,
    args: [0, 100],
  });

  console.log("getMatchHistory", data);

  return (
    <VStack w="100%" pt="24px" minH="100vh">
      <VStack>
        <Text
          color="white"
          fontWeight={700}
          fontSize="46px"
          className={orbitron.className}
        >
          GIVEAWAYS HISTORY
        </Text>
        <Text color="white" fontWeight={200}>
          Create by everyone , attend everyone.
        </Text>

        {address ? (
          <HStack w="100%" justifyContent="flex-end">
            <MyFilter setIsAll={setIsAll} isAll={isAll} />
          </HStack>
        ) : null}
      </VStack>
      <SimpleGrid w="100%" columns={[1, 2, 3, 4]} spacing="10px" pt="20px">
        {/* eslint-disable @typescript-eslint/no-explicit-any */}
        {(data as any)?.filter((el: { creator: string }) =>
            isAll ? true : address ? el.creator === address : true
          )
          ?.reverse()?.map((el: bigint) => (
          <PastComp data={el as any} key={el} refetch={refetch} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default PastMatches;
