import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import invert from 'invert-color';
import { catchError, of, Subject, tap } from 'rxjs';
import { shadeColor } from './theme-builder/color-view/shade.color';
import _ from 'underscore';
import { Palette } from './theme-builder/palette';
import { ThemePalette } from './theme-builder/themePalette';
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
  palettes: {
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
    const palette = this.buildPalettes(param)
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
      }), catchError(error => {sub.next(''); return of()})).subscribe();
    return sub;
  }
  private buildTheme(options: Options, palette: string, wrapText = true) {
    return `
//Visit the following link to update the theme
//${window.location.href}
@use 'sass:map';
@use '@angular/material/core/theming/all-theme';
@use '@angular/material/core/core';
@use '@angular/material/core/theming/theming';
@use '@angular/material/core/typography/all-typography';
@use '@angular/material/core/typography/typography';
@use '@angular/material' as mat;
@use "@angular/material/button/button-theme";
@use "@angular/material/button/button-theme-private";
@use "@angular/material/core/mdc-helpers/mdc-helpers";
@use '@material/theme/theme-color' as mdc-theme-color;
@use '@material/button/button-text-theme' as mdc-button-text-theme;
@use '@material/button/button-filled-theme' as mdc-button-filled-theme;
@use '@material/button/button-protected-theme' as mdc-button-protected-theme;
@use '@material/button/button-outlined-theme' as mdc-button-outlined-theme;

@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
${_.uniq(options.typographyLevels, (l: any) => l.settings.fontFamily).map((level) => {
  return `
@import url('https://fonts.googleapis.com/css2?family=${level.settings.fontFamily}:wght@300;400;500&display=swap');
`
    }).join('')}
${this.getMixins()}
${this.buildTypography(options)}
${palette}
${this.getOption(options)}
// Include non-theme styles for core.
@include core.core();

// Define a theme.
${options.palettes.map(color => {
      return `$${this.titleToName(color.title)}: theming.define-palette($${this.titleToName(color.title)}-palette);\n`;
}).join('')}
${
options.themes.map(theme => { return `
$theme-${theme.title.toLowerCase()}: theming.define-${this.titleToName(theme.title)}-theme((
  color: (
    ${options.palettes.map(color => {
      return `${this.titleToName(color.title)}: $${this.titleToName(color.title)}`;
    }).join(',\n\t')}
  ),
  typography: $typography,
  density: 0,
));

$theme-${theme.title.toLowerCase()}: map.deep-merge($theme-${theme.title.toLowerCase()}, (
  'color': (
    ${options.palettes.map(color => {
    return `${this.titleToName(color.title)}: $${this.titleToName(color.title)}`;
  }).join(',\n\t')},
    'background': $${this.titleToName(theme.title)}-theme-background-palette,
    'foreground': $${this.titleToName(theme.title)}-theme-foreground-palette,
  )
));
${
  this.wrapWithClass('.sealed-container', `
${
    this.wrapWithClass(`${wrapText? '&': ''}.${this.titleToName(theme.title)}-theme`, `
  // Include all theme styles for the components.
  @include all-theme.all-component-themes($theme-${this.titleToName(theme.title)});
  @include typography.typography-hierarchy($theme-${this.titleToName(theme.title)});
  @include button_color($theme-${this.titleToName(theme.title)});
  @include toolbar_color($theme-${this.titleToName(theme.title)});
    `, theme.title !== 'Light')
}`, wrapText)
}`;
}).join('')
}`;
  }
  private buildPalette(color: Palette, lightFont: string, darkFont: string){
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
    return `$${this.titleToName(color.title)}-palette: (
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
  }
  private buildPalettes(options: Options){
    const lightFont = options.themes?.find(t => t.title === 'Dark')?.color ?? '#fff';
    const darkFont = options.themes?.find(t => t.title === 'Light')?.color ?? '#000';
    return `${options.palettes.map(color => this.buildPalette(color, lightFont, darkFont)).join('\n')}            `
  }
private wrapWithClass(wrapping: string, content: string, shouldWrap: boolean){
  return `${shouldWrap? `${wrapping}{` : ``}
${content}
${shouldWrap? `}` : ``}`;
}
  public getScss(param: Options) {
    const palette = this.buildPalettes(param)
    return this.buildTheme(param, palette, false);
  }

  private buildTypography(options: Options) {
    return `
$typography: mat.define-typography-config(
${options.typographyLevels.map(level => {
  return `\t$${level.name}: mat.define-typography-level($font-family: ${
    level.settings.fontFamily}, $font-weight: ${
    level.settings.fontWeight}, $font-size: ${
    level.settings.fontSize}, $line-height: ${
    level.settings.lineHeight}, $letter-spacing: ${
    level.settings.letterSpacing})`
    }).join(',\n')}
);`;
  }

  private titleToName(title: string) {
    return title.toLowerCase().replace(/ /g,"-");
  }

  private getOption(options: Options) {
    return options.themes.map(theme =>{
      let lightColor = theme.color;
      let darkColor = theme.backgroundColor;
      if(theme.title.toLowerCase() === 'light'){
        lightColor = theme.backgroundColor;
        darkColor = theme.color;
      }
      return `
${this.buildPalette(theme, lightColor, darkColor)}
$${this.titleToName(theme.title)}-theme-contrast: map.get(map.get($${this.titleToName(theme.title)}-palette, contrast), 500);
$${this.titleToName(theme.title)}-theme-default: map.get($${this.titleToName(theme.title)}-palette, 500);

$${this.titleToName(theme.title)}-dark-primary-text: rgba($${this.titleToName(theme.title)}-theme-default, 0.87);
$${this.titleToName(theme.title)}-dark-secondary-text: rgba($${this.titleToName(theme.title)}-theme-default, 0.54);
$${this.titleToName(theme.title)}-dark-disabled-text: rgba($${this.titleToName(theme.title)}-theme-default, 0.38);
$${this.titleToName(theme.title)}-dark-dividers: rgba($${this.titleToName(theme.title)}-theme-default, 0.12);
$${this.titleToName(theme.title)}-dark-focused: rgba($${this.titleToName(theme.title)}-theme-default, 0.12);

$${this.titleToName(theme.title)}-light-primary-text: rgba($${this.titleToName(theme.title)}-theme-contrast, 0.7);
$${this.titleToName(theme.title)}-light-secondary-text: rgba($${this.titleToName(theme.title)}-theme-contrast, 0.5);
$${this.titleToName(theme.title)}-light-disabled-text: rgba($${this.titleToName(theme.title)}-theme-contrast, 0.5);
$${this.titleToName(theme.title)}-light-dividers: rgba($${this.titleToName(theme.title)}-theme-contrast, 0.12);
$${this.titleToName(theme.title)}-light-focused: rgba($${this.titleToName(theme.title)}-theme-contrast, 0.12);

// Background palette for light themes.
$${this.titleToName(theme.title)}-theme-background-palette: (
  status-bar: map.get($${this.titleToName(theme.title)}-palette, 300),
  app-bar:    map.get($${this.titleToName(theme.title)}-palette, 100),
  background: map.get($${this.titleToName(theme.title)}-palette, 50),
  hover:      rgba($${this.titleToName(theme.title)}-theme-contrast, 0.04), // TODO(kara): check style with Material Design UX
  card:       $${this.titleToName(theme.title)}-theme-default,
  dialog:     $${this.titleToName(theme.title)}-theme-default,
  disabled-button: rgba($${this.titleToName(theme.title)}-theme-contrast, 0.12),
  raised-button: $${this.titleToName(theme.title)}-theme-default,
  focused-button: $${this.titleToName(theme.title)}-dark-focused,
  selected-button: map.get($${this.titleToName(theme.title)}-palette, 300),
  selected-disabled-button: map.get($${this.titleToName(theme.title)}-palette, 400),
  disabled-button-toggle: map.get($${this.titleToName(theme.title)}-palette, 200),
  unselected-chip: map.get($${this.titleToName(theme.title)}-palette, 300),
  disabled-list-option: map.get($${this.titleToName(theme.title)}-palette, 200),
  tooltip: map.get($${this.titleToName(theme.title)}-palette, 700),
);

// Foreground palette for light themes.
$${this.titleToName(theme.title)}-theme-foreground-palette: (
  base:              $${this.titleToName(theme.title)}-theme-contrast,
  divider:           $${this.titleToName(theme.title)}-dark-dividers,
  dividers:          $${this.titleToName(theme.title)}-dark-dividers,
  disabled:          $${this.titleToName(theme.title)}-dark-disabled-text,
  disabled-button:   rgba($${this.titleToName(theme.title)}-theme-contrast, 0.26),
  disabled-text:     $${this.titleToName(theme.title)}-dark-disabled-text,
  elevation:         $${this.titleToName(theme.title)}-theme-contrast,
  hint-text:         $${this.titleToName(theme.title)}-dark-disabled-text,
  secondary-text:    $${this.titleToName(theme.title)}-dark-secondary-text,
  icon:              rgba($${this.titleToName(theme.title)}-theme-contrast, 0.54),
  icons:             rgba($${this.titleToName(theme.title)}-theme-contrast, 0.54),
  text:              rgba($${this.titleToName(theme.title)}-theme-contrast, 0.87),
  slider-min:        rgba($${this.titleToName(theme.title)}-theme-contrast, 0.87),
  slider-off:        rgba($${this.titleToName(theme.title)}-theme-contrast, 0.26),
  slider-off-active: rgba($${this.titleToName(theme.title)}-theme-contrast, 0.38),
);`
    }).join('')
  }

  private getMixins() {
    return `
@mixin _button-variant($color) {
  @include mdc-button-text-theme.theme((
    label-text-color: $color,
  ));
}

@mixin _unelevated-button-variant($foreground, $background) {
  @include mdc-button-filled-theme.theme((
    container-color: $background,
    label-text-color: $foreground,
  ));
}

@mixin _raised-button-variant($foreground, $background) {
  @include mdc-button-protected-theme.theme((
    container-color: $background,
    label-text-color: $foreground,
  ));
}

@mixin _outlined-button-variant($color) {
  @include mdc-button-outlined-theme.theme((
    label-text-color: $color,
  ));
}
@function is-map($var){
  @return type-of($var) == 'map';
}
@mixin button_color($config-or-theme) {
  $config: theming.get-color-config($config-or-theme);
  @include mdc-helpers.using-mdc-theme($config) {
    $is-dark: map.get($config, is-dark);
    $colors: map.get($config-or-theme, color);
    @each $color, $values in $colors {
      @if(is-map($values)) {
        @debug #{$color};
        @debug $values;
        $contrast: map.get($values, contrast);
        @if(is-map($contrast)) {
          $on-surface: map.get($contrast, 500);
          $surface: map.get($values, 500);
          $disabled-ink-color: rgba($on-surface, if($is-dark, 0.5, 0.38));
          $disabled-container-color: rgba($on-surface, 0.12);
          .mat-mdc-button {
            &.mat-#{$color} {
              @include _button-variant($surface);
            }
          }

          .mat-mdc-unelevated-button {
            &.mat-#{$color} {
              @include _unelevated-button-variant($on-surface, $surface);
            }
          }

          .mat-mdc-raised-button {
            &.mat-#{$color} {
              @include _raised-button-variant($on-surface, $surface);
            }
          }

          .mat-mdc-outlined-button {
            @include mdc-button-outlined-theme.theme((
              outline-color: rgba(mdc-theme-color.prop-value(on-surface), 0.12)
            ));

            &.mat-#{$color} {
              @include _outlined-button-variant($surface);
            }
          }
        }
      }
    }
  }
}

@mixin _palette-styles($on-surface, $surface) {
  background: $surface;
  color: $on-surface;

}
@mixin toolbar_color($config-or-theme) {
  $config: theming.get-color-config($config-or-theme);
  $is-dark: map.get($config, is-dark);
  $colors: map.get($config-or-theme, color);
  @each $color, $values in $colors {
    @if (is-map($values)) {
      $contrast: map.get($values, contrast);
      @if (is-map($contrast)) {
        $on-surface: map.get($contrast, 500);
        $surface: map.get($values, 500);
        .mat-toolbar {
          &.mat-#{$color} {
            @include _palette-styles($on-surface, $surface);
          }
        }
      }
    }
  }
}
`;
  }
}
