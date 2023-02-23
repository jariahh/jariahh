import { Pipe, PipeTransform } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Pipe({
  name: 'asAny'
})
export class AsAnyPipe implements PipeTransform {

  transform(value: any): ThemePalette {
    return value as ThemePalette;
  }

}
