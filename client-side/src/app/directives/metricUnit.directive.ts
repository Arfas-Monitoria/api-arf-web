import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[metricUnit]'
})
export class MetricUnitDirective {
  @Input() metricUnit: 'temp' | 'uso' = 'temp';

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.format()
  }

  @HostListener('keyup')
  format() {
    const regex = /[0-9]/g
    const value = this.el.nativeElement.value.trim().match(regex)?.join('');

    if (value == undefined) {
      this.el.nativeElement.value = null
    } else if (this.metricUnit == 'temp') {
      this.el.nativeElement.value = value + '°C'
    } else {
      this.el.nativeElement.value = value + '%'
    }
  }
}
