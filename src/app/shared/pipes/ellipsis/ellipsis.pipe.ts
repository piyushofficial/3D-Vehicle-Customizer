import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {

  transform(value, argsLength: number) {
    if (argsLength === undefined) {
      return value;
    } else if (value && value.length > argsLength) {
      return value.substring(0, argsLength) + '...';
    } else {
      return value;
    }
  }
}
