import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import invert, { Color } from 'invert-color';
import { HSLA, HSVA, RGBA } from 'ngx-color';
import { ColorService } from '../../shared/services/color.service';

@Component({
  selector: 'app-color-view',
  templateUrl: './color-view.component.html',
  styleUrls: ['./color-view.component.scss']
})
export class ColorViewComponent implements OnChanges {
  @Input() color?: string | HSLA | HSVA | RGBA = "#000000";
  @Input() light?: string | HSLA | HSVA | RGBA = "#ffffff";
  @Input() dark?: string | HSLA | HSVA | RGBA = "#000000";

  constructor(private colorService: ColorService) {
  }
  colors = [
    {contrast: '', name: '50', value: ''},
    {contrast: '', name: '100', value: ''},
    {contrast: '', name: '200', value: ''},
    {contrast: '', name: '300', value: ''},
    {contrast: '', name: '400', value: ''},
    {contrast: '', name: '500', value: ''},
    {contrast: '', name: '600', value: ''},
    {contrast: '', name: '700', value: ''},
    {contrast: '', name: '800', value: ''},
    {contrast: '', name: '900', value: ''},
    {contrast: '', name: 'A100', value: ''},
    {contrast: '', name: 'A200', value: ''},
    {contrast: '', name: 'A400', value: ''},
    {contrast: '', name: 'A700', value: ''}];

  public ngOnChanges(changes: SimpleChanges): void {
    const colors = this.colorService.getColorObject(`${this.color}`);
    this.colors.forEach(c => {
        // @ts-ignore
      c.value = colors[c.name];
      c.contrast = invert(c.value, { black: `${this.dark}`, white: `${this.light}` })
    })
    console.log(this.color);
  }
}
