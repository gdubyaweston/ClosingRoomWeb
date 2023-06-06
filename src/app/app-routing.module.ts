import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { LoginTwoStepComponent } from './login/login-two-step/login-two-step.component';

import { EscrowDetailComponent } from './escrow/escrow-detail/escrow-detail.component';
import { EscrowNewComponent } from './escrow/escrow-new/escrow-new.component';
import { EscrowListComponent } from './escrow/escrow-list/escrow-list.component';

const routes: Routes = [
  { path: 'Login/TwoFactor', component: LoginTwoStepComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'EscrowDetail/:escrowOrderID', component: EscrowDetailComponent },
  { path: 'EscrowNew', component: EscrowNewComponent },
  { path: 'EscrowList/:searchType', component: EscrowListComponent },
  { path: '', redirectTo: 'EscrowList/open', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
