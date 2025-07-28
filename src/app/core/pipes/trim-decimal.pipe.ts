import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimDecimal'
})
export class TrimDecimalPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return '';
    const num = parseFloat(value.toString());
    return Number.isInteger(num) ? num.toFixed(0) : num.toString();
  }
}
