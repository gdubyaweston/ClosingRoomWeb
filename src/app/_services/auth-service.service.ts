import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { EnvironmentUrlService } from '@app/_services/environment-url.service';
import { LoginResult } from '@app/_models/login_classes';
import { ServiceResponse } from '@app/_models/service_classes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private envURL: EnvironmentUrlService) { }

  login(userName: string, password: string): Observable<ServiceResponse<LoginResult>> {
    return this.http.post<ServiceResponse<LoginResult>>(this.envURL.urlAddress + '/api/login/login', {
      userName,
      password
    }, httpOptions);
  }

  validate(userName: string, token: string): Observable<ServiceResponse<LoginResult>> {
    return this.http.post<ServiceResponse<LoginResult>>(this.envURL.urlAddress + '/api/login/twostep', {
      userName,
      token
    }, httpOptions);
  }

}
