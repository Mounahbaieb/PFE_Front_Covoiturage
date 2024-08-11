// date-format.ts
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS: any = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'Month and year',
    yearLabel: 'YYYY',
    yearA11yLabel: 'Year',
  },
};
