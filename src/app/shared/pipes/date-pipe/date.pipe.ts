import { Pipe, PipeTransform } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import * as _moment from 'moment';

@Pipe({
    name: 'datePipe'
})
export class DatePipe implements PipeTransform {

    transform(input: string, formatType: string): any {
        const me = this;
        const format = me.dateFormat(formatType);

        if (!input) {
            return null;
        }

        return _moment.utc(input).local().format(format);
    }

    dateFormat(formatType: string): string {

        switch (formatType) {
            case 'shortDate':
                return 'DD MMM YYYY';
            case 'normalDate':
                return 'DD MMM YY';
            case 'normalDateWithTime':
                return 'd/M/yy h:mm a';
            case 'normalTimeWithDate':
                return 'h:mm A, DD/MM/yyyy';
            case 'normalTimeWithDateNoComma':
                return 'h:mm A DD/MM/yyyy';
            case 'fullTimeAndDate':
                return 'DD MMM YY HH:mm';
            case 'mediumDate':
                return 'DD MMM YYYY  hh:mm A';
            case 'longDate':
                return 'DD MMM YYYY hh:mm:ss A';
            case 'normalDateWithDay':
                return 'dddd, d/M/yy';
            case 'yearMonthDate':
                return 'YY-MM-DD';
            case 'longTime':
                return 'h:mm:ss a';
            case 'mediumTime':
                return 'h:mm a';
            case 'FullYearDateAndTime':
                return 'YYYY-MM-DD HH:mm:ss';
            case 'FullYearDate':
                return 'YYYY-MM-DD';
        }
    }

}

export const DateFormat = {
    parse: {
        dateInput: 'input',
    },
    display: {
        dateInput: 'DD MMM YY',
        monthYearLabel: 'MMM YYYY'
    }
};

export const GlobalMatDatePickerFormatProvider = [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormat }
];





