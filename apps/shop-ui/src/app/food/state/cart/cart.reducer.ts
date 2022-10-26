import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../shop/cart-item.model';
import { CartActions } from './cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.clear, (state) => ({
    ...state,
    items: [],
  })),
  on(CartActions.setitem, (state, action) => {
    let cart: CartItem[] = [...state.items];
    if (cart.length == 0) {
      cart.push(action.item);
    } else {
      let idx = cart.findIndex((item) => item.id == action.item.id);
      if (idx > -1) {
        if (action.item.quantity == 0) {
          cart = cart.filter((item) => item.id != action.item.id);
        } else {
          cart[idx] = { ...action.item };
        }
      } else {
        cart.push(action.item);
      }
    }
    return { ...state, items: [...cart] };
  })
);
