"use client";

import {
  border,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { orbitron } from "@/fonts";
import WalletConnector from "@/utils/connectKit.custom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const Paths = [
  {
    label: "Competitions",
    path: "/",
  },
  {
    label: "History",
    path: "/history",
  },
  {
    label: "Submit Prize",
    path: "/submit",
  },
  {
    label: "Info",
    path: "/info",
  },
  {
    label: "Launch NFT",
    path: "https://mintpad.co/",
    isExternal : true,
  },
  {
    label: "Refer a Friend",
    path: "/refer",
  },
];
const MobilePaths = ({ onClick }: { onClick: () => void }) => {
  const [isActive, setIsActive] = useState(false)
  const pathname = usePathname();

  const activeStyle = {
    border : "1px solid white",
    color: "white",
  };

  const defaultStyle = {
    bg: "transparent",
    color: "white",
  };

  useEffect(() => {
    const fetchToggleState = async () => {
      const docRef = doc(db, "ape_bomb", "is_enabled");
      const docSnap = await getDoc(docRef);
      const data = docSnap?.data();

      setIsActive(data?.value);
    };

    fetchToggleState();
  }, []);

  return (
    <VStack spacing={["16px", null, "16px", "32px"]} alignItems="flex-start" w="100%">
      {Paths?.map((el) => (
        <Link key={el.path} href={el.path} onClick={onClick} target={el.isExternal ? "_blank" : "_self"}>
          <Text
            className={orbitron.className}
            fontWeight={600}
            lineHeight={1}
            px="16px"
            py="8px"
            borderRadius="6px"
            transition="ease-out"
            {...(pathname === el.path ? activeStyle : defaultStyle)}
          >
            {el.label}
          </Text>
        </Link>
      ))}
      {isActive ?
         <Link  href={"/apebomb"} onClick={onClick} target= "_self">
         <Text
           className={orbitron.className}
           fontWeight={600}
           lineHeight={1}
           px="16px"
           py="8px"
           borderRadius="6px"
           transition="ease-out"
           {...(pathname === "/apebomb" ? activeStyle : defaultStyle)}
         >
           ApeBomb
         </Text>
       </Link> : null
      }
        {isActive ?
         <Link  href={"/pinata"} onClick={onClick} target= "_self">
         <Text
           className={orbitron.className}
           fontWeight={600}
           lineHeight={1}
           px="16px"
           py="8px"
           borderRadius="6px"
           transition="ease-out"
           {...(pathname === "/pinata" ? activeStyle : defaultStyle)}
         >
           ApePinata
         </Text>
       </Link> : null
      }

    </VStack>
  );
};

const Hamburger = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Box color="white" fontSize="24px" onClick={onToggle}>
        <MdMenu />
      </Box>
      <Drawer isOpen={isOpen} onClose={onToggle} size={["full", "xl", "sm", null]} placement="left" >
        <DrawerOverlay />
        <DrawerContent bg="linear-gradient(170deg, rgba(0,0,0,1) , rgba(0,0,0,0.4) )" backdropFilter="blur(10px)" borderRight="1px solid rgba(255,255,255,.1)">
          <DrawerHeader >
          <Box pos="relative" color="white">
                  <Text
                    fontSize="24px"
                    pt="20px"
                    className={`${orbitron.className} text-grad`}
                    pos="absolute"
                    filter="blur(10px)"
                    zIndex={0}
                    transform="scale(1.1)"
                  >
                    Hiilink
                  </Text>

                  <Text
                    fontSize="24px"
                    pt="20px"
                    className={`${orbitron.className} text-grad`}
                    zIndex={1}
                    pos="relative"
                  >
                    Hiilink
                  </Text>
                </Box>
            <DrawerCloseButton
              top="40px"
              right="20px"
              fontWeight={500}
              color="white"
              zIndex={2}
            />
          </DrawerHeader>
          <DrawerBody w="100%">
            <VStack spacing="24px" color="white">
              <Link href="/" onClick={onToggle}>
               
              </Link>
             <Box display={["block", null, "none", null]}> <WalletConnector /></Box> 
              <MobilePaths onClick={onToggle} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Hamburger;
