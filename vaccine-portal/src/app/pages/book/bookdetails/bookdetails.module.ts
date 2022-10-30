import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookdetailsPageRoutingModule } from './bookdetails-routing.module';

import { BookdetailsPage } from './bookdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookdetailsPageRoutingModule
  ],
  declarations: [BookdetailsPage]
})
export class BookdetailsPageModule {}
