import { Pipe, PipeTransform } from '@angular/core';
import { Optional } from '../models/macchina.model';

@Pipe({
  name: 'includedInArray',
  standalone: true
})
export class IncludedInArrayPipe implements PipeTransform {

  transform(value: Optional[], selectedOptionals?: Optional[] | null): Optional[] {
    return value.filter(optional => selectedOptionals?.map(x => x.nome).includes(optional.nome));
  }

}
