import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ThemeService } from '../../../../../../../src/app/shared/services/theme.service';
import { Options } from '../../../../../../../src/app/style.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{
  public theme: Options = new Options();
  public  iconNames: string[] = [];
  public loadedIcons = false;
  constructor(private themeService: ThemeService,
              private httpClient: HttpClient) {
  }

  public ngOnInit(): void {
    this.httpClient.get<any[]>('https://raw.githubusercontent.com/jossef/material-design-icons-iconfont/master/dist/fonts/MaterialIcons-Regular.json')
      .pipe(tap(results => {
        this.iconNames = Object.getOwnPropertyNames(results).map((key, value) => key)
          .map(value => ({value, sort: Math.random()}))
          .sort((a, b) => a.sort - b.sort)
          .map(value => value.value);
        this.loadedIcons = true;
      }))
      .subscribe()
    this.themeService.currentTheme$
      .pipe(tap(theme => {
        this.theme = theme;
      }))
      .subscribe();
  }

}
