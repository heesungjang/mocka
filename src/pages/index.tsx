import Head from "next/head";
import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import AuthButton from "../components/AuthButton";
import { getSession } from "next-auth/react";

const Home: NextPage = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Mocka</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#15162c]">
        <div className="container relative flex max-w-lg flex-col items-center justify-center gap-12 px-4 py-16 md:max-w-3xl">
          <span className=" absolute left-12 top-10 text-2xl md:left-10 md:top-5 md:text-5xl">
            👋
          </span>
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white md:text-[5rem]">
            Spend Valuable Minutes In
            <span className="leading-snug text-[#c050f8]"> Mocka</span>
          </h1>

          <div className="flex flex-col items-center gap-2">
            <AuthButton />
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Home;