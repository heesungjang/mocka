import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import { type Session } from "next-auth";

import Image from "next/image";
import { useState } from "react";
import NavItem from "../components/NavItem";
import { Menus } from "../constants/clitent";
import { requireAuthentication } from "../utils/auth";

const DashBoard: NextPage = ({
  authenticatedUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex">
      <SideTab />
      <div className="h-screen flex-1 p-14 pt-20">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
};

export default DashBoard;

const SideTab = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={` ${
        open ? "w-60" : "w-20 "
      } relative h-screen bg-[#F9FAFB] p-4  pt-6 duration-300`}
    >
      <Image
        src="/assets/control.png"
        width={20}
        height={20}
        alt=""
        className={`border-1 absolute -right-3 top-10 w-7
     cursor-pointer rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex items-center gap-x-1">
        <Image
          src="/assets/logo.png"
          alt=""
          width={50}
          height={50}
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`origin-left text-lg font-semibold capitalize text-black duration-200 ${
            !open && "scale-0 "
          }`}
        >
          Mocka.com
        </h1>
      </div>
      <ul className="flex flex-col pt-3">
        {Menus.map((Menu, index) => (
          <NavItem text={Menu.title} href={Menu.title} key={index} />
        ))}
      </ul>
    </div>
  );
};

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
