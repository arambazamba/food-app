import { Component, Input, OnInit } from '@angular/core';
import { FoodStockItem } from '../../food-stock.model';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  @Input() food: FoodStockItem[] | null = [];

  constructor() {}

  ngOnInit(): void {}

  handleAmountChange(amount: number) {
    console.log('amount changed', amount);
  }
}
