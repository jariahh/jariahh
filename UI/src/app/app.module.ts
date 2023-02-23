
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatLineModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { AppComponent } from './app.component';
import { ColorViewComponent } from './theme-builder/color-view/color-view.component';
import { ColorSwatchComponent } from './theme-builder/color-swatch/color-swatch.component';
import { ReplaceSpaceWithDashPipe } from './shared/replace-space-with-dash.pipe';
import { SafePipe } from './shared/safe.pipe';

@NgModule({
  declarations: [
    ThemeBuilderComponent,
    AppComponent,
    ColorViewComponent,
    ColorSwatchComponent,
    DialogInputComponent,
    ReplaceSpaceWithDashPipe,
    SafePipe
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
    NgxColorsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatLineModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
