import { useFormContext } from "react-hook-form";

import type { AvailabilityFormValues } from "..";
import { useStateMachine, type GlobalState } from "little-state-machine";
import TimeZonePicker from "../TimezonePicker";
import { ErrorMessage } from "../ErrorMessage";
import DateSwitch from "../DateSwitch";

const DATES = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/**little state machine actions for wizard from*/
const updateTimezoneAction = (
  globalState: GlobalState,
  payload: AvailabilityFormValues
) => {
  return { ...globalState, data: { ...globalState.data, ...payload } };
};

const AvailabilityTab = ({
  TIME_POINTS,
  setTabIndex,
}: {
  TIME_POINTS: string[];
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<AvailabilityFormValues>();
  const { state, actions } = useStateMachine({ updateTimezoneAction });

  const onSubmit = (data: AvailabilityFormValues) => {
    setTabIndex(2);
    actions.updateTimezoneAction(data);
  };

  const errorMessage = errors?.availability?.message
    ? "at least one available day has to selected"
    : null;

  return (
    <form
      className="mt-3  mb-10 w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="mb-2 inline-block text-sm font-normal text-neutral-500">
        Timezone
      </span>

      <div className="flex w-full flex-col  gap-4 ">
        <TimeZonePicker />
        {DATES.map((date) => {
          return (
            <DateSwitch key={date} date={date} TIME_POINTS={TIME_POINTS} />
          );
        })}
      </div>

      <ErrorMessage msg={errorMessage} />

      <input type="submit" />
    </form>
  );
};

export default AvailabilityTab;
