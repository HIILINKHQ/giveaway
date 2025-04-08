import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ClientRedirect from './client-redirect';

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
  console.log(imageUrl);

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
  // redirect(`/#${hash}`);
  return (
    <div>
      <ClientRedirect id={hash} />
    </div>
  );
}
