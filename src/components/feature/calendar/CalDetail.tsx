import Avatar from "../../generics/Avatar";
import { useState } from "react";
import TimezoneSelect from "react-timezone-select";
import type { Schedule, User } from "@prisma/client";
import { FiClock, FiGlobe, FiVideo } from "react-icons/fi";
import type { CSSObjectWithLabel, GroupBase, ControlProps } from "react-select";

export default function CalDetail({
  user,
  schedule,
}: {
  user: User;
  schedule: Schedule;
}) {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  return (
    <div className="flex flex-col text-neutral-400">
      <div className="flex items-center gap-4">
        <Avatar width={52} height={52} src="/assets/default.png" />
        <div className="flex flex-col gap-1 font-normal text-white">
          <p className="text-md">{user.name}</p>
          <p className="text-xs text-neutral-400">Frontend Developer</p>
        </div>
      </div>

      <div className="mt-5 flex h-full flex-col justify-between">
        <div className="mt-3 flex flex-col gap-2">
          <p className="text-md text-white">{schedule.title}</p>
          <p className="text-sm text-white">{schedule.description}</p>
        </div>

        <div className="text-sm">
          <div className="mb-3 mt-1 flex items-center gap-3 pr-2">
            <FiVideo />
            <p>Video Call</p>
          </div>

          <div className="flex items-center gap-3 pr-2">
            <FiClock />
            <p>{schedule.chatTime} Minutes</p>
          </div>

          <div className="text-small relative mt-1 flex  items-center gap-3 rounded-md px-2 hover:bg-neutral-800">
            <FiGlobe />
            <TimezoneSelect
              labelStyle="abbrev"
              styles={TimeZonePickerStyleConfig}
              value={selectedTimezone}
              // onChange={setSelectedTimezone}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const TimeZonePickerStyleConfig = {
  control: (
    baseStyles: CSSObjectWithLabel,
    state: ControlProps<unknown, boolean, GroupBase<unknown>>
  ) => ({
    ...baseStyles,

    border: "none",
    cursor: "pointer",
    backgroundColor: "",
    boxShadow: state.isFocused ? "rgb(0 0 0)" : "none",
    fontSize: "14px",
    svg: {
      width: "1rem",
      color: "rgb(163 163 163)",
      hover: {
        color: "rgb(163 163 163)",
      },
    },
    span: {
      display: "none",
    },
    div: {
      paddingLeft: 0,
    },
  }),
  input: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: "#fefce8",
  }),
  singleValue: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: "rgb(163 163 163)",
  }),

  menu: (styles: CSSObjectWithLabel) => ({
    ...styles,
    padding: "0px 10px",
    paddingTop: "5px",
    background: "#222222",
    borderRadius: "1rem",
  }),
  option: (
    styles: CSSObjectWithLabel,
    {
      isDisabled,
      isSelected,
    }: {
      isDisabled: boolean;
      isSelected: boolean;
    }
  ) => {
    return {
      ...styles,
      fontSize: "14px",
      color: isSelected ? "black" : "rgb(254 252 232)",
      background: isSelected ? "#bbf7d0" : "#222222",
      cursor: isDisabled ? "not-allowed" : "default",
      "&:active": {
        background: "rgb(245 245 245)",
      },
      "&:hover": {
        background: !isSelected ? "#525252" : "#bbf7d0",
      },
    };
  },
};
