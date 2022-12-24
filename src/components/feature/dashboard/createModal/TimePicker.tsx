import { Listbox } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import type { AvailabilityFormValues, ScheduleAvailability } from ".";
import { useStateMachine } from "little-state-machine";

const TimePicker = ({
  date,
  TIME_POINTS,
}: {
  date: string;
  TIME_POINTS: string[];
}) => {
  const { state } = useStateMachine();
  const [firstRender, setFirstRender] = useState(true);
  const { control, setValue, getValues } =
    useFormContext<AvailabilityFormValues>();

  const handleFromChange = (
    value: ScheduleAvailability,
    onChange: (...event: any[]) => void
  ) => {
    const index = TIME_POINTS.findIndex((ele) => ele === String(value));
    const prev = getValues("availability");

    onChange({
      ...prev,
      [date]: {
        ...prev[date],
        from: value,
        to: TIME_POINTS[index + 1],
      },
    });
  };

  const handleToChange = (
    value: ScheduleAvailability,
    onChange: (...event: any[]) => void
  ) => {
    const prev = getValues("availability");
    onChange({
      ...prev,
      [date]: { ...prev[date], to: value },
    });
  };

  useEffect(() => {
    const { availability } = state.data;
    const from = availability?.[date]?.from;
    const to = availability?.[date]?.to;

    if (from && to) {
      setValue("availability", {
        ...getValues("availability"),
        [date]: { from, to },
      });
    }

    setFirstRender(false);

    return () => {
      const { [date]: _, ...rest } = getValues("availability");
      setValue("availability", rest);
    };
  }, []);

  if (firstRender) {
    return <></>;
  }

  return (
    <div className="ml-10 flex items-center gap-5">
      <Controller
        name="availability"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <div className="w-32">
                <Listbox
                  value={value}
                  onChange={(value) => handleFromChange(value, onChange)}
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
                  onChange={(value) => handleToChange(value, onChange)}
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

export default TimePicker;
