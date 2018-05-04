import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import s from './style.css';

import { logout } from '../../../redux/modules/app/app';

import Button from '../../../components/common/Button';
import SpanLink from '../../../components/common/SpanLink';

import Firebase from '../../../utils/firebase';


const initialState = {
  emailIsResending: false,
  emailResent: false,
  emailResendError: false,
  email: '',
};

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      email: Firebase.getUserEmail(),
    };
  }

  handleResendButtonClick = () => {
    const { emailVerified } = this.props;
    const { emailResent, emailIsResending } = this.state;

    if (emailVerified || emailResent || emailIsResending) {
      return; // Do nothing if email is already verified or resent or is in process of resending
    }

    // Set email resending and reset errors (if any)
    this.setState({
      emailIsResending: true,
      emailResendError: initialState.emailResendError,
    });

    Firebase.sendEmailVerificationAsync()
      .then(() => {
        this.setState({
          emailIsResending: false,
          emailResent: true,
        });
      })
      .catch(() => {
        this.setState({
          emailIsResending: initialState.emailIsResending,
          emailResent: false,
          emailResendError: true,
        });
      });
  }

  handleSignOutClick = () => {
    this.props.logout();
  }


  render() {
    const { emailVerified } = this.props;
    const {
      email,
      emailIsResending,
      emailResent,
      emailResendError,
    } = this.state;

    const disableButton = emailVerified || emailResent; // emailIsResending not added so that button retains primary color
    const showSpinner = emailIsResending;

    return (
      <div>
        <div className={s.title}>Verify Email</div>

        <div className={s.description}>Please verify your account by clicking on the link provided in the email sent to <span style={{ fontWeight: '600' }}>{email}</span>.</div>

        <div className={s.button}>
          <div className={s.error}>{emailResendError ? 'Resending verification email failed. Please try again.' : (<React.Fragment>&nbsp;</React.Fragment>)}</div>
          <Button
            disabled={disableButton}
            spinner={showSpinner}
            onClick={this.handleResendButtonClick}
          >
            {!emailResent
              ? 'Resend email'
              : 'Email sent!'
            }
          </Button>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <SpanLink onClick={this.handleSignOutClick}>Sign out</SpanLink>
        </div>
      </div>
    );
  }
}

const TranslatedComponent = translate('auth')(VerifyEmail);

export default connect(
  (state) => ({
    emailVerified: state.app.app.emailVerified,
  }),
  {
    logout,
  }
)(TranslatedComponent);
