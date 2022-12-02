import React from "react";
import { type Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import { type NextPage, type GetServerSideProps } from "next";

interface ISignIn {
  providers: Provider[];
}
const SignIn: NextPage<ISignIn> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
