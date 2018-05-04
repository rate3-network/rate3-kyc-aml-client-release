import React from 'react';

import s from './style.css';
import Globals from '../../../locales/globals';

const SecurityTips = () => (
  <div className={s.securityTipsContainer}>

    <div className={s.header}>
      <img src={require('../../../assets/images/icons/security.svg')} alt="Secure" />
      <span>Security Tips</span>
    </div>

    <div className={s.securityTip}>
      Only respond to emails from <a href={`mailto:${Globals.officialMail}`}>{Globals.officialMail}</a>
    </div>
    <div className={s.securityTip}>
      Only visit our official website <a href={Globals.officialLink} target="_blank">{Globals.officialLink}</a>
    </div>
    <div className={s.securityTip} style={{ display: 'none' }}>
      BEWARE of phishing sites such as <span className={s.emphasis}>rate3.io</span> and <span className={s.emphasis}>rate3.ico.com</span>
    </div>
    <div className={s.securityTip}>
      Bookmark all official Rate3 URLs and check the URLs you visit
    </div>

    <div className={s.footer}>Your information is secured and never shared</div>
  </div>
);

export default SecurityTips;
