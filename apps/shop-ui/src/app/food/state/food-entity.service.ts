import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { FoodStockItem } from '../food-stock.model';

@Injectable({
  providedIn: 'root',
})
export class FoodEntityService extends EntityCollectionServiceBase<FoodStockItem> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Food', factory);
  }
}
