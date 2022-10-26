import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AILoggerService } from '../log/ailogger.service';
import * as fromMenu from './menu/menu.reducer';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

export interface State {
  menu: fromMenu.MenuState;
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
  // food: foodReducer; -> from lazy loaded module
};

export const metaReducers: MetaReducer<any>[] = [debug];

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];
