import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ThemeService } from '../../../../../../../src/app/shared/services/theme.service';
import { Options } from '../../../../../../../src/app/style.service';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent  implements OnInit{
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
