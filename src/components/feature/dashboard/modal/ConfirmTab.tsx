import React from "react";
import type { UseFormGetValues } from "react-hook-form";
import type { AvailabilityFormValues, ScheduleProfile } from ".";
import { trpc } from "../../../../utils/trpc";

const ConfirmTab = ({
  getProfileValues,
  getAvailability,
}: {
  getProfileValues: UseFormGetValues<ScheduleProfile>;
  getAvailability: UseFormGetValues<AvailabilityFormValues>;
}) => {
  const profileValues = getProfileValues();
  const availabilityValues = getAvailability();
  const { mutate } = trpc.schedule.create.useMutation();

  const handleCreateSchedule = () => {
    const newSchedule = {
      ...profileValues,
      ...availabilityValues,
    };
    mutate(newSchedule);
  };
  console.log(availabilityValues);

  const availableTimes = Object.entries(availabilityValues.availability).map(
    (time) => {
      const [date, { to, from }] = time;
      return (
        <div key={date}>
          <span>{`${date}: ${from} - ${to}`}</span>
        </div>
      );
    }
  );
  return (
    <>
      <span>Your schedule details</span>
      <div className="wi-full flex justify-between">
        <div>
          <span className="inline-flex">{profileValues.title}</span>
          <span className="inline-flex">{profileValues.description}</span>
          <span className="inline-flex">{profileValues.chatTime}</span>
        </div>
        <div>
          <span className="inline-flex">{availabilityValues.timeZone}</span>
          {availableTimes}
        </div>
      </div>
      {/* <button onClick={handleCreateSchedule}>추가하기</button> */}
    </>
  );
};

export default ConfirmTab;
