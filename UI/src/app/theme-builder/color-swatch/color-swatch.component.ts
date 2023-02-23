import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import invert, { Color } from 'invert-color';
import { HSLA, HSVA, RGBA } from 'ngx-color';
import { SketchComponent } from 'ngx-color/sketch/sketch.component';

@Component({
  selector: 'app-color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorSwatchComponent implements OnChanges{
  @ViewChild('colorPicker') colorPicker: ElementRef<SketchComponent> = {} as any;
  @Input() color: string | HSLA | HSVA | RGBA = '#fff';
  @Input() light?: string | HSLA | HSVA | RGBA = '#fff';
  @Input() dark?: string | HSLA | HSVA | RGBA = '#000';
  @Input() swatchHeight:  string= '1rem';
  @Output() colorChange = new EventEmitter<string>();
  showPicker = false;
  public isOver: boolean = false;
  public invertedColor: string = '#fff';

  @HostListener('document:click', ['$event'])
  documentClick(event: Event) {
    if(!this.showPicker) return;
    if (!this.isOver) {
      this.showPicker = false;
    }
  }
  public open() {
    setTimeout(() => {
      this.showPicker = true;
    });
  }

  public mouseUp() {
    setTimeout(() => {
      this.isOver=false;
    });
  }

  public colorChanged($event: string | HSLA | HSVA | RGBA) {
    this.colorChange.emit($event.toString());

  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.invertedColor = invert(this.color as Color, {black: `${this.dark}`, white: `${this.light}`});
  }
}
