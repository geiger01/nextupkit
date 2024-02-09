'use client';
import { signIn, useSession } from "next-auth/react";

import Image from "next/image";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home
      <p>
        {session?.user?.email}
      </p>
    </main>
  );
}
