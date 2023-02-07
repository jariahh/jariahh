import { Color } from '@angular-material-components/color-picker';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ThemePalette } from '@angular/material/core';
import { tap } from 'rxjs';
import { StyleService } from '../style.service';
const hexToColor = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {r: 0, g: 0, b: 0};
  return new Color(rgb.r, rgb.g, rgb.b, 1)
}
export class ThemeColor {

  title: ThemePalette = 'primary';
  backgroundColor: FormControl = new FormControl('#fff');
  color: FormControl = new FormControl('#000');
  isVisible: boolean = false;
}

@Component({
  selector: 'app-theme-builder',
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss']
})
export class ThemeBuilderComponent implements AfterViewInit {
  @ViewChild('styleContainer') styleContainer: ElementRef<HTMLDivElement> = {} as any;
  public selectedTheme: {
    'title': string;
    'backgroundColor': FormControl<Color>;
    'color':  FormControl<Color>;
  } = {} as any;
  public themes = [{
    'title': 'Light',
    'backgroundColor': new FormControl(hexToColor('#fafafa')),
    'color': new FormControl(hexToColor('#000')),
  }, {
    'title': 'Dark',
    'backgroundColor': new FormControl(hexToColor('#000')),
    'color': new FormControl(hexToColor('#fafafa')),
  }]
  public palettes = [
    {
      title: 'primary',
      backgroundColor: new FormControl(hexToColor('#3c6fba')),
      color: new FormControl(hexToColor('#fff')),
      isVisible: false
    },
    {
      title: 'accent',
      backgroundColor: new FormControl(hexToColor('#1d375e')),
      color: new FormControl(hexToColor('#fff')),
      isVisible: false
    },
    {
      title: 'warn',
      backgroundColor: new FormControl(hexToColor('#ffb400')),
      color: new FormControl(hexToColor('#333')),
      isVisible: false
    }
  ] as ThemeColor[];
  public isLoading: boolean = false;
  public isSettingsOpen: boolean = false;

  constructor(private styleService: StyleService) { }


  public ngAfterViewInit(): void {
    this.isSettingsOpen = sessionStorage.getItem('settingsOpen') === 'true'
    const themeName = sessionStorage.getItem('selectedTheme') ?? 'Light'
    this.selectedTheme = this.themes.find(t => t.title === themeName) as any;
    // this.updateStyles();
  }
  private updateStyles(){
    this.isLoading = true;
    const colors = {colors: this.palettes.map(c => ({
      title: c.title,
      backgroundColor: `#${c.backgroundColor.value.hex}`,
      color: `#${c.color.value.hex}`
    }))};
      console.log(colors);
    this.styleService.getCSS(colors as any).pipe(tap((css: string) => {
      console.log(css)
      this.isLoading = false;
      const styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(css));
      this.styleContainer.nativeElement.childNodes.forEach( childrenKey =>  {
        this.styleContainer.nativeElement.removeChild(childrenKey);
      });
      this.styleContainer.nativeElement.append(styleElement);

    })).subscribe();

  }
  debounce: any;
  public changed() {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
    this.updateStyles();
    }, 100)
  }

  public toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
    sessionStorage.setItem('settingsOpen', this.isSettingsOpen? 'true': 'false')
  }

  public selectTheme($event: MatButtonToggleChange) {
    this.selectedTheme = this.themes.find(t => t.title === $event.value) as any;
    sessionStorage.setItem('selectedTheme', this.selectedTheme.title);
  }
}
