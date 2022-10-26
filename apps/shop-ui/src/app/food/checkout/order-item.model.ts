import { CartItem } from '../shop/cart-item.model';

export class OrderItem {
  name: string = '';
  payment: string = '';
  address: string = '';
  items: CartItem[] = [];
}
