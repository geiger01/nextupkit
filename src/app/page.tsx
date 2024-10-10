'use client';

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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
    <>
      <Header />
      <button onClick={() => createCheckout('269320')}>click</button>
      <Footer />
    </>
  );
}
