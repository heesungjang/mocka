import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import SideBarLayout from "../../components/layouts/SideTabLayout";
import { requireAuthentication } from "../../utils/auth";

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
  return requireAuthentication(context, ({ session }: { session: Session }) => {
    const { user: authenticatedUser } = session;
    return {
      props: {
        session: authenticatedUser,
      },
    };
  });
};

export default Settings;
