import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { getSession } from "next-auth/react";
import SideBarLayout from "../../components/layouts/SideTabLayout";
import DashBoardModal from "../../components/feature/dashboard/modal";
import ContentLoader from "react-content-loader";
import { FiCalendar, FiMoreHorizontal } from "react-icons/fi";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

function DashBoard({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    data: scheduleData,
    isLoading: scheduleLoading,
    refetch,
  } = trpc.schedule.get.useQuery();
  const { isLoading: userLoading } = trpc.auth.getFullUserDetail.useQuery();
  const revalidateSchedule = () => refetch();

  return (
    <>
      <div className="relative  flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-5xl font-semibold capitalize text-yellow-50">
            Dashboard
          </h1>
          <span className="mt-2 inline-block text-lg font-light text-neutral-400">
            Create events to share for people to book on your calendar.
          </span>
        </div>
        {!scheduleData && !scheduleLoading && (
          <div className="mt-3 flex md:mt-0">
            <DashBoardModal revalidateSchedule={revalidateSchedule} />
          </div>
        )}
      </div>

      <span className="text-md mt-8 mb-3 inline-flex items-center font-semibold text-yellow-50 md:mt-12">
        <FiCalendar className="mr-1" /> My schedule
      </span>
      <div className="border-1  flex min-h-[320px]  w-full flex-col rounded-lg border border-solid border-white/5 p-6">
        {userLoading || scheduleLoading ? (
          <SkeletonLoader />
        ) : !scheduleData ? (
          <EmptyMsg />
        ) : (
          <ScheduleDetail />
        )}
      </div>
    </>
  );
}

DashBoard.Layout = SideBarLayout;

const ScheduleDetail = () => {
  const { data: scheduleData } = trpc.schedule.get.useQuery();
  const { data: userData } = trpc.auth.getFullUserDetail.useQuery();
  return (
    <div>
      <div className="flex items-center gap-4">
        <Image
          src="/assets/defaultAvatar.png"
          width={32}
          height={32}
          alt=""
          className="mb-1 rounded-full"
        />
        <div className="flex flex-col justify-center">
          <span className="text-neutral-black text-sm font-semibold capitalize">
            {userData?.name ?? "Anonymous"}
          </span>
          <span className="text-sm font-light text-neutral-500">
            {userData?.email}
          </span>
        </div>
      </div>
      <div className="mt-10 flex flex-col">
        <span>bio: {userData?.bio ?? "기본 인사말"}</span>
        <span>title: {scheduleData?.title}</span>
        <span>chatTime: {scheduleData?.chatTime}</span>
        <span>description: {scheduleData?.description}</span>
        <span>timeZone: {scheduleData?.timeZone}</span>
      </div>

      <div className="mt-10 flex flex-col">
        {scheduleData?.availability.map((day) => (
          <span key={day.id}>
            {day.date}: {day.from} - {day.to}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

const EmptyMsg = () => (
  <div className="flex  min-h-[300px] w-full flex-col items-center justify-center">
    <FiMoreHorizontal
      className="mb-5 text-brand_color"
      size={35}
      // opacity={0.5}
    />
    <span className="text-md text-center font-semibold text-yellow-50">
      You don&apos;t have a mocka schedule yet.
    </span>
  </div>
);

const SkeletonLoader = () => (
  <ContentLoader
    uniqueKey="skeleton_loader"
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default DashBoard;
