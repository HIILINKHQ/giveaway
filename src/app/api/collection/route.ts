import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Your RPC URL (Infura, Alchemy, or other provider)
const RPC_URL = 'https://apechain-mainnet.g.alchemy.com/v2/N_XCrLBLWNQCl57v9cIo2GVsPd6GSeHW';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const contractAddress = searchParams.get('contract');

  if (!contractAddress) {
    return NextResponse.json({ error: 'Contract address is required' }, { status: 400 });
  }

  try {
    // Connect to Ethereum provider
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // ERC-721 & ERC-1155 ABI (only `name` function)
    const ABI = ['function name() view returns (string)'];
    
    // Connect to contract
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    // Fetch collection name
    const collectionName = await contract.name();

    return NextResponse.json({ name: collectionName });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return NextResponse.json({ error: error?.message ?? "Error" }, { status: 500 });
  }
}
