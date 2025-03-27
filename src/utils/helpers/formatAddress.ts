export function formatAddress(address : string | undefined) {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-5)}`;
}

