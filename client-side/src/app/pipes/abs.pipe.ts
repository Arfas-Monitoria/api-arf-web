import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs'
})
export class AbsPipe implements PipeTransform {

  transform(value: number): number | string {
    if (!value || value == 0) return ''

    return Math.abs(value) + '%';
  }
}
