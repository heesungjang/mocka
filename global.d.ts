import "little-state-machine";

declare module "little-state-machine" {
  interface GlobalState {
    data: {
      title: string;
      description: string;
      chatTime: number;
      timeZone: string;
      availability?: availability;
    };
    dates: {
      [key: string]: boolean;
    };
  }
}
