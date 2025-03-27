"use client";

import Layout from "@/layouts";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3Provider } from "@/utils/web3Provider";
import { ReactNode } from "react";
import theme from "@/utils/theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      <ChakraProvider theme={theme}>
        <Layout>{children}</Layout>
      </ChakraProvider>
    </Web3Provider>
  );
}
