import React from "react";
import type { UseFormGetValues } from "react-hook-form";
import type { AvailabilityFormValues, ScheduleProfile } from ".";

const ConfirmTab = ({
  getProfileValues,
  getAvailability,
}: {
  getProfileValues: UseFormGetValues<ScheduleProfile>;
  getAvailability: UseFormGetValues<AvailabilityFormValues>;
}) => {
  const profileValues = getProfileValues();
  const availabilityValues = getAvailability();

  console.log(profileValues)
  console.log(availabilityValues)
  return <div>123</div>;
};

export default ConfirmTab;
