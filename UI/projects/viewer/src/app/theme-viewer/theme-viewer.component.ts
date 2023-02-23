import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import _ from 'underscore';
import { IMenuItem, menu } from './menu';

@Component({
  selector: 'app-theme-viewer',
  templateUrl: './theme-viewer.component.html',
  styleUrls: ['./theme-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeViewerComponent {
  mobileQuery: MediaQueryList;

  fillerNav: any[] = [];


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getMenu(this.fixedSort(), this.fillerNav);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private getMenu(menu: IMenuItem[], results: any[], navPath: string[] = ['/'], depth = 0) {
    menu.forEach(m => {
      results.push({...m, navPath: [...navPath, m.path], depth});
      if(m.children) {
        this.getMenu(m.children, results, [...navPath, m.path], depth + 1);
      }
    })
  }

  private fixedSort() {
    const home = menu.find(m => m.path === 'home') as IMenuItem;
    return [home, ... _.sortBy(_.without(menu, home), m => m.title)];
  }
}
