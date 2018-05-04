import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import s from './styles.css';

import { namedRoutes } from '../../../routes';
import {
  emailValidate,
  passwordValidate,
  required
} from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import RenderPassword from '../../forms/RenderPassword';
import RenderCheckbox from '../../forms/RenderCheckbox';
import Button from '../../common/Button';
import Globals from '../../../locales/globals';

class SignUpForm extends Component {
  render() {
    const {
      t,
      spinner,
      handleSubmit,
      invalid,
      error,
    } = this.props;

    return (
      <div>
        <div className={s.title}>{t('signUp')}</div>

        {error && <div className={s.error}>{error}</div>}

        <form id="mk_lk_signup" onSubmit={handleSubmit}>

          <div className={s.field}>
            <Field
              component={RenderInput}
              name="email"
              type="text"
              placeholder={t('email')}
              validate={emailValidate}/>
          </div>

          <div className={s.field}>
            <Field
              component={RenderPassword}
              name="password"
              type="password"
              placeholder={t('password')}
              validate={passwordValidate}/>
          </div>

          <div className={s.description}>
            {t('passwordLengthDescription')}
          </div>

          <div className={s.checkbox}>
            <Field
              component={RenderCheckbox}
              label={<span>
                {t('iAgreeWith')} <a href={Globals.termsAndConditionsLink} target="_blank">{'Terms and Conditions'}</a>
              </span>}
              name="agreeTos"
              validate={required}/>
          </div>

          <div className={s.button}>
            <Button type="submit" spinner={spinner} disabled={invalid}>{t('submit')}</Button>
          </div>
        </form>

        <div className={s.footer}>
          <Link to={namedRoutes.signIn}>{t('signIn')}</Link> {t('ifYouHaveAccount')}
        </div>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'signUp',
  initialValues: {
    email: '',
    password: '',
    agreeTos: false,
  }
})(SignUpForm);

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
