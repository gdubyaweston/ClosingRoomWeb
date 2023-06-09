import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../_services/environment-url.service';
import { EscrowParams, EscrowOrder, EscrowCopy, EscrowParticipant } from '@app/_models/escrow_classes';
//import { EscrowParticipantDto, EscrowCopyDto, EscrowPlayerDto } from '@app/_models/escrow_classes';
import { ServiceResponse  } from '@app/_models/service_classes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscrowService {

  constructor(private http: HttpClient, private envURL: EnvironmentUrlService) { }

  private createRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  getEscrowOrders(route: string, body: EscrowParams): Observable<ServiceResponse<EscrowOrder[]>> {
    return this.http.post<ServiceResponse<EscrowOrder[]>>(this.createRoute(route, this.envURL.urlAddress), body);
  }
  
  demoEscrow(route: string, body: EscrowParams): Observable<ServiceResponse<EscrowCopy>>{
    return this.http.post<ServiceResponse<EscrowCopy>>(this.createRoute(route, this.envURL.urlAddress), body);
  }

  getPlayers(route: string, body: EscrowParams): Observable<ServiceResponse<EscrowParticipant[]>>{
    return this.http.post<ServiceResponse<EscrowParticipant[]>>(this.createRoute(route, this.envURL.urlAddress), body);
  }

  copyEscrow(route: string, body: EscrowParams): Observable<ServiceResponse<number>>{
    return this.http.post<ServiceResponse<number>>(this.createRoute(route, this.envURL.urlAddress), body);
  }

}
