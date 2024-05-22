"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUser } from "@/store/reducers/user-slice";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useEffect } from "react";
import { authProvider } from "../../firebase";
import { signOutUser } from "@/services/Auth";
import SignIn from "@/components/SignIn";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function HomePage() {
  return (
    <div className="w-full h-full flex-col items-center justify-between p-24 flex min-h-screen">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Do you want to know how your money go?
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>
              bud<span>^JET</span>
            </p>
          </a>
        </div>
      </div>
      <div>
        <SignIn />
      </div>
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-green-200 after:via-green-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-primary before:dark:opacity-10 after:dark:from-green-900 after:dark:via-secondary after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
    </div>
  );
}
