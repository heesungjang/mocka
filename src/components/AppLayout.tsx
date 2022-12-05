import SideNavTab from "./SideNavTab";

const AppLayout = ({ children }: any) => {
  return (
    <div className="flex">
      <SideNavTab />
      <div className="h-screen flex-1 p-14 pt-20">{children}</div>
    </div>
  );
};

export default AppLayout;
