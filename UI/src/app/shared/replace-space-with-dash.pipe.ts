import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSpaceWithDash'
})
export class ReplaceSpaceWithDashPipe implements PipeTransform {

  transform(value?: string): unknown {
    return value?.replace(/ /g, '-');
  }

}
// Angular

