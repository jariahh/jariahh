import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeBuilderComponent } from './theme-builder/theme-builder.component';
import { ThemeViewerComponent } from './theme-viewer/theme-viewer.component';

const routes: Routes = [{
  path: '',
  component: ThemeBuilderComponent,
  children: [
    {
      path: '',
      component: ThemeViewerComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
