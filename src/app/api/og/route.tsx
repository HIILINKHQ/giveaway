/** @jsxImportSource react */
import { ImageResponse } from '@vercel/og';
import { promises as fs } from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contract = searchParams.get('contract');
  const tokenId = searchParams.get('tokenId');

  if (!contract || !tokenId) {
    return new Response('Missing contract or tokenId', { status: 400 });
  }

  const metadataRes = await fetch(
    `https://api-apechain.reservoir.tools/tokens/v7?tokens=${contract}:${tokenId}`
  );
  const metadata = await metadataRes.json();
  const imageUrl = metadata?.tokens?.[0]?.token?.image;

  if (!imageUrl) {
    return new Response('No image found', { status: 404 });
  }
  const fontPath = path.join(
    process.cwd(),
    'src',
    'app',
    'assets',
    'Inter-ExtraBold.otf'
  );
  const fontData = await fs.readFile(fontPath);

  const rogfontPath = path.join(
    process.cwd(),
    'src',
    'app',
    'assets',
    'asusrog_regular.ttf'
  );
  const RogfontData = await fs.readFile(rogfontPath);

  const pngImageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
    imageUrl
  )}&output=png&w=512`;

  const hiilinkURL = `https://images.weserv.nl/?url=${encodeURIComponent(
    'https://giveaway.hii.link/hiilink_header.avif'
  )}&output=png&w=512`;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            borderRadius: '12px',
            width: '100%',
          }}
        >
          <img
            src={pngImageUrl}
            width={400}
            height={400}
            style={{ borderRadius: '12px' }}
            alt="webp"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <p
              style={{
                marginTop: 40,
                fontFamily: 'ROG',
                fontWeight: 900,
                fontSize: '26px',
              }}
            >
              {metadata?.tokens?.[0]?.token?.collection?.name}
            </p>
            <img
              src={hiilinkURL}
              width={400}
              height={100}
              style={{ borderRadius: '12px' }}
              alt="webp"
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Typewriter',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'ROG',
          data: RogfontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
