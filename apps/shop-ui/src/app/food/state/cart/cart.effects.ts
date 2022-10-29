import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { CartItem } from '../../shop/cart-item.model';
import { StorageService } from '../../shop/storage.service';
import { CartActions } from './cart.actions';

@Injectable()
export class DemosEffects {
  constructor(private actions$: Actions, private service: StorageService) {}

  clearStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearstorage),
      mergeMap(() =>
        this.service.clearStorage().pipe(
          map((resp: boolean) => CartActions.cartsuccess({ status: resp })),
          catchError((err) => of(CartActions.cartfailure({ err })))
        )
      )
    )
  );

  loadFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadfromstorage),
      mergeMap(() =>
        this.service.loadFromStorage().pipe(
          map((resp: CartItem | null) =>
            CartActions.loadfromstorage({ item: resp })
          ),
          catchError((err) => of(CartActions.cartfailure({ err })))
        )
      )
    )
  );

  saveToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.savetostorage),
      mergeMap((action) =>
        this.service.saveToStorage(action.item).pipe(
          map((resp: boolean) => CartActions.cartsuccess({ status: resp })),
          catchError((err) => of(CartActions.cartfailure({ err })))
        )
      )
    )
  );
}
