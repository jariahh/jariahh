import { FormControl } from '@angular/forms';
import { ThemePalette as ThemeColor } from '@angular/material/core';
import { Color } from 'invert-color';

export class ThemePalette {

  title: ThemeColor = 'primary';
  backgroundColor: FormControl<string> = new FormControl('#fff') as any;
  color: FormControl<string> = new FormControl('#000') as any;
  isVisible: boolean = false;
}
