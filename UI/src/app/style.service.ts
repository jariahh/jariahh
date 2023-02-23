import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import invert from 'invert-color';
import { catchError, of, Subject, tap } from 'rxjs';
import { Palette } from './shared/models/palette';
import { ColorService } from './shared/services/color.service';
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

  constructor(private httpClient: HttpClient,
              private colorService: ColorService) {
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
    this.request = this.httpClient.post<any>('api/', {scss: theme}, {headers})
      .pipe(tap((result: any) => {
        this.request = null;
        sub.next(result.css)
      }), catchError(error => {
        sub.next('');
        return of()
      })).subscribe();
    return sub;
  }
  private buildTheme(options: Options, palette: string, wrapText = true) {
    return `
//Visit the following link to update the theme
//${window.location.href}
@use 'sass:map';
@use '@angular/material' as mat;
@use '@angular/material/core/theming/theming';
@use '@angular/material/core/theming/all-theme';
@use "@angular/material/button/button-theme";
@use "@angular/material/button/button-theme-private";
@use "@angular/material/core/mdc-helpers/mdc-helpers";
@use '@material/theme/theme-color' as mdc-theme-color;
@use '@material/button/button-text-theme' as mdc-button-text-theme;
@use '@material/button/button-filled-theme' as mdc-button-filled-theme;
@use '@material/button/button-protected-theme' as mdc-button-protected-theme;
@use '@material/button/button-outlined-theme' as mdc-button-outlined-theme;
@use '@jariahh/material-theming' as material-theming;

@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
${_.uniq(options.typographyLevels, (l: any) => l.settings.fontFamily).map((level) => {
  return `@import url('https://fonts.googleapis.com/css2?family=${level.settings.fontFamily.replace(/\ /g, '+')}:wght@300;400;500&display=swap');`
    }).join('\n')}
${this.buildTypography(options)}
${palette}
${this.getOption(options)}
// Include non-theme styles for core.
@include mat.core();

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
));`;
}).join('')
}

@mixin theme() {
${
      options.themes.map(theme => { return `${
          this.wrapWithClass(`.${this.titleToName(theme.title)}-theme`, `
  // Include all theme styles for the components.
  @include all-theme.all-component-themes($theme-${this.titleToName(theme.title)});
  @include mat.typography-hierarchy($theme-${this.titleToName(theme.title)});
  @include material-theming.all-theme($theme-${this.titleToName(theme.title)});
    `, theme.title !== 'Light')
      }`;
      }).join('')
    }
}
${wrapText? '@include theme()': ''}`;
  }
  private buildPalette(color: Palette, lightFont: string, darkFont: string){
    const colorShades = this.colorService.getColorObject(color.backgroundColor, lightFont, darkFont);
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
      50:   ${colorShades.contrast['50']},
      100:  ${colorShades.contrast['100']},
      200:  ${colorShades.contrast['200']},
      300:  ${colorShades.contrast['300']},
      400:  ${colorShades.contrast['400']},
      500:  ${colorShades.contrast['500']},
      600:  ${colorShades.contrast['600']},
      700:  ${colorShades.contrast['700']},
      800:  ${colorShades.contrast['800']},
      900:  ${colorShades.contrast['900']},
      A100: ${colorShades.contrast['A100']},
      A200: ${colorShades.contrast['A200']},
      A400: ${colorShades.contrast['A400']},
      A700: ${colorShades.contrast['A700']},
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
$${this.titleToName(theme.title)}-dark-dividers: rgba($${this.titleToName(theme.title)}-theme-${theme.title.toLowerCase() == 'dark'? 'default': 'contrast'}, ${theme.title.toLowerCase() == 'dark'? 0.31: 0.05});
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
  background: map.get($${this.titleToName(theme.title)}-palette, 300),
  hover:      rgba($${this.titleToName(theme.title)}-theme-contrast, 0.04),
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
}
