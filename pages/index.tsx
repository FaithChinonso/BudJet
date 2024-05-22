import HomePage from "@/components/HomePage";
import { getUser } from "@/store/reducers/user-slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isVerifyRoute = router?.pathname === "/";
  console.log(token?.length);
  useEffect(() => {
    if (token && isVerifyRoute) {
      router.push("dashboard");
    } else {
      setLoading(false);
    }
  }, [isVerifyRoute, router, token]);

  return <main className=" ">{loading ? "loading" : <HomePage />}</main>;
}
