import HomePage from "@/components/HomePage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authProvider } from "../firebase";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && router?.pathname === "/") {
      router.push("dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  return (
    <main className=" ">
      <HomePage />
    </main>
  );
}
