import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, SecurityContext, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ColDef, Column, ColumnApi, FirstDataRenderedEvent } from 'ag-grid-community';
import { HexColor } from 'invert-color';
import { tap } from 'rxjs';
import _ from 'underscore';
import { ThemePalette } from '../shared/models/themePalette';
import { ThemeService } from '../shared/services/theme.service';
import { Options, StyleService } from '../style.service';
import defaultTheme from './defaultTheme.json';
import { DialogInputComponent } from './dialog/dialog-input.component';

export class IMessage {
  type: string = '';
  data: any = {};
}

@Component({
  selector: 'app-theme-builder',
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss']
})
export class ThemeBuilderComponent implements AfterViewInit {
  @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement> = {} as any;
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
    {name: 'headline-1', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '6rem', fontSize: '6rem'}},
    {name: 'headline-2', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '3.75rem', fontSize: '3.75rem'}},
    {name: 'headline-3', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '3.125rem', fontSize: '3rem'}},
    {name: 'headline-4', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '2.5rem', fontSize: '2.125rem'}},
    {name: 'headline-5', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '2rem', fontSize: '1.5rem'}},
    {name: 'headline-6', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '2rem', fontSize: '1.25rem'}},
    {name: 'subtitle-1', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '1.75rem', fontSize: '1rem'}},
    {name: 'subtitle-2', settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '1.375rem', fontSize: '0.875rem'}},
    {name: 'body-1'    , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '1.5rem', fontSize: '1rem'}},
    {name: 'body-2'    , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '1.25rem', fontSize: '0.875rem'}},
    {name: 'caption'   , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '1.25rem', fontSize: '0.85rem'}},
    {name: 'button'    , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '2.25rem', fontSize: '0.875rem'}},
    {name: 'overline'  , settings: {fontFamily: 'Inter', letterSpacing: 'normal', fontWeight: '400', lineHeight: '2rem', fontSize: '0.85rem'}},
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
    'backgroundColor': FormControl<HexColor | null>;
    'color':  FormControl<HexColor | null>;
  } = {} as any;

  public themes = [{
    title: 'Light',
    backgroundColor: new FormControl(('#fafafa')),
    color: new FormControl(('#000')),
  }, {
    title: 'Dark',
    backgroundColor: new FormControl(('#000')),
    color: new FormControl(('#fafafa')),
  }]
  public palettes = [
    {
      title: 'primary',
      backgroundColor: new FormControl(('#54C0E8')),
      color: new FormControl(('#fff')),
      isVisible: false
    },
    {
      title: 'accent',
      backgroundColor: new FormControl(('#0B3B60')),
      color: new FormControl(('#fff')),
      isVisible: false
    },
    {
      title: 'warn',
      backgroundColor: new FormControl(('#FFBF3C')),
      color: new FormControl(('#333')),
      isVisible: false
    }
  ] as ThemePalette[];
  public isLoading: boolean = false;
  public isSettingsOpen: boolean = false;
  public darkFont: HexColor = '#000';
  public lightFont: HexColor = '#fff';
  public fontFamilies: string[] = [];
  public fontWeights = ['thin', 'light', 'regular', 'medium', 'bold', 'black'];
  private gridColumnApi?: ColumnApi;
  public iframePath: string = '/viewer/';
  constructor(private styleService: StyleService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient,
              public dialog: MatDialog,
              public sanitizer: DomSanitizer,
              public themeService: ThemeService) {
  }


  public ngAfterViewInit(): void {
    this.isSettingsOpen = sessionStorage.getItem('settingsOpen') === 'true'
    const themeName = sessionStorage.getItem('selectedTheme') ?? 'Light'
    try {
      const options = JSON.parse(atob(this.activatedRoute.snapshot.queryParamMap.get('q') ?? '{}')) as Options;
      if (options.themes) {
        this.themes = options.themes.map(theme => ({
          title: theme.title,
          backgroundColor: new FormControl((theme.backgroundColor)),
          color: new FormControl((theme.color)),
        }));
      }
      if (options.palettes) {
        this.palettes = options.palettes.map(color => ({
          title: color.title,
          backgroundColor: new FormControl((color.backgroundColor)),
          color: new FormControl((color.color)),
          isVisible: false
        })) as any;
      }
      if (options.typographyLevels) {
        this.typographyLevels = options.typographyLevels;
      }
    } catch {}
    const url = sessionStorage.getItem('iframe-url');
    this.iframePath = url === '' || url == null? '/viewer/': url;
    this.setTheme(themeName);
    this.updateLightDark();

    this.updateCss(defaultTheme.css);
    this.updateStyles();
    window.onmessage = (e) => {
      if(typeof e.data === 'string') {
        const message = JSON.parse(e.data) as IMessage;
        if (message.type === 'update-child') {
          this.updateChild();
          this.updateStyles();
        } else if (message.type === 'location-update') {
          sessionStorage.setItem('iframe-url', (message.data as Location).href);
        }
      } else {
      }
    }
  }
  private updateStyles(){
    this.isLoading = true;
    this.updateLoading();
    const colors = this.getOptions();
    this.styleService.getCSS(colors as any).pipe(tap((css: string) => {
      this.isLoading = false;
      this.updateCss(css);

    })).subscribe();
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
    sessionStorage.setItem('settingsOpen', this.isSettingsOpen? 'true': 'false');
    setTimeout(() => {
      this.resizeGrid()
    }, 250);
  }

  public selectTheme($event: MatButtonToggleChange) {
    this.setTheme($event.value);
    sessionStorage.setItem('selectedTheme', this.selectedTheme.title);
  }

  public colorChange(formControl: FormControl<string | null>, value: string) {
    formControl.setValue((value));
    this.updateLightDark();
    // this.updateOptions();
    this.changed();
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
          backgroundColor: `${c.backgroundColor.value}`,
          color: `${c.color.value}`
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
    this.lightFont = this.themes.find(t => t.title === 'Dark')?.color?.value ?? ('#fff');
    this.darkFont = this.themes.find(t => t.title === 'Light')?.color?.value ?? ('#000');
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
      }).then();

  }

  public addPalette() {
    const dialogRef = this.dialog.open(DialogInputComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.palettes.push({
        title: result as any,
        backgroundColor: new FormControl<HexColor>('#333') as any,
        color: new FormControl<HexColor>('#333') as any,
        isVisible:false
      });
      this.updatePalettes();
    });
  }

  public removePalette = (palette: ThemePalette) => {
    this.palettes = _.without(this.palettes, palette);
    this.updatePalettes();
  }

  public firstDataRendered(event: FirstDataRenderedEvent<{name: string; settings: {fontFamily?: string; fontWeight?: string; fontSize?: string; lineHeight?: string; letterSpacing?: string}}>) {
    this.gridColumnApi = event.columnApi;
    this.resizeGrid();
  }

  private resizeGrid() {
    if(this.gridColumnApi == null) return;
    this.gridColumnApi.autoSizeColumns(this.gridColumnApi.getColumns() as Column[]);
  }

  private setTheme(themeName: string) {
    this.selectedTheme = this.themes.find(t => t.title === themeName) as any;
    this.selectThemeClass = `${this.selectedTheme?.title?.toLowerCase()}-theme`;
    document.body.className = `mat-body ${this.selectThemeClass}`;
    this.updateTheme();
  }


  private postMessage(type: string, data: any) {
    this.iframe.nativeElement?.contentWindow?.postMessage(JSON.stringify({type, data}), '*')
  }
  private updateChild() {
    this.updatePalettes();
    this.updateTheme();
    this.updateLoading();
  }
  private updateCss(css: string){
    this.updateLoading();
    this.postMessage('css-update', css);
    this.updateChild();
  }

  private updatePalettes() {
    this.postMessage('palette-update', this.palettes);
  }

  private updateTheme() {
    this.postMessage('theme-change',`${this.selectedTheme?.title?.toLowerCase()}-theme`);
  }

  private updateLoading() {
    this.postMessage('is-loading', this.isLoading);
  }
}
