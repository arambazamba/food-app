import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartFacade } from '../../state/cart/cart.facade';
import { OrderItem } from './order-item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  items = this.cart.getItems();
  mockCheckout: FormControl = new FormControl(true);
  order: OrderItem = new OrderItem();

  constructor(private cart: CartFacade) {}

  ngOnInit(): void {
    this.mockCheckout.valueChanges.subscribe((isMock) => {
      if (isMock) {
        this.order.name = 'John Doe';
        this.order.address = '123 Main St';
        this.order.payment = 'PayPal';
      }
    });
  }

  completeCheckout() {
    this.cart.checkout(this.order);
  }
}
