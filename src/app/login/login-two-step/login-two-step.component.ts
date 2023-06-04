import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login, LoginResult, LoginUser } from '@app/_models/login_classes';
import { AuthServiceService } from '@app/_services/auth-service.service';
import { TokenStorageService } from '@app/_services/tokenstorage.service';

@Component({
  selector: 'app-login-two-step',
  templateUrl: './login-two-step.component.html',
  styleUrls: ['./login-two-step.component.css']
})
export class LoginTwoStepComponent {

  userName: string = "";
  token: string = "";

  constructor(private as: AuthServiceService, private ts: TokenStorageService, private rtr: Router) { }

  ngOnInit(): void {
    console.log('ng on init:logon two step');
    var user = this.ts.getUser();
    if(user !== null)
      this.userName = user.email;
  }

  validateUser(){

    console.log(this.userName);
    console.log(this.token);
    this.as.validate(this.userName, this.token).subscribe({
      next: data => {
        console.log(data);
        if(data.success && data.data.token){
          this.ts.saveToken(data.data.token);
          this.ts.saveUser(data.data.userInfo);
          this.rtr.navigate(['/EscrowList/open']);
        }
        else{
          this.ts.signOut();
          this.rtr.navigate(['/Login']);
        }

      },
      error:(err: HttpErrorResponse)=>{
        console.log('Got Error(Validate User)');
        console.log(err);
        if(err.status == 401){
          this.ts.signOut();
          this.rtr.navigate(['/Login']);
        }
      }
    });

  }

}
