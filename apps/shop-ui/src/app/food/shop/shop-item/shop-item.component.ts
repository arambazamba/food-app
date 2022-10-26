import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../cart-item.model';
import { CatalogItem } from '../../food-catalog.model';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit {
  @Input() food: CatalogItem = new CatalogItem();
  @Output() amountChange: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  constructor() {}

  ngOnInit(): void {}

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
