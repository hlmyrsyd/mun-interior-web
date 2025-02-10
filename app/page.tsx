"use client"

import Link from "next/link";

export default function Home() {

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <h1 className="flex gap-4 text-2xl">
        <Link 
          href="/login" 
          className="px-10 py-2 border-[1px] border-black rounded-xl hover:bg-neutral-300 transition-all duration-300 ease-[cubic-bezier(0.9,_0,_0.1,_1)]"
        >
          Login
        </Link>
        <Link 
          href="/project"
          className="px-10 py-2 border-[1px] border-black rounded-xl hover:bg-neutral-300 transition-all duration-300 ease-[cubic-bezier(0.9,_0,_0.1,_1)]"
        >
          Project
        </Link>
      </h1>
    </div>
  );
}
