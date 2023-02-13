
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { ColorSketchModule } from 'ngx-color/sketch';
import { NgxColorsModule } from 'ngx-colors';

import { AppRoutingModule } from './app-routing.module';
import { ConfirmationModule } from './theme-builder/confirmation/confirmation.module';
import { DialogInputComponent } from './theme-builder/dialog/dialog-input.component';
import { ThemeBuilderComponent } from './theme-builder/theme-builder.component';
import { ThemeViewerComponent } from './theme-viewer/theme-viewer.component';
import { AppComponent } from './app.component';
import { ColorViewComponent } from './theme-builder/color-view/color-view.component';
import { HomeComponent } from './theme-viewer/home/home.component';
import { ButtonsComponent } from './theme-viewer/buttons/buttons.component';
import { ColorSwatchComponent } from './theme-builder/color-swatch/color-swatch.component';

@NgModule({
  declarations: [
    ThemeBuilderComponent,
    ThemeViewerComponent,
    AppComponent,
    ColorViewComponent,
    HomeComponent,
    ButtonsComponent,
    ColorSwatchComponent,
    DialogInputComponent
  ],
  imports: [
    BrowserModule,
    ColorSketchModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDialogModule,
    ConfirmationModule,
    AgGridModule,
    NgxColorsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
