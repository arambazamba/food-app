import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthActions } from '../../../../dist/food-shop-ui/src/app/auth/state/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private msal: MsalService) {}

  //   tryLoginSilent$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType('[MSAL Auth] Try Login Silent'),
  //       mergeMap(() => {
  //         this.msals.acquireTokenSilent(null);
  //       })
  //     )
  //   );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.msal.logout().pipe(
          map((resp) => AuthActions.logoutsuccess()),
          catchError((err) => of(AuthActions.autherror({ err })))
        )
      )
    )
  );
}
