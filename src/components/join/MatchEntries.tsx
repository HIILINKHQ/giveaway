import { orbitron } from "@/fonts";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  HStack,
  VStack,
  Box,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";
import abi from "@/contract/abis/winpad.abi.json";
import { apeChain } from "viem/chains";
import { formatAddress } from "@/utils/helpers/formatAddress";

type ParticipationsType = {
  entries: bigint;
  participant: string;
  tierId: bigint;
}[];

const MatchEntries = ({
  totalEntries,
  matchId,
}: {
  totalEntries: bigint;
  matchId: string;
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const { address } = useAccount();

  // const contract_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";

  // const { data, refetch } = useReadContract({
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   //@ts-ignore
  //   address: contract_addr,
  //   abi,
  //   functionName: "getParticipations",
  //   chainId: apeChain.id,
  //   args: [matchId],
  // });

  // console.log("participations", data);

  // const participations = data as ParticipationsType | undefined;

  return (
    <HStack px="10px" className={orbitron.className} zIndex={2}>
      <HStack
        spacing={0}
        color="white"
        alignItems="center"
        w="100%"
        justifyContent="space-between"
        pr="10px"
      >
        <Text fontSize="12px" fontWeight={500} opacity={0.5}>
          Joined
        </Text>
        <Text
          // onClick={onOpen}
          cursor="pointer"
          fontSize="20px"
          className="fade-in"
          key={Number(totalEntries ?? 0n)}
        >
          {" "}
          {Number(totalEntries ?? 0n)
            .toString()
            .padStart(2, "0")}{" "}
        </Text>
      </HStack>
      {/* <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          className={orbitron.className}
          pos="relative"
          px="24px"
          backdropFilter="blur(10px)"
          bg="linear-gradient(60deg, rgba(0, 0, 0, 0.49),rgba(17, 25, 36, 0.29))"
          color="white"
          border="1px solid rgba(255,255,255,.1)"
        >
          <ModalHeader zIndex={1} py="24px">
            Match Entries
          </ModalHeader>
          <ModalCloseButton
            top="24px"
            zIndex={1}
            right="24px"
            _hover={{
              boxShadow: "0 0 4px white",
            }}
          />
          <ModalBody zIndex={1} pb="24px">
            <VStack w="100%" alignItems="flex-start">
              {participations?.length ? (
                [...participations]?.reverse().map((el, idx) => (
                  <HStack w="100%" justifyContent="space-between" key={"particip_"+idx}>
                    <HStack pos="relative">
                      <Text opacity={0.5}>{idx + 1}.</Text>
                      <Text
                        color={address === el.participant ? "#07daff" : "white"}
                      >
                        {formatAddress(el.participant)}
                      </Text>
                      {address === el.participant ? (
                        <Box
                          boxSize="6px"
                          bg="#07daff"
                          borderRadius="50%"
                          pos="absolute"
                          left="-16px"
                        />
                      ) : null}
                    </HStack>
                    <Box flex="1" borderTop="1px dashed rgba(255,255,255,.1)" />
                    <Text>
                      {Number(el.entries)}{" "}
                      <span style={{ opacity: 0.5 }}>entries</span>
                    </Text>
                  </HStack>
                ))
              ) : (
                <Center w="100%" minH="200px">
                  <Text>No Records yet.</Text>
                </Center>
              )}

              <HStack
                mt="10px"
                pt="16px"
                w="100%"
                borderTop="1px dashed rgba(255,255,255,.1)"
                justifyContent="space-between"
              >
                <Text>Total </Text>

                <Text>
                  {" "}
                  {Number(totalEntries ?? 0n)
                    .toString()
                    .padStart(2, "0")}{" "}
                  entries
                </Text>
              </HStack>

              <HStack w="100%" justifyContent="center" py="10px">
                <Box boxSize="6px" bg="#07daff" borderRadius="50%" />
                <Text fontSize="12px" opacity={0.5}>
                  Your entry
                </Text>
              </HStack>
            </VStack>
          </ModalBody>

          <Box className="grainy-bg" opacity={0.05} />
        </ModalContent>
      </Modal> */}
    </HStack>
  );
};

export default MatchEntries;
