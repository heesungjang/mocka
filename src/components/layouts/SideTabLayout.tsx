import SideNavTab from "../SideNavTab";

import { type ReactNode } from "react";

export default function SideBarLayout({ children }: { children: ReactNode }) {
  console.log(children);
  return (
    <div className="flex">
      <SideNavTab />
      <div className="relative h-screen flex-1 px-12 py-10">{children}</div>
    </div>
  );
}
