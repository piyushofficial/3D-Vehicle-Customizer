import { Store } from 'src/app/core/store/store';
import { isDevMode } from '@angular/core';

export function getEnv(key?: string): any {
  return key ? window['env'][key] : window['env'];
}
window['getEnv'] = getEnv;

// ENV Test
// ENV Test End

export const environment = {
  production: false,
  localstorage: {
    key: 'eyallprosexim',
  },
  // azAd: {
  //   clientId: '04d1f98b-ced5-4fd2-93bc-e5613d466658',
  //   tenantId: '0ee60860-9b14-4eb7-bd19-e77a5c17760d',
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
        endpoint: '/auth/login',
      },
      token: {
        endpoint: '/auth/token',
      },
      tokenRefresh: {
        endpoint: '/token/refresh',
      },
      logout:{
        endpoint:'/auth/logout'
      }
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
  environment.api.core.base = 'https://eyexim-lrm-api.azurefd.net/api';
  
}
