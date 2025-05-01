import { VStack } from '@chakra-ui/react';
import { MAXW } from '@/utils/globals';
import OnGoingMatches from '@/components/ongoinMatches';

// const oldCompsData = [
//   {
//     end_at: "12 hours ago",
//     image_url:
//       "https://img-cdn.magiceden.dev/rs:fill:800:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fi9YO%252F4yHXUdJsWcTqhqvf0YpOmN9sO8MbxEP4GHZyr54CpSKyh4RppR8HcDfCOQ5OUORSleQD2N1FQFdI50fhWmlTdkQnqEiRPHL5Q7OSZ1yoN32R2OJs8VPx1AP414Z.png",
//     color: "conic-gradient(rgba(0,0,0,0), #2c3d82, rgba(0,0,0,0) 25%)",
//     winner: "0x12...345",
//     txn: "https://apescan.io/tx/0x3cf5319f85dc19acfdfc05960946a00f9c7e45b040a629b4629478341ad4f15d",
//   },
//   {
//     end_at: "17 hours ago",
//     image_url:
//       "https://img-cdn.magiceden.dev/rs:fill:800:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fi9YO%252F4yHXUdJsWcTqhqvf%252FVv3DLWvzmCLim5gYZaTaMB8A%252FPC5vqz4pCgpyZ9ZqCeYuOqdgaApt78Dk%252BMpZlTH2DkC8RCC%252BIvEVvMzUm6RPUt7DtgjhbYXGr5wUCqA5b.png",
//     color: "conic-gradient(rgba(0,0,0,0), #28bfc9, rgba(0,0,0,0) 25%)",
//     winner: "0x12...345",
//     txn: "https://apescan.io/tx/0x3cf5319f85dc19acfdfc05960946a00f9c7e45b040a629b4629478341ad4f15d",
//   },
//   {
//     end_at: "2 days ago",
//     image_url:
//       "https://img-cdn.magiceden.dev/rs:fill:800:0:0/plain/https%3A%2F%2Frenderer.magiceden.dev%2Fv3%2Fapechain%2Frender%3Fcontract%3D0xbebaa24108d6a03c7331464270b95278bbbe6ff7%26tokenId%3D502",
//     color: "conic-gradient(rgba(0,0,0,0), #2139b5, rgba(0,0,0,0) 25%)",
//     winner: "0x12...345",
//     txn: "https://apescan.io/tx/0x3cf5319f85dc19acfdfc05960946a00f9c7e45b040a629b4629478341ad4f15d",
//   },
//   {
//     end_at: "3 day 12s ago",
//     image_url:
//       "https://img-cdn.magiceden.dev/autoquality:size:1024000:20:80/rs:fill:800:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fapechain%2F7%252FrdF%252Fe%252F0iXY8HduhRCoIehkmFeXPeOQQFbbmIPfjCY0FjwAl3ffF9Jb2N6jHSVY2iwXRiJ02Q4isNH%252BL2wTd6rlJ7Y%252BiBlS13M%252Bro%252FTbslVw15v4PBe0hJaaRZdHDgoBaZpcrNYv3bFT7P5LLG7uA%253D%253D.gif",
//     color: "conic-gradient(rgba(0,0,0,0), #1bbfb4, rgba(0,0,0,0) 25%)",
//     winner: "0x12...345",
//     txn: "https://apescan.io/tx/0x3cf5319f85dc19acfdfc05960946a00f9c7e45b040a629b4629478341ad4f15d",
//   },
// ];

// export type OldCompType = (typeof  oldCompsData)[number];

export default function Home() {
  return (
    <VStack
      w="100%"
      zIndex={2}
      // minH="100svh"
      justifyContent="flex-start"
      maxW={MAXW}
      mx="auto"
      alignItems="stretch"
      spacing="24px"
      // flexDir={["column", "column", "row", "row", null]}
      px={['10px', null, 0, null]}
    >
      {/* <Carousel /> */}
      <OnGoingMatches />

      {/* <PastMatches /> */}
    </VStack>
  );
}
