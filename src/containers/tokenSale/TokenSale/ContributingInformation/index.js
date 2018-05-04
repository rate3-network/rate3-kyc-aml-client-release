import React from 'react';

import s from './styles.css';

import Input from '../../../../components/common/Input';

const ContributingInformation = ({
  icoStarted,
  canContribute,
  ethAddress,
  ensAddress,
  gasSettings,
  bonusPercentage,
  currencyUnit,
  minimumAllocationCap,
  maximumAllocationCap,
  ...restProps
}) => {
  const displayMinumumAllocationCap =
    minimumAllocationCap
      ? `${minimumAllocationCap} ${currencyUnit || ''}`
      : 'None';
  const displayMaximumAllocationCap =
    maximumAllocationCap
      ? `${maximumAllocationCap} ${currencyUnit || ''}`
      : 'None';

  return (
    <div {...restProps}>
      <div className={s.label}>ETH Contribution address:</div>
      {canContribute
        ? (icoStarted
          ? <Input className={s.ethAddressInput} value={ethAddress} readOnly />
          : <div className={s.ethAddressInfo}>The ETH Contribution address will be announced here when the Pre-Sale starts.</div>)
        : <div className={s.ethAddressInfo}>
            <div>You have successfully passed the KYC process, but you are not whitelisted yet.</div>
            <div style={{ fontWeight: '500', marginTop: '4px' }}>Please do not send any ETH to any token sale address yet.</div>
          </div>
      }
      {(icoStarted && canContribute) && ensAddress &&
        <React.Fragment>
          <div className={s.label}>Alternatively, you can send to our ENS domain:</div>
          <Input className={s.ethAddressInput} value={ensAddress} readOnly />
        <div className={s.supportingInfo}>* Most major wallet apps supports <a href="https://ens.domains/#section-apps" target="_blank">ENS</a>. You should verify that the resolved address is the same ETH address shown above.</div>
        </React.Fragment>
      }
      {(icoStarted && canContribute) && <div className={s.gasSettings}>Recommended Gas Settings: <span className={s.values}>{gasSettings}</span></div>}
      <br/><br/>
      {bonusPercentage && (
        <div className={`${s.bonusPercentage} ${s.saleInfo}`}>Bonus: <span className={s.values}>{bonusPercentage}%</span></div>
      )}
      <div className={`${s.allocationCap} ${s.saleInfo}`}>Minimum Allocation Cap: <span className={s.values}>{displayMinumumAllocationCap}</span></div>
      <div className={`${s.allocationCap} ${s.saleInfo}`}>Maximum Allocation Cap: <span className={s.values}>{displayMaximumAllocationCap}</span></div>
    </div>
  );
};

export default ContributingInformation;
