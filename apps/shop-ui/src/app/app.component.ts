import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MsalAuthFacade } from './auth/state/auth.facade';
import { MenuFacade } from './state/menu/menu.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = environment.title;
  authenticated = this.af.isAuthenticated();
  publicRoute: boolean = false;
  sidenavMode: MatDrawerMode = 'side';
  sidenavVisible = this.mf.sideNavVisible;
  isIframe = window !== window.parent && !window.opener;

  private destroy$ = new Subject();

  constructor(
    private af: MsalAuthFacade,
    public mf: MenuFacade,
    private router: Router
  ) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd && event.url.includes('reservation')) {
    //     console.log('route', event.url);
    //   }
    // });
    this.mf.sideNavPosition
      .pipe(takeUntil(this.destroy$))
      .subscribe((mode: string) => {
        this.sidenavMode = mode as MatDrawerMode;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getWorbenchStyle() {
    let result = {};
    this.mf.sideNavVisible
      .pipe(takeUntil(this.destroy$))
      .subscribe((visible: boolean) => {
        result = visible
          ? {
              'padding-left': '10px',
            }
          : {};
      });
    return result;
  }
}
