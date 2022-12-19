import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton: React.FC = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="bg-brand_color rounded-[50px] px-10 py-3  font-semibold text-black/80  no-underline transition-all duration-200 ease-in-out hover:rounded-md"
        onClick={isAuthenticated ? () => signOut() : () => signIn()}
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default AuthButton;
