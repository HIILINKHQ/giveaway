"use client";

import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useReadContract } from "wagmi";
import abi from "@/contract/abis/winpad.abi.json";
import { apeChain } from "viem/chains";
import CurrentComp from "../currentComp";
import { orbitron } from "@/fonts";
import ReadyMatch from "../currentComp/readyMatch";
import CreateMatch from "../my/AdminLayout/functions/matches";

const OnGoingMatches = () => {
  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";

  const { data, refetch } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: "getOngoingMatches",
    chainId: apeChain.id,
    args: [0, 10],
  });

  const { data: readyMatches, refetch: refetchReady } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: "getReadyMatches",
    chainId: apeChain.id,
    args: [0, 10],
  });

  console.log("getOngoingMatches", data, readyMatches);

  return (
    <VStack w="100%" spacing="32px" pt="24px">
      <VStack>
        <Text
          color="white"
          fontWeight={700}
          fontSize="46px"
          className={orbitron.className}
        >
          GIVEAWAYS
        </Text>
        <Text color="white" fontWeight={200}>
          Create by everyone , attend everyone.
        </Text>
        <CreateMatch refetch={refetch}/>
      </VStack>
      <SimpleGrid w="100%" columns={[1, 2, 3, 4]} spacing="10px">
        {/* eslint-disable @typescript-eslint/no-explicit-any */}
        {(data as any)?.map((el: bigint) => (
          <CurrentComp data={el as any} key={el} refetch={refetch} />
        ))}
        {(readyMatches as any)?.map((el: bigint) => (
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
