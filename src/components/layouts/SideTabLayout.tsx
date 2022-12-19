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
      <div className="relative h-screen flex-1   bg-brand_bg_dark  px-12 py-10">
        {children}
      </div>
    </div>
  );
}

const Menus = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Bookings", href: "/bookings" },
  { title: "Settings", href: "/settings" },
];

const SideNavTab = () => {
  return (
    <div className=" relative h-screen w-16 bg-brand_sub_bg px-3 pt-6 md:w-56">
      <NextLink href="/dashboard" className="flex items-center ">
        {/* <Image
          className="md:ml-2 md:mr-3 md:mb-1"
          src="/assets/logo.png"
          alt=""
          width={32}
          height={32}
        /> */}
        <h1 className="text-md hidden origin-left  pl-2 text-2xl font-semibold  text-yellow-50 duration-200 md:block">
          <span className="capitalize underline decoration-brand_color underline-offset-4">
            Mocka
          </span>
          .com
        </h1>
        <div className="flex h-10 w-full items-center justify-center rounded-full bg-brand_color text-2xl font-semibold text-black md:hidden">
          M
        </div>
      </NextLink>
      <div className="flex h-[92%] flex-col justify-between pt-5">
        <div>
          <ul className="flex flex-col">
            {Menus.map((Menu, index) => (
              <NavItem text={Menu.title} href={Menu.href} key={index} />
            ))}
          </ul>
        </div>

        <div className="flex w-full justify-center">
          <span className="hidden items-center px-3 text-xs text-neutral-400 md:block ">
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
          ? "bg-neutral-700 font-normal text-black"
          : "font-normal text-neutral-500 hover:bg-neutral-700/20",
        "mb-2 flex cursor-pointer items-center justify-center  rounded-lg p-1 px-2 py-2 transition-all md:flex md:items-center md:justify-start md:px-3 md:py-2"
      )}
      onClick={() => handleNav()}
    >
      {renderIcons(text)}
      <span className="capsize ml-2 hidden text-yellow-50 md:block">
        {text}
      </span>
    </div>
  );
};

const renderIcons = (text: string) => {
  switch (text) {
    case "Dashboard": {
      return <FiLayout color="rgb(254 252 232)" />;
    }
    case "Bookings": {
      return <FiClock color="rgb(254 252 232)" />;
    }
    case "Settings": {
      return <FiSettings color="rgb(254 252 232)" />;
    }
  }
};
