const ContentLayout = ({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex w-full flex-col">
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-semibold capitalize text-white">
            {title}
          </h1>
          <span className="text-md mt-2 inline-block font-light  text-neutral-400">
            {subTitle}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ContentLayout;
