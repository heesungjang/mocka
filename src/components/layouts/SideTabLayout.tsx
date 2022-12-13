import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import cn from "classnames";
import { FiLayout } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import Image from "next/image";
import { type ReactNode } from "react";

export default function SideBarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SideNavTab />
      <div className="relative h-screen flex-1 px-12 py-10">{children}</div>
    </div>
  );
}

const Menus = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Bookings", href: "/bookings" },
  { title: "Setting", href: "/settings" },
];

const SideNavTab = () => {
  return (
    <div className="relative h-screen w-16 bg-[#F9FAFB] pl-4 pr-4 pt-6 md:w-56">
      <NextLink href="/dashboard" className="flex items-center ">
        <Image
          className="md:ml-2 md:mr-3 md:mb-1"
          src="/assets/logo.png"
          alt=""
          width={32}
          height={32}
        />
        <h1 className="text-md hidden origin-left font-semibold  capitalize text-black duration-200 md:block">
          Mocka.com
        </h1>
      </NextLink>
      <div className="flex h-[92%] flex-col justify-between pt-5">
        <div>
          <ul className="flex flex-col">
            {Menus.map((Menu, index) => (
              <NavItem text={Menu.title} href={Menu.href} key={index} />
            ))}
          </ul>
        </div>

        <div>
          <span className="hidden px-3 text-xs text-neutral-400 md:block">
            copyright &copy; {new Date().getFullYear()} Mocka
          </span>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ href = "", text = "" }: { href: string; text: string }) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  const handleNav = () => !isActive && router.push(href);
  return (
    <div
      className={cn(
        isActive
          ? "bg-gray-200 font-normal text-black"
          : "font-normal text-neutral-500 hover:bg-gray-100",
        "mb-2 flex cursor-pointer items-center justify-center  rounded-lg p-1 px-2 py-2 transition-all md:flex md:items-center md:justify-start md:px-3 md:py-2"
      )}
      onClick={() => handleNav()}
    >
      {renderIcons(text)}
      <span className="capsize ml-2 hidden md:block">{text}</span>
    </div>
  );
};

const renderIcons = (text: string) => {
  switch (text) {
    case "Dashboard": {
      return <FiLayout />;
    }
    case "Bookings": {
      return <FiClock />;
    }
    case "Setting": {
      return <FiSettings />;
    }
  }
};
