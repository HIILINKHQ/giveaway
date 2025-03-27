import { WagmiProvider, createConfig, http } from "wagmi";
import { apeChain } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { PropsWithChildren } from "react";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [apeChain],
    transports: {
      // RPC URL for each chain
      [apeChain.id]: http(
        `https://apechain-mainnet.g.alchemy.com/v2/N_XCrLBLWNQCl57v9cIo2GVsPd6GSeHW`
      ),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",

    coinbaseWalletPreference: "eoaOnly",
    // Required App Info
    appName: process.env.NEXT_PUBLIC_PROJECT_NAME ?? "Hiilink",

    // Optional App Info
    appDescription: process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION ?? "Hiilink",
    appUrl: "https://frostbyte.art", // your app's url
    appIcon: "https://www.frostbyte.art/hiilink_logo.avif", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
