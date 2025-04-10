import CurrentComp from '@/components/currentComp';
import { Button, Text, VStack } from '@chakra-ui/react';
import { Metadata } from 'next';
import { useReadContract } from 'wagmi';
import abi from '@/contract/abis/winpad.abi.json';
import { apeChain } from 'viem/chains';
import GiveawayComp from './giveawayHash';

type Props = {
  params: { id: string };
  searchParams: { tokenId?: string; contract?: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { id } = params;
  const { tokenId, contract } = searchParams;

  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?tokenId=${tokenId}&contract=${contract}`;

  return {
    title: `Giveaway #${tokenId}`,
    description: `Win token ${tokenId} from contract ${contract}`,
    openGraph: {
      title: `Giveaway #${id}`,
      description: `NFT Giveaway of token ${tokenId}`,
      images: [imageUrl],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?tokenId=${tokenId}&contract=${contract}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Hiilink Giveaway #${tokenId}`,
      description: `Hiilink NFT Giveaway!`,
      images: [imageUrl],
    },
  };
}

export default function Page({ params, searchParams }: Props) {
  const hash = `${params.id}`;
  return (
    <VStack
      minH="100vh"
      w="100%"
      zIndex={2}
      justifyContent="center"
      alignItems="center"
    >
      <GiveawayComp hash={hash} />
    </VStack>
  );
}
