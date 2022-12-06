import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import { type Session } from "next-auth";
import { requireAuthentication } from "../utils/auth";
import { FiPlus } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import Modal from "../components/Modal";

const DashBoard: NextPage = ({
  authenticatedUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal} />
      )}
      <div className="relative  flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold uppercase">Dashboard</h1>
          <span className="text-sm font-light text-neutral-400">
            Create your Mocka schedule link and share with people.
          </span>
        </div>
        <button
          onClick={openModal}
          className=" hidden h-10 items-center rounded-md  bg-black px-4 text-white  md:inline-flex "
        >
          Create
          <FiPlus className="ml-5" strokeWidth={3} />
        </button>
      </div>

      <button className="mt-5 inline-flex h-10 items-center  rounded-md bg-black px-4  text-white transition-all duration-200 md:hidden">
        Create
        <FiPlus className="ml-5" strokeWidth={3} />
      </button>

      <div className="border-1 mt-8 flex h-96 w-full flex-col items-center justify-center rounded-lg border border-solid md:mt-12">
        <FiMoreHorizontal className="mb-5" size={35} opacity={0.5} />
        <span className="text-md font-light text-neutral-400">
          Looks like you don&apos;t have mocka schedule yet.
        </span>
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
