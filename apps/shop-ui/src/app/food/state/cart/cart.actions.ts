import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OrderItem } from '../../shop/checkout/order-item.model';
import { CartItem } from '../../shop/cart-item.model';

export const CartActions = createActionGroup({
  source: 'Shopping Cart',
  events: {
    clear: emptyProps(),
    updateCart: props<{ item: CartItem }>(),
    checkout: props<{ item: OrderItem }>(),
    toogglePersist: emptyProps(),
    loadFromStorage: props<{ item: CartItem | null }>(),
    clearStorage: emptyProps(),
    saveToStorage: props<{ cart: CartItem[] }>(),
    cartSuccess: props<{ status: boolean }>(),
    cartFailure: props<{ err: Error }>(),
  },
});
