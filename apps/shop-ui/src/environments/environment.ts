declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  production: false,
  authEnabled: false,
  api: window['env'].api,
  azure: {
    applicationInsights: window['env'].applicationInsights,
    signalREndpoint: window['env'].signalREndpoint,
    appReg: {
      clientId: window['env'].clientId,
      authority: window['env'].authority,
      redirectUri: window['env'].redirectUri,
      scopes: window['env'].scopes,
    },
  },
  features: {
    reactive: getBooleanEnv(window['env'].reactive),
  },
};

export function getBooleanEnv(val: any): boolean {
  if (val && val == 'true') {
    return true;
  } else {
    return false;
  }
}
