// app/api/profile/route.ts
import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

// POST endpoint to update username and Twitter handle
export async function POST(req: Request) {
  const body = await req.json();
  const { wallet, username, twitter_handle } = body;

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  // Here you’d normally verify the wallet authentication signature.
  // For demo purposes, if a wallet is provided, we assume it is authenticated.

  const { error } = await supabase
    .from('profiles')
    .upsert({  wallet, username, twitter_handle },{onConflict : "wallet"});

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Profile updated successfully' });
}

/// 🚀 **GET Request: Fetch Profile by Wallet**
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get('wallet');

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  // Fetch profile details from Supabase
  const { data, error } = await supabase
    .from('profiles')
    .select('wallet, username, twitter_handle, avatar_url')
    .eq('wallet', wallet)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}