import { FilterValue } from "../types/filterTagValues";

export const filterNamesMap: {[key in FilterValue]:string} = {
    'not-accepted': 'Not Accepted',
    'ongoing': 'Ongoing',
    'delayed': 'Delayed',
    'ontime': 'On Time',
    'completed': 'Completed',
    'scheduled': 'Scheduled'
  };