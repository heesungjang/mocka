import { useCalendars, useDatePickerState } from "@rehookify/datepicker";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CalCustom() {
  const config = { dates: { toggle: true, mode: "multiple" } };
  const [state, dispatch] = useDatePickerState(config);
  const { calendars, weekDays } = useCalendars(state);

  const { month, year, days } = calendars[0];

  return (
    <section className="h-full md:min-w-[300px]  lg:min-w-[455px]">
      <header>
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white">{month}</span>
            <span className="text-sm text-neutral-400">{year}</span>
          </div>
          <div className="flex items-center  gap-8 text-neutral-400">
            <button>
              <FiChevronLeft />
            </button>
            <button>
              <FiChevronRight />
            </button>
          </div>
        </div>
        <ul className="mb-2 mt-7 grid grid-cols-7 gap-4 text-center text-sm uppercase text-white/80">
          {weekDays.map((day) => (
            <li key={`${month}-${day}`}>{day}</li>
          ))}
        </ul>
      </header>
      {/* <ul>
        {days.map((dpDay) => (
          <li key={`${month}-${dpDay.date}`}>
            <button>{dpDay.day}</button>
          </li>
        ))}
      </ul> */}
    </section>
  );
}
