import { Injectable } from '@angular/core';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  EventMessage,
  EventType,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { Store } from '@ngrx/store';
import { combineLatestWith, filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MsalBroadcastServiceMock } from '../mocks/MsalBroadcastService.mock';
import { AuthActions } from './auth.actions';
import { MsalAuthState } from './auth.reducer';
import { getAuthEnabled, getLoggedIn, getUser } from './auth.selectors';

@Injectable()
export class MsalAuthFacade {
  constructor(
    private msalBC: MsalBroadcastService,
    private store: Store<MsalAuthState>
  ) {
    this.handleLoginSuccess(this.msalBC);
  }

  getUser() {
    return this.store.select(getUser);
  }

  isAuthenticated() {
    return this.store.select(getLoggedIn).pipe(
      combineLatestWith(this.store.select(getAuthEnabled)),
      map(([loggedIn, authEnabled]) => {
        return authEnabled == false || loggedIn;
      })
    );
  }

  handleLoginSuccess = (
    broadcast: MsalBroadcastService | MsalBroadcastServiceMock
  ) => {
    return broadcast.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        //TODO: handle broadcast
        this.store.dispatch(
          AuthActions.loginsuccess({ authResponse: result.payload })
        );
        console.log(`MSAL Event ${result.eventType}`, result.payload);
        //TODO: find if this is needed
        // let resp: MsalAuthResponse = result.payload;
        // this.store.dispatch(loginSuccess({ authResponse: resp }));
        // console.log(`MSAL Event ${result.eventType}`, result.payload);
      });
  };

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}

//app module statics
export const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export const loggerCallback = (logLevel: LogLevel, message: string) => {
  console.log(logLevel, message);
};

export function MSALInstanceFactory(): IPublicClientApplication {
  let config = {
    auth: {
      clientId: environment.azure.appReg.clientId,
      authority: environment.azure.appReg.authority,
      redirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  };
  return new PublicClientApplication(config);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  let scopes = environment.azure.appReg.scopes as unknown as Map<
    string,
    Array<string>
  >;
  const protectedResourceMap = new Map<string, Array<string>>(scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}
