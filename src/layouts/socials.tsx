import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

const datas = [
  {
    icon: FaXTwitter,
    path: "https://x.com/WinPad_io",
  },
  {
    icon: FaDiscord,
    path: "https://discord.gg",
  },
];

const Socials = () => {
  return (
    <HStack spacing="12px" fontSize="16px">
      {datas.map((e) => (
        <Link href={e.path} key={e.path} target="_blank">
          <Box
            color="rgba(255,255,255,1)"
            transition="ease-out 0.3s"
            _hover={{ color: "rgba(255,255,255,1)" }}
          >
            <e.icon />
          </Box>
        </Link>
      ))}
    </HStack>
  );
};

export default Socials;
