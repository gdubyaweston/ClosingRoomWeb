import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Login, LoginResult, LoginUser } from '@app/_models/login_classes';
import { AuthServiceService } from '@app/_services/auth-service.service';
import { TokenStorageService } from '@app/_services/tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoggedIn: boolean = false;
  userName: string = '';
  password: string = '';

  constructor(private as: AuthServiceService, private ts: TokenStorageService, private rtr: Router) { }

  loginUser(){
    alert('hi');
    this.as.login(this.userName, this.password).subscribe({
      next: data => {
        console.log('logged in data: ' + data);
        if(data.success && data.data.token){
          this.isLoggedIn = true;
          this.ts.saveToken(data.data.token);
          this.ts.saveUser(data.data.userInfo);
          this.rtr.navigate(['/EscrowList/open']);
        }
        else if (data.success && data.data.tfToken){
          this.ts.saveUser(data.data.userInfo);
          this.rtr.navigate(['/Login/TwoFactor'])
        }
        else{
          this.ts.signOut();
          this.rtr.navigate(['/Login']);
        }

      },
      error:(err: HttpErrorResponse)=>{
        console.log('Got Error(Login User)');
        console.log(err);
        if(err.status == 401){
          this.ts.signOut();
          this.rtr.navigate(['/Login']);
        }
      }
    });

  }

}
