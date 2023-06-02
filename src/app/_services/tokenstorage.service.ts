import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

import { LoginUser } from '@app/_models/login_classes';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const VALID_DATE_KEY = 'auth-date';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public signOut(): void {
    sessionStorage.clear();
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: LoginUser): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): LoginUser {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return new LoginUser();
  }

  public decodedToken(): any {
    var utt = this.getToken();
    if(utt === null || utt === '')
      return '';
    return jwt_decode(utt);
  }

  public IsEscrow(): boolean {
    var tt = this.decodedToken();
    if(tt === null || tt === '')
      return false;
    return tt['Escrow'] ? tt['Escrow'] : false;
  }

  public IsAdmin(): boolean {
    var tt = this.decodedToken();
    if(tt === null || tt === '')
      return false;// false;
    return tt['Administrator'] ? tt['Administrator'] : false;
  }

  public IsDeveloper(): boolean {
    var tt = this.decodedToken();
    if(tt === null || tt === '')
      return false;
    return tt['Developer'] ? tt['Developer'] : false;
  }

  public IsAgent(): boolean {
    var tt = this.decodedToken();
    if(tt === null || tt === '')
      return false;
    return tt['Agent'] ? tt['Agent'] : false;
  }


  public signIn(token: string, user: LoginUser, expDate: string): void {
    this.saveToken(token);
    this.saveUser(user);
  }

  public isLoggedIn(): boolean {
    let tt = this.getToken();
    let uu = this.getUser();
    if(tt !== null && uu !== null && uu.id !== '')
      return true;
    return false;
  }


}