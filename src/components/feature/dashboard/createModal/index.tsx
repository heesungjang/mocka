import { z } from "zod";
import { trpc } from "../../../../utils/trpc";
import { Tab } from "@headlessui/react";
import { FiPlus, FiX } from "react-icons/fi";
import classNames from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStateMachine } from "little-state-machine";
import { generateTimeSlots } from "../../../../utils/generatetimeSlots";
import { useForm, FormProvider } from "react-hook-form";
import React, { useMemo, useState } from "react";

/*Modal Tabs & Modal Comps*/
import ProfileTab from "./tabs/ProfileTab";
import ConfirmTab from "./tabs/ConfirmTab";
import AvailabilityTab from "./tabs/AvailabilityTab";
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../../../generics/Modal";

const availabilitySchema = z.record(
  z.object({
    from: z.string(),
    to: z.string(),
  })
);
export const ScheduleProfileSchema = z.object({
  title: z.string().max(50).min(1),
  description: z.string().max(100).min(1),
  chatTime: z.number(),
});
export const ScheduleAvailabilitySchema = z.object({
  availability: availabilitySchema,
  timeZone: z.string(),
});

export type ScheduleProfile = z.infer<typeof ScheduleProfileSchema>;
export type ScheduleAvailability = z.infer<typeof availabilitySchema>;
export type AvailabilityFormValues = z.infer<typeof ScheduleAvailabilitySchema>;

const PROFILE_FORM_CONFIG = {
  defaultValues: {
    title: "",
    description: "",
    chatTime: 15,
  },
  resolver: zodResolver(ScheduleProfileSchema),
};
const AVAILABILITY_FORM_CONFIG = {
  defaultValues: {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    availability: null,
  },
  resolver: zodResolver(ScheduleAvailabilitySchema),
};

const DashModal = () => {
  const { state } = useStateMachine();
  const chatTime = state.data.chatTime;
  const ModalTabs = ["Profile", "Availability", "Confirm"];
  const [tabIndex, setTabIndex] = useState(0);
  const profileMethods = useForm(PROFILE_FORM_CONFIG);
  const availabilityMethods = useForm(AVAILABILITY_FORM_CONFIG);

  const { data: schedule, refetch: refetchSchedule } =
    trpc.schedule.get.useQuery();

  const { mutate } = trpc.schedule.create.useMutation({
    onSuccess: () => refetchSchedule(),
  });

  const TIME_POINTS = useMemo(() => generateTimeSlots(chatTime), [chatTime]);

  // const callAll = (...fns: any) => fns.forEach((fn: any) => fn && fn());

  /** If there is schedule new create schedule modal should not be accessible*/
  if (schedule) {
    return null;
  }

  return (
    <Modal>
      <ModalOpenButton>
        <button className=" inline-flex h-10 items-center rounded-md bg-brand_color px-6  text-sm font-semibold text-black/80 hover:bg-yellow-200">
          New
          <FiPlus className="ml-3" strokeWidth={3} />
        </button>
      </ModalOpenButton>
      <ModalContents title="Create new schedule">
        <div className="mt-2 flex justify-between">
          <p className="text-sm text-neutral-400">
            Setup your availability and price to create new mocka schedule.
          </p>
          <ModalDismissButton>
            <button type="button" className="dismiss_button">
              <FiX size={18} />
            </button>
          </ModalDismissButton>
        </div>

        <Tab.Group
          vertical
          manual
          defaultIndex={0}
          selectedIndex={tabIndex}
          onChange={setTabIndex}
        >
          <Tab.List className="mt-5 flex max-w-sm space-x-2">
            {ModalTabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "text-sm font-medium  text-yellow-50",
                    "outline-none transition-all  duration-200 ",
                    selected
                      ? " text-brand_color underline underline-offset-4"
                      : ""
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <FormProvider {...profileMethods}>
                <ProfileTab setTabIndex={setTabIndex} />
              </FormProvider>
            </Tab.Panel>
            <Tab.Panel>
              <FormProvider {...availabilityMethods}>
                <AvailabilityTab
                  TIME_POINTS={TIME_POINTS}
                  setTabIndex={setTabIndex}
                />
              </FormProvider>
            </Tab.Panel>
            {/* <Tab.Panel>
                <ConfirmTab
                  getProfileValues={getProfileValues}
                  getAvailability={getAvailability}
                />
              </Tab.Panel> */}
          </Tab.Panels>
        </Tab.Group>
      </ModalContents>
    </Modal>
  );
};

export default DashModal;
