import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodContainerComponent } from './admin/food-container/food-container.component';
import { FoodShopContaienerComponent } from './shop/food-shop-contaiener/food-shop-contaiener.component';

const routes: Routes = [
  { path: '', component: FoodShopContaienerComponent },
  { path: 'admin', component: FoodContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodRoutingModule {}
