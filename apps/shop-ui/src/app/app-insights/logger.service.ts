import { Injectable, OnDestroy } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements OnDestroy {
  private routerSubscription!: Subscription;

  private static appInsights: ApplicationInsights;

  static getInstance(): ApplicationInsights {
    this.initAppInsights();
    return this.appInsights;
  }

  constructor() {
    LoggerService.initAppInsights();
  }

  static initAppInsights() {
    if (environment.azure.applicationInsights != '') {
      this.appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: environment.azure.applicationInsights,
          enableAutoRouteTracking: true,
        },
      });
      this.appInsights.loadAppInsights();
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  // setUserId(userId: string) {
  //   this.appInsights.setAuthenticatedUserContext(userId);
  // }
  // clearUserId() {
  //   this.appInsights.clearAuthenticatedUserContext();
  // }
  // logPageView(name?: string, uri?: string) {
  //   .trackPageView({ name, uri });
  // }

  logEvent(name: string, properties?: { [key: string]: any }) {
    LoggerService.getInstance().trackEvent({ name: name }, properties);
  }
}
