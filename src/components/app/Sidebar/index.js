import React from 'react';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import s from './styles.css';
import { namedRoutes } from '../../../routes';
import Globals from '../../../locales/globals';

const Sidebar = (props) => {
  const {
    t,
    kyc,
    closeSidebar
  } = props;

  return (
    <div className={s.sidebar}>
      <div className={s.close}>
        <button onClick={() => closeSidebar()}>
          <img src={require('../../../assets/images/icons/close.svg')}/>
        </button>
      </div>

      <div className={s.logo}>
        <a href={Globals.officialLink} target="_blank">
          <img src={require('../../../assets/images/logo.svg')} alt={t('companyName')} />
        </a>
      </div>

      <div className={s.navigation}>
        <Link
          onClick={() => closeSidebar()}
          className={s.link}
          activeClassName={s.active}
          to={namedRoutes.account}>{t('account')}</Link>

        <Link
          onClick={() => closeSidebar()}
          className={s.link}
          activeClassName={s.active}
          to={namedRoutes.verification}>{t('verification')}</Link>

        <Link
          onClick={() => closeSidebar()}
          className={kyc ? s.link : s.disabled}
          activeClassName={s.active}
          to={namedRoutes.tokenSale}>Token Sale</Link>
      </div>

      <div className={s.socials}>
        <a href={Globals.telegramLink} target="_blank">
          <img src={require('../../../assets/images/social-icons/telegram.svg')}/>
        </a>
        <a href={Globals.twitterLink} target="_blank">
          <img src={require('../../../assets/images/social-icons/twitter.svg')}/>
        </a>
        <a href={Globals.mediumLink} target="_blank">
          <img src={require('../../../assets/images/social-icons/medium.svg')} />
        </a>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('app')(Sidebar);

export default TranslatedComponent;
