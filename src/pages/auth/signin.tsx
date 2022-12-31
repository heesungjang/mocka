import React, { useState } from "react";
import { type Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import { type NextPage, type GetServerSideProps } from "next";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

interface ISignIn {
  providers: Provider[];
}
const SignIn: NextPage<ISignIn> = ({ providers }) => {
  const [email, setEmail] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center bg-black">
      <Image
        className="mt-24"
        src="/assets/logo.png"
        width={90}
        height={90}
        alt=""
      />
      <div className="mt-20 flex flex-col items-center">
        <h1 className="mb-5 text-center text-6xl font-extrabold tracking-tight text-white ">
          Happening Now,
        </h1>
        <span className="text-center text-3xl font-extrabold tracking-tight text-white">
          everybody loves{" "}
          <span className="text-white underline decoration-green-200 decoration-2 underline-offset-8">
            Mocka
          </span>{" "}
        </span>
      </div>

      <div className="mt-6 flex w-80 flex-col">
        <input
          className="mt-10 h-12 w-full rounded-md px-5 focus:border-black focus:bg-white focus:outline-black"
          placeholder="your@email.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="mt-5 inline-flex items-center justify-center rounded-md bg-green-200 px-10 py-3  font-semibold  capitalize text-black/80 no-underline transition "
          onClick={() => signIn("email", { email, callbackUrl: "/dashboard" })}
        >
          Email a login link
        </button>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-white"></div>
          <span className="mx-4 flex-shrink text-white">or</span>
          <div className="flex-grow border-t border-white"></div>
        </div>

        <div className="">
          {Object.values(providers).map(
            (provider) =>
              provider.name !== "Email" && (
                <div key={provider.name}>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-10 py-3 font-semibold capitalize text-black/80 no-underline transition"
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/dashboard" })
                    }
                  >
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Continue with {provider.name}
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
