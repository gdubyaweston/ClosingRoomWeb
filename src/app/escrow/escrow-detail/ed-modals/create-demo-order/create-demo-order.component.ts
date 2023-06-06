import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EscrowService } from '@app/_external_services/escrow.service';
import { TokenStorageService } from '@app/_services/tokenstorage.service';
import { EscrowCopy, EscrowOrder, EscrowParams } from '@app/_models/escrow_classes';
import { ServiceResponse } from '@app/_models/service_classes';

@Component({
  selector: 'app-create-demo-order',
  templateUrl: './create-demo-order.component.html',
  styleUrls: ['./create-demo-order.component.css']
})
export class CreateDemoOrderComponent implements OnInit {

  escrowOrderID: number = -1;
  newEscrowOrderID: string;
  message: string = 'Create Demo Copy Of This Closing..';
  cancelMessage: string = 'Cancel';
  continueMessage: string = "Continue <i class='fa fa-arrow-circle-right'></i>";
  showStartCopy: boolean = true;
  showEndCopy: boolean = false;
  copyMessage: string = "";
  gotoCopyMessage: string = "Goto Copy <i class='fa fa-arrow-circle-right'></i>";

  constructor(private route: ActivatedRoute,
    private escrowservice: EscrowService,
    private rtr: Router,
    private ts: TokenStorageService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.newEscrowOrderID = '-1';
  }

  setData(eid: number): void {
    this.escrowOrderID = eid;    
  }

  continueCreation(): void {
    // call backend to create the copy
    var par = new EscrowParams();
    par.escrowOrderID = this.escrowOrderID;
    this.escrowservice.demoEscrow("api/devescrow/duplicateescrow", par).subscribe({
      next: (result: ServiceResponse<EscrowCopy>) => {
       if(result.success && result.data.newEscrowOrderID > 0){
        this.showStartCopy = false;
        this.showEndCopy = true;
        this.newEscrowOrderID = result.data.newEscrowOrderID.toString();
        this.message = 'New Demo Closing Has Been Created..';
        this.copyMessage = "Copy Created Escrow Order: " + result.data.newEscrowOrderID;
       }
       else{
        this.copyMessage = 'COPY FAILED!!';
        this.showStartCopy = false;
        this.showEndCopy = false;
       } 
                
      },
      error: (err: HttpErrorResponse) => {
        console.log('Got Error(Copy Escrow)');
        console.log(err);
        if (err.status == 401) {
          this.ts.signOut();
          this.rtr.navigate(['/Login']);
        }
      },
   });
  }

  gotoCopy(): void {
    this.dialog.closeAll();
    if(this.newEscrowOrderID != '0')
      window.open('/EscrowDetail/' + this.newEscrowOrderID, '_blank');
  }

}
