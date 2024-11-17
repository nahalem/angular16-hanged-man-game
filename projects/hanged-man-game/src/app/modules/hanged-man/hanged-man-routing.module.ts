import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainViewComponent } from './components/main-view/main-view.component';
import { HangedManComponent } from './hanged-man.component';

const routes: Routes = [
  {
    path: '',
    component: HangedManComponent,
    // runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: MainViewComponent,
      },
      // {
      //   path: 'video',
      //   //component: VideoComponent,
      // },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'prefix',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HangedManRoutingModule { }
