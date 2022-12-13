export function generateTimeSlots(interval: number): string[] {
  // Create an array to store the time slots
  const timeSlots: string[] = [];

  // Calculate the number of time slots for 24 hours
  const numTimeSlots = 24 * (60 / interval);

  // Generate the time slots
  for (let i = 0; i < numTimeSlots; i++) {
    // Calculate the hour and minute for the time slot
    const hour = Math.floor((i * interval) / 60);
    const minute = (i * interval) % 60;

    // Format the time slot string with leading zeros
    // and append "am" or "pm" based on the hour
    let timeSlot = "";
    if (hour === 0) {
      timeSlot = `12:${minute.toString().padStart(2, "0")}am`;
    } else if (hour < 12) {
      timeSlot = `${hour}:${minute.toString().padStart(2, "0")}am`;
    } else if (hour === 12) {
      timeSlot = `12:${minute.toString().padStart(2, "0")}pm`;
    } else {
      timeSlot = `${hour - 12}:${minute.toString().padStart(2, "0")}pm`;
    }

    // Add the time slot to the array
    timeSlots.push(timeSlot);
  }

  return timeSlots;
}
