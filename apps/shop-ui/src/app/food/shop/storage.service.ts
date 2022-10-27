import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clearStorage() {
    localStorage.clear();
  }

  loadFromStorage() {
    return localStorage.getItem('cart') as CartItem | null;
  }

  saveToStorage(cart: CartItem) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
