import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatLineModule, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { AgGridModule } from 'ag-grid-angular';
import { NgxColorsModule } from 'ngx-colors';
import { ConfirmationModule } from '../../../../../src/app/theme-builder/confirmation/confirmation.module';
import { AppModule } from '../app.module';
import { AsAnyPipe } from '../pipes/as-any.pipe';
import { ReplaceSpaceWithDashPipe } from '../pipes/replace-space-with-dash.pipe';
import { HomeComponent } from './home/home.component';
import { AutocompleteComponent } from './material-components/autocomplete/autocomplete.component';
import { BadgeComponent } from './material-components/badge/badge.component';
import {
  BottomSheetComponent,
  BottomSheetOverviewExampleSheet
} from './material-components/bottom-sheet/bottom-sheet.component';
import { ButtonToggleComponent } from './material-components/button-toggle/button-toggle.component';
import { ButtonComponent } from './material-components/button/button.component';
import { CardComponent } from './material-components/card/card.component';
import { CheckboxComponent } from './material-components/checkbox/checkbox.component';
import { ChipsComponent } from './material-components/chips/chips.component';
import { CoreComponent } from './material-components/core/core.component';
import { DatepickerComponent } from './material-components/datepicker/datepicker.component';
import { DialogComponent, DialogContentExampleDialog } from './material-components/dialog/dialog.component';
import { FormFieldComponent } from './material-components/form-field/form-field.component';
import { GridListComponent } from './material-components/grid-list/grid-list.component';
import { IconComponent } from './material-components/icon/icon.component';
import { InputComponent } from './material-components/input/input.component';
import { ListComponent } from './material-components/list/list.component';
import { MenuComponent } from './material-components/menu/menu.component';
import { PaginatorComponent } from './material-components/paginator/paginator.component';
import { ProgressBarComponent } from './material-components/progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from './material-components/progress-spinner/progress-spinner.component';
import { RadioButtonComponent } from './material-components/radio-button/radio-button.component';
import { RipplesComponent } from './material-components/ripples/ripples.component';
import { SelectComponent } from './material-components/select/select.component';
import { SidenavComponent } from './material-components/sidenav/sidenav.component';
import { SlideToggleComponent } from './material-components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './material-components/slider/slider.component';
import { SnackbarComponent } from './material-components/snackbar/snackbar.component';
import { SortHeaderComponent } from './material-components/sort-header/sort-header.component';
import { StepperComponent } from './material-components/stepper/stepper.component';
import { TableComponent } from './material-components/table/table.component';
import { TabsComponent } from './material-components/tabs/tabs.component';
import { ToolbarComponent } from './material-components/toolbar/toolbar.component';
import { TreeComponent } from './material-components/tree/tree.component';
import { ThemeViewerRoutingModule } from './theme-viewer-routing.module';
import { TooltipComponent } from './material-components/tooltip/tooltip.component';
import { DividerComponent } from './material-components/divider/divider.component';
import { ExpansionPanelComponent } from './material-components/expansion-panel/expansion-panel.component';
import { ThemeViewerComponent } from './theme-viewer.component';


@NgModule({
  declarations: [
    ReplaceSpaceWithDashPipe,
    ThemeViewerComponent,
    HomeComponent,
    ButtonComponent,
    ToolbarComponent,
    CheckboxComponent,
    ChipsComponent,
    ProgressBarComponent,
    ProgressSpinnerComponent,
    RadioButtonComponent,
    SliderComponent,
    StepperComponent,
    TabsComponent,
    AutocompleteComponent,
    BadgeComponent,
    BottomSheetComponent,
    ButtonToggleComponent,
    CardComponent,
    CoreComponent,
    DatepickerComponent,
    DialogComponent,
    DividerComponent,
    ExpansionPanelComponent,
    IconComponent,
    InputComponent,
    ListComponent,
    MenuComponent,
    PaginatorComponent,
    RipplesComponent,
    SelectComponent,
    SidenavComponent,
    SlideToggleComponent,
    SnackbarComponent,
    SortHeaderComponent,
    TableComponent,
    TooltipComponent,
    TreeComponent,
    FormFieldComponent,
    GridListComponent,
    BottomSheetOverviewExampleSheet,
    DialogContentExampleDialog,
    AsAnyPipe
  ],
  imports: [
    CommonModule,
    ThemeViewerRoutingModule,
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
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTreeModule,
    MatTooltipModule
  ]
})
export class ThemeViewerModule { }
