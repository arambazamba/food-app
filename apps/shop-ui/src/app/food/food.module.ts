import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  EntityDefinitionService,
  EntityDataService,
  HttpUrlGenerator,
} from '@ngrx/data';
import { MaterialModule } from '../material.module';
import { FoodContainerComponent } from './food-container/food-container.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodRoutingModule } from './food-routing.module';
import { entityMetadata } from './state/entity-metadata';
import { FoodDataService } from './state/food-data.service';
import { FoodEntityService } from '../../../dist/food-shop-ui/src/app/food/state/food-entity.service';
import { CustomurlHttpGenerator } from './state/custom-url-generator';
import { FoodShopContaienerComponent } from './food-shop-contaiener/food-shop-contaiener.component';
import { ShopListComponent } from './shop-list/shop-list.component';

@NgModule({
  declarations: [
    FoodContainerComponent,
    FoodListComponent,
    FoodEditComponent,
    FoodShopContaienerComponent,
    ShopListComponent,
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: HttpUrlGenerator,
      useClass: CustomurlHttpGenerator,
    },
    FoodEntityService,
    FoodDataService,
  ],
})
export class FoodModule {
  constructor(
    entityDefinitionService: EntityDefinitionService,
    entityDataService: EntityDataService,
    foodDataService: FoodDataService
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Food', foodDataService);
  }
}
