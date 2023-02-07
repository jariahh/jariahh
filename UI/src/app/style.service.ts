import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { getContrastYIQ } from './theme-builder/color-view/get-contrast-y-i.q';
import { shadeColor } from './theme-builder/color-view/shade.color';
export class Options {
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
  private buildTheme(options: Options, palette: string){
    return `@use 'sass:map';
@use '@angular/material/core/theming/all-theme';
@use '@angular/material/core/core';
@use '@angular/material/core/theming/theming';
@use '@angular/material/core/typography/all-typography';
@use '@angular/material/core/typography/typography';

${palette}
// Include non-theme styles for core.
@include core.core();

// Define a theme.
${options.colors.map(color =>{
  return `
$${color.title.toLowerCase()}: theming.define-palette($${color.title.toLowerCase()}-palette);`;
    }).join('')}

$theme: theming.define-light-theme((
  color: (
    ${options.colors.map(color =>{
      return `${color.title.toLowerCase()}: $${color.title.toLowerCase()}`;
    }).join(',\n\t')}
  ),
  typography: all-typography.define-typography-config(),
  density: 0,
));
.sealed-container{
  // Include all theme styles for the components.
  @include all-theme.all-component-themes($theme);

  @include typography.typography-hierarchy($theme);
}
    `;
  }
  private buildPalette(options: Options){
    return `

$dark-primary-text: rgba(black, 0.87);
$dark-secondary-text: rgba(black, 0.54);
$dark-disabled-text: rgba(black, 0.38);
$dark-dividers: rgba(black, 0.12);
$dark-focused: rgba(black, 0.12);
$light-primary-text: white;
$light-secondary-text: rgba(white, 0.7);
$light-disabled-text: rgba(white, 0.5);
$light-dividers: rgba(white, 0.12);
$light-focused: rgba(white, 0.12);

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
$${color.title.toLowerCase()}-palette: (
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
    50:   ${getContrastYIQ(colorShades['50']  , '#fff', '#000')},
    100:  ${getContrastYIQ(colorShades['100'] , '#fff', '#000')},
    200:  ${getContrastYIQ(colorShades['200'] , '#fff', '#000')},
    300:  ${getContrastYIQ(colorShades['300'] , '#fff', '#000')},
    400:  ${getContrastYIQ(colorShades['400'] , '#fff', '#000')},
    500:  ${getContrastYIQ(colorShades['500'] , '#fff', '#000')},
    600:  ${getContrastYIQ(colorShades['600'] , '#fff', '#000')},
    700:  ${getContrastYIQ(colorShades['700'] , '#fff', '#000')},
    800:  ${getContrastYIQ(colorShades['800'] , '#fff', '#000')},
    900:  ${getContrastYIQ(colorShades['900'] , '#fff', '#000')},
    A100: ${getContrastYIQ(colorShades['A100'], '#fff', '#000')},
    A200: ${getContrastYIQ(colorShades['A200'], '#fff', '#000')},
    A400: ${getContrastYIQ(colorShades['A400'], '#fff', '#000')},
    A700: ${getContrastYIQ(colorShades['A700'], '#fff', '#000')},
  )
);`
    }).join('')}            `
  }
}
