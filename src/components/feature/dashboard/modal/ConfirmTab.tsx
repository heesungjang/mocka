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

  console.log(profileValues);
  console.log(availabilityValues);
  return (
    <div>
      <button>추가하기</button>
    </div>
  );
};

export default ConfirmTab;
