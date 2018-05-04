import React from 'react';

import s from './styles.css';

import { roundToMaxDecimalPlaces } from '../../../../utils/converter';
import { numberWithCommas } from '../../../../utils/formatter';

import WithLoading from '../../../../components/common/WithLoading';
import ProgressBar from '../../../../components/common/ProgressBar';

const SaleProgress = ({
  saleStatus,
  tokenName,
  tokensSold,
  tokenCap,
  ...restProps
}) => {
  const MAX_DECIMAL_PLACES = 3;
  const percentageSold = ((tokensSold || 0) / (tokenCap || 0) * 100); // eslint-disable-line
  const formattedPercentageSold = roundToMaxDecimalPlaces(percentageSold, MAX_DECIMAL_PLACES);

  return (
    <div {...restProps}>
      {(saleStatus === 'not-started') && <div className={s.headline}>Our Pre-Sale will start at 2PM, on 16 April 2018 SGT (GMT +8)</div>}
      {(saleStatus === 'in-progress') && (
        <React.Fragment>
          <div className={s.headline}>Our Pre-Sale is underway</div>
          <div style={{ marginTop: '2px' }}>Pre-Sale will close at 10PM, on 31 May 2018 SGT (GMT +8)</div>
        </React.Fragment>
      )}
      {(saleStatus === 'ended') && <div className={s.headline}>Our Pre-Sale has ended</div>}
      {(saleStatus === 'in-progress') &&
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '20px' }}>Total RTE tokens already sold on LeekICO: <span style={{ fontWeight: '500' }}>{numberWithCommas(80000000)}</span></div>
          <ProgressBar
            height="40px"
            progressPercentage={percentageSold} />
          <div className={s.progressText}>{numberWithCommas(tokensSold)}/{numberWithCommas(tokenCap)} {tokenName} ({formattedPercentageSold}%)</div>
        </div>
      }
    </div>
  );
};

export default WithLoading(SaleProgress);
