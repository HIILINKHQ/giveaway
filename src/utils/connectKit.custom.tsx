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
            color="rgba(255,255,255, 0.8)"
            px="30px"
            border="1px solid rgba(255,255,255, 0.2)"
          >
            {isConnecting ? (
              <span className={`${orbitron.className} wl_text`}>
                Connecting...
              </span>
            ) : (
              <span className={`${orbitron.className} wl_text`}>
                {isConnected ? ensName || formatAddress(address) : "Log in"}
              </span>
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default WalletConnector;
