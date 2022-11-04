import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';

//allow disabling auth for e2e tests
const guards: any[] = environment.authEnabled ? [MsalGuard] : [];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'about', component: AboutComponent, canActivate: guards },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then((m) => m.FoodModule),
    canLoad: guards,
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: isIframe == false ? 'enabledNonBlocking' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
