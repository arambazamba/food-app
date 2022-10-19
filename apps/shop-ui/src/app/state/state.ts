import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromMenu from './menu/menu.reducer';

export interface State {
  menu: fromMenu.MenuState;
  // food: FoodState; -> from lazy loaded module
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<State> = {
  menu: fromMenu.reducer,
  // food: foodReducer; -> from lazy loaded module
};

export const metaReducers: MetaReducer<any>[] = [debug];

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];
