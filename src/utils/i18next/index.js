import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import langDetector from 'i18next-browser-languagedetector';

import Globals from '../../locales/globals';

const en = {
  account: require('../../locales/en/account.json'),
  app: require('../../locales/en/app.json'),
  common: require('../../locales/en/common.json'),
  auth: require('../../locales/en/auth.json'),
  verification: require('../../locales/en/verification.json'),
};

i18next
  .use(XHR)
  .use(langDetector)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    react: {
      wait: true,
      nsMode: 'default'
    },
    resources: {
      en: {
        account: en.account,
        app: en.app,
        common: en.common,
        auth: en.auth,
        verification: en.verification
      },
    },
    interpolation: {
      defaultVariables: Globals
    },
    ns: ['common'],
    defaultNS: 'common'
  });

export default i18next;
