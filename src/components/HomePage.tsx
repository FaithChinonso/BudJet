"use client";

import Image from "next/image";

import SignIn from "@/components/SignIn";

export default function HomePage() {
  return (
    <div className="w-full h-full flex-col items-center justify-between p-24 flex min-h-screen bg-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-secondary text-secondary  pb-6 pt-8 backdrop-blur-2xl dark:border-primary dark:bg-light-green dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-light-green lg:p-4 lg:dark:bg-light-green">
          Do you want to take control of your finances?
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <Image src="/logo.png" alt="logo" width={100} height={100} priority />
        </div>
      </div>
      <div>
        <SignIn />
      </div>
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-green-200 after:via-green-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-primary before:dark:opacity-10 after:dark:from-green-900 after:dark:via-secondary after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
    </div>
  );
}
