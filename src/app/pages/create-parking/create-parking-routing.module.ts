import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateParkingPage } from './create-parking.page';

const routes: Routes = [
  {
    path: '',
    component: CreateParkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateParkingPageRoutingModule {}
