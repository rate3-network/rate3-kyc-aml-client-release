import React from 'react';
import s from './styles.css';
import Globals from '../../../locales/globals';

import SecurityTips from '../../common/SecurityTips';

const Failure = () => (
  <div className={s.body}>
    <div className={s.title}>Status: <span className={s.status}>Rejected</span></div>
    <div className={s.text}>
      Unfortunately, you do not meet our KYC requirements.<br/>
      <br/>
      <div style={{ marginTop: '3px' }}>Here are some possible reasons:</div>
      <ul className={s.list}>
        <li>You are located in a restricted jurisdiction where the token sale is prohibited or unauthorized in any form or manner</li>
        <li>Your ratings have been identified to be risky (due to country of residence, nationality)</li>
        <li>We are unable to verify your identity</li>
      </ul>
      <br />
      <a href={Globals.nextStepsKycFail} target="_blank">
        <span className={s.linkText}>Understand why your KYC failed</span>
        <span className={s.linkArrow}>&#x276F;</span>
      </a>
      <br/>
      <a href={`mailto:${Globals.supportMail}`}>
        <span className={s.linkText}>Have questions? Contact us now</span>
        <span className={s.linkArrow}>&#x276F;</span>
      </a>
    </div>

    <div style={{ marginTop: '40px' }}>
      <SecurityTips />
    </div>
  </div>
);

export default Failure;
