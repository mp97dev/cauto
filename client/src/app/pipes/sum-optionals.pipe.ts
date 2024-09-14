import { Pipe, PipeTransform } from '@angular/core';
import { Optional } from '../models/macchina.model';

@Pipe({
  name: 'sumOptionals',
  standalone: true
})
export class SumOptionalsPipe implements PipeTransform {

  transform(value?: Optional[] | null): number {
    if(!value) return 0;
    return value.map(o => o.prezzo).reduce((a, b) => a + b, 0);
  }

}
