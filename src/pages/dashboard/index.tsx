import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { FiMoreHorizontal } from "react-icons/fi";
import DashBoardModal from "../../components/feature/dashboard/modal";
import SideBarLayout from "../../components/layouts/SideTabLayout";

function DashBoard({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <EmptyMsg />
      </div>
    </>
  );
}

DashBoard.Layout = SideBarLayout;

const EmptyMsg = () => (
  <>
    <FiMoreHorizontal className="mb-5" size={35} opacity={0.5} />
    <span className="text-md font-light text-neutral-400">
      Looks like you don&apos;t have mocka schedule yet.
    </span>
  </>
);

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

export default DashBoard;
