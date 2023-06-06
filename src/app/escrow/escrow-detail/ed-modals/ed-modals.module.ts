import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/material.module';
import { CreateDemoOrderComponent } from './create-demo-order/create-demo-order.component';
import { CreateLinkedOrderComponent } from './create-linked-order/create-linked-order.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateDemoOrderComponent,
    CreateLinkedOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class EdModalsModule { }
