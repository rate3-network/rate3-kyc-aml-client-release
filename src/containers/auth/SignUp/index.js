import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import {
  signUp,
  endSignup,
  changeStep,
  setActivationData
} from '../../../redux/modules/auth/signUp';

import SignUpForm from '../../../components/auth/SignUpForm';

class SignUp extends Component {
  componentWillMount() {
    const {
      location: {
        query
      },
      changeStep,
      setActivationData
    } = this.props;

    if (query.type === 'activate') {
      setActivationData({
        email: query.email,
        verificationId: query.verificationId,
        code: query.code
      });

      changeStep('pin');
    }
  }

  render() {
    const {
      t,
      step,
      spinner,
    } = this.props;

    const renderStep = (currentStep) => {
      switch (currentStep) {
        case 'signup':
          return (
            <SignUpForm
              spinner={spinner}
              onSubmit={signUp} />
          );

        default:
          return <div>{t('somethingWentWrong')}</div>;
      }
    };

    return renderStep(step);
  }
}

const TranslatedComponent = translate('auth')(SignUp);

export default connect(
  (state) => ({
    ...state.auth.signUp
  }),
  {
    endSignup,
    changeStep,
    setActivationData
  }
)(TranslatedComponent);
