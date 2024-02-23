'use client';

import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();

  async function createCheckout(variantId: string) {
    try {
      const { data } = await axios.post('/api/checkouts', { variantId });
      window.open(data.data.url, "_blank");
    } catch (e) {
      console.log((e as Error).message, 'error');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home
      <button onClick={() => createCheckout('264062')}>click</button>

      <p>
        {session?.user?.email}
      </p>
      {sessionStatus === 'authenticated' ?
        <button onClick={() => signOut({ callbackUrl: '/' })}>Log out</button>
        :
        <Link href={'/login'}>Login</Link>
      }
    </main >
  );
}
