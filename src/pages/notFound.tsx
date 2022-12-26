import React from "react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-brand_bg">
      404
    </div>
  );
};

export default NotFound;
