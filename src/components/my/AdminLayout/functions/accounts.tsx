"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  SimpleGrid,
  Text,
  HStack,
  useToast,
  VStack,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Divider,
} from "@chakra-ui/react";
import {
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import abi from "@/contract/abis/winpad.abi.json";
import { apeChain } from "viem/chains";
import { useEffect, useState } from "react";
// import {ethers} from "ethers"
import { BaseError, formatUnits, ReadContractErrorType } from "viem";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type EntryType =
  | {
    result: string;
      status: boolean;
    }[]
  | undefined;

const getEntry = (id: number, entries: EntryType) => {
  return (
    entries?.[id] ?? {
      baseEntries: 0n,
      bonusEntries: 0n,
      apeCost: 0n,
      exists: true,
    }
  );
};

const ACCOUNTS = [{
  name : "feeAccount",
  funcName : "FEE_PERCENT",
  value : 8
},
{
  name : "operationsAccount",
  funcName : "OPERATIONS_PERCENT",
  value : 20
},{
  name : "treasuryAccount",
  funcName : "TREASURY_PERCENT",
  value : 72
}]

const Accounts = () => {
  

  const { isOpen, onOpen, onClose } = useDisclosure();

  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";

  const toast = useToast();

  const prep = ACCOUNTS.map(e => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: e.name,
  })) 

  const { data } = useReadContracts({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    contracts : prep 
  });

  console.log("accounts :::", data);

  const entries = data as EntryType;

  const { isPending, data: hash } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // const onJoin = async () => {
  //   try {
  //     console.log(entryId);
  //     const value = getEntry(entryId, entries)?.apeCost;
  //     const res = await writeContractAsync({
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       //@ts-ignore
  //       address: contract_addr,
  //       chainId: apeChain?.id,
  //       abi,
  //       functionName: "enroll",
  //       value,
  //       // value : ethers.parseUnits(value.toString(),18) this is correct!
  //     });

  //     console.log("res", res);
  //   } catch (err) {
  //     console.log(err);
  //     toast({ title: (err as BaseError).shortMessage, status: "error" });
  //   }
  // };

  useEffect(() => {
    if (isConfirmed) {
      toast({ title: "Successfully joined.", status: "success" });
    }
  }, [isConfirmed, isConfirming]);

  return (
    <VStack w="100%" justifyContent="flex-start" alignItems="f">
     <HStack>
     <Text fontWeight={500} fontSize="20px">Accounts </Text>
     <Divider /> 
     </HStack>

      <TableContainer>
        <Table variant="striped" colorScheme="whiteAlpha"  w="100%" >
          <TableCaption>Current Splitting Accounts</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>Account Type</Th>
              <Th isNumeric>Address</Th>
              <Th isNumeric>Split size</Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries?.map((el, idx) => (
              <Tr key={`account_${idx}`}>
                <Td isNumeric>{ACCOUNTS[idx].name}</Td>
                <Td isNumeric>{el.result}</Td>
                <Td isNumeric>{ACCOUNTS[idx].value}%</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Button onClick={onOpen}>Update Accounts</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Select Entry and Join</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <HStack>
              <Text fontSize="18px" fontWeight={600} pb="6px">
                {Number(getEntry(entryId, entries).baseEntries)} +{" "}
                {Number(getEntry(entryId, entries).bonusEntries)} entrie(s)
              </Text>
            </HStack> */}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3} 
              // onClick={onJoin}
              isLoading={isPending || isConfirming}
            >
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Accounts;
