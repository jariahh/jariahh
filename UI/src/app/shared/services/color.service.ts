import { Injectable } from '@angular/core';
import tinycolor, { ColorInput } from 'tinycolor2';
import RGBA = tinycolor.ColorFormats.RGBA;
@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }
  getColorObject(color: string){
    const multiply = function(rgb1: RGBA, rgb2: RGBA){
      rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
      rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
      rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
      return tinycolor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
    };
    const baseLight = tinycolor('#ffffff');
    const baseDark = multiply(tinycolor(color).toRgb(), tinycolor(color).toRgb());
    const baseTriad = tinycolor(color).tetrad() as any;
    return {
      50:  tinycolor.mix(baseLight, color, 12).toHexString(),
      100: tinycolor.mix(baseLight, color, 30).toHexString(),
      200: tinycolor.mix(baseLight, color, 50).toHexString(),
      300: tinycolor.mix(baseLight, color, 70).toHexString(),
      400: tinycolor.mix(baseLight, color, 85).toHexString(),
      500: tinycolor.mix(baseLight, color, 100).toHexString(),
      600: tinycolor.mix(baseDark,  color, 87).toHexString(),
      700: tinycolor.mix(baseDark,  color, 70).toHexString(),
      800: tinycolor.mix(baseDark,  color, 54).toHexString(),
      900: tinycolor.mix(baseDark,  color, 25).toHexString(),
      A100:tinycolor.mix(baseDark,  baseTriad[3], 15).saturate(80).lighten(48).toHexString(),
      A200:tinycolor.mix(baseDark,  baseTriad[3], 15).saturate(80).lighten(36).toHexString(),
      A400:tinycolor.mix(baseDark,  baseTriad[3], 15).saturate(100).lighten(31).toHexString(),
      A700:tinycolor.mix(baseDark,  baseTriad[3], 15).saturate(100).lighten(28).toHexString()
    };
  }
}
