import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import notify from '../../../utils/notifications';

import { get } from '../../../utils/fetch';

// Import global components
import Button from '../../common/Button';
import Spinner from '../../common/Spinner';
import Checkbox from '../../common/Checkbox';
import Globals from '../../../locales/globals';

// Import verification step forms
import StepOneForm from '../forms/StepOneForm';
import StepTwoForm from '../forms/StepTwoForm';

// Import verification status components
import Pending from '../Pending';
import Success from '../Success';
import Failure from '../Failure';

// Import actions and types
import {
  VERIFICATION_STEP_TYPE,
  verifyStepOne,
  verifyStepTwo,
} from '../../../redux/modules/verification/verification';


class Verification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInformationPage: true,
      // Apply for whitelist checkbox
      checkboxAgreeTos: false,
      checkboxResidenceNotChina: false,
      checkboxResidenceNotUSA: false,
      checkboxResidenceNotKoreaRepublic: false,
      checkboxAgreeLaw: false,
    };
  }

  handleStartOrContinueClick = () => {
    this.setState({ showInformationPage: false });
  }

  render() {
    const {
      // Redux state
      isLoading,
      error,
      step,
      formStepIsProcessing,
      whitelistStatus,
      whitelistStatusError,
    } = this.props;
    const { showInformationPage } = this.state;

    const whitelistIsLoading = whitelistStatus === undefined && !whitelistStatusError;

    const renderPage = () => {
      if (isLoading || whitelistIsLoading) {
        return renderLoading();
      }

      if (error || whitelistStatusError) {
        return (
          <div>Failed to retrieve verification status</div>
        );
      }

      switch (step) {
        case VERIFICATION_STEP_TYPE.STEP_ONE:
          return showInformationPage
            ? renderStartKyc()
            : (<StepOneForm spinner={formStepIsProcessing} onSubmit={verifyStepOne} />);

        case VERIFICATION_STEP_TYPE.STEP_TWO:
          return showInformationPage
            ? renderContinueKyc()
            : (<StepTwoForm spinner={formStepIsProcessing} onSubmit={verifyStepTwo} />);

        case VERIFICATION_STEP_TYPE.PENDING:
          return (<Pending />);

        case VERIFICATION_STEP_TYPE.ACCEPTED:
          return (<Success whitelistStatus={whitelistStatus} />);

        case VERIFICATION_STEP_TYPE.REJECTED:
          return (<Failure />);

        case VERIFICATION_STEP_TYPE.ENDED_WITH_NO_APPLICATION:
          return renderNoMoreApplyKyc();

        default:
          return null;
      }
    };

    const renderLoading = () => (
      <div className={s.spinner}>
        <Spinner color="#0080ff"/>
      </div>
    );

    const renderStartKyc = () => (
      <div>
        <div className={s.title}>Apply for Whitelist</div>
        <div className={s.text}>In order to participate in the ICO, you have to apply to be whitelisted through our KYC verification process.</div>
        <div className={s.checkboxesContainer}>
          <div className={s.checkboxInput}>
            <Checkbox
              label={
                <span>I agree to the rate3.network&nbsp;
                  <a href={Globals.termsAndConditionsLink} target="_blank">Terms &amp; Conditions</a>
                  &nbsp;and&nbsp;
                  <a href={Globals.privacyPolicyLink} target="_blank">Privacy Policy</a>
                </span>
              }
              value={this.state.checkboxAgreeTos}
              onClick={(e) => this.setState({ checkboxAgreeTos: e.target.checked })}
            />
          </div>
          <div className={s.checkboxInput}>
            <Checkbox
              label={<span>I am not located in the People's Republic of China or I am not a citizen or resident (tax or otherwise) of, or domiciled in, the People's Republic of China.</span>}
              value={this.state.checkboxResidenceNotChina}
              onClick={(e) => this.setState({ checkboxResidenceNotChina: e.target.checked })}
            />
          </div>
          <div className={s.checkboxInput}>
            <Checkbox
              label={<span>I am not located in the United States of America or I am not a citizen, resident (tax or otherwise) or green card holder of, or domiciled in, the United States of America</span>}
              value={this.state.checkboxResidenceNotUSA}
              onClick={(e) => this.setState({ checkboxResidenceNotUSA: e.target.checked })}
            />
          </div>
          <div className={s.checkboxInput}>
            <Checkbox
              label={<span>I am not located in the Republic of Korea, or I am not a citizen, resident (tax or otherwise) of, or domiciled in, the Republic of Korea</span>}
              value={this.state.checkboxResidenceNotKoreaRepublic}
              onClick={(e) => this.setState({ checkboxResidenceNotKoreaRepublic: e.target.checked })}
            />
          </div>
          <div className={s.checkboxInput}>
            <Checkbox
              label={<span>I understand that such Registration and/or Token Sale is prohibited, restricted or unauthorized in any form or manner whether in full or in part under the laws, regulatory requirements or rules in any jurisdiction applicable to you, at the time of your Registration</span>}
              value={this.state.checkboxAgreeLaw}
              onClick={(e) => this.setState({ checkboxAgreeLaw: e.target.checked })}
            />
          </div>
        </div>
        <div className={s.start_verification_button}>
          <Button
            disabled={!(this.state.checkboxAgreeTos
              && this.state.checkboxResidenceNotChina
              && this.state.checkboxResidenceNotUSA
              && this.state.checkboxResidenceNotKoreaRepublic
              && this.state.checkboxAgreeLaw
            )}
            onClick={this.handleStartOrContinueClick}>Start KYC Verification</Button>
        </div>

        <div className={s.supportingText}>
          * We will not be accepting US, Chinese &amp; Korean citizens due to legal restrictions. Please check out <a href="https://www.leekICO.com" target="_blank">https://www.leekICO.com</a>
        </div>
      </div>
    );

    const renderContinueKyc = () => (
      <div>
        <div className={s.text}>Please complete filling up your KYC information.</div>
        <div className={s.start_verification_button}>
          <Button onClick={this.handleStartOrContinueClick}>Continue KYC Verification</Button>
        </div>
      </div>
    );

    const renderNoMoreApplyKyc = () => (
      <div>
        <div className={s.text}>Our whitelist application period has ended.</div>
        <div className={s.text}>Visit <a href={Globals.officialLink} target="_blank">{Globals.officialLink}</a> for more updates on Rate3.</div>
      </div>
    );

    return (
      <div>
        {renderPage()}
      </div>
    );
  }
}

const TranslatedComponent = translate('verification')(Verification);

export default connect(
  (state) => ({
    isLoading: state.verification.verification.isLoading,
    error: state.verification.verification.error,
    step: state.verification.verification.step,
    formStepIsProcessing: state.verification.verification.formStepIsProcessing,
    whitelistStatus: state.tokenSale.tokenSale.whitelistStatus,
    whitelistStatusError: state.tokenSale.tokenSale.whitelistStatusError,
  }),
  {
    notify,
  }
)(TranslatedComponent);
