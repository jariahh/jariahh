import { Component, Type } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AutocompleteComponent } from './material-components/autocomplete/autocomplete.component';
import { BadgeComponent } from './material-components/badge/badge.component';
import { BottomSheetComponent } from './material-components/bottom-sheet/bottom-sheet.component';
import { ButtonToggleComponent } from './material-components/button-toggle/button-toggle.component';
import { ButtonComponent } from './material-components/button/button.component';
import { CardComponent } from './material-components/card/card.component';
import { CheckboxComponent } from './material-components/checkbox/checkbox.component';
import { ChipsComponent } from './material-components/chips/chips.component';
import { CoreComponent } from './material-components/core/core.component';
import { DatepickerComponent } from './material-components/datepicker/datepicker.component';
import { DialogComponent } from './material-components/dialog/dialog.component';
import { DividerComponent } from './material-components/divider/divider.component';
import { ExpansionPanelComponent } from './material-components/expansion-panel/expansion-panel.component';
import { FormFieldComponent } from './material-components/form-field/form-field.component';
import { GridListComponent } from './material-components/grid-list/grid-list.component';
import { IconComponent } from './material-components/icon/icon.component';
import { InputComponent } from './material-components/input/input.component';
import { ListComponent } from './material-components/list/list.component';
import { MenuComponent } from './material-components/menu/menu.component';
import { PaginatorComponent } from './material-components/paginator/paginator.component';
import { ProgressBarComponent } from './material-components/progress-bar/progress-bar.component';
import {
  ProgressSpinnerComponent
} from './material-components/progress-spinner/progress-spinner.component';
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
import { TooltipComponent } from './material-components/tooltip/tooltip.component';
import { TreeComponent } from './material-components/tree/tree.component';

export interface IMenuItem {
  children?: IMenuItem[];
  title: string;
  path: string;
  icon?: string;
  component: Type<any>;
}

export const menu = [
  { title: "Home", path: "home", icon: "home", component: HomeComponent},
  { title: "Autocomplete", path: "autocomplete", component: AutocompleteComponent},
  { title: "Badge", path: "badge", component: BadgeComponent},
  { title: "Bottom Sheet", path: "bottom-sheet", component: BottomSheetComponent},
  { title: "Button", path: "button", component: ButtonComponent},
  { title: "Button toggle", path: "button-toggle", component: ButtonToggleComponent},
  { title: "Card", path: "card", component: CardComponent},
  { title: "Checkbox", path: "checkbox", component: CheckboxComponent},
  { title: "Chips", path: "chips", component: ChipsComponent},
  // { title: "Core", path: "core", component: CoreComponent},
  { title: "Datepicker", path: "datepicker", component: DatepickerComponent},
  { title: "Dialog", path: "dialog", component: DialogComponent},
  { title: "Divider", path: "divider", component: DividerComponent},
  { title: "Expansion Panel", path: "expansion-panel", component: ExpansionPanelComponent},
  { title: "Form field", path: "form-field", component: FormFieldComponent},
  { title: "Grid list", path: "grid-list", component: GridListComponent},
  { title: "Icon", path: "icon", component: IconComponent},
  { title: "Input", path: "input", component: InputComponent},
  { title: "List", path: "list", component: ListComponent},
  { title: "Menu", path: "menu", component: MenuComponent},
  { title: "Paginator", path: "paginator", component: PaginatorComponent},
  { title: "Progress bar", path: "progress-bar", component: ProgressBarComponent},
  { title: "Progress spinner", path: "progress-spinner", component: ProgressSpinnerComponent},
  { title: "Radio button", path: "radio-button", component: RadioButtonComponent},
  { title: "Ripples", path: "ripples", component: RipplesComponent},
  { title: "Select", path: "select", component: SelectComponent},
  { title: "Sidenav", path: "sidenav", component: SidenavComponent},
  { title: "Slide toggle", path: "slide-toggle", component: SlideToggleComponent},
  { title: "Slider", path: "slider", component: SliderComponent},
  { title: "Snackbar", path: "snackbar", component: SnackbarComponent},
  { title: "Sort header", path: "sort-header", component: SortHeaderComponent},
  { title: "Stepper", path: "stepper", component: StepperComponent},
  { title: "Table", path: "table", component: TableComponent},
  { title: "Tabs", path: "tabs", component: TabsComponent},
  { title: "Toolbar", path: "toolbar", component: ToolbarComponent},
  { title: "Tooltip", path: "tooltip", component: TooltipComponent},
  { title: "Tree", path: "tree", component: TreeComponent},
] as IMenuItem[]
