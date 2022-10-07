import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookdetailsPage } from './bookdetails.page';

const routes: Routes = [
  {
    path: '',
    component: BookdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookdetailsPageRoutingModule {}
