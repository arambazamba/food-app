import { Component, OnInit } from '@angular/core';
import { FoodStockItem } from '../../food-stock.model';
import { FoodEntityService } from '../../state/catalog/food-entity.service';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
})
export class FoodContainerComponent implements OnInit {
  food = this.foodService.entities$;
  selected: FoodStockItem | null = null;

  constructor(private foodService: FoodEntityService) {}

  ngOnInit() {
    this.foodService.loaded$.subscribe((loaded) => {
      if (!loaded) {
        this.foodService.getAll();
      }
    });
  }

  addFood(item: FoodStockItem) {
    this.selected = item;
  }

  selectFood(f: FoodStockItem) {
    this.selected = { ...f };
  }

  deleteFood(f: FoodStockItem) {
    this.foodService.delete(f.id);
  }

  foodSaved(f: FoodStockItem) {
    if (f.id == 0) {
      this.foodService.add(f);
    } else {
      this.foodService.update(f);
    }
  }
}
