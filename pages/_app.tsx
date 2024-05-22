import "../globals.css";
import { store, useAppDispatch } from "@/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { UiProviders } from "../provider";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "@/store/reducers/user-slice";
import { authProvider } from "../firebase";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const securePage = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
      }
    };
    securePage();
  }, [router]);
  if (!mounted) return <></>;
  return (
    mounted && (
      <>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>BudJET</title>
          <meta name="description" content="Best Budget app in the world!" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="mask-icon" href="/vercel.svg" color="#FFFFFF" />
          <meta name="theme-color" content="#006400" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/touch-touch-icon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />

          {/* add the following only if you want to add a startup image for Apple devices. */}
        </Head>

        <UiProviders>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </UiProviders>
      </>
    )
  );
}
