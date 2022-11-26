import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(number: string): string {
    let completer = '';

    number = number.trim()

    if (number.length < 11) {
      for (let i = 0; i < 11 - number.length; i++) {
        completer += '0';
      }
    }

    const ddd = number.slice(0, 2);
    const firstHalf = number.slice(2, 7);
    const secondHalf = number.slice(7, 11);

    return `(${ddd}) ${firstHalf}-${secondHalf + completer}`
  }

}
