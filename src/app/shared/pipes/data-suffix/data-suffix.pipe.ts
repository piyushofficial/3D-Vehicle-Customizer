import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataSuffix',
})
export class DataSuffixPipe implements PipeTransform {
  transform(value: number): string | number {
    // Units
    const POSTFIXES = ['', 'k', 'M', 'B', 'T', 'P', 'E'];

    // what tier? (determines SI prefix)
    // tslint:disable-next-line: no-bitwise
    const tier = (Math.log10(Math.abs(value)) / 3) | 0;

    if (value === null) {
      return 0;
    }

    // if zero, we don't need a prefix
    if (tier === 0) {
      return value;
    }

    // get postfix and determine scale
    const postfix = POSTFIXES[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = value / scale;

    // format number and add postfix as suffix
    let formatted = scaled.toFixed(0) + '';

    // remove '.0' case
    if (/\.0$/.test(formatted)) {
      formatted = formatted.substr(0, formatted.length - 2);
    }

    return formatted + postfix;
  }
}
