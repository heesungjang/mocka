import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { getSession } from "next-auth/react";
import SideBarLayout from "../../components/layouts/SideTabLayout";
import DashBoardModal from "../../components/feature/dashboard/modal";
import { FiCalendar, FiMoreHorizontal } from "react-icons/fi";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ContentLayout from "../../components/layouts/ContentLayout";
import { SkeletonLoader } from "../../components/feature/dashboard/lodaer/ScheduleLoader";
import { createStore } from "little-state-machine";
import { StateMachineProvider } from "little-state-machine";
import DetailBox from "../../components/feature/dashboard/schedule/DetailBox";

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
    >
      <span className="text-md mt-8 mb-3 inline-flex items-center font-semibold text-white md:mt-12">
        <FiCalendar className="mr-1" size={20} /> Schedule
      </span>
      <div className="border-1  flex min-h-[320px]  w-full flex-col rounded-lg border border-solid border-yellow-50/10 p-6">
        {!scheduleData && <EmptyMsg />}
        {scheduleData && <DetailBox />}
      </div>
    </ContentLayout>
  );
}

DashBoard.Layout = SideBarLayout;

const EmptyMsg = () => (
  <div className="flex  min-h-[300px] w-full flex-col items-center justify-center ">
    <div className="mb-10 flex flex-col items-center gap-3">
      <span className="text-4xl">🖐</span>
      <span className="text-md text-center font-normal text-white">
        Ready to create new schedule?
      </span>
      <span className="text-sm text-neutral-400">
        Click &quot;Create new&quot; to start creating your mocka schedule.
      </span>
    </div>
    <StateMachineProvider>
      <DashBoardModal />
    </StateMachineProvider>
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
