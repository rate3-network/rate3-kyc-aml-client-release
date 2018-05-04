import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import Info from '../Info';

import EthContributionAddress from '../../../components/account/EthContributionAddress';

class Account extends Component {
  render() {
    const { ethAddress } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.info}>
            <Info/>
          </div>

          {ethAddress && (
            <div className={s.ethContributionAddress}>
              <EthContributionAddress ethAddress={ethAddress} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ethAddress: state.app.app.user.ethAddress
  }),
)(Account);
