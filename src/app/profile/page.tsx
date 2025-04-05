// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Heading,
  VStack,
  Center,
  HStack,
} from '@chakra-ui/react';
import { MAXW } from '@/utils/globals';
import { useAccount } from 'wagmi';
import { MdUpload } from 'react-icons/md';

type accountDetailsType = {
  avatar_url: string;
  twitter_handle: string;
  username: string;
  wallet: string;
} | null;

export default function ProfilePage() {
  const [accountDetails, setAccountDetails] =
    useState<accountDetailsType>(null);
  const [username, setUsername] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { address } = useAccount();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAvatar(e.target.files[0]);
  };

  const updateProfile = async () => {
    if (!address) return alert('Please connect your wallet first');

    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wallet: address,
        username,
        twitter_handle: twitterHandle,
      }),
    });
    const result = await res.json();
    if (result.error) return alert(result.error);
    alert('Profile info updated!');
  };

  const uploadAvatar = async () => {
    if (!address) return alert('Please connect your wallet first');
    if (!avatar) return alert('Please select an avatar image');

    setUploading(true);
    // Create a unique file name
    const fileName = `${address}`;

    // Request a signed URL for the avatar upload
    const res = await fetch('/api/profile/avatar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet: address, fileName }),
    });

    const result = await res.json();
    if (result.error) {
      alert(result.error);
      setUploading(false);
      return;
    }

    const uploadUrl = result.uploadUrl;

    // Upload the file directly to Supabase Storage using the signed URL
    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': avatar.type,
      },
      body: avatar,
    });

    if (!uploadRes.ok) {
      alert('Error uploading avatar');
    } else {
      alert('Avatar uploaded successfully!');
    }
    setUploading(false);
  };

  useEffect(() => {
    async function fetchProfile(wallet: `0x${string}`) {
      const response = await fetch(`/api/profile?wallet=${wallet}`);
      const data = await response.json();
      if (data.error) {
        console.error('Error fetching profile:', data.error);
      } else {
        console.log('User Profile:', data);
        setAccountDetails(data);
        setUsername(data?.username ?? '');
        setTwitterHandle(data?.twitter_handle ?? '');
      }
    }

    if (address) {
      fetchProfile(address);
    }
  }, [address]);

  if (address)
    return (
      <HStack
        p={6}
        color="white"
        w="100%"
        maxW={MAXW}
        mx="auto"
        borderRadius="md"
        minH="calc(100vh - 66px)"
        alignItems="flex-start"
        zIndex={2}
      >
        <VStack mt={6} flex={1}>
          <Heading size="md" mb={2}>
            Upload Avatar
          </Heading>
          <Box
            boxSize="200px"
            border="1px solid white"
            borderRadius="50%"
            pos="relative"
            overflow="hidden"
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              bg="white"
              pos="absolute"
              top="0"
              left="0"
              h="100%"
              width="100%"
              cursor="pointer"
              opacity={0}
              zIndex={1}
            />
            {avatar ? (
              <Box
                zIndex={0}
                pos="absolute"
                top="0"
                left="0"
                h="100%"
                width="100%"
                bg={`url(${URL.createObjectURL(avatar)})`}
                bgPos="center"
                bgSize="cover"
              />
            ) : (
              <Center
                zIndex={0}
                pos="absolute"
                top="0"
                left="0"
                h="100%"
                width="100%"
                bg={
                  accountDetails?.avatar_url
                    ? `url(${accountDetails.avatar_url})`
                    : ''
                }
                bgPos="center"
                bgSize="cover"
                fontSize="24px"
              >
                {accountDetails?.avatar_url ? null : (
                  <MdUpload style={{ opacity: 0.5 }} />
                )}
              </Center>
            )}
          </Box>
          <Button
            mt={2}
            onClick={uploadAvatar}
            isLoading={uploading}
            color="white"
            bg="linear-gradient(50deg,rgb(15, 15, 15),rgb(32, 32, 32))"
            border="1px solid rgba(255,255,255,.1)"
            _hover={{
              borderColor: 'white',
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Avatar'}
          </Button>
        </VStack>

        <VStack spacing={4} mt={4} flex={2} alignItems="flex-end">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              borderColor="rgba(255,255,255,.4)"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Twitter Handle</FormLabel>
            <Input
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              borderColor="rgba(255,255,255,.4)"
            />
          </FormControl>

          <Button
            onClick={updateProfile}
            color="white"
            bg="linear-gradient(50deg,rgb(15, 15, 15),rgb(32, 32, 32))"
            border="1px solid rgba(255,255,255,.1)"
            _hover={{
              borderColor: 'white',
            }}
          >
            Update Profile Info
          </Button>
        </VStack>
      </HStack>
    );

  return (
    <Center w="100%" maxW={MAXW} minH="100svh" color="white">
      <Text>Connect wallet and update profile</Text>
    </Center>
  );
}
