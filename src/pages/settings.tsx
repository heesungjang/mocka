import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import { type Session } from "next-auth";
import { requireAuthentication } from "../utils/auth";

const Settings: NextPage = ({
  authenticatedUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="h-screen flex-1 p-14 pt-20">
      <h1 className="text-2xl font-semibold ">Settings Page</h1>
    </div>
  );
};

export default Settings;

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
