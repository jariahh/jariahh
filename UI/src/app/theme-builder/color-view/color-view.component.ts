import { Color } from '@angular-material-components/color-picker';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import invert from 'invert-color';
import { shadeColor } from './shade.color';

@Component({
  selector: 'app-color-view',
  templateUrl: './color-view.component.html',
  styleUrls: ['./color-view.component.scss']
})
export class ColorViewComponent implements OnChanges {
  @Input() color: Color = new Color(0, 0, 0, 1);
  @Input() light: Color = new Color(255, 255, 255, 1);
  @Input() dark: Color = new Color(0, 0, 0, 1);

  colors = [
    {contrast: '', name: '50', value: '', lighten: 100},
    {contrast: '', name: '100', value: '', lighten: 75},
    {contrast: '', name: '200', value: '', lighten: 50},
    {contrast: '', name: '300', value: '', lighten: 25},
    {contrast: '', name: '400', value: '', lighten: 10},
    {contrast: '', name: '500', value: ''},
    {contrast: '', name: '600', value: '', lighten: -10},
    {contrast: '', name: '700', value: '', lighten: -20},
    {contrast: '', name: '800', value: '', lighten: -30},
    {contrast: '', name: '900', value: '', lighten: -40},
    {contrast: '', name: 'A100', value: '', lighten: 70},
    {contrast: '', name: 'A200', value: '', lighten: 55},
    {contrast: '', name: 'A400', value: '', lighten: 5},
    {contrast: '', name: 'A700', value: '', lighten: -25}];

  public ngOnChanges(changes: SimpleChanges): void {
    this.colors.forEach(c => {
      if(c.lighten){
        c.value = shadeColor(this.color.hex, c.lighten);
      } else {
        c.value = `#${this.color.hex}`;
      }
      c.contrast = invert(c.value, { black: `#${this.dark.hex}`, white: `#${this.light.hex}` })
    })
    console.log(this.color.hex);
  }
}
