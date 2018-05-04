import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import s from './styles.css';

// Import validators
import {
  documentTypeValidate,
  fileValidate,
} from '../../../utils/validators';

import documentTypes from '../../../utils/validators/documentTypes';

import Button from '../../common/Button';
import RenderFileInput from '../../forms/RenderFileInput';
import RenderSelect from '../../forms/RenderSelect';

const StepTwoForm = (props) => {
  const {
    // Redux form wrapper props
    handleSubmit,
    invalid,
    error,
    // Custom props
    spinner,
  } = props;

  return (
    <div>
      <div className={s.headingContainer}>
        <div className={s.title}>Verify Your Identity</div>
        <div className={s.text}>Please ensure your uploaded photos are in good quality and your face can be clearly seen.</div>
      </div>

      <form onSubmit={handleSubmit}>

        <div className={s.subtitle}>1. Official Document</div>
        <div className={s.imageContainer}>
          <img alt="Official ID Sample" src={require('../../../assets/images/kyc/international_pass.png')} />
        </div>
        <div className={s.supportingText}>* <span style={{ fontWeight: '500' }}>Passport</span> is preferred to improve the accuracy of the KYC process.</div>
        <div className={s.field}>
          <label htmlFor="document_type" className={s.fieldLabel}>Select an ID type to upload</label>
          <Field
            component={RenderSelect}
            name="document_type"
            validate={documentTypeValidate}
            // Select props
            selectOptions={documentTypes}
            placeholderOption="-- Select document type --" />
        </div>

        <div className={s.field}>
          <label htmlFor="file_official" className={s.fieldLabel}>Upload an image of your official ID</label>
          <Field
            component={RenderFileInput}
            id="file_official"
            name="file_official"
            disabled={spinner}
            validate={fileValidate}
            // File input props
            accept="image/png, image/jpeg"
            multiple={false}
            />
        </div>


        <div className={s.subtitle}>2. Selfie</div>
        <div className={s.imageContainer}>
          <img alt="Selfie Sample" src={require('../../../assets/images/kyc/international_pass_selfie.png')} />
        </div>
        <div className={s.supportingText}>* Take a <span style={{ fontWeight: '500' }}>Selfie</span> of yourself holding the official document.</div>
        <div className={s.field}>
          <label htmlFor={'file_selfie'} className={s.fieldLabel}>Upload your selfie</label>
          <Field
            component={RenderFileInput}
            component={RenderFileInput}
            id="file_selfie"
            name="file_selfie"
            disabled={spinner}
            validate={fileValidate}
            // File input props
            accept="image/png, image/jpeg"
            multiple={false}
            />
        </div>

        {error && <div className={s.error}>{error}</div>}

        <div className={s.field}>
          <Button type="submit" spinner={spinner} disabled={invalid && !error}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'StepTwo',
})(StepTwoForm);

const TranslatedComponent = translate('verification')(FormComponent);

export default TranslatedComponent;
