import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import Globals from '../../../locales/globals';
import { numberWithCommas } from '../../../utils/formatter';

import Spinner from '../../../components/common/Spinner';
import SaleProgress from './SaleProgress';
import ContributingInformation from './ContributingInformation';

import { getTokenSaleData, getCrowdsaleBalance, getWhitelistStatus } from '../../../redux/modules/tokenSale/tokenSale';

const { CROWDSALE_CONTRACT_ADDRESS } = process.env;

class TokenSale extends React.Component {
  constructor(props) {
    super(props);

    // Determine ICO start state
    this.timeToIcoStart = Globals.icoStart - Date.now();
    const icoHasStarted = this.timeToIcoStart <= 0;

    this.state = {
      icoHasStarted,
    };
  }

  componentWillMount() {
    this.props.getTokenSaleData();
    this.props.getCrowdsaleBalance();
    // this.props.getWhitelistStatus(); // called when app is fetching data
  }

  componentDidMount() {
    if (!this.state.icoHasStarted) {
      this.timeout = setTimeout(() => this.setState({ icoHasStarted: true }), this.timeToIcoStart);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const {
      saleDataLoading,
      tokensSold,
      tokensCap,
      tokenInvestments,
      bonusTokenInvestments,
      whitelistStatus,
      whitelistStatusError,
    } = this.props;

    const { icoHasStarted } = this.state;

    const showSaleProgressLoading = saleDataLoading;
    const whitelistStatusLoading = whitelistStatus === undefined;
    const balanceStatusLoading = tokenInvestments === undefined || bonusTokenInvestments === undefined;

    let saleStatus;
    if (icoHasStarted) {
      saleStatus = 'in-progress';
    } else {
      saleStatus = 'not-started';
    }

    const renderErrorOrDetails = () => (
      whitelistStatusError
        ? (
          <div>Failed to retrieve information. Please try again.</div>
        )
        : (
          <React.Fragment>
            <div className={s.subheader}>Details</div>
            <SaleProgress
              isLoading={showSaleProgressLoading}
              className={s.saleProgress}
              saleStatus={saleStatus}
              tokenName={Globals.tokenName}
              tokensSold={tokensSold || 0}
              tokenCap={tokensCap || 0}
            />
            <br /><br />
            {(whitelistStatus && icoHasStarted) &&
              <img
                className={s.addressProof}
                src={require('../../../assets/images/token-sale/Jake-ETH.JPG')}
                alt="Crowdsale Contract Address" />
            }
              <ContributingInformation
                className={s.contributingInformation}
                icoStarted={this.state.icoHasStarted}
                canContribute={whitelistStatus}
                ethAddress={CROWDSALE_CONTRACT_ADDRESS}
                ensAddress={Globals.ensAddress}
                gasSettings={Globals.gasSettings}
                bonusPercentage={Globals.bonusPercentage}
                currencyUnit={Globals.contributionUnit}
                minimumAllocationCap={Globals.minimumContribution}
              />
            {(whitelistStatus && icoHasStarted) && (
              <React.Fragment>
                <div className={s.subheader} style={{ marginTop: '40px' }}>Pre-Sale RTE balance</div>
                <div className={s.purchaseBalance}>Purchased: <span className={s.value}>{numberWithCommas(tokenInvestments)} {Globals.tokenName}</span></div>
                <div className={s.bonusBalance}>Bonus: <span className={s.value}>{numberWithCommas(bonusTokenInvestments)} {Globals.tokenName}</span></div>
              </React.Fragment>
            )}
          </React.Fragment>
        )
    );

    return (
      <div>
        {whitelistStatusLoading || balanceStatusLoading
          ? (
            <Spinner />
          )
          : renderErrorOrDetails()
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    saleDataLoading: state.tokenSale.tokenSale.saleDataLoading,
    tokensSold: state.tokenSale.tokenSale.tokensSold,
    tokensCap: state.tokenSale.tokenSale.tokensCap,
    tokenInvestments: state.tokenSale.tokenSale.tokenInvestments,
    bonusTokenInvestments: state.tokenSale.tokenSale.bonusTokenInvestments,
    whitelistStatus: state.tokenSale.tokenSale.whitelistStatus,
    whitelistStatusError: state.tokenSale.tokenSale.whitelistStatusError,
  }),
  {
    getTokenSaleData,
    getCrowdsaleBalance,
    getWhitelistStatus,
  }
)(TokenSale);
