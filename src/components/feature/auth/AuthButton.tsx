import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton: React.FC = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-[50px] bg-black px-10 py-3 font-semibold text-white no-underline  transition-all duration-200 ease-in-out hover:rounded-md"
        onClick={isAuthenticated ? () => signOut() : () => signIn()}
      >
        {isAuthenticated ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default AuthButton;
