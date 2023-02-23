import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit{
  public iconNames: string[] = [];
  constructor(private httpClient: HttpClient) {
  }

  public ngOnInit(): void {

    this.httpClient.get<any[]>('https://raw.githubusercontent.com/jossef/material-design-icons-iconfont/master/dist/fonts/MaterialIcons-Regular.json')
      .pipe(tap(results => {
        this.iconNames = Object.getOwnPropertyNames(results).map((key, value) => key)
      }))
      .subscribe()
  }

}
