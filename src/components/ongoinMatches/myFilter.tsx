import { Box, HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type MyFilterProps = {
  isAll: boolean;
  setIsAll: Dispatch<SetStateAction<boolean>>;
};

const MyFilter = ({ isAll, setIsAll }: MyFilterProps) => {
  return (
    <HStack
      border="1px solid rgba(255,255,255,.4)"
      py="8px"
      pos="relative"
      minW="200px"
      maxW="200px"
      mx="auto"
      fontSize="14px"
    >
      <Box
        flex={1}
        textAlign="center"
        onClick={() => setIsAll(true)}
        cursor="pointer"
        color={isAll ? "black" : "white"}
        zIndex={1}
      >
        All
      </Box>
      <Box
        flex={1}
        textAlign="center"
        onClick={() => setIsAll(false)}
        cursor="pointer"
        color={isAll ? "white" : "black"}
        zIndex={1}
      >
        Mine
      </Box>
      <Box
        pos="absolute"
        top="0"
        h="100%"
        w="50%"
        bg="#eee"
        transform={`translateX(${isAll ? "0%" : "100%"})`}
        transition="ease-out 0.2s"
      />
    </HStack>
  );
};

export default MyFilter
