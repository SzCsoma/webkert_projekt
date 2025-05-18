import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capNumberFormat'
})
export class CapNumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}