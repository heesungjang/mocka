const ContentLayout = ({
  title,
  subTitle,
  modal,
  children,
}: {
  title: string;
  subTitle: string;
  modal?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex w-full flex-col">
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-semibold capitalize text-yellow-50">
            {title}
          </h1>
          <span className="mt-2 inline-block text-lg font-light text-neutral-400">
            {subTitle}
          </span>
        </div>
        <div>{modal && modal}</div>
      </div>
      {children}
    </div>
  );
};

export default ContentLayout;
