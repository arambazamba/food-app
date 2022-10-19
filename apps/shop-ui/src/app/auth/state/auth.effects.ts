import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private msals: MsalService) {}

  //   tryLoginSilent$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType('[MSAL Auth] Try Login Silent'),
  //       mergeMap(() => {
  //         this.msals.acquireTokenSilent(null);
  //       })
  //     )
  //   );
}
