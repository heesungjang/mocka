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
import ScheduleDetail from "../../components/feature/dashboard/schedule/ScheduleDetail";

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
