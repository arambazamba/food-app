import { props, emptyProps, createActionGroup } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: '[MSAL Auth]',
  events: {
    tryLoginSilent: emptyProps(),
    login: emptyProps(),
    loginSuccess: props<{ authResponse: any }>(),
    logout: emptyProps(),
    logoutSuccess: emptyProps(),
    authError: props<{ err: Error }>(),
  },
});

// export const login = createAction('[Auth] login');

// export const loginSuccess = createAction(
//   '[Auth] loginSuccess',
//   props<{ authResponse: any }>()
// );

// export const loginFailure = createAction(
//   '[Auth] loginFailure',
//   props<{ err: Error }>()
// );

// export const logout = createAction('[Auth] logout');

// export const logoutSuccess = createAction('[Auth] logoutSuccess');
