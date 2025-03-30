import { formatAddress } from "@/utils/helpers/formatAddress";
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { MdManageAccounts, MdOutlineLogout } from "react-icons/md";
import { useAccount, useDisconnect } from "wagmi";

export type accountDetailsType = {
  avatar_url: string;
  twitter_handle: string;
  username: string;
  wallet: string;
} | null;

export const AccountDetails = () => {
  const [accountDetails, setAccountDetails] =
    useState<accountDetailsType>(null);
  const { address, connector } = useAccount();

  const { disconnectAsync ,disconnect} = useDisconnect()

  useEffect(() => {
    async function fetchProfile(wallet: `0x${string}`) {
      const response = await fetch(`/api/profile?wallet=${wallet}`);
      const data = await response.json();
      if (data.error) {
        console.error("Error fetching profile:", data.error);
      } else {
        console.log("User Profile:", data);
        setAccountDetails(data);
      }
    }

    if (address) {
      fetchProfile(address);
    }
  }, [address]);
  return (
    <Menu >
      <MenuButton my="auto" >
        <HStack alignItems="center" lineHeight={1}>
          <Box
            boxSize="24px"
            bg={
              accountDetails?.avatar_url?.length
                ? `url(${accountDetails?.avatar_url})`
                : "#eee"
            }
            bgSize="cover"
            bgPos="center"
            borderRadius="50%"
          />
          <Text fontSize="15px" className="header_gradient"> {accountDetails?.username ?? formatAddress(address)}</Text>
          <HiChevronDown />
        </HStack>
      </MenuButton>
      <MenuList bg="rgba(255,255,255,.1)" borderColor="rgba(255,255,255,.2)" backdropFilter="blur(6px)">
        <Text px="14px" fontSize="12px" opacity={0.5} borderBottom="1px dashed #eee" pb="14px" pt="6px">{ formatAddress(address)}</Text>
        <MenuItem
          bg="transparent"
          color="rgba(255,255,255,.6)"
          _hover={{ color: "white" }}
        >
             <MenuIcon mr="6px">
             <MdManageAccounts />
            </MenuIcon>
          <Link href="/profile" style={{ width: "100%" }}>
            My account
          </Link>
        </MenuItem>
        <MenuItem
          bg="transparent"
          color="rgba(255,255,255,.6)"
          _hover={{ color: "white" }}
          onClick={()=> disconnectAsync({connector}) }
        >
            <MenuIcon mr="6px">
            <MdOutlineLogout />
            </MenuIcon>
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
