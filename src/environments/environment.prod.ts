import { Store } from 'src/app/core/store/store';
import { isDevMode } from '@angular/core';

export function getEnv(key?: string): any {
  return key ? window['env'][key] : window['env'];
}

window['getEnv'] = getEnv;

export const environment = {
  production: false,
  localstorage: {
    key: 'allpros',
  },
  // azAd: {
  //   clientId: getEnv('AZURE_CLIENT_ID'),
  //   tenantId: getEnv('AZURE_TENANT_ID'),
  // },
  api: {
    core: {
      base: '/api',
    } as Store.APIConfig,

    websocket: {
      stomp: {
        endpoint: '/socket/websocket',
      },
    } as Store.APIConfigGroup,

    auth: {
      me: {
        endpoint: '/auth/me',
      },
      validate: {
        endpoint: '/auth/validate',
      },
    } as Store.APIConfigGroup,

    account: {
      read: {
        endpoint: '/account/{ID}',
      },
    } as Store.APIConfigGroup,


    session: {
      login: {
        endpoint: '/oauth2/authorization/azure',
      },
      token: {
        endpoint: '/auth/token',
      },
      tokenRefresh: {
        endpoint: '/token/refresh',
      },
    },


  },

  formats: {
    date: {
      // Moment JS date formats
      default: 'MM-DD-YYYY',
      long: 'D-MMM-YYYY',
      short: 'D-MMM-YYYY',
    },
    dateTime: {
      // Moment JS date formats
      default: 'MM-DD-YYYY HH:mm:ss',
    },
  },
};

if (!isDevMode()) {
  environment.api.core.base = 'https://exuat.eyasp.in/api';
}
