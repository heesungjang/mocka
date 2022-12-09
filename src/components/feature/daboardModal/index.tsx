import React, { useEffect, useReducer, useState } from "react";
import {
  Modal,
  ModalContents,
  ModalOpenButton,
  ModalDismissButton,
} from "../../Modal";

import { Tab } from "@headlessui/react";
import { FiArrowRight, FiPlus, FiX } from "react-icons/fi";
import classNames from "classnames";
import ProfileTab from "./ProfileTab";
import AvailabilityTab from "./AvailabilityTab";

const ModalTabs = ["Schedule Profile", "Availability", "Confirm"];

export type ScheduleProfile = {
  title: string;
  description: string;
  chatTime: number;
};

const DashModal = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isLastIdex = selectedIndex === 2;
  const inFirstIndex = selectedIndex === 0;
  const isPrevButton = selectedIndex !== 0;

  const [scheduleProfile, setScheduleProfile] = useState<ScheduleProfile>({
    title: "",
    description: "",
    chatTime: 15,
  });

  const onNext = () => {
    !isLastIdex && setSelectedIndex((prev) => prev + 1);
    console.log(scheduleProfile);
  };
  const onPrev = () => !inFirstIndex && setSelectedIndex((prev) => prev - 1);

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
        onClose={() => setSelectedIndex(0)}
      >
        <div className="mt-2 flex justify-between">
          <p className="text-sm text-neutral-400">
            Setup your availability and price to create new mocka schedule.
          </p>

          <ModalDismissButton>
            <button
              type="button"
              className="absolute top-5 right-9 inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-2 py-1 text-sm font-medium text-black hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              onClick={() => setSelectedIndex(0)}
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
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
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
                        ? "bg-white text-black shadow"
                        : "hover:bg-white/[0.1] "
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
                  scheduleProfile={scheduleProfile}
                  setScheduleProfile={setScheduleProfile}
                />
              </Tab.Panel>
              <Tab.Panel>
                <AvailabilityTab />
              </Tab.Panel>
              <Tab.Panel className="mt-5  min-h-[13rem] w-full bg-red-400">
                Content 3
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className="mt-4 flex w-full  justify-end">
          {isPrevButton && (
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
            onClick={onNext}
          >
            {isLastIdex ? "Create" : "Next"}
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </ModalContents>
    </Modal>
  );
};

export default DashModal;
