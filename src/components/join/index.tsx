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
  useAccount,
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
import {
  BaseError,
  erc721Abi,
  formatUnits,
  ReadContractErrorType,
  zeroAddress,
} from "viem";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import {
  HiOutlineBanknotes,
  HiOutlineQuestionMarkCircle,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { formatAddress } from "@/utils/helpers/formatAddress";
import WalletConnector from "@/utils/connectKit.custom";

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
  entryNFTAddress,
}: {
  children: ReactNode;
  matchId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;
  entryNFTAddress: string;
}) => {
  const [entryId, setEntryId] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();

  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";

  const toast = useToast();

  const isFree = entryNFTAddress === zeroAddress;

  const { data: initialBalance } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: entryNFTAddress,
    abi: erc721Abi,
    functionName: "balanceOf",
    chainId: apeChain.id,
    args: [address as `0x${string}`],
  });

  // Handle the case where the contract call shouldn't be made
  const balance = address && !isFree ? initialBalance : 1n;

  const { data: isJoined, refetch: isJoinedRefetch } = useReadContract({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    address: contract_addr,
    abi,
    functionName: "entries",
    chainId: apeChain.id,
    args: [matchId, address as `0x${string}`],
  });

  const isEligible = isFree ? true : Number(balance) > 0;

  console.log("isJoined", isJoined);

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
      isJoinedRefetch();
    }
  }, [isConfirmed, isConfirming]);

  return (
    <>
      <Box onClick={onOpen} w="100%">
        {children}
      </Box>

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
          <ModalCloseButton
            top="24px"
            zIndex={1}
            right="24px"
            _hover={{
              boxShadow: "0 0 4px white",
            }}
          />
          <ModalBody zIndex={1}>
            {entryNFTAddress !== zeroAddress ? (
              <VStack
                spacing="6px"
                w="100%"
                alignItems="flex-start"
                px="16px"
                py="10px"
                borderRadius="6px"
                border="1px solid rgba(255,255,255,.1)"
              >
                <HStack
                  color="rgba(255,255,255,.7)"
                  alignItems="center"
                  spacing="12px"
                  lineHeight={1.4}
                >
                  <Box>
                    <HiOutlineSquare3Stack3D size={20} />{" "}
                  </Box>
                  <Text fontSize="14px">
                    The giveaway is created for &apos;
                    {formatAddress(entryNFTAddress)}&apos; addressed NFT
                    collection holders can join.
                  </Text>{" "}
                </HStack>
              </VStack>
            ) : (
              <VStack
                spacing="6px"
                w="100%"
                alignItems="flex-start"
                px="16px"
                py="10px"
                borderRadius="6px"
                border="1px solid rgba(255,255,255,.1)"
              >
                <HStack
                  color="rgba(255,255,255,.7)"
                  alignItems="center"
                  spacing="12px"
                  lineHeight={1.4}
                >
                  <Box>
                    <HiOutlineSquare3Stack3D size={20} />{" "}
                  </Box>
                  <Text fontSize="14px">
                    This giveaways is free, everyone can join.
                  </Text>{" "}
                </HStack>
              </VStack>
            )}

            <VStack w="100%" spacing={0} pb="6px" pt="24px">
              <Text fontSize="12px" opacity={0.6}>
                You will pay
              </Text>
              <HStack>
                <Text fontSize="18px" fontWeight={600} className="fade-in">
                  0 $APE
                </Text>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter zIndex={1} pb="24px">
            {address ? (
              isJoined ? (
                <Text
                  w="100%"
                  textAlign="center"
                  fontWeight={500}
                  opacity={0.5}
                >
                  You are joined
                </Text>
              ) : (
                <Button
                  isDisabled={!isEligible}
                  flex={1}
                  colorScheme="blue"
                  mr={3}
                  onClick={onJoin}
                  isLoading={isPending || isConfirming}
                  bg="linear-gradient(50deg,rgb(15, 15, 15),rgb(32, 32, 32))"
                  border="1px solid rgba(255,255,255,.1)"
                  _hover={{
                    borderColor: "white",
                  }}
                >
                  JOIN NOW
                </Button>
              )
            ) : (
              <WalletConnector />
            )}
          </ModalFooter>
          <Box className="grainy-bg" opacity={0.05} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Join;
