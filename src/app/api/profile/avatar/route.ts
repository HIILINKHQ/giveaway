// app/api/profile/avatar/route.ts
import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";




/// 🚀 **POST Request: Update/Create Profile**
export async function POST(req: Request) {
  const body = await req.json();
  const { wallet, fileName } = body;

  if (!wallet || !fileName) {
    return NextResponse.json(
      { error: "Missing wallet or fileName" },
      { status: 400 }
    );
  }

  // In production, verify the wallet signature/authentication here.

  // Retrieve the existing profile to check for an existing avatar
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("wallet", wallet)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  // Delete the old avatar if one exists
  if (profile && profile.avatar_url) {
    const urlParts = profile.avatar_url.split("/avatars/");
    const existingFilePath = urlParts.length > 1 ? urlParts[1] : "";

    console.log("Removing:", existingFilePath);

    // Remove the old avatar using the correct path
    const { error: removeError } = await supabase.storage
      .from("avatars")
      .remove([existingFilePath]);

    if (removeError) {
      console.error("Error removing file:", removeError.message);
    } else {
      console.log("File removed successfully");
    }
  }

  // Generate a signed upload URL valid for 60 seconds
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .createSignedUploadUrl(fileName);

  if (uploadError) {
    console.log("uploadError");
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Update the profile with the new avatar URL (this assumes your bucket is public)
  // Replace YOUR_SUPABASE_URL with your project URL or generate the public URL dynamically.
  const newAvatarUrl = `https://qxevryudkcwavzdlavwj.supabase.co/storage/v1/object/public/avatars/${fileName}`;
  const { error: updateError } = await supabase
    .from("profiles")
    .upsert(
      { wallet: wallet, avatar_url: newAvatarUrl },
      { onConflict: "wallet" }
    );

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ uploadUrl: uploadData?.signedUrl });
}

