import { Component, OnInit } from '@angular/core';
import { FoodFacade } from '../store/facades/food.facade';
import { FoodItem } from '../food.model';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
})
export class FoodContainerComponent implements OnInit {
  food = this.ff.getFood();
  selected = this.ff.getSelected();

  constructor(public ff: FoodFacade) {}

  ngOnInit(): void {
    this.ff.initFood();
  }

  saveFood(item: FoodItem) {
    if (item.id == 0) {
      this.ff.addFood(item);
    } else {
      this.ff.updateFood(item);
    }
  }
}
