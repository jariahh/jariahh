import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../../../src/app/shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('styleContainer') styleContainer: ElementRef<HTMLDivElement> = {} as any;
  public selectThemeClass: any;
  public isLoading: any;
  constructor(private themeService: ThemeService) {

  }
  ngOnInit(): void {
    window.onmessage = (e) =>  {
      if(typeof e.data === 'string') {
        const message = JSON.parse(e.data);
        if (message.type === 'css-update') {
          this.isLoading = true;
          this.setCss(message.data);
        } else if(message.type === 'theme-change') {
          this.selectThemeClass = message.data;
          document.body.className = `mat-body ${message.data}`;
        } else if(message.type === 'palette-update'){
          this.themeService.currentTheme$.next({palettes: message.data} as any)
        } else if(message.type === 'is-loading'){
          this.isLoading = message.data;
        }
      }
    };
    window.top?.postMessage(JSON.stringify({'type': 'update-child'}), '*');

    window.onload = () => {
      let oldHref = document.location.href;
      const body = window.document.body;
      const observer = new MutationObserver(mutations => {
        mutations.forEach(() => {
          if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            window.top?.postMessage(JSON.stringify({'type': 'location-update', data: window.location }), '*');
          }
        });
      });
      observer.observe(body, { childList: true, subtree: true });
    };
    setTimeout(() => {
      window.top?.postMessage(JSON.stringify({'type': 'location-update', data: window.location }), '*');
    }, 250);
  }

  private setCss(css: string){
    this.isLoading = false;
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(css));
    styleElement.setAttribute('injected', 'true');
    for (let childrenKey in window.document.head.children) {
      const c = window.document.head.children[childrenKey];
      if(c.tagName === 'style') {
        if (c?.hasAttribute('injected')) {
          window.document.head.removeChild(c);
        }
      }
    }
    window.document.head.append(styleElement);
  }
}
