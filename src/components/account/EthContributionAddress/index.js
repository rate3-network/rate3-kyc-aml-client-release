import React from 'react';
import Web3 from 'web3';

import s from './styles.css';

import Input from '../../common/Input';


const EthContributionAddress = ({ ethAddress }) => (
  <div>
    <div className={s.label}>Eth Address</div>
    <Input className={s.input} value={Web3.utils.toChecksumAddress(ethAddress)} readOnly />
    <ul className={s.list}>
      <li>You will receive your purchased Rate3 tokens at this ETH address you have provided.</li>
      <li>Do not use cryptocurrency exchange addresses (such as Kraken, Coinbase, Poloniex, etc) as the ETH Address to receive your tokens.</li>
      <li>Compatible wallets include: <span style={{ fontWeight: '500' }}>MyEtherWallet, MetaMask, Ledger Nano S, imToken</span></li>
    </ul>
  </div>
);

export default EthContributionAddress;
