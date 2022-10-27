import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MsalAuthFacade,
  MSALGuardConfigFactory,
  MSALInstanceFactory,
  MSALInterceptorConfigFactory,
} from './state/auth.facade';

import {
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';

import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { MsalBroadcastServiceMock } from './mocks/MsalBroadcastService.mock';
import { authFeatureKey, authReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../../../dist/food-shop-ui/src/app/material.module';

const modules = environment.authEnabled
  ? [
      CommonModule,
      MaterialModule,
      HttpClientModule,
      StoreModule.forFeature(authFeatureKey, authReducer),
      EffectsModule.forFeature([]),
      MsalModule,
    ]
  : [
      CommonModule,
      MaterialModule,
      HttpClientModule,
      StoreModule.forFeature(authFeatureKey, authReducer),
      EffectsModule.forFeature([]),
    ];

const providers = environment.authEnabled
  ? [
      MsalAuthFacade,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true,
      },
      {
        provide: MSAL_INSTANCE,
        useFactory: MSALInstanceFactory,
      },
      {
        provide: MSAL_GUARD_CONFIG,
        useFactory: MSALGuardConfigFactory,
      },
      {
        provide: MSAL_INTERCEPTOR_CONFIG,
        useFactory: MSALInterceptorConfigFactory,
      },
      MsalService,
      MsalGuard,
      MsalBroadcastService,
    ]
  : [
      MsalAuthFacade,
      { provide: MsalBroadcastService, useClass: MsalBroadcastServiceMock },
    ];

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: modules,
  providers: providers,
})
export class MsalAuthUtilModule {}
