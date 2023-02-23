import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ThemeService } from '../../../../../../../src/app/shared/services/theme.service';
import { Options } from '../../../../../../../src/app/style.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent  implements OnInit{
  public theme: Options = new Options();
  constructor(private themeService: ThemeService,
              private _formBuilder: FormBuilder) {
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  public ngOnInit(): void {

    this.themeService.currentTheme$
      .pipe(tap(theme => {
        this.theme = theme;
      }))
      .subscribe();
  }
}
