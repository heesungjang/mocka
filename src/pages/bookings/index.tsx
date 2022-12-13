import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { getSession } from "next-auth/react";
import SideBarLayout from "../../components/layouts/SideTabLayout";

function Bookings({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1 className="text-2xl font-semibold ">Booking Page</h1>
    </div>
  );
}

Bookings.Layout = SideBarLayout;

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

export default Bookings;
