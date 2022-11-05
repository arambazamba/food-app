import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatalogItem } from '../../food-catalog.model';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent {
  @Input() food: CatalogItem = new CatalogItem();
  @Output() amountChange: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  constructor() {}

  handleAmountChange(amount: number) {
    let ci: CartItem = {
      id: this.food.id,
      name: this.food.name,
      price: this.food.price,
      quantity: amount,
    };
    this.amountChange.emit(ci);
  }
}
