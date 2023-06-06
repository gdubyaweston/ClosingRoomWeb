import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscrowListComponent } from './escrow-list/escrow-list.component';
import { EscrowDetailComponent } from './escrow-detail/escrow-detail.component';
import { EscrowNewComponent } from './escrow-new/escrow-new.component';

import { MaterialModule } from 'src/material.module';
import { EdModalsModule } from './escrow-detail/ed-modals/ed-modals.module';


@NgModule({
  declarations: [
    EscrowListComponent,
    EscrowDetailComponent,
    EscrowNewComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule,
    EdModalsModule
  ]
})
export class EscrowModule { }
