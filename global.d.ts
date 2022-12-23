import "little-state-machine";
import { type ScheduleAvailability } from "./src/components/feature/dashboard/createModal";

declare module "little-state-machine" {
  interface GlobalState {
    data: {
      title: string;
      description: string;
      chatTime: number;
      timeZone: string;
      availability: ScheduleAvailability | null;
    };
    dates: {
      [key: string]: boolean;
    };
  }
}
