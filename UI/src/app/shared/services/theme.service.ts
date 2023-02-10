import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Options } from '../../style.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme$ = new BehaviorSubject<Options>({} as any);

  constructor() { }
}
