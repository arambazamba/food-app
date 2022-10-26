import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '../../shop/cart-item.model';

export const CartActions = createActionGroup({
  source: 'Shopping Cart',
  events: {
    clear: emptyProps(),
    setItem: props<{ item: CartItem }>(),
  },
});
