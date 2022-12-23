import React from "react";
import { Controller } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import type { ScheduleProfile } from "../index";
import { type GlobalState, useStateMachine } from "little-state-machine";
import { ErrorMessage } from "../ErrorMessage";

const updateAction = (globalState: GlobalState, payload: ScheduleProfile) => {
  return { ...globalState, data: { ...globalState.data, ...payload } };
};

const ProfileTab = ({
  setTabIndex,
}: {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const TIME_SLOT = [15, 30, 60];
  const { actions } = useStateMachine({ updateAction });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ScheduleProfile>();

  const onSubmit = async (data: ScheduleProfile) => {
    setTabIndex(1);
    actions.updateAction(data);
  };

  return (
    <form
      className="mt-7  min-h-[13rem] w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="mb-2 text-sm font-normal text-yellow-50"
        >
          Title
        </label>
        <input
          placeholder="e.g. Fan Chat with Sophie"
          id="title"
          className="brand_input"
          {...register("title", { required: true })}
        />
        <ErrorMessage msg={errors?.title?.message} />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="mt-4 mb-2 text-sm font-normal text-yellow-50"
        >
          Description
        </label>
        <textarea
          rows={6}
          placeholder="e.g. 30min video chat with me."
          id="description"
          className="brand_input"
          {...register("description", { required: true })}
        />
        <ErrorMessage msg={errors?.description?.message} />
      </div>

      <label className="mt-4 inline-block text-sm font-normal text-yellow-50">
        Chat Time
      </label>
      <div className="mt-2 mb-12">
        <Controller
          control={control}
          name="chatTime"
          render={({ field: { onChange, value } }) => {
            return (
              <RadioGroup value={value} onChange={(value) => onChange(value)}>
                <div className="flex w-full gap-5">
                  {TIME_SLOT.map((slot) => (
                    <RadioGroup.Option
                      key={slot}
                      value={slot}
                      className={({ checked }) =>
                        `${checked ? "bg-brand_color" : "bg-brand_bg"}
                    relative flex cursor-pointer rounded-lg px-4 py-2 focus:outline-none`
                      }
                    >
                      {({ checked }) => (
                        <RadioGroup.Label
                          as="p"
                          className={`text-sm font-medium ${
                            checked ? "text-black" : "text-yellow-50"
                          }`}
                        >
                          {slot} min
                        </RadioGroup.Label>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            );
          }}
        />
      </div>
      <div className="flex w-full justify-end">
        <button className="brand_button">Next</button>
      </div>
    </form>
  );
};

export default ProfileTab;
