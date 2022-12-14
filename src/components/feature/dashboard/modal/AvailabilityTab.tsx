import { Fragment, useEffect, useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import TimezoneSelect, { type ITimezoneOption } from "react-timezone-select";
// import { TIME_POINTS } from "../../../../constants/clitent";
import type {
  Control,
  FieldErrorsImpl,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import type { AvailabilityFormValues } from ".";

const DATES = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const AvailabilityTab = ({
  registerAvailability,
  AvailabilityError,
  controlAvailability,
  resetAvailability,
  setAvailability,
  getAvailability,
  TIME_POINTS,
  clearAvailabilityError,
}: {
  clearAvailabilityError: UseFormClearErrors<AvailabilityFormValues>;
  AvailabilityError: string;
  controlAvailability: Control<AvailabilityFormValues, any>;
  registerAvailability: UseFormRegister<AvailabilityFormValues>;
  resetAvailability: UseFormReset<AvailabilityFormValues>;
  setAvailability: UseFormSetValue<AvailabilityFormValues>;
  getAvailability: UseFormGetValues<AvailabilityFormValues>;
  TIME_POINTS: string[];
}) => {
  return (
    <div className="mt-3  mb-10 w-full flex-col gap-5">
      <span className="mb-2 inline-block text-sm font-normal text-neutral-500">
        Timezone
      </span>
      <div className="flex w-full flex-col  gap-4 ">
        <TimeZonePicker controlAvailability={controlAvailability} />
        {DATES.map((date) => {
          return (
            <Date
              key={date}
              date={date}
              controlAvailability={controlAvailability}
              resetAvailability={resetAvailability}
              setAvailability={setAvailability}
              getAvailability={getAvailability}
              TIME_POINTS={TIME_POINTS}
              clearAvailabilityError={clearAvailabilityError}
            />
          );
        })}
      </div>
      {AvailabilityError && (
        <span className="mt-5 inline-flex text-sm text-red-500">
          {AvailabilityError}
        </span>
      )}
    </div>
  );
};

const Date = ({
  date,
  controlAvailability,
  resetAvailability,
  setAvailability,
  getAvailability,
  TIME_POINTS,
  clearAvailabilityError,
}: {
  date: string;
  clearAvailabilityError: UseFormClearErrors<AvailabilityFormValues>;
  getAvailability: UseFormGetValues<AvailabilityFormValues>;
  resetAvailability: UseFormReset<AvailabilityFormValues>;
  controlAvailability: Control<AvailabilityFormValues, any>;
  setAvailability: UseFormSetValue<AvailabilityFormValues>;
  TIME_POINTS: string[];
}) => {
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
          className={` text-sm capitalize ${
            enabled ? "text-black" : "w-10 text-neutral-400"
          }`}
        >
          {date}
        </span>
      </div>
      {enabled && (
        <TimePicker
          TIME_POINTS={TIME_POINTS}
          getAvailability={getAvailability}
          controlAvailability={controlAvailability}
          date={date}
          resetAvailability={resetAvailability}
          setAvailability={setAvailability}
          clearAvailabilityError={clearAvailabilityError}
        />
      )}
    </div>
  );
};

const TimePicker = ({
  date,
  controlAvailability,
  resetAvailability,
  setAvailability,
  getAvailability,
  TIME_POINTS,
  clearAvailabilityError,
}: {
  date: string;
  TIME_POINTS: string[];
  clearAvailabilityError: UseFormClearErrors<AvailabilityFormValues>;
  resetAvailability: UseFormReset<AvailabilityFormValues>;
  controlAvailability: Control<AvailabilityFormValues, any>;
  setAvailability: UseFormSetValue<AvailabilityFormValues>;
  getAvailability: UseFormGetValues<AvailabilityFormValues>;
}) => {
  const [firstRender, setFirstRender] = useState(true);
  const [endTime, setEndTime] = useState(TIME_POINTS[0]);

  useEffect(() => {
    const prev = getAvailability("schedule");

    setAvailability("schedule", {
      ...prev,
      [date]: { FROM: "9:00am", TO: "10:00am" },
    });
    setFirstRender(false);
    clearAvailabilityError();

    return () => {
      const { [date]: _, ...rest } = getAvailability("schedule");
      setAvailability("schedule", rest);
    };
  }, []);

  if (firstRender) {
    return <></>;
  }
  return (
    <div className="ml-10 flex items-center gap-5">
      <Controller
        name="schedule"
        control={controlAvailability}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <div className="w-32">
                <Listbox
                  value={value}
                  onChange={(value) => {
                    const prev = getAvailability("schedule");

                    onChange({
                      ...prev,
                      [date]: { ...prev[date], FROM: value },
                    });
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-neutral-300 bg-white py-2  pl-3 pr-10 text-left sm:text-sm">
                      <span className="block truncate">
                        {value[date]?.FROM}
                      </span>
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
                        {TIME_POINTS.slice(
                          0,
                          TIME_POINTS.findIndex(
                            (element) => element === value[date]?.TO
                          )
                        ).map((point, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
                              point === value[date]?.FROM
                                ? "bg-black text-white"
                                : "text-gray-900"
                            }`}
                            value={point}
                          >
                            <>
                              <span
                                className={`block truncate ${"font-normal"}`}
                              >
                                {point}
                              </span>
                              {point === value[date]?.FROM ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <FiCheck
                                    className={`${
                                      point === value[date]?.FROM
                                        ? "text-white"
                                        : "text-black"
                                    }`}
                                  />
                                </span>
                              ) : null}
                            </>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {"-"}

              <div className="w-32">
                <Listbox
                  value={value}
                  onChange={(value) => {
                    const prev = getAvailability("schedule");

                    onChange({ ...prev, [date]: { ...prev[date], TO: value } });
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-pointer  rounded-lg border border-neutral-300 bg-white py-2 pl-3  pr-10 text-left sm:text-sm">
                      <span className="block truncate"> {value[date]?.TO}</span>
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
                        {TIME_POINTS.slice(
                          TIME_POINTS.findIndex(
                            (element) => element === value[date]?.FROM
                          ) + 1
                        ).map((point, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
                              point === value[date]?.TO
                                ? "bg-black text-white"
                                : "text-gray-900"
                            }`}
                            value={point}
                          >
                            <>
                              <span className={`block truncate font-normal`}>
                                {point}
                              </span>
                              {point === value[date]?.TO ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 text-black`}
                                >
                                  <FiCheck
                                    className={`${
                                      point === value[date]?.TO
                                        ? "text-white"
                                        : "text-black"
                                    }`}
                                  />
                                </span>
                              ) : null}
                            </>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

const TimeZonePicker = ({
  controlAvailability,
}: {
  controlAvailability: Control<AvailabilityFormValues, any>;
}) => {
  return (
    <Controller
      name="timeZone"
      control={controlAvailability}
      render={({ field: { onChange, value } }) => {
        return (
          <TimezoneSelect
            unstyled
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "46%",
                marginBottom: "10px",
                borderColor: "rgb(212 212 212)",
                "&:hover": {
                  borderColor: "rgb(212 212 212)",
                },
                cursor: "pointer",

                boxShadow: state.isFocused ? "rgb(0 0 0)" : "none",
                fontSize: "14px",
                svg: {
                  color: "black",
                },
              }),
              menu: (styles) => ({ ...styles, width: "46%" }),
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
            value={value}
            onChange={(value) => onChange(value.value)}
          />
        );
      }}
    />
  );
};

export default AvailabilityTab;
