'use client';

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();

  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home
      <p>
        {session?.user?.email}
      </p>
      <button onClick={() => signOut()}>Log out</button>
    </main>
  );
}
