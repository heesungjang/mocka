interface IAppRouter {
  LANDING_PAGE: string;
  DASH_BOARD_PAGE: string;
}

export const appRoutes: IAppRouter = {
  LANDING_PAGE: "/",
  DASH_BOARD_PAGE: "/dashboard",
};

export const Menus = [
  { title: "Dashboard", src: "Chart_fill" },
  { title: "Inbox", src: "Chat" },
  { title: "Accounts", src: "User", gap: true },
  { title: "Schedule ", src: "Calendar" },
  { title: "Search", src: "Search" },
  { title: "Analytics", src: "Chart" },
  { title: "Files ", src: "Folder", gap: true },
  { title: "Setting", src: "Setting" },
];
