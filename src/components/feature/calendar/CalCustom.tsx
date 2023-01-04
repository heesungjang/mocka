import { useCalendars, useDatePickerState } from "@rehookify/datepicker";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CalCustom() {
  const config = { dates: { toggle: true, mode: "multiple" } };
  const [state, dispatch] = useDatePickerState(config);
  const { calendars, weekDays } = useCalendars(state);

  const { month, year, days } = calendars[0];

  return (
    <section className="h-full min-w-[300px]">
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
        <ul className="mb-5 mt-7 grid grid-cols-7 gap-3 px-1 text-center text-sm uppercase text-white/80">
          {weekDays.map((day) => (
            <li key={`${month}-${day}`}>{day}</li>
          ))}
        </ul>
      </header>
      <ul className="relative grid grid-cols-7 gap-1 text-center">
        {days.map((dpDay) => (
          <li
            className="rounded-md border border-transparent bg-brand_bg/80 p-2 transition-all duration-100 hover:border-white"
            key={`${month}-${dpDay.date}`}
          >
            <button className="text-sm font-light text-neutral-400">
              {dpDay.day}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
