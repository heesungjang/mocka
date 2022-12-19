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
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand_bg">
      <div className="flex flex-col items-start">
        <h1 className="mb-5 text-center text-6xl font-extrabold tracking-tight text-yellow-50 ">
          Happening Now,
        </h1>
        <span className="text-center text-3xl font-extrabold tracking-tight text-yellow-50">
          Join{" "}
          <span className="decoration-brand_color text-yellow-50 underline decoration-2 underline-offset-8">
            Mocka
          </span>{" "}
          Today
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
          className="bg-brand_color mt-5 inline-flex items-center justify-center rounded-md px-10 py-3  font-semibold  capitalize text-black/80 no-underline transition hover:bg-yellow-200"
          onClick={() => signIn("email", { email, callbackUrl: "/dashboard" })}
        >
          Email a login link
        </button>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-yellow-50"></div>
          <span className="mx-4 flex-shrink text-yellow-50">or</span>
          <div className="flex-grow border-t border-yellow-50"></div>
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
