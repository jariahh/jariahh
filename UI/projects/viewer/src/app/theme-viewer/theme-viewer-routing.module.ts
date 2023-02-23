import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menu } from './menu';
import { ThemeViewerComponent } from './theme-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeViewerComponent,
    children:  [
      ...menu.map(m => ({
        path: m.path,
        component: m.component
      })),
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeViewerRoutingModule { }
