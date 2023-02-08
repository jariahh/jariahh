import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import invert from 'invert-color';
import { Subject, tap } from 'rxjs';
import { shadeColor } from './theme-builder/color-view/shade.color';
import _ from 'underscore';
export class Options {
  typographyLevels: {
    name: string,
    settings: {
      fontFamily: string,
      fontWeight: string,
      fontSize: string,
      lineHeight: string,
      letterSpacing: string,
    }
  }[] = []
  themes: {
    color: string
    backgroundColor: string
    title: string
  }[] = [];
  colors: {
    color: string
    backgroundColor: string
    title: string
  }[] = [];
}
@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(private httpClient: HttpClient) {
  }
  request: any = null;
  public getCSS(param: Options) {
    const sub = new Subject<string>();
    const palette = this.buildPalette(param)
    const theme = this.buildTheme(param, palette);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    if (this.request)
      this.request.unsubscribe();
    this.request = this.httpClient.post<any>('api/', {styles: theme}, {headers})
      .pipe(tap((result: any) => {
        console.log(result);
        this.request = null;
        sub.next(result.css)
      })).subscribe();
    return sub;
  }
  private buildTheme(options: Options, palette: string, wrapText = true) {
    return `@use 'sass:map';
@use '@angular/material/core/theming/all-theme';
@use '@angular/material/core/core';
@use '@angular/material/core/theming/theming';
@use '@angular/material/core/typography/all-typography';
@use '@angular/material/core/typography/typography';
@use '@angular/material' as mat;

@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
${_.uniq(options.typographyLevels, (l: any) => l.settings.fontFamily).map((level) => {
  return `
@import url('https://fonts.googleapis.com/css2?family=${level.settings.fontFamily}:wght@300;400;500&display=swap');
`
    }).join('')}
${this.buildTypography(options)}
${palette}
// Include non-theme styles for core.
@include core.core();

// Define a theme.
${options.colors.map(color => {
      return `
$${this.titleToName(color.title)}: theming.define-palette($${this.titleToName(color.title)}-palette);`;
    }).join('')}

$theme: theming.define-light-theme((
  color: (
    ${options.colors.map(color => {
      return `${this.titleToName(color.title)}: $${this.titleToName(color.title)}`;
    }).join(',\n\t')}
  ),
  typography: $typography,
  density: 0,
));
${this.wrapWithClass('.sealed-container', `
// Include all theme styles for the components.
@include all-theme.all-component-themes($theme);

@include typography.typography-hierarchy($theme);
${options.themes.map(theme => {
      return this.wrapWithClass(`${wrapText? '&': ''}.${theme.title.toLowerCase()}-theme`, `
    background-color: ${theme.backgroundColor};
    color: ${theme.color};
    `, theme.title !== 'Light')
    }).join('')}`, wrapText)}
`;
  }
  private buildPalette(options: Options){

    const lightFont = options.themes?.find(t => t.title === 'Dark')?.color ?? '#fff';
    const darkFont = options.themes?.find(t => t.title === 'Light')?.color ?? '#000';
    console.log(lightFont, darkFont);
    return `

$dark-primary-text: rgba(${darkFont}, 0.87);
$dark-secondary-text: rgba(${darkFont}, 0.54);
$dark-disabled-text: rgba(${darkFont}, 0.38);
$dark-dividers: rgba(${darkFont}, 0.12);
$dark-focused: rgba(${darkFont}, 0.12);
$light-primary-text: ${lightFont};
$light-secondary-text: rgba(${lightFont}, 0.7);
$light-disabled-text: rgba(${lightFont}, 0.5);
$light-dividers: rgba(${lightFont}, 0.12);
$light-focused: rgba(${lightFont}, 0.12);

${options.colors.map(color => {
  const colorShades = {50: shadeColor(color.backgroundColor, 100),
    100: shadeColor(color.backgroundColor, 75),
    200: shadeColor(color.backgroundColor, 50),
    300: shadeColor(color.backgroundColor, 25),
    400: shadeColor(color.backgroundColor, 10),
    500: color.backgroundColor,
    600: shadeColor(color.backgroundColor, -10),
    700: shadeColor(color.backgroundColor, -20),
    800: shadeColor(color.backgroundColor, -30),
    900: shadeColor(color.backgroundColor, -40),
    A100:shadeColor(color.backgroundColor, 70),
    A200:shadeColor(color.backgroundColor, 55),
    A400:shadeColor(color.backgroundColor, 5),
    A700:shadeColor(color.backgroundColor, -25)
  };
  return `
$${this.titleToName(color.title)}-palette: (
  50:   ${colorShades['50']  },
  100:  ${colorShades['100'] },
  200:  ${colorShades['200'] },
  300:  ${colorShades['300'] },
  400:  ${colorShades['400'] },
  500:  ${colorShades['500'] },
  600:  ${colorShades['600'] },
  700:  ${colorShades['700'] },
  800:  ${colorShades['800'] },
  900:  ${colorShades['900'] },
  A100: ${colorShades['A100']},
  A200: ${colorShades['A200']},
  A400: ${colorShades['A400']},
  A700: ${colorShades['A700']},
  contrast: (
    50:   ${invert(colorShades['50']  , { black: darkFont, white: lightFont })},
    100:  ${invert(colorShades['100'] , { black: darkFont, white: lightFont })},
    200:  ${invert(colorShades['200'] , { black: darkFont, white: lightFont })},
    300:  ${invert(colorShades['300'] , { black: darkFont, white: lightFont })},
    400:  ${invert(colorShades['400'] , { black: darkFont, white: lightFont })},
    500:  ${invert(colorShades['500'] , { black: darkFont, white: lightFont })},
    600:  ${invert(colorShades['600'] , { black: darkFont, white: lightFont })},
    700:  ${invert(colorShades['700'] , { black: darkFont, white: lightFont })},
    800:  ${invert(colorShades['800'] , { black: darkFont, white: lightFont })},
    900:  ${invert(colorShades['900'] , { black: darkFont, white: lightFont })},
    A100: ${invert(colorShades['A100'], { black: darkFont, white: lightFont })},
    A200: ${invert(colorShades['A200'], { black: darkFont, white: lightFont })},
    A400: ${invert(colorShades['A400'], { black: darkFont, white: lightFont })},
    A700: ${invert(colorShades['A700'], { black: darkFont, white: lightFont })},
  )
);`
    }).join('')}            `
  }
private wrapWithClass(wrapping: string, content: string, shouldWrap: boolean){
  return `${shouldWrap? `${wrapping}{` : ``}
${content}
${shouldWrap? `}` : ``}`;
}
  public getScss(param: Options) {
    const palette = this.buildPalette(param)
    return this.buildTheme(param, palette, false);
  }

  private buildTypography(options: Options) {
    return `
$typography: mat.define-typography-config(
${options.typographyLevels.map(level => {
  return `$${level.name}: mat.define-typography-level(
  $font-family: ${level.settings.fontFamily},
  $font-weight: ${level.settings.fontWeight},
  $font-size: ${level.settings.fontSize},
  $line-height: ${level.settings.lineHeight},
  $letter-spacing: ${level.settings.letterSpacing},
  ),`
    }).join('')}
);`;
  }

  private titleToName(title: string) {
    return title.toLowerCase().replace(/ /g,"_");
  }
}
