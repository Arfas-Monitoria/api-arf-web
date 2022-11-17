import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusDiferenca'
})
export class StatusDiferencaPipe implements PipeTransform {
  caretUp = "fa-solid fa-caret-up";
  caretDown = "fa-solid fa-caret-down";

  transform(value: number, param: 'status' | 'icon'): string {
    if (value > 0) {
      return param == 'status' ? 'Aumentou' : this.caretUp;
    } else if (value < 0) {
      return param == 'status' ? 'Diminuiu' : this.caretDown;
    } else {
      return param == 'status' ? 'Sem mudanças' : '';
    }
  }
}
