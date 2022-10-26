import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodContainerComponent } from './admin/food-container/food-container.component';
import { FoodShopContaienerComponent } from './shop/food-shop-container/food-shop-container.component';
import { CheckoutComponent } from './checkout/checkout.component';

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
