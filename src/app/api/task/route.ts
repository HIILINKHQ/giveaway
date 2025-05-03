import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { matchId, taskUrl, taskType, creator } = body;

  // Validation
  if (!matchId || !taskUrl || !taskType || !creator) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from('tasks')
    .insert([{ matchId, taskUrl, taskType, creator }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Task uploaded successfully' });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get('matchId');

  if (!matchId) {
    return NextResponse.json(
      { error: 'Match id address is required' },
      { status: 400 }
    );
  }

  // Fetch profile details from Supabase
  const { data, error } = await supabase
    .from('tasks')
    .select('matchId, taskType, taskUrl')
    .eq('matchId', matchId)
    .limit(1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
