import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import s from './styles.css';

import { namedRoutes } from '../../../routes';
import { emailValidate } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const RestorePasswordEmailForm = (props) => {
  const {
    t,
    spinner,
    invalid,
    error,
    handleSubmit,
    showSuccess, // Custom prop to indicate email sent
  } = props;

  return (
    <div>
      <div className={s.title}>{t('passwordRecovery')}</div>
      <div className={s.description}>An email will be sent with a confirmation link to reset your password.</div>

      <div className={s.error}>{error || (<React.Fragment>&nbsp;</React.Fragment>)}</div>

      <form onSubmit={handleSubmit}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="email"
            type="text"
            placeholder={t('email')}
            disabled={spinner || showSuccess}
            validate={emailValidate}/>
        </div>

        <div className={s.button}>
          <Button type="submit" spinner={spinner} disabled={(invalid && !error) || showSuccess}>
            {showSuccess
              ? 'Reset email sent'
              : 'Reset password'
            }
          </Button>
        </div>

        <div className={s.footer}>
          {t('backTo')} <Link to={namedRoutes.signIn}>{t('signIn')}</Link>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'restorePasswordEmailForm',
  initialValues: {
    email: ''
  }
})(RestorePasswordEmailForm);

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
