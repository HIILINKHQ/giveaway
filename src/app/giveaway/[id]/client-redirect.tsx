'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

export default function ClientRedirect({ id }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/#${id}`);
  }, [id, router]);

  return null;
}
