import {
  type NextPage,
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";

import { type Session } from "next-auth";
import { FiMoreHorizontal } from "react-icons/fi";
import DashBoardModal from "../components/feature/daboardModal";
import { requireAuthentication } from "../utils/auth";

const EmptyMsg = (
  <>
    <FiMoreHorizontal className="mb-5" size={35} opacity={0.5} />
    <span className="text-md font-light text-neutral-400">
      Looks like you don&apos;t have mocka schedule yet.
    </span>
  </>
);

const DashBoard: NextPage = ({
  authenticatedUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className="relative  flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold uppercase">Dashboard</h1>
          <span className="text-sm font-light text-neutral-400">
            Create your Mocka schedule link and share with people.
          </span>
        </div>
        <DashBoardModal />
      </div>

      <div className="border-1 mt-8 flex h-96 w-full flex-col items-center justify-center rounded-lg border border-solid md:mt-12">
        {EmptyMsg}
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
        session: authenticatedUser,
      },
    };
  });
};
