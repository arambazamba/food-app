import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { FoodStockItem } from '../food-stock.model';

export function sortByName(a: FoodStockItem, b: FoodStockItem): number {
  let comp = a.name.localeCompare(b.name);
  return comp;
}

export const entityMetadata: EntityMetadataMap = {
  Food: {
    selectId: (food: FoodStockItem) => food.id,
    sortComparer: sortByName,
  },
};

// export const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  // pluralNames,
};
