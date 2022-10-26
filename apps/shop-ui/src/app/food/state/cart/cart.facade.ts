import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../shop/cart-item.model';
import { CartActions } from './cart.actions';
import { CartState } from './cart.reducer';
import { getItems } from './cart.selector';
import { OrderItem } from '../../shop/checkout/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  constructor(private store: Store<CartState>) {}

  clear() {
    this.store.dispatch(CartActions.clear());
  }

  set(item: CartItem) {
    this.store.dispatch(CartActions.updatecart({ item }));
  }

  getItems() {
    return this.store.select(getItems);
  }

  checkout(order: OrderItem) {
    this.store.dispatch(CartActions.checkout({ item: order }));
  }
}
