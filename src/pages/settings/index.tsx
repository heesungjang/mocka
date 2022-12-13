import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import SideBarLayout from "../../components/layouts/SideTabLayout";

function Settings({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1 className="text-2xl font-semibold ">Settings Page</h1>
      <button onClick={() => signOut()}>logout</button>
    </div>
  );
}

Settings.Layout = SideBarLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
export default Settings;
