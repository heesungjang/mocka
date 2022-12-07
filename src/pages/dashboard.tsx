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
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../components/Modal";

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
        <Modal>
          <ModalOpenButton>
            <button className=" inline-flex h-10 items-center  rounded-md bg-black px-4  text-white">
              Create
              <FiPlus className="ml-5" strokeWidth={3} />
            </button>
          </ModalOpenButton>
          <ModalContents title="Create new schedule">
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
            </div>

            <div className="mt-4">
              <ModalDismissButton>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Got it, thanks!
                </button>
              </ModalDismissButton>
            </div>
          </ModalContents>
        </Modal>
      </div>

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
