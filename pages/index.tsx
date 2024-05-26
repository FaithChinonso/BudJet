import HomePage from "@/components/HomePage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authProvider } from "../firebase";
import { useAppDispatch } from "@/store";
import { getUser, setUserId } from "@/store/reducers/user-slice";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <main className=" ">
      <HomePage />
    </main>
  );
}
