import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { FoodCatalogItem } from '../../food-catalog.model';

export function sortByName(a: FoodCatalogItem, b: FoodCatalogItem): number {
  let comp = a.name.localeCompare(b.name);
  return comp;
}

export const entityMetadata: EntityMetadataMap = {
  Food: {
    selectId: (food: FoodCatalogItem) => food.id,
    sortComparer: sortByName,
  },
};

// export const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  // pluralNames,
};
