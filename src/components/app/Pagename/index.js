import React from 'react';
import { translate } from 'react-i18next';

const pages = {
  '/dashboard': 'dashboard',
  '/dashboard/account': 'account',
  '/dashboard/token-sale': 'tokenSale',
  '/dashboard/verification': 'kycVerification',
  '/dashboard/verification/success': 'kycVerification',
  '/dashboard/verification/failure': 'kycVerification'
};

const Pagename = ({ t, pathname }) => (<span>{t(pages[pathname])}</span>);

const TranslatedComponent = translate('app')(Pagename);

export default TranslatedComponent;
