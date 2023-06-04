import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscrowListComponent } from './escrow-list/escrow-list.component';
import { EscrowDetailComponent } from './escrow-detail/escrow-detail.component';
import { EscrowNewComponent } from './escrow-new/escrow-new.component';



@NgModule({
  declarations: [
    EscrowListComponent,
    EscrowDetailComponent,
    EscrowNewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EscrowModule { }
