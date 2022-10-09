import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { MaterialModule } from '../material.module';
import { FoodContainerComponent } from './food-container/food-container.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodRoutingModule } from './food-routing.module';
import { entityMetadata } from './state/entity-metadata';
import { FoodDataService } from './state/food-data.service';

@NgModule({
  declarations: [FoodContainerComponent, FoodListComponent, FoodEditComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
})
export class FoodModule {
  // constructor(
  //   entityDefinitionService: EntityDefinitionService,
  //   entityDataService: EntityDataService,
  //   foodDataService: FoodDataService
  // ) {
  //   entityDefinitionService.registerMetadataMap(entityMetadata);
  //   entityDataService.registerService('Food', foodDataService);
  // }
}
