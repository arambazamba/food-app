import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../shop/cart-item.model';
import { CartActions } from './cart.actions';
import { CartState } from './cart.reducer';
import { getItems, getPersist } from './cart.selector';
import { OrderItem } from '../../shop/checkout/order-item.model';
import { map, startWith } from 'rxjs/operators';

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

  togglePersist() {
    this.store.dispatch(CartActions.toogglepersist());
  }

  getPersist() {
    return this.store.select(getPersist);
  }

  getItems() {
    return this.store.select(getItems);
  }

  getItemsCount() {
    return this.store.select(getItems).pipe(
      map((items) =>
        items.reduce((runningSum, v) => runningSum + v.quantity, 0)
      ),
      startWith(0)
    );
  }

  getSumTotal() {
    return this.store.select(getItems).pipe(
      map((items) =>
        items.reduce((runningSum, v) => {
          return runningSum + v.quantity * v.price;
        }, 0)
      ),
      startWith(0)
    );
  }

  checkout(order: OrderItem) {
    this.store.dispatch(CartActions.checkout({ item: order }));
  }
}
