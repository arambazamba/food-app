import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../food-item.model';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  @Input() food: FoodItem[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
