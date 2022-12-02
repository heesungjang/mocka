import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import { type Session } from "next-auth";

import AuthButton from "../components/AuthButton";
import { requireAuthentication } from "../utils/auth";

const DashBoard: NextPage = ({
  authenticatedUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div>dash board</div>
      <div className="flex flex-col items-center gap-2">
        <AuthButton />
      </div>
    </>
  );
};

export default DashBoard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return requireAuthentication(context, ({ session }: { session: Session }) => {
    const { user: authenticatedUser } = session;
    return {
      props: {
        authenticatedUser,
      },
    };
  });
};
