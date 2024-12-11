import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string, format: string = 'MM/DD/yyyy'): any {
    // Check if value is a valid string and parse it using moment.js
    const momentDate = moment(value, 'ddd MMM DD HH:mm:ss z YYYY'); // Expected input format

    // Check if the moment object is valid
    if (momentDate.isValid()) {
      // Return the date in the requested format
      return momentDate.format(format);
    } else {
      // Return a default value if the date is invalid
      console.error('Invalid date format');
      return 'Invalid Date';
    }
  }
}
