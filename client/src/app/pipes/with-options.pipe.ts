import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withOptions',
  standalone: true
})
export class WithOptionsPipe implements PipeTransform {

  transform<T extends { opzioni: any[] }>(value: T[]): T[] {
    return value.filter(v => v.opzioni.length > 0);
  }

}
