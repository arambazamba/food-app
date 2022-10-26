import { Component, OnInit } from '@angular/core';
import { FoodEntityService } from '../state/food-entity.service';

@Component({
  selector: 'app-food-shop-contaiener',
  templateUrl: './food-shop-contaiener.component.html',
  styleUrls: ['./food-shop-contaiener.component.scss'],
})
export class FoodShopContaienerComponent implements OnInit {
  food = this.foodService.entities$;

  constructor(private foodService: FoodEntityService) {}

  ngOnInit(): void {
    this.foodService.getAll();
  }
}
