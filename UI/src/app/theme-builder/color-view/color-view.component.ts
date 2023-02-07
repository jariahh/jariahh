import { Color } from '@angular-material-components/color-picker';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { getContrastYIQ } from './get-contrast-y-i.q';
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
    {fontColor: '', name: '50', value: '', lighten: 100},
    {fontColor: '', name: '100', value: '', lighten: 75},
    {fontColor: '', name: '200', value: '', lighten: 50},
    {fontColor: '', name: '300', value: '', lighten: 25},
    {fontColor: '', name: '400', value: '', lighten: 10},
    {fontColor: '', name: '500', value: ''},
    {fontColor: '', name: '600', value: '', lighten: -10},
    {fontColor: '', name: '700', value: '', lighten: -20},
    {fontColor: '', name: '800', value: '', lighten: -30},
    {fontColor: '', name: '900', value: '', lighten: -40},
    {fontColor: '', name: 'A100', value: '', lighten: 70},
    {fontColor: '', name: 'A200', value: '', lighten: 55},
    {fontColor: '', name: 'A400', value: '', lighten: 5},
    {fontColor: '', name: 'A700', value: '', lighten: -25}];

  public ngOnChanges(changes: SimpleChanges): void {
    this.colors.forEach(c => {
      if(c.lighten){
        c.value = shadeColor(this.color.hex, c.lighten);
      } else {
        c.value = `#${this.color.hex}`;
      }
      c.fontColor = getContrastYIQ(c.value, `#${this.light.hex}`, `#${this.dark.hex}`);
    })
    console.log(this.color.hex);
  }
}
