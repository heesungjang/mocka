import DateSwitch from "../DateSwitch";
import { ErrorMessage } from "../ErrorMessage";
import TimeZonePicker from "../TimezonePicker";
import type { AvailabilityFormValues } from "..";
import { useStateMachine, type GlobalState } from "little-state-machine";
import { useFormContext } from "react-hook-form";
import { DATES } from "../../../../../constants/client";

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
    setError,
    handleSubmit,
    formState: { errors },
  } = useFormContext<AvailabilityFormValues>();
  const { actions } = useStateMachine({ updateTimezoneAction });
  const errorMessage = errors?.availability?.message
    ? "at least one available day has to selected"
    : null;

  const onSubmit = (data: AvailabilityFormValues) => {
    if (Object.keys(data.availability).length === 0) {
      setError("availability", { type: "custom", message: "null" });
      return;
    }
    setTabIndex(2);
    actions.updateTimezoneAction(data);
  };

  return (
    <form
      className="mt-3  w-full flex-col gap-5"
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

      <div className="mt-5 flex w-full justify-end">
        <button className="brand_button">Next</button>
      </div>
    </form>
  );
};

export default AvailabilityTab;
