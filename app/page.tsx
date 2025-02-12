'use client';

import Image from 'next/image';
import Login from '@/components/Login';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Login />
      </main>
    </div>
  );
}
