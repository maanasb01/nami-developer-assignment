// Format the time to be displayed in the time Tag. Outputs a string in format of 00Hrs 00Mins OR 00Mins (if no hours are there)
export function formatTimeTagTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}Hrs ${minutes % 60}Min`;
  } else {
    return `${minutes}Min`;
  }
};


// Inputs Date and Output the formatted Dtring to display of form "21 Jul 2024 | 03:00 am"
export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
  
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  
    return formattedDate.replace(",", " |");
  }
