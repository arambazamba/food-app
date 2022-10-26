import { Component, OnInit } from '@angular/core';
import { CartFacade } from '../state/cart/cart.facade';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  items = this.cart.getItems();

  constructor(private cart: CartFacade) {}

  ngOnInit(): void {}

  completeCheckout() {}
}
