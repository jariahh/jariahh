import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ThemeService } from '../../shared/services/theme.service';
import { Options } from '../../style.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit{
  public theme: Options = new Options();
  constructor(private themeService: ThemeService) {
  }

  public ngOnInit(): void {
    this.themeService.currentTheme$
      .pipe(tap(theme => {
        this.theme = theme;
      }))
      .subscribe();
  }

}
