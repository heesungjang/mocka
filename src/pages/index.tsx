import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

function RedirectPage() {
  return;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/welcome" } };
  }

  return { redirect: { permanent: false, destination: "/dashboard" } };
}

export default RedirectPage;
