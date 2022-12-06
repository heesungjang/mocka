import SideNavTab from "./SideNavTab";

const AppLayout = ({ children }: any) => {
  return (
    <div className="flex">
      <SideNavTab />
      <div className="relative h-screen flex-1 px-12 py-10">{children}</div>
    </div>
  );
};

export default AppLayout;
