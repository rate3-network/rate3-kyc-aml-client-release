import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { signIn } from '../../../redux/modules/auth/signIn';

import SignInForm from '../../../components/auth/SignInForm';

const SignIn = (props) => {
  const {
    t,
    step,
    spinner,
  } = props;

  const renderStep = (currentStep) => {
    switch (currentStep) {
      case 'signIn':
        return (
          <SignInForm
            spinner={spinner}
            onSubmit={signIn}/>
        );
      default:
        return <div>{t('somethingWentWrong')}</div>;
    }
  };

  return renderStep(step);
};

const TranslatedComponent = translate('auth')(SignIn);

export default connect((state) => ({
  ...state.auth.signIn
}))(TranslatedComponent);
