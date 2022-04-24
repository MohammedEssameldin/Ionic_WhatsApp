import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteGroupPageRoutingModule } from './complete-group-routing.module';

import { CompleteGroupPage } from './complete-group.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteGroupPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule ,
    SwiperModule,
    
  ],
  declarations: [CompleteGroupPage]
})
export class CompleteGroupPageModule {}
