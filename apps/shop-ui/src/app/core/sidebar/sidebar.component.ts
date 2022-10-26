import { Component, OnInit } from '@angular/core';
import { MenuFacade } from '../../state/menu/menu.facade';
import { MsalAuthFacade } from 'src/app/auth/state/auth.facade';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user = this.auth.getUser();

  constructor(public mf: MenuFacade, public auth: MsalAuthFacade) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }

  doCheckout() {}
}
