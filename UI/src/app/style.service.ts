import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { urlencoded } from 'express';
import { Subject, tap } from 'rxjs';
declare var Sass: any;
const scss = new Sass('/assets/sass.worker.js');
export class Options {
  colors: {
    color: string
    title: string
  }[] = [];
}
@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(private httpClient: HttpClient) {
  }

  public getCSS(param: Options) {
    const sub = new Subject<string>();
    const palette = this.buildPalette(param)
    const theme = this.buildTheme(param, palette);
    const formData = new FormData();
    formData.append('styles', theme)
    console.log(theme);
    this.httpClient.post<any>('api/', formData).pipe(tap((result: any) => {
      console.log(result);
      sub.next(result.text)
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

// Include all theme styles for the components.
@include all-theme.all-component-themes($theme);

@include typography.typography-hierarchy($theme);
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
  return `
$${color.title.toLowerCase()}-palette: (
  50: darken(${color.color}, 5%),
  100: lighten(${color.color}, 0%),
  200: lighten(${color.color}, 20%),
  300: lighten(${color.color}, 30%),
  400: lighten(${color.color}, 40%),
  500: lighten(${color.color}, 50%),
  600: lighten(${color.color}, 60%),
  700: lighten(${color.color}, 70%),
  800: lighten(${color.color}, 80%),
  900: lighten(${color.color}, 90%),
  A100: #ff8a80,
  A200: #ff5252,
  A400: #ff1744,
  A700: #d50000,
  contrast: (
    50: $dark-primary-text,
    100: $dark-primary-text,
    200: $dark-primary-text,
    300: $dark-primary-text,
    400: $dark-primary-text,
    500: $light-primary-text,
    600: $light-primary-text,
    700: $light-primary-text,
    800: $light-primary-text,
    900: $light-primary-text,
    A100: $dark-primary-text,
    A200: $light-primary-text,
    A400: $light-primary-text,
    A700: $light-primary-text,
  )
);`
    }).join('')}            `
  }
}
