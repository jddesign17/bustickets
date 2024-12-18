
import { format } from "date-fns";
export function generatedate(date) {
    const isoDate = date;
    const formattedDate = format(new Date(isoDate), "dd-MM-yyyy");
    return formattedDate;
  } 