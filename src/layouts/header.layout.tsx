import { MAXW } from "@/utils/globals";
import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { orbitron } from "@/fonts";
import { useAccount, useSwitchChain } from "wagmi";
import Hamburger from "./sideBar";
import { useEffect, useState } from "react";
import { apeChain } from "viem/chains";
import WalletConnector from "@/utils/connectKit.custom";

const Paths = [
  {
    label: "Competitions",
    path: "/competitions",
  },
  {
    label: "How",
    path: "/how",
  },
  {
    label: "Other",
    path: "/other",
  },
];
const Header = () => {
  const { chain, address } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [isScrolled, setIsScrolled] = useState(false);

  const switchChain = async () => {
    try {
      await switchChainAsync({ chainId: apeChain.id });
    } catch (err) {
      console.log(err);
      // toast({description : "Please switch to Apechain.", status : "warning", position : "top-right"})
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (address?.length && chain?.id !== apeChain.id) {
      switchChain();
    }
  }, [address, chain]);
  return (
    <HStack
      pos="sticky"
      top="0"
      zIndex={4}
      w="100%"
      justifyContent="center"
      py={["20px"]}
      px={"20px"}
   
      // bg={isScrolled ? "rgba(0,0,0,.2)" : "transparent"}
    
    >
      <HStack
        w="100%"
        justifyContent="space-between"
        color="white"
        maxW={MAXW}
        fontWeight={700}
        bg="black"
        py="14px"
        px="19px"
        borderRadius="10px"
        border={isScrolled ? "1px solid rgb(112, 112, 112)" : "1px solid rgb(23, 25, 27)"}
        transition="ease-out 0.2s"
       
      >
        {/* <HStack spacing="48px">
        <Hamburger />
        </HStack> */}
       <HStack>
          <Link href="/">
            <HStack pos="relative" alignItems="flex-end">
             <Image src="/hiilink_header.avif" h="36px"/>
            
            </HStack>
          </Link>
         
        </HStack>
        
        <HStack   spacing="24px">
        <Link href="/history">
          <Text fontWeight={400} fontSize="16px" className={`${orbitron.className} header_gradient`}>History</Text>
          </Link>
          <Box display={["none", null, "block", null]}>
            <WalletConnector />
          </Box>
        </HStack>
      </HStack>
      {/* {address?.length ? chain?.id !== apeChain.id ?  <Center pos="fixed" zIndex={10} h="100vh" w="100vw">

      <VStack >
      <Text>Use Apechain</Text>
      </VStack>
      </Center> : null : null } */}
    </HStack>
  );
};

export default Header;
