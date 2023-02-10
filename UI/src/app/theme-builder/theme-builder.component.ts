import { Color } from '@angular-material-components/color-picker';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ColDef, Column, FirstDataRenderedEvent } from 'ag-grid-community';
import { catchError, of, tap } from 'rxjs';
import _ from 'underscore';
import { ThemeService } from '../shared/services/theme.service';
import { Options, StyleService } from '../style.service';
import defaultTheme from './defaultTheme.json';
import { DialogInputComponent } from './dialog/dialog-input.component';
import { hexToColor } from './hex-to.color';
import { ThemePalette } from './themePalette';

@Component({
  selector: 'app-theme-builder',
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss']
})
export class ThemeBuilderComponent implements AfterViewInit {
  @ViewChild('styleContainer') styleContainer: ElementRef<HTMLDivElement> = {} as any;
  public typographyLevels: {
    name: string,
    settings:{
      fontFamily?: string,
      fontWeight?: string,
      fontSize?: string,
      lineHeight?: string,
      letterSpacing?: string,
    }
  }[] = [
    {name: 'headline-1', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '6rem', fontSize: '6rem'}},
    {name: 'headline-2', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '3.75rem', fontSize: '3.75rem'}},
    {name: 'headline-3', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '3.125rem', fontSize: '3rem'}},
    {name: 'headline-4', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '2.5rem', fontSize: '2.125rem'}},
    {name: 'headline-5', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '2rem', fontSize: '1.5rem'}},
    {name: 'headline-6', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '2rem', fontSize: '1.25rem'}},
    {name: 'subtitle-1', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '1.75rem', fontSize: '1rem'}},
    {name: 'subtitle-2', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '1.375rem', fontSize: '0.875rem'}},
    {name: 'body-1'    , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '1.5rem', fontSize: '1rem'}},
    {name: 'body-2'    , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '1.25rem', fontSize: '0.875rem'}},
    {name: 'caption'   , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '1.25rem', fontSize: '0.85rem'}},
    {name: 'button'    , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '2.25rem', fontSize: '0.875rem'}},
    {name: 'overline'  , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: 'regular', lineHeight: '2rem', fontSize: '0.85rem'}},
  ];

  columnDefs: ColDef[] = [
    { field: 'name' },
    {
      headerName: 'Font Family',
      field: 'settings.fontFamily',
      editable: true
    },
    {
      headerName: 'Letter Spacing',
      field: 'settings.letterSpacing',
      editable: true
    },
    {
      headerName: 'Font Weight',
      field: 'settings.fontWeight',
      editable: true
    },
    {
      headerName: 'Line Height',
      field: 'settings.lineHeight',
      editable: true
    },
    {
      headerName: 'Font Size',
      field: 'settings.fontSize',
      editable: true
    },
  ];
  public selectedTheme: {
    'title': string;
    'backgroundColor': FormControl<Color | null>;
    'color':  FormControl<Color | null>;
  } = {} as any;

  public themes = [{
    title: 'Light',
    backgroundColor: new FormControl(hexToColor('#fafafa')),
    color: new FormControl(hexToColor('#000')),
  }, {
    title: 'Dark',
    backgroundColor: new FormControl(hexToColor('#000')),
    color: new FormControl(hexToColor('#fafafa')),
  }]
  public palettes = [
    {
      title: 'primary',
      backgroundColor: new FormControl(hexToColor('#54C0E8')),
      color: new FormControl(hexToColor('#fff')),
      isVisible: false
    },
    {
      title: 'accent',
      backgroundColor: new FormControl(hexToColor('#0B3B60')),
      color: new FormControl(hexToColor('#fff')),
      isVisible: false
    },
    {
      title: 'warn',
      backgroundColor: new FormControl(hexToColor('#FFBF3C')),
      color: new FormControl(hexToColor('#333')),
      isVisible: false
    }
  ] as ThemePalette[];
  public isLoading: boolean = false;
  public isSettingsOpen: boolean = false;
  public darkFont: Color = hexToColor('#000');
  public lightFont: Color = hexToColor('#fff');
  public fontFamilies: string[] = [];
  public fontWeights = ['thin', 'light', 'regular', 'medium', 'bold', 'black'];
  constructor(private styleService: StyleService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient,
              public dialog: MatDialog,
              public themeService: ThemeService) { }


  public ngAfterViewInit(): void {
    this.isSettingsOpen = sessionStorage.getItem('settingsOpen') === 'true'
    const themeName = sessionStorage.getItem('selectedTheme') ?? 'Light'
    try {
      const options = JSON.parse(atob(this.activatedRoute.snapshot.queryParamMap.get('q') ?? '{}')) as Options;
      if (options.themes) {
        this.themes = options.themes.map(theme => ({
          title: theme.title,
          backgroundColor: new FormControl(hexToColor(theme.backgroundColor)),
          color: new FormControl(hexToColor(theme.color)),
        }));
      }
      if (options.palettes) {
        this.palettes = options.palettes.map(color => ({
          title: color.title,
          backgroundColor: new FormControl(hexToColor(color.backgroundColor)),
          color: new FormControl(hexToColor(color.color)),
          isVisible: false
        })) as any;
      }
      if (options.typographyLevels) {
        this.typographyLevels = options.typographyLevels;
      }
    } catch {}
    this.selectedTheme = this.themes.find(t => t.title === themeName) as any;
    this.selectThemeClass = `${this.selectedTheme?.title?.toLowerCase()}-theme`;
    this.updateLightDark();

    this.setCss(defaultTheme.css);
    this.updateStyles();
    this.httpClient.get('https://raw.githubusercontent.com/honeysilvas/google-fonts/dev/json/google-web-font-list-sorted-by-popularity.json')
      .pipe(tap((webFonts: any) => {
        this.fontFamilies = webFonts.items.map((i: any) => i.family);
        console.log(this.fontFamilies);
      }))
      .subscribe();
    this.updateOptions();
  }
  private updateStyles(){
    this.isLoading = true;
    const colors = this.getOptions();
    this.styleService.getCSS(colors as any).pipe(tap((css: string) => {
      this.setCss(css);

    })).subscribe();
  }
  private setCss(css: string){
    this.isLoading = false;
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(css));
    this.styleContainer.nativeElement.childNodes.forEach( childrenKey =>  {
      this.styleContainer.nativeElement.removeChild(childrenKey);
    });
    this.styleContainer.nativeElement.append(styleElement);
  }
  debounce: any;
  public selectThemeClass: string = '';
  public changed() {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this.updateOptions();
      this.updateStyles();
    }, 100)
  }

  public toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
    sessionStorage.setItem('settingsOpen', this.isSettingsOpen? 'true': 'false')
  }

  public selectTheme($event: MatButtonToggleChange) {
    this.selectedTheme = this.themes.find(t => t.title === $event.value) as any;
    this.selectThemeClass = `${this.selectedTheme?.title?.toLowerCase()}-theme`;
    sessionStorage.setItem('selectedTheme', this.selectedTheme.title);
  }

  public colorChange(formControl: FormControl<Color | null>, value: string) {
    formControl.setValue(hexToColor(value));
    this.updateLightDark();
    this.updateOptions();
  }
  private getOptions(){
    return {
      typographyLevels: this.typographyLevels,
      themes: this.themes.map(c => ({
          title: c.title,
          backgroundColor: `${c.backgroundColor.value}`,
          color: `${c.color.value}`
        }
      )),
      palettes: this.palettes.map(c => ({
          title: c.title,
          backgroundColor: `#${c.backgroundColor.value.hex}`,
          color: `#${c.color.value.hex}`
        }
      ))
    } as Options;
  }
  public async getScss() {
    const colors = this.getOptions();
    const scss = this.styleService.getScss(colors as any)
    await window.navigator.clipboard.writeText(scss);
  }

  private updateLightDark() {
    this.lightFont = this.themes.find(t => t.title === 'Dark')?.color?.value ?? hexToColor('#fff');
    this.darkFont = this.themes.find(t => t.title === 'Light')?.color?.value ?? hexToColor('#000');
  }

  public updateOptions() {
    const results = this.getOptions();
    this.themeService.currentTheme$.next(results);
    const stringified = JSON.stringify(results);
    const queryParams: Params = { q: window.btoa(stringified) };
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

  }

  public addPallet() {
    const dialogRef = this.dialog.open(DialogInputComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.palettes.push({
        title: result as any,
        backgroundColor: new FormControl<Color>(hexToColor('#333')) as any,
        color: new FormControl<Color>(hexToColor('#333')) as any,
        isVisible:false
      })
    });
  }

  public removePalette = (palette: ThemePalette) => {
    this.palettes = _.without(this.palettes, palette);
  }

  public firstDataRendered(event: FirstDataRenderedEvent<{name: string; settings: {fontFamily?: string; fontWeight?: string; fontSize?: string; lineHeight?: string; letterSpacing?: string}}>) {
    event.columnApi.autoSizeColumns(event.columnApi.getColumns() as Column[]);
  }
}
