"use client";

import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";
import abi from "@/contract/abis/winpad.abi.json";
import { apeChain } from "viem/chains";
import CurrentComp from "../currentComp";
import { orbitron } from "@/fonts";
import ReadyMatch from "../currentComp/readyMatch";
import CreateMatch from "../my/AdminLayout/functions/matches";
import MyFilter from "./myFilter";
import { useState } from "react";
import { MAXW } from "@/utils/globals";

const OnGoingMatches = () => {
  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";
  const [isAll, setIsAll] = useState(true);

  const { address } = useAccount();

  const { data, refetch } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: "getOngoingMatches",
    chainId: apeChain.id,
    args: [0, 100],
  });

  const { data: readyMatches, refetch: refetchReady } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: "getReadyMatches",
    chainId: apeChain.id,
    args: [0, 100],
  });

  return (
    <VStack w="100%" maxW={MAXW} px="32px" spacing="32px">
      <VStack gap="0" pb="100px">
        <Text color="white" fontWeight={200} textAlign="center">
          Create by everyone, Attend everyone.
        </Text>
        <Text
          color="white"
          fontWeight={700}
          fontSize={["50px", null, "60px", null, "70px"]}
          className={orbitron.className}
        >
          GIVEAWAY
        </Text>
        <CreateMatch refetch={refetch} />
      </VStack>
      {/* {address ? (
        <HStack w="100%" justifyContent="flex-end">
          <MyFilter setIsAll={setIsAll} isAll={isAll} />
        </HStack>
      ) : null} */}
      <SimpleGrid w="100%" columns={[1, 2, 3, 4]} spacing="10px">
        {/* eslint-disable @typescript-eslint/no-explicit-any */}
        {(data as any)
          ?.filter((el: { creator: string }) =>
            isAll ? true : address ? el.creator === address : true
          )
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
    </VStack>
  );
};

export default OnGoingMatches;
