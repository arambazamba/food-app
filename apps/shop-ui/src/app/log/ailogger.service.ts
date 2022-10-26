import { Injectable, OnDestroy } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AILoggerService implements OnDestroy {
  private routerSubscription!: Subscription;

  private static logger: ApplicationInsights;

  static getInstance(): ApplicationInsights {
    this.initAppInsights();
    return this.logger;
  }

  constructor() {
    AILoggerService.initAppInsights();
  }

  static initAppInsights() {
    if (environment.azure.applicationInsights != '') {
      this.logger = new ApplicationInsights({
        config: {
          instrumentationKey: environment.azure.applicationInsights,
          enableAutoRouteTracking: true,
        },
      });
      this.logger.loadAppInsights();
      this.logger.trackEvent({ name: 'app instance started' });
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    AILoggerService.getInstance().trackEvent({ name: name }, properties);
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
}
