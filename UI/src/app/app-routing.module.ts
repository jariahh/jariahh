import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeBuilderComponent } from './theme-builder/theme-builder.component';
import { ButtonsComponent } from './theme-viewer/buttons/buttons.component';
import { CheckboxComponent } from './theme-viewer/checkbox/checkbox.component';
import { ChipsComponent } from './theme-viewer/chips/chips.component';
import { HomeComponent } from './theme-viewer/home/home.component';
import { ThemeViewerComponent } from './theme-viewer/theme-viewer.component';
import { ToolbarComponent } from './theme-viewer/toolbar/toolbar.component';

const routes: Routes = [{
  path: '',
  component: ThemeBuilderComponent,
  children: [
    {
      path: '',
      component: ThemeViewerComponent,
      children: [
        {
          path: '',
          component: HomeComponent,
        },
        {
          path: 'buttons',
          component: ButtonsComponent,
        },
        {
          path: 'toolbar',
          component: ToolbarComponent,
        },
        {
          path: 'checkbox',
          component: CheckboxComponent,
        },
        {
          path: 'chip',
          component: ChipsComponent,
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
