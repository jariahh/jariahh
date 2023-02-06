import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import menu from '../menu.json';

@Component({
  selector: 'app-theme-viewer',
  templateUrl: './theme-viewer.component.html',
  styleUrls: ['./theme-viewer.component.scss']
})
export class ThemeViewerComponent {
  mobileQuery: MediaQueryList;

  fillerNav: any[] = [];

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getMenu(menu, this.fillerNav);
    console.log(this.fillerNav);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private getMenu(menu: any[], results: any[], navPath: string[] = ['/'], depth = 0) {
    menu.forEach(m => {
      results.push({...m, navPath: [...navPath, m.path], depth});
      if(m.children) {
        this.getMenu(m.children, results, [...navPath, m.path], depth + 1);
      }
    })
  }

}
