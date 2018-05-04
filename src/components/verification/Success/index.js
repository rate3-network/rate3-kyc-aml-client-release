import React from 'react';
import s from './styles.css';

import Globals from '../../../locales/globals';

import SecurityTips from '../../common/SecurityTips';

const Success = ({ whitelistStatus }) => (
  <div className={s.body}>
    <div className={s.title}>KYC Status: <span className={s.status}>Accepted</span></div>
    <div className={s.title} style={{ marginTop: '5px' }}>Whitelist Status: <span className={s.status}>{whitelistStatus ? 'Whitelisted' : 'Pending'}</span></div>
    <div className={s.text}>
      {whitelistStatus
        ? 'You are now whitelisted on our token sale contract. Head over to our token sale details page for more information on how to participate.'
        : (
          <React.Fragment>
            <div>You have successfully passed the KYC process, but you are not whitelisted yet.</div>
            <div style={{ marginTop: '4px' }}>Kindly wait for up to 24 hours, we will notify you via email once you are successfully whitelisted.</div>
            <div style={{ fontWeight: '500', marginTop: '8px' }}>Please do not send any ETH to our token sale address yet.</div>
          </React.Fragment>
        )
      }
      <br/><br/>
      <a href={Globals.nextStepsKycSuccess} target="_blank">
        <span className={s.linkText}>How to participate</span>
        <span className={s.linkArrow}>&#x276F;</span>
      </a>
    </div>

    <div style={{ marginTop: '40px' }}>
      <SecurityTips />
    </div>
  </div>
);

export default Success;
