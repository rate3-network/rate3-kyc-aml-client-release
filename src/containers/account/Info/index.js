import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { logout } from '../../../redux/modules/app/app';

import Button from '../../../components/common/Button';

const Info = (props) => {
  const {
    t,
    email,
    logout,
  } = props;

  return (
    <div className={s.info}>
      <div className={s.name}>
        {t('hello')},<br/>
      </div>

      <div className={s.email}>{email}</div>

      <div className={s.logout}>
        <Button
          type="button"
          size="small"
          styl="secondary"
          onClick={() => logout()}>
          {t('signOut')}
        </Button>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('account')(Info);

export default connect(
  (state) => ({
    email: state.app.app.user.email,
  }),
  {
    logout
  }
)(TranslatedComponent);
