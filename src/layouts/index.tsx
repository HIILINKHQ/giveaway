import { Box, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "./header.layout";
import { roboto } from "@/fonts";
import Footer from "./footer.layout";
import AnimatedMeshGradient from "@/utils/meshGradient";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <VStack
      w="100%"
      minH="100vh"
      bg="linear-gradient(160deg, #000000, #13181f)"
      // bgColor="black"
      letterSpacing="0px"
      className={`${roboto.className} home`}
      pos="relative"
    >
      <Header />
      {children}
      {/* <Box className="grainy-bg" /> */}
      {/* <AnimatedMeshGradient /> */}
      <Footer />
    </VStack>
  );
};

export default Layout;
