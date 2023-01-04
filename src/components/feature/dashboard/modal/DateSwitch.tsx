import TimePicker from "./TimePicker";
import { Switch } from "@headlessui/react";
import { useStateMachine, type GlobalState } from "little-state-machine";

const toggleEnabledDate = (globalState: GlobalState, payload: string) => {
  return {
    ...globalState,
    dates: { ...globalState.dates, [payload]: !globalState.dates[payload] },
  };
};

const setInitialTime = (globalState: GlobalState, date: string) => {
  return {
    ...globalState,
    data: {
      ...globalState.data,
      availability: {
        ...globalState.data.availability,
        [date]: {
          from: "9:00am",
          to: "10:00am",
        },
      },
    },
  };
};
const unsetInitialTime = (globalState: GlobalState, date: string) => {
  const newState = { ...globalState };
  delete newState.data.availability[date];

  return newState;
};

const DateSwitch = ({
  date,
  TIME_POINTS,
}: {
  date: string;
  TIME_POINTS: string[];
}) => {
  const { state, actions } = useStateMachine({
    toggleEnabledDate,
    setInitialTime,
    unsetInitialTime,
  });
  const { dates } = state;
  const isOpen = dates[date];
  const handleToggle = () => {
    if (state.dates[date] === false) {
      actions.setInitialTime(date);
    } else {
      actions.unsetInitialTime(date);
    }
    actions.toggleEnabledDate(date);
  };

  return (
    <div className="flex h-8 items-center">
      <Switch
        checked={dates[date]}
        onChange={handleToggle}
        className={`${
          isOpen ? "border-green-200 " : "border-yellow-50"
        } relative inline-flex h-5 w-9 items-center rounded-full border-2 bg-black`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            isOpen
              ? "translate-x-4 bg-green-200"
              : "translate-x-1 bg-yellow-50"
          } inline-block h-3 w-3 transform rounded-full  transition duration-200`}
        />
      </Switch>
      <div className="ml-5 w-16">
        <span
          className={` text-sm capitalize ${
            isOpen ? "text-neutral-400" : "w-10 text-neutral-400"
          }`}
        >
          {date}
        </span>
      </div>
      {isOpen && <TimePicker TIME_POINTS={TIME_POINTS} date={date} />}
    </div>
  );
};
export default DateSwitch;
