import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import cn from "classnames";

const NavItem = ({ href = "", text = "" }: { href: string; text: string }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive ? "font-semibold text-gray-800 " : "font-normal text-gray-600",
        "hidden rounded-lg p-1 transition-all hover:bg-gray-200 sm:px-3 sm:py-2 md:inline-block"
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
};

export default NavItem;
