import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EscrowService } from '@app/_external_services/escrow.service';
import { EscrowParams, EscrowParticipant, EscrowRole } from '@app/_models/escrow_classes';
import { ServiceResponse } from '@app/_models/service_classes';
import { TokenStorageService } from '@app/_services/tokenstorage.service';

@Component({
  selector: 'app-create-linked-order',
  templateUrl: './create-linked-order.component.html',
  styleUrls: ['./create-linked-order.component.css']
})
export class CreateLinkedOrderComponent implements OnInit, AfterViewInit {

  escrowOrderID: number;
  players: Array<EscrowParticipant>;
  selectedPlayers: Array<EscrowParticipant>;
  isSelectAll: boolean;
  roleList: Array<EscrowRole>;
  btnCopySelectedState: boolean = true;

  constructor(private route: ActivatedRoute,
    private esservice: EscrowService,
    private rtr: Router,
    private ts: TokenStorageService, public dialogRef: MatDialogRef<CreateLinkedOrderComponent>) { }

    ngAfterViewInit(): void {
      this.getOrderInfo();
    }
  
    ngOnInit(): void {
    }
  
    setData(eid: number): void {
      this.escrowOrderID = eid;    
    }

    getOrderInfo(): void {
    
      var epdto = new EscrowParams();
      epdto.escrowOrderID = this.escrowOrderID;
      alert(this.escrowOrderID);
      this.players = new Array<EscrowParticipant>();
  
      this.esservice.getPlayers("api/escrowcopy/getplayers", epdto).subscribe({
        next: (ret: ServiceResponse<EscrowParticipant[]>) => {
          if(ret.success){
            console.log(ret);
            this.players = ret.data;
          }
          else{
            alert(ret.message);
          }
                    
        },
        error: (err: HttpErrorResponse) => {
          console.log('Got Error(Get Players:Escrow Player List)');
          console.log(err);
          if(err.status == 401){
            this.ts.signOut();
            this.rtr.navigate(['/Login']);
          }
        }
      });  
  
    }

    copySelected(): void {
    
      var anySelected = this.players.some(p => p.isChecked == true);
      if(anySelected){
        var selectedPlayers = this.players.filter(pp => pp.isChecked == true);
        console.log(selectedPlayers);
  
        var epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;
        epdto.playerList = this.populateRoles(selectedPlayers);
        console.log(epdto);
  
        this.esservice.copyEscrow("api/escrowcopy/copyescrow", epdto).subscribe({
          next: (ret: ServiceResponse<number>) => {
            if(ret.success){
              console.log(ret);
              this.dialogRef.close(ret.data);
              //this.players = ret.data;
            }
            else{
              alert(ret.message);
            }
                      
          },
          error: (err: HttpErrorResponse) => {
            console.log('Got Error(Copy Escrow:Copy Escrow)');
            console.log(err);
            if(err.status == 401){
              this.ts.signOut();
              this.rtr.navigate(['/Login']);
            }
          }
        });
  
      }      
      
    }

    populateRoles(incoming: Array<EscrowParticipant>): Array<EscrowParticipant> {
      var outgoing = new Array<EscrowParticipant>();
      if(incoming != null && incoming.length > 0){
        
        incoming.forEach(element => {
          var np = new EscrowParticipant();
          np.setLinkedOrderData(element.participantID, element.escrowOrderID, element.customerID, element.roleID, element.trackerDisplayAlias);
          outgoing.push(np);
          
        });
      }
      return outgoing;
    }

}
