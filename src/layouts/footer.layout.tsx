import { Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import Socials from "./socials";
import { MAXW } from "@/utils/globals";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { orbitron } from "@/fonts";
// import ConsentGeneral from "@/components/utils/consentGeneral";

const Footer = () => {
  return (
    <VStack w="100%" maxW={MAXW} py="24px" zIndex={1}> 
      <HStack spacing="12px" fontSize="16px">
        <Socials />
        <Link href={"mailto:contact@hii.link"} target="_blank">
          <Box
            color="rgba(255,255,255,1)"
            transition="ease-out 0.3s"
            _hover={{ color: "rgba(255,255,255,1)" }}
          >
            <HiOutlineEnvelope />
          </Box>
        </Link>
      </HStack>
      {/* <ConsentGeneral /> */}
      <Text
        color="white"
        textAlign="center"
        px="20px"
        fontSize={["12px", null, "12px", null]}
        className={orbitron.className}
      >
        All rights reserved. Hiilink {new Date().getFullYear()}
      </Text>
    </VStack>
  );
};

export default Footer;
