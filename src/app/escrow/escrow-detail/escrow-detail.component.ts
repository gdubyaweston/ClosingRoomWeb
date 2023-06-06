import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EscrowService } from '@app/_external_services/escrow.service';
import { TokenStorageService } from '@app/_services/tokenstorage.service';
import { CreateDemoOrderComponent } from './ed-modals/create-demo-order/create-demo-order.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { CreateLinkedOrderComponent } from './ed-modals/create-linked-order/create-linked-order.component';

@Component({
  selector: 'app-escrow-detail',
  templateUrl: './escrow-detail.component.html',
  styleUrls: ['./escrow-detail.component.css']
})
export class EscrowDetailComponent implements OnInit {

  paramsSub: any;
  escrowOrderID: number = -1;  

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(
    private route: ActivatedRoute,
    private escrowservice: EscrowService,
    private rtr: Router,
    private ts: TokenStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.ts.decodedToken());
    console.log('IsEscrow: ' + this.ts.IsEscrow());
    console.log('IsAdmin: ' + this.ts.IsAdmin());
    console.log('IsDeveloper: ' + this.ts.IsDeveloper());
    console.log('IsAgent: ' + this.ts.IsAgent());

    this.paramsSub = this.route.params.subscribe((params) => {
      this.escrowOrderID = params['escrowOrderID'];
    });

    this.getEscrowDetails();
  }

  getEscrowDetails(): void {}

  // dialog references
  openCreateDemoOrder(af: boolean, dc: boolean, pnlClass: string, w: string, h: string): void {
    const dr = this.dialog.open(CreateDemoOrderComponent, {
      autoFocus: af,
      disableClose: dc,
      panelClass: pnlClass,
      width: w + '%',
      height: h + '%'
    });

    dr.componentInstance.setData(this.escrowOrderID);
    
    dr.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  openCreateLinkedOrder(af: boolean, dc: boolean, pnlClass: string, w: string, h: string): void {
    const dr = this.dialog.open(CreateLinkedOrderComponent, {
      autoFocus: af,
      disableClose: dc,
      panelClass: pnlClass,
      width: w + '%',
      height: h + '%'
    });

    dr.componentInstance.setData(this.escrowOrderID);
    
    dr.afterClosed().subscribe(() => this.menuTrigger.focus());
  }


}
