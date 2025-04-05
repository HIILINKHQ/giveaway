'use client';

import Layout from '@/layouts';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3Provider } from '@/utils/web3Provider';
import { ReactNode } from 'react';
import theme from '@/utils/theme';
import { RecoilRoot } from 'recoil';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <Layout>{children}</Layout>
        </RecoilRoot>
      </ChakraProvider>
    </Web3Provider>
  );
}
