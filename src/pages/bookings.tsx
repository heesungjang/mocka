import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import { type Session } from "next-auth";
import { requireAuthentication } from "../utils/auth";

const Bookings: NextPage = ({
  authenticatedUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold ">Booking Page</h1>
    </div>
  );
};

export default Bookings;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return requireAuthentication(context, ({ session }: { session: Session }) => {
    const { user: authenticatedUser } = session;
    return {
      props: {
        session: authenticatedUser,
      },
    };
  });
};
