import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteGroupPage } from './complete-group.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteGroupPageRoutingModule {}
