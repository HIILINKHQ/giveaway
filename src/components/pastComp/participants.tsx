import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";

const Sources = [
  {
    name: "0x12...345",
    dt: "10 sec ago",
  },
  {
    name: "0x12...345",
    dt: "17 sec ago",
  },
  {
    name: "0x12...345",
    dt: "36 sec ago",
  },
  {
    name: "0x12...345",
    dt: "1 min ago",
  },
  {
    name: "0x12...345",
    dt: "6 min ago",
  },
];

const Name = ({ name, dt }: { name: string; dt: string }) => {
  return (
    <Center
      className={"span"}
      h="52px"
      w="100%"
      justifyContent="flex-start"
      px="16px"
    >
      <HStack spacing="12px" w="100%" justifyContent="space-between">
        <Text fontSize="14px" fontWeight={700} noOfLines={1}>
          {name}
        </Text>
        <Text fontSize="14px" fontWeight={700} noOfLines={1}>
          {dt}
        </Text>
      </HStack>
    </Center>
  );
};

export const Participants = () => {
  return (
    <VStack
      className={"usernames"}
      spacing="30px"
      bg="rgba(255, 255, 255, 0.01);"
      w="100%"
      pos="relative"
      overflow="hidden"
    >
      <HStack px="21px" w="100%" pb="16px">
        <Box
          className={"c"}
          h="200px"
          //   bg="inear-gradient(176deg, #1F1E21 0%, #131216 62%)"
          //   boxShadow="0px 0px 16px -4px rgba(0, 0, 0, 0.50), 0px 1px 2px 0px #525154 inset"
          //   borderRadius="20px"
        >
          <Box w="100%" h="100%">
            <VStack className={"card-home"} px="3px" spacing={"8px"}>
              {Sources?.map((el) => (
                <Name key={el.name} name={el.name} dt={el.dt} />
              ))}
              {Sources?.map((el, idx) => (
                <Name key={el.dt + idx} name={el.name} dt={el.dt} />
              ))}
            </VStack>
          </Box>
        </Box>
      </HStack>
      <Box
        pos="absolute"
        bg="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)"
        bottom={0}
        left={0}
        w="100%"
        h="70%"
      />
    </VStack>
  );
};
