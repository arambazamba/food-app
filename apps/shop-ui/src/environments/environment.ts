export const environment = {
  production: false,
  authEnabled: false,
  api: 'https://localhost:5001/',
  azure: {
    applicationInsights: '0fb02d37-e5be-4ad1-846e-f5a7b378a200',
    signalREndpoint: '',
    appReg: {
      clientId: 'd23642f7-9ccf-4165-92e7-919f625a5acc',
      authority:
        'https://login.microsoftonline.comd/92b247e-90e0-4469-a129-6a32866c0d0a/',
      redirectUri: 'http://localhost:4200/',
      scopes: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        [
          'https://localhost:5001/food',
          ['api://b509d389-361a-447b-afb2-97cc8131dad6/access_as_user'],
        ],
      ],
    },
  },
  features: {
    reactive: false,
    logging: false,
  },
};
