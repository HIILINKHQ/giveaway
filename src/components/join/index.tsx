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
  Tooltip,
  Box,
  Center,
} from "@chakra-ui/react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import abi from "@/contract/abis/winpad.abi.json";
import { apeChain } from "viem/chains";
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
// import {ethers} from "ethers"
import { BaseError, formatUnits, ReadContractErrorType } from "viem";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import {
  HiOutlineBanknotes,
  HiOutlineQuestionMarkCircle,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";

type EntryType =
  | {
      apeCost: bigint;
      baseEntries: bigint;
      bonusEntries: bigint;
      exists: boolean;
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

const Join = ({
  matchId,
  refetch,
  children,
  allowedTiers,
}: {
  children: ReactNode;
  matchId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;
  allowedTiers: bigint[];
}) => {
  const [entryId, setEntryId] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";

  const toast = useToast();

  const { data } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: "getEntryTypes",
    chainId: apeChain.id,
  });

  console.log("entries :::", data);

  const entries = data as EntryType;

  const { writeContractAsync, isPending, data: hash } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const onJoin = async () => {
    try {
      console.log(entryId);
      const res = await writeContractAsync({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        address: contract_addr,
        chainId: apeChain?.id,
        abi,
        functionName: "enroll",
        args: [matchId],
        // value : ethers.parseUnits(value.toString(),18) this is correct!
      });

      console.log("res", res);
    } catch (err) {
      console.log(err);
      toast({ title: (err as BaseError).shortMessage, status: "error" });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      refetch();
      toast({ title: "Successfully joined.", status: "success" });
    }
  }, [isConfirmed, isConfirming]);

  return (
    <>
      <Box onClick={onOpen} w="100%">{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          pos="relative"
          px="24px"
          backdropFilter="blur(10px)"
          bg="linear-gradient(60deg, rgba(0, 0, 0, 0.49),rgba(17, 25, 36, 0.29))"
          color="white"
          border="1px solid rgba(255,255,255,.1)"
        >
          <ModalHeader zIndex={1} py="24px">
           Join Giveaway
          </ModalHeader>
          <ModalCloseButton top="24px" zIndex={1} right="24px" _hover={{
            boxShadow : "0 0 4px white"
          }} />
          <ModalBody zIndex={1}>
            <VStack
              spacing="6px"
              w="100%"
              alignItems="flex-start"
              px="16px"
              py="10px"
              borderRadius="6px"
              border="1px solid rgba(255,255,255,.1)"
            >
            
              <HStack color="#A1E3F9" alignItems="center" spacing="12px" lineHeight={1.4}>
                <Box>
                <HiOutlineSquare3Stack3D size={20} /> </Box><Text fontSize="14px">If You owns a NFT from &apos;Optical Delusions&apos; collections, you can enroll with 1 free entry.</Text>{" "}
              
              </HStack>
            </VStack>

            <HStack w="100%" alignItems="center" pb="24px" pt="24px">
              <Box flex={1} borderTop="1px dashed rgba(255,255,255,.1)" />
              <Text fontSize="14px" opacity={0.5}>
                Select Entry options
              </Text>
              <Box flex={1} borderTop="1px dashed rgba(255,255,255,.1)" />
            </HStack>
            <SimpleGrid spacing="12px" columns={1}>
              {entries?.map((el, idx) =>
                el.exists && allowedTiers.includes(BigInt(idx + 1)) ? (
                  <HStack
                    pos="relative"
                    variant="outline"
                    onClick={() => setEntryId(idx)}
                    _hover={{
                      background: "#0d62ff",
                      color: "white",
                    }}
                    color="white"
                    key={el.apeCost}
                    w="100%"
                    as={Button}
                    borderColor={
                      idx === entryId ? "#07daff" : "rgba(255,255,255,.2)"
                    }
                    boxShadow={idx === entryId ? "0 0 6px white" : "unset"}
                  >
                    <Text> {Number(el.baseEntries)} Entries </Text>
                    <Text fontSize="14px" className="gradient_text_bonus">
                      {" "}
                      + {Number(el.bonusEntries)} Bonus
                    </Text>
                    {el.apeCost === 0n ? (
                      <Center
                      transform="rotate(90deg)"
                        pos="absolute"
                      
                        right="-16px"
                        bg="linear-gradient(160deg, white 20%, #07daff 100%)"
                        p="1px"
                         borderRadius="6px"
                       
                        lineHeight={1}
                      >
                        <Box bg="black"  borderRadius="6px">
                        <Text className="gradient_text_bonus" fontSize="13px"  px="10px"
                        py="5px"
                        pb="7px"
                        >
                          Free
                        </Text>
                        </Box>
                      </Center>
                    ) : null}
                  </HStack>
                ) : null
              )}
            </SimpleGrid>
            <VStack w="100%" spacing={0} pb="6px" pt="24px">
              <Text fontSize="12px" opacity={0.6}>
                You will pay
              </Text>
              <HStack>
                <Text
                  fontSize="18px"
                  fontWeight={600}
                 
                  key={Number(getEntry(entryId, entries).apeCost)}
                  className="fade-in"
                >
                  {formatUnits(getEntry(entryId, entries).apeCost, 18)} $APE
                </Text>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter zIndex={1} pb="24px">
            <Button
              flex={1}
              colorScheme="blue"
              mr={3}
              onClick={onJoin}
              isLoading={isPending || isConfirming}
              bg="linear-gradient(150deg, #396afc, #2948ff)"
              border="1px solid transparent"
              _hover={{
                borderColor: "white",
              }}
            >
              JOIN NOW
            </Button>
          </ModalFooter>
          <Box className="grainy-bg" opacity={0.05} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Join;
