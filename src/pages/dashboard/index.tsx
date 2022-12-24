import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { getSession } from "next-auth/react";
import SideBarLayout from "../../components/layouts/SideTabLayout";
import DashBoardModal from "../../components/feature/dashboard/createModal";
import { FiCalendar, FiMoreHorizontal } from "react-icons/fi";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ContentLayout from "../../components/layouts/ContentLayout";
import { SkeletonLoader } from "../../components/feature/dashboard/lodaer/ScheduleLoader";
import { createStore } from "little-state-machine";
import { StateMachineProvider } from "little-state-machine";

function DashBoard({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: scheduleData, isLoading: isScheduleLoading } =
    trpc.schedule.get.useQuery();
  const { isLoading: isUserLoading } = trpc.auth.getFullUserDetail.useQuery();

  if (isScheduleLoading || isUserLoading) {
    return <SkeletonLoader />;
  }

  return (
    <ContentLayout
      title="Dashboard"
      subTitle="Create events to share for people to book on your calendar."
      modal={
        <StateMachineProvider>
          <DashBoardModal />
        </StateMachineProvider>
      }
    >
      <span className="text-md mt-8 mb-3 inline-flex items-center font-semibold text-yellow-50 md:mt-12">
        <FiCalendar className="mr-1" /> My schedule detail
      </span>
      <div className="border-1  flex min-h-[320px]  w-full flex-col rounded-lg border border-solid border-white/5 p-6">
        {!scheduleData && <EmptyMsg />}
        {scheduleData && <ScheduleDetail />}
      </div>
    </ContentLayout>
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
    <FiMoreHorizontal className="mb-5 text-brand_color" size={35} />
    <span className="text-md text-center font-semibold text-yellow-50">
      You don&apos;t have a mocka schedule yet.
    </span>
  </div>
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

/**create global state machine store for new schedule form datas*/
export const initialCreateNewScheduleState = {
  data: {
    title: "",
    description: "",
    chatTime: 15,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    availability: {},
  },
  dates: {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  },
};
createStore(
  {
    ...initialCreateNewScheduleState,
  },
  {
    name: "newScheduleInputs",
    persist: "action",
  }
);

export default DashBoard;
