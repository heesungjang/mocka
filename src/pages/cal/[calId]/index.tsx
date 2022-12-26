import React, { useState } from "react";
import { prisma } from "../../../server/db/client";
import Calendar from "react-calendar";
import type { GetServerSidePropsContext } from "next";
import type { inferSSRProps } from "../../../types/inferSSRProps";

type Params = Record<"calId", string>;
type CalPageProps = inferSSRProps<typeof getServerSideProps>;

const CalenderPage = ({ user }: CalPageProps) => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-brand_bg">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default CalenderPage;

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

  return {
    props: { user },
  };
}
