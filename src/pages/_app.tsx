import { trpc } from "../utils/trpc";
import { Inter } from "@next/font/google";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ScriptProps } from "next/script";

import "../styles/globals.css";

type Page<P = Record<string, never>> = NextPage<P> & {
  Layout: (page: ScriptProps) => JSX.Element;
};

type Props = AppProps & {
  Component: Page;
};

const withOutLayout = ({ children }: ScriptProps) => <>{children}</>;

const inter = Inter({
  subsets: ["latin"],
});
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
  const Layout = Component.Layout || withOutLayout;

  return (
    <SessionProvider session={session}>
      <main className={inter.className}>
        {session ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
