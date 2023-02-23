import { Injectable } from '@angular/core';
import invert from 'invert-color';
import tinycolor, { ColorInput } from 'tinycolor2';
import RGBA = tinycolor.ColorFormats.RGBA;
@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }
  getColorObject(color: string, lightFont = '#fff', darkFont = '#000'){
    const _50  = tinycolor(color).lighten(52).toHexString(),
          _100 = tinycolor(color).lighten(37).toHexString(),
          _200 = tinycolor(color).lighten(26).toHexString(),
          _300 = tinycolor(color).lighten(12).toHexString(),
          _400 = tinycolor(color).lighten(3) .toHexString(),
          _500 = tinycolor(color).lighten(0) .toHexString(),
          _600 = tinycolor(color).darken(6)  .toHexString(),
          _700 = tinycolor(color).darken(12) .toHexString(),
          _800 = tinycolor(color).darken(18) .toHexString(),
          _900 = tinycolor(color).darken(24) .toHexString(),
          A100 = tinycolor(color).lighten(50).saturate(30).toHexString(),
          A200 = tinycolor(color).lighten(30).saturate(30).toHexString(),
          A400 = tinycolor(color).lighten(10).saturate(15).toHexString(),
          A700 = tinycolor(color).lighten(2).saturate(5)  .toHexString();
    return {
      50:   _50 ,
      100:  _100,
      200:  _200,
      300:  _300,
      400:  _400,
      500:  _500,
      600:  _600,
      700:  _700,
      800:  _800,
      900:  _900,
      A100: A100,
      A200: A200,
      A400: A400,
      A700: A700,
      contrast: {
        50:   tinycolor(invert(_50 , { black: darkFont, white: lightFont })).lighten(52).toHexString(),
        100:  tinycolor(invert(_100, { black: darkFont, white: lightFont })).lighten(37).toHexString(),
        200:  tinycolor(invert(_200, { black: darkFont, white: lightFont })).lighten(26).toHexString(),
        300:  tinycolor(invert(_300, { black: darkFont, white: lightFont })).lighten(12).toHexString(),
        400:  tinycolor(invert(_400, { black: darkFont, white: lightFont })).lighten(3) .toHexString(),
        500:  tinycolor(invert(_500, { black: darkFont, white: lightFont })).lighten(0) .toHexString(),
        600:  tinycolor(invert(_600, { black: darkFont, white: lightFont })).darken(6)  .toHexString(),
        700:  tinycolor(invert(_700, { black: darkFont, white: lightFont })).darken(12) .toHexString(),
        800:  tinycolor(invert(_800, { black: darkFont, white: lightFont })).darken(18) .toHexString(),
        900:  tinycolor(invert(_900, { black: darkFont, white: lightFont })).darken(24) .toHexString(),
        A100: tinycolor(invert(A100, { black: darkFont, white: lightFont })).lighten(50).saturate(30).toHexString(),
        A200: tinycolor(invert(A200, { black: darkFont, white: lightFont })).lighten(30).saturate(30).toHexString(),
        A400: tinycolor(invert(A400, { black: darkFont, white: lightFont })).lighten(10).saturate(15).toHexString(),
        A700: tinycolor(invert(A700, { black: darkFont, white: lightFont })).lighten(2).saturate(5)  .toHexString(),

      }
    };
  }
}
