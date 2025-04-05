'use client';

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
  Input,
  FormControl,
  FormLabel,
  Box,
  Switch,
  Center,
  Select,
} from '@chakra-ui/react';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { useForm, SubmitHandler } from 'react-hook-form';
import abi from '@/contract/abis/winpad.abi.json';
import { apeChain } from 'viem/chains';
import { useEffect, useState } from 'react';
import {
  BaseError,
  erc20Abi,
  erc721Abi,
  formatEther,
  formatUnits,
  isAddress,
  parseEther,
  parseUnits,
  zeroAddress,
} from 'viem';
import NFTGallery from './nftsLoader';
import WalletConnector from '@/utils/connectKit.custom';

export const PickWinner = ({
  matchId,
  refetch,
  isPickable,
}: {
  matchId: string;
  refetch: () => void;
  isPickable: boolean;
}) => {
  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';

  const toast = useToast();

  const { writeContractAsync, isPending, data: hash } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const onCreateMatch = async () => {
    try {
      const randomSeed =
        Math.floor(Math.random() * (999999999 - 10000 + 1)) + 10000;

      const res = await writeContractAsync({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        address: contract_addr,
        chainId: apeChain?.id,
        abi,
        functionName: 'pickWinner',
        args: [matchId, randomSeed],
      });

      console.log('res', res);
      toast({
        title: `Winner Picked Successfully with random seed : ${randomSeed}`,
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      toast({ title: (err as BaseError).shortMessage, status: 'error' });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      toast({ title: 'Transaction confirmed.', status: 'success' });
      refetch();
    }
  }, [isConfirmed, isConfirming]);

  return (
    <Button
      w="100%"
      borderRadius="6px"
      zIndex={1}
      bg="#181818"
      color="white"
      _hover={{ bg: 'black' }}
      fontSize="14px"
      onClick={onCreateMatch}
      isDisabled={!isPickable}
      isLoading={isPending || isConfirming}
    >
      PICK WINNER
    </Button>
  );
};

const CreateMatch = ({ refetch }: { refetch?: any }) => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nftDetails, setNFTDetails] = useState({
    address: '0x',
    tokenId: '0',
  });
  const [prizeType, setPrizeType] = useState<boolean>(false); // false for 0 true for 1
  const [GAtype, setGAtype] = useState<boolean>(false); // giveaway is public or private

  const [nativeAmount, setNativeAmount] = useState<number>(0);
  const [entryNFT, setEntryNFT] = useState<string>('');
  const [endDate, setEndDate] = useState<string | null>(null);
  const [taskUrl, setTaskUrl] = useState<string>('');
  const [taskType, setTaskType] = useState<string>('follow');

  const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';

  const toast = useToast();

  const { data: CREAION_COST } = useReadContract({
    chainId: apeChain.id,
    address: contract_addr as `0x${string}`,
    functionName: 'CREATION_COST',
    abi,
  });

  console.log('CREAION_COST', CREAION_COST);
  const { writeContractAsync, isPending, data: hash } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const _setNFTDetails = (data: { address: string; tokenId: string }) => {
    setNFTDetails(data);
  };

  const onApproveNFT = async () => {
    try {
      const NFTaddress = !prizeType ? nftDetails.address : zeroAddress;

      const approval = await writeContractAsync({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        address: NFTaddress,
        chainId: apeChain?.id,
        abi: erc721Abi,
        functionName: 'approve',
        args: [contract_addr as `0x${string}`, BigInt(nftDetails?.tokenId)],
      });
    } catch (err) {
      console.log('ERR on approval:', err);
      toast({ title: (err as BaseError).shortMessage, status: 'error' });
    }
  };

  const onCreateMatch = async () => {
    try {
      if (!GAtype && !isAddress(entryNFT)) {
        toast({
          status: 'warning',
          description: 'Not valid NFT contract address.',
        });
        return;
      }
      const _entryNFT = !GAtype ? entryNFT : zeroAddress;

      if (!endDate) {
        toast({ status: 'warning', description: 'End date is not set.' });
        return;
      }

      const currentTimestamp = Number(Math.floor(Date.now() / 1000)); // Current time in seconds
      const _endDate = Number(new Date(endDate).getTime() / 1000); // Convert to seconds
      const duration = BigInt(_endDate - currentTimestamp);

      console.log('prizeType', prizeType);
      if (!prizeType && !isAddress(nftDetails.address)) {
        toast({ status: 'warning', description: 'Select NFT.' });
        return;
      }

      const nftId = BigInt(nftDetails.tokenId ?? 0);

      const NFTaddress = !prizeType ? nftDetails.address : zeroAddress;
      const amountOrId = !prizeType
        ? nftId
        : parseEther(nativeAmount.toString());

      const args = [
        prizeType ? 1 : 0,
        NFTaddress,
        amountOrId,
        duration,
        _entryNFT,
      ];

      const value =
        parseEther(nativeAmount.toString()) + BigInt(CREAION_COST as bigint);

      console.log(value);
      console.log(args);
      const res = await writeContractAsync({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        address: contract_addr,
        chainId: apeChain?.id,
        abi,
        functionName: 'createMatch',
        args,
        value: !prizeType ? (CREAION_COST as bigint) : BigInt(value), // fix the current creation cost
      });

      // console.log("res", res);
      toast({ title: 'Match created successfully.', status: 'success' });
      onClose();
    } catch (err) {
      console.log('ERR:', err);
      toast({ title: (err as BaseError).shortMessage, status: 'error' });
    }
  };

  const writeTask = async (matchId: string) => {
    // writing task to the database.
    if (taskUrl?.length > 0) {
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId,
          taskUrl,
          taskType,
          creator: address,
        }),
      });
      const data = await response.json();
      console.log(data);
    }
    toast({ title: 'Transaction confirmed.', status: 'success' });
    refetch?.();
    return true;
  };

  useEffect(() => {
    if (isConfirmed) {
      console.log('receipt.logs[0].topics[1]', receipt.logs);
      const matchId = receipt.logs[0].topics[1];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      writeTask(matchId);
    }
  }, [isConfirmed, isConfirming]);

  return (
    <VStack justifyContent="flex-start" alignItems="flex-start">
      <Button
        onClick={onOpen}
        px="34px"
        py="7px"
        fontWeight={700}
        bg="linear-gradient(90deg, rgba(158,158,158,1) 0%, rgba(36,36,36,1) 100%)"
        color="white"
        border="0.5px solid white"
        borderRadius="xl"
        h="100%"
        _hover={{
          bg: 'linear-gradient(90deg, rgba(158,158,158,1) 20%, rgba(36,36,36,1) 100%)',
        }}
      >
        Create Yours
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          color="white"
          pos="relative"
          bg="black"
          overflow="hidden"
          border="1px solid rgba(255,255,255,0.5)"
        >
          <Box
            minW="100%"
            minH="100%"
            bg="linear-gradient(337deg, rgba(0,0,0,1) 77%, rgba(255,255,255,0.3) 100%)"
            pos="absolute"
            top="0"
            left="0"
            filter="blur(5px)"
            zIndex={1}
          />
          <ModalHeader zIndex={2}>Create New Giveaway</ModalHeader>
          <ModalCloseButton zIndex={2} />
          <ModalBody zIndex={2}>
            {address ? (
              <HStack
                w="100%"
                pos="relative"
                alignItems="flex-start"
                spacing="32px"
                flexDir={['column', null, 'row', null]}
              >
                <VStack
                  w="100%"
                  flex={1}
                  pos={['relative', 'relative', 'sticky', 'sticky']}
                  top="0"
                  spacing="20px"
                >
                  <VStack spacing={4} w="100%">
                    <VStack spacing="0" alignItems="flex-start" w="100%">
                      <Text
                        fontSize="18px"
                        fontWeight={600}
                        textTransform="uppercase"
                      >
                        1. Giveaway Date
                      </Text>
                      <Text fontSize="13px" opacity={0.5}>
                        When will the winner selected.
                      </Text>
                    </VStack>
                    <Input
                      type="datetime-local"
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                      min={new Date().toISOString().slice(0, 16)}
                      max={(() => {
                        const maxDate = new Date();
                        maxDate.setDate(maxDate.getDate() + 10);
                        return maxDate.toISOString().slice(0, 16);
                      })()}
                      borderColor="#4e4e4e"
                      _focus={{
                        border: '1px solid #4e4e4e',
                      }}
                    />
                    <Text
                      fontSize="13px"
                      opacity={0.5}
                      w="100%"
                      textAlign="right"
                    >
                      Once the giveaway created, it can&apos;t be changed.
                    </Text>
                  </VStack>
                  <VStack spacing={4} w="100%" pt="24px">
                    <VStack spacing="0" alignItems="flex-start" w="100%">
                      <Text
                        fontSize="18px"
                        fontWeight={600}
                        textTransform="uppercase"
                      >
                        2. Giveaway Type
                      </Text>
                      <Text fontSize="13px" opacity={0.5}>
                        Who can join your Giveaway.
                      </Text>
                    </VStack>
                    <HStack
                      py="8px"
                      pos="relative"
                      w="100%"
                      borderRadius="20px"
                      gap="10px"
                      fontWeight={600}
                    >
                      <Box
                        flex={1}
                        textAlign="center"
                        onClick={() => setGAtype(true)}
                        cursor="pointer"
                        color={GAtype ? 'black' : '#a1a1a1'}
                        zIndex={1}
                        bg={GAtype ? '#a1a1a1' : 'rgba(255,255,255, 0.1)'}
                        borderRadius="10px"
                        py="10px"
                      >
                        PUBLIC
                      </Box>
                      <Box
                        flex={1}
                        textAlign="center"
                        onClick={() => setGAtype(false)}
                        cursor="pointer"
                        color={GAtype ? '#a1a1a1' : 'black'}
                        zIndex={1}
                        bg={GAtype ? 'rgba(255,255,255, 0.1)' : '#a1a1a1'}
                        borderRadius="10px"
                        py="10px"
                      >
                        PRIVATE
                      </Box>
                      {/* <Box
                        pos="absolute"
                        top="0"
                        h="100%"
                        w="50%"
                        bg="#eee"
                        transform={`translateX(${GAtype ? "0%" : "100%"})`}
                        transition="ease-out 0.2s"
                        borderRadius="20px"
                      /> */}
                    </HStack>
                    {GAtype ? (
                      <VStack
                        w="100%"
                        bg="linear-gradient(-90deg, rgba(34,34,34,1) 32%, rgba(78,78,78,1) 100%)"
                        spacing="0"
                        py="16px"
                        minH="157px"
                        justifyContent="center"
                        borderRadius="10px"
                      >
                        <Text
                          fontSize="16px"
                          fontWeight={600}
                          textTransform="uppercase"
                        >
                          Public Giveaway
                        </Text>
                        <Text fontSize="13px" opacity={0.5}>
                          Anyone can join to your giveaway.
                        </Text>
                      </VStack>
                    ) : (
                      <VStack
                        w="100%"
                        bg="linear-gradient(-90deg, rgba(34,34,34,1) 32%, rgba(78,78,78,1) 100%)"
                        spacing="0"
                        py="16px"
                        px="32px"
                        alignItems="flex-start"
                        borderRadius="10px"
                      >
                        <Text
                          fontSize="16px"
                          fontWeight={600}
                          textTransform="uppercase"
                        >
                          {' '}
                          Private Giveaway
                        </Text>
                        <Text fontSize="13px" opacity={0.5} pb="16px">
                          Only selected NFT holders can join your giveaway.
                        </Text>
                        <Input
                          placeholder="0x12345678"
                          onChange={(e) => setEntryNFT(e.target.value)}
                          value={entryNFT}
                          bgColor="#222"
                          bg="#222"
                          border="1px solid #4e4e4e"
                          _placeholder={{ color: '#4e4e4e', fontWeight: '600' }}
                          _focus={{
                            border: '1px solid #4e4e4e',
                          }}
                        />
                        <Text
                          pt="4px"
                          fontSize="13px"
                          opacity={0.5}
                          w="100%"
                          textAlign="right"
                        >
                          Put here NFT contract address.
                        </Text>
                      </VStack>
                    )}
                  </VStack>
                  <VStack spacing={4} w="100%">
                    <VStack spacing="0" alignItems="flex-start" w="100%">
                      <Text
                        fontSize="18px"
                        fontWeight={600}
                        textTransform="uppercase"
                      >
                        3. Task
                      </Text>
                      <Text fontSize="13px" opacity={0.5}>
                        Select only one task on X
                      </Text>
                    </VStack>
                    <HStack w="100%">
                      <Input
                        flex={2}
                        placeholder="Copy task URL"
                        onChange={(e) => setTaskUrl(e.target.value)}
                        value={taskUrl}
                        bg="linear-gradient(-90deg, rgba(34,34,34,1) 32%, rgba(78,78,78,1) 100%)"
                        border="none"
                        _placeholder={{ color: '#858585', fontWeight: '600' }}
                      />
                      <Select
                        flex={1}
                        onChange={(e) => setTaskType(e.target.value)}
                        value={taskType}
                        bg="#a1a1a1"
                        border="none"
                        fontWeight={600}
                        color="black"
                      >
                        <option style={{ color: 'black' }} value="like">
                          {' '}
                          Like
                        </option>
                        <option style={{ color: 'black' }} value="follow">
                          Follow
                        </option>
                        <option style={{ color: 'black' }} value="retweet">
                          Retweet
                        </option>
                        <option style={{ color: 'black' }} value="comment">
                          Comment
                        </option>
                      </Select>
                    </HStack>
                  </VStack>
                </VStack>
                <Box flex={1} w="100%">
                  <VStack
                    spacing={4}
                    w="100%"
                    pos={['relative', 'relative', 'sticky', 'sticky']}
                    top="-10px"
                    bg="black"
                    zIndex={2}
                    py="10px"
                  >
                    <VStack spacing="0" alignItems="flex-start" w="100%">
                      <Text
                        fontSize="18px"
                        fontWeight={600}
                        textTransform="uppercase"
                      >
                        4. Prize Type
                      </Text>
                      <Text fontSize="13px" opacity={0.5}>
                        What asset you want to giveaway.
                      </Text>
                    </VStack>
                    <HStack py="8px" pos="relative" w="100%" fontWeight={600}>
                      <Box
                        flex={1}
                        textAlign="center"
                        onClick={() => setPrizeType(false)}
                        cursor="pointer"
                        color={!prizeType ? 'black' : '#a1a1a1'}
                        zIndex={1}
                        bg={prizeType ? 'rgba(255,255,255, 0.1)' : '#a1a1a1'}
                        borderRadius="10px"
                        py="10px"
                      >
                        NFT
                      </Box>
                      <Box
                        flex={1}
                        textAlign="center"
                        onClick={() => setPrizeType(true)}
                        cursor="pointer"
                        color={!prizeType ? '#a1a1a1' : 'black'}
                        zIndex={1}
                        bg={!prizeType ? 'rgba(255,255,255, 0.1)' : '#a1a1a1'}
                        borderRadius="10px"
                        py="10px"
                      >
                        $APE
                      </Box>
                      {/* <Box
                        pos="absolute"
                        top="0"
                        h="100%"
                        w="50%"
                        bg="#eee"
                        transform={`translateX(${!prizeType ? "0%" : "100%"})`}
                        transition="ease-out 0.2s"
                      /> */}
                    </HStack>
                  </VStack>
                  {!prizeType ? (
                    <NFTGallery
                      setNFTDetails={_setNFTDetails}
                      nftDetails={nftDetails}
                    />
                  ) : (
                    <VStack py="24px" flexGrow={1} w="100%">
                      <Text fontSize="14px" w="100%" textAlign="left">
                        The prize $APE amount
                      </Text>
                      <Input
                        value={nativeAmount}
                        type="number"
                        onChange={(e) =>
                          setNativeAmount(e.target.valueAsNumber)
                        }
                      />
                    </VStack>
                  )}
                </Box>
              </HStack>
            ) : (
              <Center minH="400px">
                <WalletConnector />
              </Center>
            )}
          </ModalBody>

          <ModalFooter zIndex={2}>
            {address ? (
              <HStack py="10px" w="100%" justifyContent="space-between">
                <Text fontSize="14px" opacity="0.5">
                  Creation fee :{' '}
                  {typeof CREAION_COST === 'bigint'
                    ? formatEther(CREAION_COST)
                    : '0'}{' '}
                  APE
                </Text>
                <HStack>
                  {' '}
                  {!prizeType ? (
                    <Button
                      bg="linear-gradient(-90deg, rgba(34,34,34,1) 32%, rgba(78,78,78,1) 100%)"
                      color="white"
                      border="1px solid rgba(255,255,255,0.3)"
                      mr={3}
                      onClick={onApproveNFT}
                      isLoading={isPending || isConfirming}
                    >
                      APPROVE
                    </Button>
                  ) : null}
                  <Button
                    bg="linear-gradient(-90deg, rgba(34,34,34,1) 32%, rgba(78,78,78,1) 100%)"
                    color="white"
                    border="1px solid rgba(255,255,255,0.3)"
                    mr={3}
                    onClick={onCreateMatch}
                    isLoading={isPending || isConfirming}
                  >
                    CREATE
                  </Button>
                </HStack>
              </HStack>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default CreateMatch;
