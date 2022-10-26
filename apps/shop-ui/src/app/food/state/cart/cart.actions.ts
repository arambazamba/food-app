import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OrderItem } from '../../checkout/order-item.model';
import { CartItem } from '../../shop/cart-item.model';

export const CartActions = createActionGroup({
  source: 'Shopping Cart',
  events: {
    clear: emptyProps(),
    updateCart: props<{ item: CartItem }>(),
    checkout: props<{ item: OrderItem }>(),
  },
});