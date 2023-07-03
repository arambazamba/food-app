declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  funcWebhookEP: window['env']["FUNC_EP"] || 'https://foodorders-14056.azurewebsites.net/api',
};
