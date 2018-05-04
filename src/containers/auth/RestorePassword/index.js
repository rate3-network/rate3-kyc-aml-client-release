import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  initiateRestorePassword,
  resetStore
} from '../../../redux/modules/auth/restorePassword';

import RestorePasswordEmailForm from '../../../components/auth/RestorePasswordEmailForm';

class RestorePassword extends Component {
  componentWillUnmount() {
    this.props.resetStore();
  }

  render() {
    const {
      spinner,
      resetRequestSent,
    } = this.props;

    return (
      <RestorePasswordEmailForm
        spinner={spinner}
        showSuccess={resetRequestSent}
        onSubmit={initiateRestorePassword} />
    );
  }
}

export default connect(
  (state) => ({ ...state.auth.restorePassword }),
  {
    resetStore
  }
)(RestorePassword);
