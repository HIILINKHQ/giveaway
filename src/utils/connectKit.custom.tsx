import { ConnectKitButton } from "connectkit";
import { formatAddress } from "./helpers/formatAddress";
import { Button } from "@chakra-ui/react";
import { orbitron } from "@/fonts";

const WalletConnector = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        return (
          <Button
            onClick={show}
            fontSize="13px"
            bg="url('/assets/wl.png')"
            bgRepeat="repeat-x"
            bgSize="contain"
            _hover={{ transform: "scale(0.95)" }}
            _active={{ transform: "scale(1.05)" }}
            color="white"
          >
            {isConnecting ? (
              <span className={`${orbitron.className} wl_text`}>
                Connecting...
              </span>
            ) : (
              <span className={`${orbitron.className} wl_text`}>
                {isConnected
                  ? ensName || formatAddress(address)
                  : "Connect Wallet"}
              </span>
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default WalletConnector;
