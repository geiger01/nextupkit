'use client';

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home
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
