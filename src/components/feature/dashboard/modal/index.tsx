import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContents,
  ModalOpenButton,
  ModalDismissButton,
} from "../../../generics/Modal";

import ProfileTab from "./ProfileTab";
import classNames from "classnames";
import { Tab } from "@headlessui/react";
import AvailabilityTab from "./AvailabilityTab";
import useTabIndex from "../../../../hooks/useTabIndex";
import { FiArrowRight, FiPlus, FiX } from "react-icons/fi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateTimeSlots } from "../../../../utils/generatetimeSlots";
import ConfirmTab from "./ConfirmTab";

const ModalTabs = ["Schedule Profile", "Availability", "Confirm"];

export type ScheduleProfile = {
  title: string;
  description: string;
  chatTime: number;
};

export type ScheduleAvailability = {
  [key: string]: { FROM: string; TO: string };
};

export type AvailabilityFormValues = {
  schedule: ScheduleAvailability;
  timeZone: string;
};

export const ScheduleProfileSchema = z.object({
  title: z.string().max(50).min(1),
  description: z.string().max(100).min(1),
  chatTime: z.number(),
});

export const ScheduleAvailabilitySchema = z.object({
  schedule: z.object({
    day: z.object({
      FROM: z.string(),
      TO: z.string(),
    }),
  }),
  timeZone: z.string(),
});

const DashModal = () => {
  const {
    onNext,
    onPrev,
    currentIndex,
    resetTabIndex,
    setCurrentIndex,
    isPrev,
    isLastIndex,
  } = useTabIndex();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
    control: controlProfile,
    watch,
    trigger,
    setFocus,
    getValues: getProfileValues,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      chatTime: 15,
    },
    resolver: zodResolver(ScheduleProfileSchema),
  });

  const {
    register: registerAvailability,
    handleSubmit: handleAvailabilitySubmit,
    reset: resetAvailability,
    formState: { errors: AvailabilityErrors },
    control: controlAvailability,
    watch: watchAvailability,
    trigger: triggerAvailability,
    setFocus: setFocusAvailability,
    setValue: setAvailability,
    getValues: getAvailability,
    setError: setAvailabilityError,
    clearErrors: clearAvailabilityError,
  } = useForm({
    defaultValues: {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      schedule: {},
    },
    resolver: zodResolver(ScheduleAvailabilitySchema),
  });

  const { chatTime } = getProfileValues();
  const EmptyAvailabilityError = AvailabilityErrors.schedule?.message;
  const TIME_POINTS = useMemo(() => generateTimeSlots(chatTime), [chatTime]);
  const resetOnClose = (...fns: any) => fns.forEach((fn: any) => fn && fn());
  const handleTabChange = async (arg: any) => {
    if (typeof arg === "number" && arg < currentIndex) {
      return onPrev();
    }
    if (currentIndex === 0) {
      const validated = await trigger();
      if (validated) {
        onNext();
      }
    }
    if (currentIndex === 1) {
      const values = watchAvailability();
      const isEmpty = Object.keys(values.schedule).length === 0;

      if (isEmpty) {
        return setAvailabilityError("schedule", {
          type: "custom",
          message: "Minimum of one time slot has to be selected.",
        });
      }
      onNext();
    }
  };

  const [enabled, setEnabled] = useState<{ [key: string]: boolean }>({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const resetDateEnabled = () =>
    setEnabled({
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    });

  // Profile Tab invalidated input focus
  useEffect(() => {
    const firstError = (
      Object.keys(profileErrors) as Array<keyof typeof profileErrors>
    ).reduce<keyof typeof profileErrors | null>((field, a) => {
      const fieldKey = field as keyof typeof profileErrors;
      return !!profileErrors[fieldKey] ? fieldKey : a;
    }, null);

    if (firstError) {
      setFocus(firstError);
    }
  }, [setFocus, profileErrors]);

  return (
    <Modal>
      <ModalOpenButton>
        <button className=" inline-flex h-10 items-center  rounded-md bg-black px-4  text-white">
          Create
          <FiPlus className="ml-5" strokeWidth={3} />
        </button>
      </ModalOpenButton>
      <ModalContents
        title="Create new schedule"
        onClose={() =>
          resetOnClose(
            resetProfile,
            resetAvailability,
            resetTabIndex,
            resetDateEnabled
          )
        }
      >
        <div className="mt-2 flex justify-between">
          <p className="text-sm text-neutral-400">
            Setup your availability and price to create new mocka schedule.
          </p>
          <ModalDismissButton>
            <button
              type="button"
              className="absolute top-5 right-7 inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-2 py-1 text-sm font-medium text-black hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              onClick={() =>
                resetOnClose(
                  resetProfile,
                  resetAvailability,
                  resetTabIndex,
                  resetDateEnabled
                )
              }
            >
              <FiX size={18} />
            </button>
          </ModalDismissButton>
        </div>
        <div className="mt-6 w-full  px-2 sm:px-0">
          <Tab.Group
            vertical
            manual
            defaultIndex={0}
            selectedIndex={currentIndex}
            onChange={handleTabChange}
          >
            <Tab.List className="flex max-w-sm space-x-2 rounded-lg bg-black/90 p-1 ">
              {ModalTabs.map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-md py-1.5 text-sm font-medium leading-5 text-white",
                      "transition-all duration-100  focus:outline-none ",
                      selected
                        ? "bg-white text-black/100 shadow"
                        : "hover:bg-white/[0.1]"
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <ProfileTab
                  profileErrors={profileErrors}
                  registerProfile={registerProfile}
                  controlProfile={controlProfile}
                />
              </Tab.Panel>
              <Tab.Panel>
                <AvailabilityTab
                  registerAvailability={registerAvailability}
                  AvailabilityError={EmptyAvailabilityError ?? ""}
                  controlAvailability={controlAvailability}
                  resetAvailability={resetAvailability}
                  setAvailability={setAvailability}
                  getAvailability={getAvailability}
                  TIME_POINTS={TIME_POINTS}
                  clearAvailabilityError={clearAvailabilityError}
                  enabled={enabled}
                  setEnabled={setEnabled}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ConfirmTab
                  getProfileValues={getProfileValues}
                  getAvailability={getAvailability}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className="mt-4 flex w-full  justify-end">
          {isPrev && (
            <button
              type="button"
              className="mr-3 inline-flex  w-24 items-center justify-center rounded-md   border border-transparent bg-neutral-100 px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              onClick={onPrev}
            >
              Prev
            </button>
          )}
          <button
            type="button"
            className="mr-3 inline-flex w-24 items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={handleTabChange}
          >
            {isLastIndex ? "Create" : "Next"}
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </ModalContents>
    </Modal>
  );
};

export default DashModal;
