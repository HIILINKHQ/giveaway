"use client"

import { SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useReadContract } from "wagmi"
import abi from "@/contract/abis/winpad.abi.json"
import { apeChain } from "viem/chains"
import PastComp from "../pastComp"
import { orbitron } from "@/fonts"
// import { watchContractEvent } from '@wagmi/core'

const PastMatches = () => {

      const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ""
    
        const {data, refetch } = useReadContract({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            address : contract_addr,
            abi,
            functionName : "getMatchHistory",
            chainId : apeChain.id,
            args : [0,10]
        })


        console.log("getMatchHistory",data)
        
        // const unwatch = watchContractEvent(undefined,{
        //   address: contract_addr,
        //   abi,
        //   eventName: 'WinnerSelected ',
        //   onLogs(logs : any) {
        //     console.log('New logs!', logs)
        //   },
        // })
        // unwatch()

        // console.log("getOngoingMatches",data)
    

    return(
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
      <Text   color="white"
        fontWeight={200}>
Create by everyone , attend everyone.
      </Text>
    </VStack>
        <SimpleGrid w="100%" columns={[1,2,3,4]} spacing="10px">
            {/* eslint-disable @typescript-eslint/no-explicit-any */}
            {(data as any)?.map((el : bigint) => <PastComp data={el as any} key={el} refetch={refetch}/>)}
        </SimpleGrid>
        </VStack>
    )
}

export default PastMatches