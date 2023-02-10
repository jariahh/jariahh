import { Color } from '@angular-material-components/color-picker';
import { FormControl } from '@angular/forms';
import { ThemePalette as ThemeColor } from '@angular/material/core';
import { hexToColor } from './hex-to.color';

export class ThemePalette {

  title: ThemeColor = 'primary';
  backgroundColor: FormControl<Color> = new FormControl( hexToColor('#fff')) as any;
  color: FormControl<Color> = new FormControl(hexToColor('#000')) as any;
  isVisible: boolean = false;
}
