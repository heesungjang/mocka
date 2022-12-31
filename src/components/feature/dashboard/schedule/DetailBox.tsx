import { trpc } from "../../../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

const DetailBox = () => {
  const { data: scheduleData } = trpc.schedule.get.useQuery();
  const { data: userData } = trpc.auth.getFullUserDetail.useQuery();
  return (
    <div className="text-white">
      <div className="flex items-center gap-4 ">
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
        <Link
          href={`/cal/${userData?.calLink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          cal link: {userData?.calLink}
        </Link>
        <span>chatTime: {scheduleData?.chatTime}</span>
        <span>description: {scheduleData?.description}</span>
        <span>timeZone: {scheduleData?.timeZone}</span>
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

export default DetailBox;
