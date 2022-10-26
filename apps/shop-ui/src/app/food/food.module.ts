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
import { FoodContainerComponent } from './admin/food-container/food-container.component';
import { FoodEditComponent } from './admin/food-edit/food-edit.component';
import { FoodListComponent } from './admin/food-list/food-list.component';
import { FoodRoutingModule } from './food-routing.module';
import { FoodShopContaienerComponent } from './shop/food-shop-container/food-shop-container.component';
import { NumberPickerComponent } from './shop/number-picker/number-picker.component';
import { CustomurlHttpGenerator } from './state/custom-url-generator';
import { entityMetadata } from './state/entity-metadata';
import { FoodDataService } from './state/food-data.service';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { StoreModule } from '@ngrx/store';
import { cartFeatureKey, cartReducer } from './state/cart/cart.reducer';
import { CheckoutComponent } from './checkout/checkout.component';

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
