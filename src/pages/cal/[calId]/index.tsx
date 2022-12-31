import React from "react";
import { prisma } from "../../../server/db/client";
import CalInfo from "../../../components/feature/calendar/CalDetail";
import CustomCal from "../../../components/feature/calendar/CalCustom";
import type { GetServerSidePropsContext } from "next";
import { type inferSSRProps } from "../../../types/inferSSRProps";

type Params = Record<"calId", string>;
type CalPageProps = inferSSRProps<typeof getServerSideProps>;

const CalendarPage = ({ user, schedule }: CalPageProps) => {
  return (
    <div className="flex h-screen w-screen  items-center justify-center bg-black">
      <div className="flex min-h-[250px]">
        <section className="cal_section rounded-r-none  border-r-0 border-neutral-400">
          <CalInfo user={user} schedule={schedule} />
        </section>
        <section className=" cal_section rounded-l-none border border-neutral-400 ">
          <CustomCal />
        </section>
      </div>
    </div>
  );
};

export default CalendarPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { calId } = context.params as Params;

  const user = await prisma.user.findFirst({
    where: {
      calLink: calId,
    },
  });

  if (!user) {
    return { redirect: { permanent: false, destination: "/notFound" } };
  }

  const schedule = await prisma.schedule.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!schedule) {
    return { redirect: { permanent: false, destination: "/notFound" } };
  }

  return {
    props: { user, schedule },
  };
}
