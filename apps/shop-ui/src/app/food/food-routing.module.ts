import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodContainerComponent } from './catalog/food-container/food-container.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { FoodShopContaienerComponent } from './shop/food-shop-container/food-shop-container.component';

const routes: Routes = [
  { path: '', component: FoodShopContaienerComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: FoodContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodRoutingModule {}
