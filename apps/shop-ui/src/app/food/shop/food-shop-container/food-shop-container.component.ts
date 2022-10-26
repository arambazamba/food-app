import { Component, OnInit } from '@angular/core';
import { FoodEntityService } from '../../state/food-entity.service';

@Component({
  selector: 'app-food-shop-contaiener',
  templateUrl: './food-shop-container.component.html',
  styleUrls: ['./food-shop-container.component.scss'],
})
export class FoodShopContaienerComponent implements OnInit {
  food = this.foodService.entities$;

  constructor(private foodService: FoodEntityService) {}

  ngOnInit(): void {
    this.foodService.loaded$.subscribe((loaded) => {
      if (!loaded) {
        this.foodService.getAll();
      }
    });
  }
}
