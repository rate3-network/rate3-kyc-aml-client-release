import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import Globals from '../../../locales/globals';
import Alert from '../../../components/app/Alert';

import Banner from '../../../components/common/Banner';

const AuthWrapper = (props) => {
  const { t, children, step } = props;

  const renderBanner = () => (
    <div style={{ marginTop: '-6px', marginBottom: '18px' }}>
      <Banner
        text="Our KYC submissions are closed. Thanks for the support!"
        textColor="rgb(107,159,235)" />
    </div>
  );

  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <div className={s.logo}>
          <a href={Globals.officialLink} target="_blank">
            <img src={require('../../../assets/images/logo.svg')} />
          </a>
        </div>

        <div className={s.body}>
          {Globals.showKycClosedBanner && renderBanner()}
          {children}
        </div>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('auth')(AuthWrapper);

export default connect((state) => ({
  step: state.auth.signUp.step
}))(TranslatedComponent);
