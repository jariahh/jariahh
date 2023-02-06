import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { StyleService } from '../style.service';

@Component({
  selector: 'app-theme-builder',
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss']
})
export class ThemeBuilderComponent implements AfterViewInit {
  @ViewChild('styleContainer') styleContainer: ElementRef<HTMLDivElement> = {} as any;
  public colors = [
    {
      title: 'Primary',
      color: '#00FF00'
    },
    {
      title: 'Accent',
      color: '#0000FF'
    },
    {
      title: 'Warn',
      color: '#FF0000'
    }
  ];

  constructor(private styleService: StyleService) { }


  public ngAfterViewInit(): void {
    this.updateStyles();
  }
  private updateStyles(){
    this.styleService.getCSS({colors: this.colors}).pipe(tap((css: any) => {
      const styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(css));
      this.styleContainer.nativeElement.childNodes.forEach( childrenKey =>  {
        this.styleContainer.nativeElement.removeChild(childrenKey);
      });
      this.styleContainer.nativeElement.append(styleElement);

    })).subscribe();

  }

  public changed() {
    this.updateStyles();
  }
}
