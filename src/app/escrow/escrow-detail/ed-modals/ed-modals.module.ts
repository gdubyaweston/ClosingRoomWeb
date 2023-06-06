import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/material.module';
import { CreateDemoOrderComponent } from './create-demo-order/create-demo-order.component';


@NgModule({
  declarations: [
    CreateDemoOrderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EdModalsModule { }
