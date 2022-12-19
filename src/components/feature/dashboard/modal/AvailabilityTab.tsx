import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import TimezoneSelect from "react-timezone-select";
import type {
  Control,
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
  AvailabilityError,
  controlAvailability,
  resetAvailability,
  setAvailability,
  getAvailability,
  TIME_POINTS,
  clearAvailabilityError,
  enabled,
  setEnabled,
}: {
  clearAvailabilityError: UseFormClearErrors<AvailabilityFormValues>;
  AvailabilityError: string;
  controlAvailability: Control<AvailabilityFormValues, any>;
  registerAvailability: UseFormRegister<AvailabilityFormValues>;
  resetAvailability: UseFormReset<AvailabilityFormValues>;
  setAvailability: UseFormSetValue<AvailabilityFormValues>;
  getAvailability: UseFormGetValues<AvailabilityFormValues>;
  TIME_POINTS: string[];
  enabled: { [key: string]: boolean };
  setEnabled: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
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
              enabled={enabled}
              setEnabled={setEnabled}
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
  enabled,
  setEnabled,
}: {
  date: string;
  clearAvailabilityError: UseFormClearErrors<AvailabilityFormValues>;
  getAvailability: UseFormGetValues<AvailabilityFormValues>;
  resetAvailability: UseFormReset<AvailabilityFormValues>;
  controlAvailability: Control<AvailabilityFormValues, any>;
  setAvailability: UseFormSetValue<AvailabilityFormValues>;
  TIME_POINTS: string[];
  enabled: { [key: string]: boolean };
  setEnabled: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}) => {
  return (
    <div className="flex h-8 items-center">
      <Switch
        checked={enabled[date]}
        onChange={() => {
          if (enabled[date]) {
            const { [date]: _, ...rest } = getAvailability("availability");
            setAvailability("availability", rest);
          }

          setEnabled({ ...enabled, [date]: !enabled[date] });
        }}
        className={`${
          enabled[date] ? "border-brand_color " : "border-yellow-50"
        } relative inline-flex h-5 w-9 items-center rounded-full border-2 bg-black`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled[date]
              ? "translate-x-4 bg-brand_color"
              : "translate-x-1 bg-yellow-50"
          } inline-block h-3 w-3 transform rounded-full  transition duration-200`}
        />
      </Switch>
      <div className="ml-5 w-16">
        <span
          className={` text-sm capitalize ${
            enabled[date] ? "text-neutral-400" : "w-10 text-neutral-400"
          }`}
        >
          {date}
        </span>
      </div>
      {enabled[date] && (
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

  useEffect(() => {
    const prev = getAvailability("availability");

    setAvailability("availability", {
      ...prev,
      [date]: { from: "9:00am", to: "10:00am" },
    });
    setFirstRender(false);
    clearAvailabilityError();
  }, [
    getAvailability,
    setFirstRender,
    clearAvailabilityError,
    date,
    setAvailability,
  ]);

  if (firstRender) {
    return <></>;
  }
  return (
    <div className="ml-10 flex items-center gap-5">
      <Controller
        name="availability"
        control={controlAvailability}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <div className="w-32">
                <Listbox
                  value={value}
                  onChange={(value) => {
                    const prev = getAvailability("availability");
                    const index = TIME_POINTS.findIndex(
                      (ele) => ele === String(value)
                    );
                    console.log(value);
                    onChange({
                      ...prev,
                      [date]: {
                        ...prev[date],
                        from: value,
                        to: TIME_POINTS[index + 1],
                      },
                    });
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-yellow-50 bg-neutral-700 py-2  pl-3 pr-10 text-left sm:text-sm">
                      <span className="block truncate text-yellow-50">
                        {value[date]?.from}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FiChevronDown className="text-yellow-50" />
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
                            (element) => element === value[date]?.to
                          )
                        ).map((point, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
                              point === value[date]?.from
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
                              {point === value[date]?.from ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <FiCheck
                                    className={`${
                                      point === value[date]?.from
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

              <span className="text-yellow-50">-</span>

              <div className="w-32">
                <Listbox
                  value={value}
                  onChange={(value) => {
                    const prev = getAvailability("availability");

                    onChange({ ...prev, [date]: { ...prev[date], to: value } });
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="rrelative w-full cursor-pointer rounded-lg border border-yellow-50 bg-neutral-700 py-2  pl-3 pr-10 text-left sm:text-sm">
                      <span className="block truncate text-yellow-50">
                        {" "}
                        {value[date]?.to}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-yellow-50">
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
                            (element) => element === value[date]?.from
                          ) + 1
                        ).map((point, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
                              point === value[date]?.to
                                ? "bg-black text-white"
                                : "text-gray-900"
                            }`}
                            value={point}
                          >
                            <>
                              <span className={`block truncate font-normal`}>
                                {point}
                              </span>
                              {point === value[date]?.to ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 text-black`}
                                >
                                  <FiCheck
                                    className={`${
                                      point === value[date]?.to
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
                borderColor: "#404040",
                "&:hover": {
                  borderColor: "#FDE68A",
                },
                cursor: "pointer",
                backgroundColor: "#404040",
                boxShadow: state.isFocused ? "rgb(0 0 0)" : "none",
                fontSize: "14px",
                svg: {
                  color: "rgb(163 163 163)",
                },
              }),
              input: (styles) => ({
                ...styles,
                color: "#fefce8",
              }),
              singleValue: (styles) => ({
                ...styles,
                color: "rgb(163 163 163)",
              }),

              menu: (styles) => ({
                ...styles,
                width: "46%",
                background: "#404040",
              }),
              option: (styles, { isDisabled, isSelected }) => {
                return {
                  ...styles,
                  fontSize: "14px",
                  color: isSelected ? "black" : "rgb(254 252 232)",
                  background: isSelected ? "#FDE68A" : "#404040",
                  cursor: isDisabled ? "not-allowed" : "default",
                  "&:active": {
                    background: "rgb(245 245 245)",
                  },
                  "&:hover": {
                    background: !isSelected ? "#1F1F23" : "#FDE68A",
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
