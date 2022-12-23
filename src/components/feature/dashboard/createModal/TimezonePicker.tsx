import { Controller, useFormContext } from "react-hook-form";
import TimezoneSelect from "react-timezone-select";
import { AvailabilityFormValues } from ".";

const TimeZonePicker = () => {
  const { control } = useFormContext<AvailabilityFormValues>();
  return (
    <Controller
      name="timeZone"
      control={control}
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
export default TimeZonePicker;
