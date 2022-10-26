import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { FoodCatalogItem } from '../../food-catalog.model';

@Injectable({
  providedIn: 'root',
})
export class FoodEntityService extends EntityCollectionServiceBase<FoodCatalogItem> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Food', factory);
  }
}
