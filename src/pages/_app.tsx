import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { Inter } from "@next/font/google";
import Layout from "../components/AppLayout";

const inter = Inter({
  subsets: ["latin"],
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
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
