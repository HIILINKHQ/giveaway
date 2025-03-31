import { Box, HStack, Image, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "./header.layout";
import { roboto } from "@/fonts";
import Footer from "./footer.layout";
import { MAXW } from "@/utils/globals";
import { Poppins } from "next/font/google";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <VStack
      w="100%"
      minH="100vh"
      bgColor="black"
      letterSpacing="0px"
      className={`home`}
      pos="relative"
      bgSize="contain"
    >
      <Image
        w={MAXW}
        src="./background.avif"
        pos="absolute"
        top="0"
        left="50%"
        transform="translate(-50%,-25%)"
        zIndex={2}
      />
      <HStack
        zIndex={1}
        minW="50%"
        h="100vh"
        bg="radial-gradient(circle, rgba(108,108,108,1) 0%, rgba(0,0,0,1) 70%)"
        pos="absolute"
        top="0"
        left="0"
        transform="translate(50%, -70%)"
      />
      <Header />
      {children}
      {/* <Box className="grainy-bg" /> */}
      {/* <AnimatedMeshGradient /> */}
      <Footer />
    </VStack>
  );
};

export default Layout;
