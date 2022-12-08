import React, { useState } from "react";
import { type Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import { type NextPage, type GetServerSideProps } from "next";
import { FcGoogle } from "react-icons/fc";

interface ISignIn {
  providers: Provider[];
}
const SignIn: NextPage<ISignIn> = ({ providers }) => {
  const [email, setEmail] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F3F3F3]">
      <div className="flex flex-col items-start">
        <h1 className="mb-5 text-center text-6xl font-extrabold tracking-tight text-black">
          Happening Now,
        </h1>
        <span className="text-center text-3xl font-extrabold tracking-tight text-black">
          Join{" "}
          <span className="bg-black px-2 leading-snug text-white">Mocka</span>{" "}
          Today
        </span>
      </div>

      <div className="mt-6 flex w-80 flex-col">
        <input
          className="mt-10 h-12 w-full rounded-md px-5"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="mt-5 inline-flex items-center justify-center rounded-md bg-black px-10 py-3 font-normal text-white no-underline transition hover:bg-black/80"
          onClick={() => signIn("email", { email, callbackUrl: "/dashboard" })}
        >
          Continue with Email
        </button>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 flex-shrink text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div className="">
          {Object.values(providers).map(
            (provider) =>
              provider.name !== "Email" && (
                <div key={provider.name}>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md border border-solid  border-neutral-300 px-10 py-3 font-normal text-black no-underline transition hover:bg-neutral-200/[0.95]"
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
