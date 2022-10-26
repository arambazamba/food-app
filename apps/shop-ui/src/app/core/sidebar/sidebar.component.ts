import { Component, OnInit } from '@angular/core';
import { MenuFacade } from '../../state/menu/menu.facade';
import { MsalAuthFacade } from 'src/app/auth/state/auth.facade';
import { CartFacade } from '../../food/state/cart/cart.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user = this.auth.getUser();

  constructor(
    public auth: MsalAuthFacade,
    public cart: CartFacade,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }

  doCheckout() {
    this.router.navigate(['/food/checkout']);
  }
}
