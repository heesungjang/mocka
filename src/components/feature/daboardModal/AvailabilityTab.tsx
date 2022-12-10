import { Fragment, useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import TimezoneSelect, { type ITimezoneOption } from "react-timezone-select";
import { TIME_POINTS } from "../../../constants/clitent";

const DATES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AvailabilityTab = () => {
  return (
    <div className="mt-5  mb-10 flex min-h-[13rem] w-full flex-col gap-5">
      <TimeZonePicker />
      {DATES.map((date) => {
        return <Date key={date} date={date} />;
      })}
    </div>
  );
};

const Date = ({ date }: { date: string }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex h-8 items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-black" : "bg-gray-200"
        } relative inline-flex h-5 w-9 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-4" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200`}
        />
      </Switch>
      <div className="ml-5 w-16">
        <span
          className={` text-sm ${
            enabled ? "text-black" : "w-10 text-neutral-400"
          }`}
        >
          {date}
        </span>
      </div>
      {enabled && <TimePicker />}
    </div>
  );
};

const TimePicker = () => {
  const [startTime, setStartTime] = useState(TIME_POINTS[0]);
  const [endTime, setEndTime] = useState(TIME_POINTS[0]);

  return (
    <div className="ml-6 flex items-center gap-5">
      <div className="w-32">
        <Listbox value={startTime} onChange={setStartTime}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg border border-neutral-300 bg-white py-2 pl-3  pr-10 text-left sm:text-sm">
              <span className="block truncate">{startTime}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <FiChevronDown />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  sm:text-sm">
                {TIME_POINTS.map((point, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-black text-white" : "text-gray-900"
                      }`
                    }
                    value={point}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {point}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <FiCheck
                              className={`${
                                active ? "text-white" : "text-black"
                              }`}
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {"-"}

      <div className="w-32">
        <Listbox value={endTime} onChange={setEndTime}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg border border-neutral-300 bg-white py-2 pl-3  pr-10 text-left sm:text-sm">
              <span className="block truncate">{endTime}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <FiChevronDown />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute  z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {TIME_POINTS.map((point, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-black text-white" : "text-gray-900"
                      }`
                    }
                    value={point}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {point}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 text-black`}
                          >
                            <FiCheck
                              className={`${
                                active ? "text-white" : "text-black"
                              }`}
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

const TimeZonePicker = () => {
  // Get the default time zone from the browser
  const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Set the initial time zone state to the default time zone
  const [timeZone, setTimeZone] = useState(defaultTimeZone);

  const onTimeZoneChange = (timezone: ITimezoneOption) => {
    setTimeZone(timezone.value);
  };
  return (
    <TimezoneSelect
      unstyled
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: "rgb(0 0 0)",
          "&:hover": {
            borderColor: "rgb(0 0 0)",
          },
          boxShadow: state.isFocused ? "rgb(0 0 0)" : "none",
          fontSize: "14px",
          svg: {
            color: "black",
          },
        }),
        option: (styles, { isDisabled, isSelected }) => {
          return {
            ...styles,
            fontSize: "14px",
            background: isSelected ? "black" : "white",
            cursor: isDisabled ? "not-allowed" : "default",
            "&:active": {
              background: "rgb(245 245 245)",
            },
            "&:hover": {
              background: !isSelected ? "rgb(245 245 245)" : "black",
            },
          };
        },
      }}
      value={timeZone}
      onChange={onTimeZoneChange}
    />
  );
};

export default AvailabilityTab;
