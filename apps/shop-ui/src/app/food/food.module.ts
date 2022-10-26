import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  EntityDataService,
  EntityDefinitionService,
  HttpUrlGenerator,
} from '@ngrx/data';
import { FoodEntityService } from '../../../dist/food-shop-ui/src/app/food/state/food-entity.service';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { FoodContainerComponent } from './catalog/food-container/food-container.component';
import { FoodEditComponent } from './catalog/food-edit/food-edit.component';
import { FoodListComponent } from './catalog/food-list/food-list.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { FoodRoutingModule } from './food-routing.module';
import { FoodShopContaienerComponent } from './shop/food-shop-container/food-shop-container.component';
import { NumberPickerComponent } from './shop/number-picker/number-picker.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { cartFeatureKey, cartReducer } from './state/cart/cart.reducer';
import { entityMetadata } from './state/catalog/entity-metadata';
import { FoodDataService } from './state/catalog/food-data.service';
import { CustomurlHttpGenerator } from './state/custom-url-generator';

@NgModule({
  declarations: [
    FoodContainerComponent,
    FoodListComponent,
    FoodEditComponent,
    FoodShopContaienerComponent,
    NumberPickerComponent,
    ShopItemComponent,
    CheckoutComponent,
  ],

  imports: [
    CommonModule,
    FoodRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    StoreModule.forFeature(cartFeatureKey, cartReducer),
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
