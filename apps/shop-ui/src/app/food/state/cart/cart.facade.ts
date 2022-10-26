import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../shop/cart-item.model';
import { CartActions } from './cart.actions';
import { CartState } from './cart.reducer';
import { getItems } from './cart.selector';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  constructor(private store: Store<CartState>) {}

  clear() {
    this.store.dispatch(CartActions.clear());
  }

  set(item: CartItem) {
    this.store.dispatch(CartActions.setitem({ item }));
  }

  getItems() {
    return this.store.select(getItems);
  }
}
