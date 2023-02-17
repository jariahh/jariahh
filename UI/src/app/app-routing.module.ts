import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeBuilderComponent } from './theme-builder/theme-builder.component';
import { HomeComponent } from './theme-viewer/home/home.component';
import { ButtonsComponent } from './theme-viewer/material-components/buttons/buttons.component';
import { CheckboxComponent } from './theme-viewer/material-components/checkbox/checkbox.component';
import { ChipsComponent } from './theme-viewer/material-components/chips/chips.component';
import { ProgressBarComponent } from './theme-viewer/material-components/progress-bar/progress-bar.component';
import { ToolbarComponent } from './theme-viewer/material-components/toolbar/toolbar.component';
import { ThemeViewerComponent } from './theme-viewer/theme-viewer.component';

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
        },
        {
          path: 'progress-bar',
          component: ProgressBarComponent,
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
