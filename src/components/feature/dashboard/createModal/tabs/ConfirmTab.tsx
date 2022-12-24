import React from "react";
import type { UseFormGetValues } from "react-hook-form";
import type { AvailabilityFormValues, ScheduleProfile } from "..";
import { trpc } from "../../../../../utils/trpc";
import { useStateMachine } from "little-state-machine";

const ConfirmTab = ({
  onCreate,
}: {
  onCreate: (payload: AvailabilityFormValues & ScheduleProfile) => void;
}) => {
  const { state } = useStateMachine();
  const { timeZone, availability } = state.data;
  const { title, description, chatTime } = state.data;

  const handleCreateSchedule = () => {
    const newSchedule = {
      ...state.data,
    };
    onCreate(newSchedule);
  };

  const availableTimes = Object.entries(availability).map((time) => {
    const [date, { to, from }] = time;
    return (
      <div key={date}>
        <span>{`${date}: ${from} - ${to}`}</span>
      </div>
    );
  });
  return (
    <>
      <h2 className="mt-5 text-yellow-50">
        Have a quick check of your schedule details❗️
      </h2>
      <div className="mt-3 flex min-h-[300px] w-full rounded-md bg-neutral-700 p-3">
        <div className="flex flex-col gap-3 text-yellow-50">
          <span className="inline-block">Title: {title}</span>
          <span className="inline-block">Description: {description}</span>
          <span className="inline-block">ChatTime: {chatTime}</span>
          <div className="flex flex-col gap-3">
            <span className="inline-block">TimeZone: {timeZone}</span>
            <div>
              <span>Available Time: </span>
              {availableTimes}
            </div>
          </div>
        </div>
      </div>
      <div></div>

      <div className="mt-5 flex w-full justify-end">
        <button className="brand_button" onClick={handleCreateSchedule}>
          Create
        </button>
      </div>
    </>
  );
};

export default ConfirmTab;
