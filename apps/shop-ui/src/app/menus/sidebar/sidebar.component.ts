import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalAuthFacade } from 'src/app/auth/state/auth.facade';
import { CartFacade } from '../../food/state/cart/cart.facade';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user = this.auth.getUser();
  ct = this.cart.getItemsCount();
  total = this.cart.getSumTotal();
  persistToCart = this.cart.getPersist();
  fcSaveCart = new FormControl(false);

  constructor(
    public auth: MsalAuthFacade,
    public cart: CartFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.fcSaveCart.valueChanges.subscribe((isPersisted) => {
      this.cart.togglePersist();
    });
  }

  logout() {
    this.auth.logout();
  }

  doCheckout() {
    this.router.navigate(['/food/checkout']);
  }
}
