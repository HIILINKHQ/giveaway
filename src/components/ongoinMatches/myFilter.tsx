import { Box, HStack, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type MyFilterProps = {
  isAll: boolean;
  setIsAll: Dispatch<SetStateAction<boolean>>;
};

const MyFilter = ({ isAll, setIsAll }: MyFilterProps) => {
  return (
    <HStack w="100%" justifyContent="center" fontWeight={700}>
      <Text
        onClick={() => setIsAll(true)}
        color={isAll ? 'rgba(34,34,34,1)' : '#a1a1a1'}
        bg={isAll ? '#a1a1a1' : 'rgba(34,34,34,1)'}
        py="10px"
        px="20px"
        borderRadius="10px"
        cursor="pointer"
      >
        All
      </Text>
      <Text
        bg={isAll ? 'rgba(34,34,34,1)' : '#a1a1a1'}
        color={isAll ? '#a1a1a1' : 'rgba(34,34,34,1)'}
        onClick={() => setIsAll(false)}
        py="10px"
        px="20px"
        borderRadius="10px"
        cursor="pointer"
      >
        Mine
      </Text>
    </HStack>
  );
};

export default MyFilter;
