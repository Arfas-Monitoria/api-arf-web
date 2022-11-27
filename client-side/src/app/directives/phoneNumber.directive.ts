import { ArfLegendComponent } from './../components/arf-oversight-page/arf-dashboard/comum/arf-legend/arf-legend.component';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneNumber]'
})
export class PhoneNumberDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('keyup')
  listen() {
    const regex = /[0-9]/g

    if (this.el.nativeElement.value != '') {
      const value = this.el.nativeElement.value.trim().match(regex)?.join('');
      let finalValue = '';

      if (value) {
        const len = value.length;

        const ddd = value.slice(0, 2);
        const firstHalf = value.slice(2, 7);
        const secondHalf = value.slice(7, 11);

        if (len == 1) {
          finalValue = `(${ddd}`
        } else if (len == 2) {
          finalValue = `(${ddd})`
        } else if (len <= 7) {
          finalValue = `(${ddd}) ${firstHalf}`
        } else {
          finalValue = `(${ddd}) ${firstHalf}-${secondHalf}`
        }

        this.el.nativeElement.value = finalValue
      } else {
        this.el.nativeElement.value = ''
      }
    }
  }
}
