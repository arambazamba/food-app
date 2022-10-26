import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AILoggerService } from '../log/ailogger.service';
import * as fromMenu from './menu/menu.reducer';
import { RouterStateUrl } from './router/router.reducer';

export interface State {
  menu: fromMenu.MenuState;
  routerReducer: RouterReducerState<RouterStateUrl>;
  // food: FoodState; -> from lazy loaded module
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('ngrx', state, action);
    var ai: ApplicationInsights = AILoggerService.getInstance();
    ai.trackEvent({ name: action.type, properties: action });
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<State> = {
  menu: fromMenu.reducer,
  routerReducer: routerReducer,
  // food: foodReducer; -> from lazy loaded module
};

export const metaReducers: MetaReducer<any>[] = [debug];

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];
