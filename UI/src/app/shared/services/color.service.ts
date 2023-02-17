import { Injectable } from '@angular/core';
import tinycolor, { ColorInput } from 'tinycolor2';
import RGBA = tinycolor.ColorFormats.RGBA;
@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }
  getColorObject(color: string){
    return {
      50:  tinycolor(color).lighten(52).toHexString(),
      100: tinycolor(color).lighten(37).toHexString(),
      200: tinycolor(color).lighten(26).toHexString(),
      300: tinycolor(color).lighten(12).toHexString(),
      400: tinycolor(color).lighten(3).toHexString(),
      500: tinycolor(color).toHexString(),
      600: tinycolor(color).darken(6).toHexString(),
      700: tinycolor(color).darken(12).toHexString(),
      800: tinycolor(color).darken(18).toHexString(),
      900: tinycolor(color).darken(24).toHexString(),
      A100:tinycolor(color).lighten(50).saturate(30).toHexString(),
      A200:tinycolor(color).lighten(30).saturate(30).toHexString(),
      A400:tinycolor(color).lighten(10).saturate(15).toHexString(),
      A700:tinycolor(color).lighten(2).saturate(5).toHexString()
    };
  }
}
