import React from 'react';
import s from './styles.css';

import SecurityTips from '../../common/SecurityTips';

const Pending = () => (
  <div className={s.body}>
    <div className={s.title}>We're reviewing your application</div>
    <div className={s.text}>
      You will be notified by email on your KYC results and participation status.
    </div>
    <div style={{ marginTop: '40px' }}>
      <SecurityTips />
    </div>
  </div>
);

export default Pending;