import React from "react";
import { RadioGroup } from "@headlessui/react";
import type { ScheduleProfile } from "./index";
import type {
  Control,
  UseFormRegister,
  FieldErrorsImpl,
} from "react-hook-form";
import { Controller } from "react-hook-form";

const TIME_SLOT = [15, 30, 60];
const ProfileTab = ({
  registerProfile,
  controlProfile,
  profileErrors,
}: {
  registerProfile: UseFormRegister<ScheduleProfile>;
  controlProfile: Control<ScheduleProfile, any>;
  profileErrors: Partial<FieldErrorsImpl<ScheduleProfile>>;
}) => {
  return (
    <form className="mt-7  min-h-[13rem] w-full">
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
          {...registerProfile("title", { required: true })}
        />
      </div>
      {profileErrors.title && (
        <span className="mt-1 inline-block text-sm text-red-500">
          {profileErrors.title.message}
        </span>
      )}

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
          {...registerProfile("description", { required: true })}
        />

        {profileErrors.description && (
          <span className="mt-1 inline-block text-sm text-red-500">
            {profileErrors.description.message}
          </span>
        )}
      </div>

      <label className="mt-4 inline-block text-sm font-normal text-yellow-50">
        Chat Time
      </label>

      <div className="mt-2 mb-12">
        <Controller
          control={controlProfile}
          name="chatTime"
          render={({ field: { onChange, value } }) => {
            return (
              <RadioGroup value={value} onChange={(value) => onChange(value)}>
                <RadioGroup.Label className="sr-only">
                  Server size
                </RadioGroup.Label>
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
                        <>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${
                                    checked ? "text-black" : "text-yellow-50"
                                  }`}
                                >
                                  {slot} min
                                </RadioGroup.Label>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            );
          }}
        />
      </div>
    </form>
  );
};

export default ProfileTab;
