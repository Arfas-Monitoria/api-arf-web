import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corDiferenca'
})
export class CorDiferencaPipe implements PipeTransform {

  transform(value: number): string {
    return value > 0 ? 'green' : 'red'
  }
}
