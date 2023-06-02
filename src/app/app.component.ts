import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatList } from '@angular/material/list';

import { TokenStorageService } from '@app/_services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'ClosingRoomWeb';

  theYear: string;
  siteTitle: string;
  showMenu: boolean = true;
  showClosingMenu: boolean = false;
  btnVal: string = "<<";
  appTooltip: string = "Hide Menu";
  showSubMenu: boolean = true;

  opened: boolean = true;

  isExpandedC = true;
  showSubMenuC: boolean = false;
  isShowingC = false;

  constructor(private ts: TokenStorageService, private rtr: Router){
    this.theYear = new Date().getFullYear().toString();
    this.siteTitle = "Aircraft Closing Room";
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }

  signOutUser(): void{
    this.ts.signOut();
  }

  isSignedIn(): boolean {
    return this.ts.isLoggedIn();
  }

  ToggleNav(): void {
    if(this.showMenu){
      this.showMenu = false;
      this.btnVal = ">>";
      this.appTooltip = "Show Menu";
    }
    else{
      this.showMenu = true;
      this.btnVal = "<<";
      this.appTooltip = "Hide Menu";
    }
  }

  ToggleClosingNav(): void {
    if(this.showClosingMenu){
      this.showClosingMenu = false;
    }
    else{
      this.showClosingMenu = true;
    }
  }

}
