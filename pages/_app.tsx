import "../globals.css";
import { store, useAppDispatch } from "@/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { UiProviders } from "../provider";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "@/store/reducers/user-slice";
import { authProvider } from "../firebase";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const securePage = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        router.push("/");
      }
    };
    securePage();
  }, [router]);

  return (
    <UiProviders>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UiProviders>
  );
}
