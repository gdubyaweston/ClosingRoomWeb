import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, PipeTransform, ViewChildren, QueryList, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TokenStorageService } from '@app/_services/tokenstorage.service';
import { EscrowOrder, EscrowParams } from '@app/_models/escrow_classes';
import { ServiceResponse } from '@app/_models/service_classes';
import { EscrowService } from '@app/_external_services/escrow.service';

@Component({
  selector: 'app-escrow-list',
  templateUrl: './escrow-list.component.html',
  styleUrls: ['./escrow-list.component.css']
})
export class EscrowListComponent implements OnInit, OnDestroy, AfterViewInit {

  escrowURL: string = "api/escroworders/multiple";
  checkedOutToID: number = 0;
  submittedByID: number = 0;
  //page: number = 1;
  //pageSize: number = 10;
  isLoading: boolean = false;
  showSearch: boolean = false;
  orderStatusID: number = 0; // 10 - open, 17 - closed
  searchType: string = 'open';
  pageTitle: string = "Coming Soon";
  escrowList: EscrowOrder[] = [];
  collectionSize: number = this.escrowList.length;
  //filter: FormControl = new FormControl('');
  displayedColumns: string[] = ['view', 'escrowOrderID', 'orderStatus', 'orderDate', 'submittedByName', 'escrowDescription', 'participantDisplay', 'end'];
  dataSource: MatTableDataSource<EscrowOrder>;
  daFilterValue: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private ts: TokenStorageService, private rtr: Router, private escrowservice: EscrowService) 
  {
    this.resetSearchCriteria();
    this.dataSource = new MatTableDataSource(this.escrowList);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.daFilterValue;
    //throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {    
  }

  ngOnInit(): void {
    console.log(this.ts.decodedToken());
    console.log('IsEscrow: ' + this.ts.IsEscrow());
    console.log('IsAdmin: ' + this.ts.IsAdmin());
    console.log('IsDeveloper: ' + this.ts.IsDeveloper());

    this.route.params.subscribe(params => {
      this.showSearch = false;
      this.searchType = params["searchType"];
    });

    this.performSwitch();

  }

  resetSearchCriteria(): void {
    this.submittedByID = this.ts.getUser().vectorsUID; // 128
    this.orderStatusID = 0; // 10 - open, 17 - closed
    this.checkedOutToID = 0;
  }

  performSwitch(): void {
    switch (this.searchType) {
      case "open":
        //alert('switch:open:searchType:' + this.searchType);
        this.orderStatusID = 10;
        this.getOrders();
        this.pageTitle = "Open Orders";
        break;
      case "closed":
        //alert('switch:closed:searchType:' + this.searchType);
        this.orderStatusID = 17;
        this.getOrders();
        this.pageTitle = "Closed Orders";
        break;
      case "all":
        //alert('switch:all:searchType:' + this.searchType);
        this.getOrders();
        this.pageTitle = "All Orders";
        break;
      case "search":
        //alert('switch:search:searchType:' + this.searchType);
        this.pageTitle = "Search Orders";
        this.showSearch = true;
        break;
      default:
        //alert('switch:default:searchType:' + this.searchType);
        this.orderStatusID = 10;
        this.getOrders();
        this.pageTitle = "Open Orders";
        break;
    }

  }

  applyFilter(event: Event) {
    this.daFilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.daFilterValue; /// filterValue.trim().toLowerCase();
    
  }

  getOrders(): void{

    this.isLoading = true;

    let epdto = new EscrowParams();
    epdto.submittedByID = this.submittedByID;
    epdto.orderStatusID = this.orderStatusID;
    epdto.checkedOutToID = this.checkedOutToID;

    this.escrowservice.getEscrowOrders(this.escrowURL, epdto).subscribe({
      next: (orders: ServiceResponse<EscrowOrder[]>) => {
        this.isLoading = false;
        this.escrowList = orders.data;
        this.collectionSize = this.escrowList.length;
        this.dataSource = new MatTableDataSource(this.escrowList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log('Got Error(Get Escrow Orders:Escrow List)');
        console.log(err);
        if(err.status == 401){
          this.ts.signOut();
          this.rtr.navigate(['/Login']);
        }
      }
    });

  }

  showDetails(eoid: number){
    if(eoid > 0){
      window.open('/EscrowDetail/' + eoid, '_blank');
    }

  }

  


}
